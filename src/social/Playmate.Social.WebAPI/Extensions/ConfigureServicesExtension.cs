namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
        services.AddCorsConfiguration(configuration);
        services.AddSwaggerDoc();
        return services;
    }
}
