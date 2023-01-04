using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Common.Configurations;
using Playmate.Social.Infrastructure.Identity;
using Playmate.Social.Infrastructure.Persistence;
using Playmate.Social.Infrastructure.Persistence.Interfaces;
using Playmate.Social.Infrastructure.Repositories;
using System.Text;

namespace Playmate.Social.Infrastructure.Common.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        AddApplicationDbContext(services, configuration);
        AddCassandraDbContext(services, configuration);
        AddAuthentication(services, configuration);
        AddRepositories(services);
        AddServices(services);
        AddBlobStorage(services, configuration);

        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
        return services;
    }

    private static void AddApplicationDbContext(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
            configuration.GetConnectionString("DefaultConnection"),
            b => b.MigrationsAssembly(typeof(ConfigureServicesExtension).Assembly.FullName)));
    }

    private static void AddCassandraDbContext(IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<CassandraConfiguration>(configuration.GetSection(CassandraConfiguration.Section));
        services.AddSingleton<ICassandraConnection, CassandraConnection>();
        services.AddScoped<IChatMessagesRepository, ChatMessagesRepository>();
    }

    private static void AddBlobStorage(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration["BlobStorage:ConnectionString"];
        services.Configure<BlobStorageConfiguration>(configuration.GetSection(BlobStorageConfiguration.Section));
        services.AddSingleton(x => new BlobServiceClient(connectionString));
        services.AddScoped<IFileStorageService, BlobStorageService>();
    }

    private static void AddAuthentication(IServiceCollection services, IConfiguration configuration)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Authentication:JwtTokensConfiguration:Issuer"],
            ValidAudience = configuration["Authentication:JwtTokensConfiguration:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Authentication:JwtTokensConfiguration:Key"]!)),
            ValidAlgorithms = new List<string> { SecurityAlgorithms.HmacSha256 },
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

        services.AddSingleton(tokenValidationParameters);
        services.Configure<JwtTokensConfiguration>(configuration.GetSection(JwtTokensConfiguration.Section));
        services.Configure<GoogleAuthConfiguration>(configuration.GetSection(GoogleAuthConfiguration.Section));
    }

    private static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped<IRepository<RefreshToken>, BaseRepository<RefreshToken>>();
        services.AddScoped<IUsersRepository, UsersRepository>();
        services.AddScoped<IFriendRequestsRepository, FriendRequestsRepository>();
        services.AddScoped<IFriendsRepository, FriendsRepository>();
        services.AddScoped<IGamesRepository, GamesRepository>();
        services.AddScoped<IGameResultsRepository, GameResultsRepository>();
    }

    private static void AddServices(IServiceCollection services)
    {
        services.AddHttpContextAccessor();
        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<IExternalIdentityService, ExternaIdentityService>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
    }
}
