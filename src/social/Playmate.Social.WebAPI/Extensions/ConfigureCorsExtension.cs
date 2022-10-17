namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureCorsExtension
{
    public static IServiceCollection AddCorsConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        var policyName = "social-frontend";
        var origins = configuration.GetSection("AllowedOrigins").Get<string[]>();

        services.AddCors(options =>
        {
            options.AddPolicy(policyName, builder =>
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins(origins)
            );
        });

        return services;
    }
}
