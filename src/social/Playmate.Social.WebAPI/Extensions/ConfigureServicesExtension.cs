namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
        return services;
    }
}
