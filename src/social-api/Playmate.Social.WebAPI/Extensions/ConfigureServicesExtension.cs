using Microsoft.AspNetCore.SignalR;
using Playmate.Social.WebAPI.Configurations;
using Playmate.Social.WebAPI.Hubs.Interfaces;
using Playmate.Social.WebAPI.Hubs.Services;

namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
        services.Configure<WhitelistingConfiguration>(configuration.GetSection(WhitelistingConfiguration.Section));
        services.AddSingleton<IUserIdProvider, HubUserIdProvider>();
        services.AddSingleton<IHubUsersDictionary, HubUsersDictionary>();
        return services;
    }
}
