using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Playmate.Social.Application.Common.Contracts;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Configuration;
using Playmate.Social.Infrastructure.Identity;
using Playmate.Social.Infrastructure.Identity.Interfaces;
using Playmate.Social.Infrastructure.Persistence;
using Playmate.Social.Infrastructure.Persistence.Repositories;
using Playmate.Social.Infrastructure.Services;
using System.Text;

namespace Playmate.Social.Infrastructure.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        //Service registration
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ConfigureServicesExtension).Assembly.FullName)));

        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddScoped<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        RegisterRepositories(services);

        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        services.AddHttpContextAccessor();

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Authentication:JwtOptions:Issuer"],
            ValidAudience = configuration["Authentication:JwtOptions:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Authentication:JwtOptions:Key"])),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = tokenValidationParameters;
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var accessTokenKey = "access_token";
                    if (context.Request.Query.ContainsKey(accessTokenKey))
                    {
                        var accessToken = context.Request.Query[accessTokenKey];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs/notifications"))
                        {
                            context.Token = accessToken;
                        }
                    }

                    return Task.CompletedTask;
                }
            };
        });

        //Mapping profiles
        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);

        //Options bindings
        services.AddSingleton(tokenValidationParameters);
        services.Configure<JwtOptions>(configuration.GetSection("Authentication:JwtOptions"));
        return services;
    }

    private static void RegisterRepositories(IServiceCollection services)
    {
        services.AddScoped<IRepository<RefreshToken>, BaseRepository<RefreshToken>>();
        services.AddScoped<IRepository<User>, BaseRepository<User>>();
        services.AddScoped<IFriendRequestRepository, FriendRequestRepository>();
        services.AddScoped<IFriendRepository, FriendRepository>();
        services.AddScoped<IRepository<Game>, BaseRepository<Game>>();
        services.AddScoped<IRepository<GameResult>, BaseRepository<GameResult>>();
    }                                                                 
}
