using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Playmate.Social.Infrastructure.Identity;
using Playmate.Social.Infrastructure.Identity.Entities;
using Playmate.Social.Infrastructure.DataAccess;
using Playmate.Social.Infrastructure.Persistence;
using Playmate.Social.Infrastructure.Interfaces;
using Playmate.Social.Application.Contracts.Identity;
using Playmate.Social.Application.Contracts.DataAccess;
using System.Text;

namespace Playmate.Social.Infrastructure.Extensions
{
    public static class ConfigureServicesExtension
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            //Service registrattion
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddSingleton<IJwtService, JwtService>();
            services.AddScoped<IRepository<RefreshToken>, BaseRepositoryAsync<RefreshToken>>();

            //Register db
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ConfigureServicesExtension).Assembly.FullName)));

            //Register identity and jwt
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 6;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

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
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = tokenValidationParameters;
            });

            services.AddSingleton(tokenValidationParameters);

            //Options bindings
            services.Configure<JwtOptions>(configuration.GetSection("Authentication:JwtOptions"));

            return services;
        }
    }
}