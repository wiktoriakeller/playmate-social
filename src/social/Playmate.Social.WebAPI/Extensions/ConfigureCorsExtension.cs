namespace Playmate.Social.WebAPI.Extensions;

public static class ConfigureCorsExtension
{
    public static IServiceCollection ConfigureCors(this IServiceCollection services)
    {
        var policyName = "mobile";
        services.AddCors(options =>
        {
            options.AddPolicy(policyName, builder =>
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
            );
        });

        return services;
    }
}
