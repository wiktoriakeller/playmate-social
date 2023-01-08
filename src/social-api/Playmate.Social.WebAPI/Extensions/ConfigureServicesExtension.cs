using Microsoft.AspNetCore.SignalR;
using Playmate.Social.WebAPI.Configurations;
using Playmate.Social.WebAPI.Hubs.Services;

namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
        services.AddSingleton<IUserIdProvider, HubUserIdProvider>();
        services.Configure<WhitelistingConfiguration>(configuration.GetSection(WhitelistingConfiguration.Section));
        return services;
    }
}
