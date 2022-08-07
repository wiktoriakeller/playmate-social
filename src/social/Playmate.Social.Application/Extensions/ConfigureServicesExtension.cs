using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Playmate.Social.Application.Extensions
{
    public static class ConfigureServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
            services.AddMediatR(typeof(ConfigureServicesExtension).Assembly);
            return services;
        }
    }
}