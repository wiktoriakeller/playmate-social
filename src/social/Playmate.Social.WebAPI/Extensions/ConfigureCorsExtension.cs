namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureCorsExtension
{
    public static IServiceCollection ConfigureCors(this IServiceCollection services, IConfiguration configuration)
    {
        var policyName = "social-frontend";
        services.AddCors(options =>
        {
            options.AddPolicy(policyName, builder =>
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins(configuration["AllowedOrigins"])
            );
        });

        return services;
    }
}
