using FluentValidation;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Playmate.Social.Application.Common.Contracts.Services;
using Playmate.Social.Application.Common.PipelineBehaviors;
using Playmate.Social.Application.Common.Services;

namespace Playmate.Social.Application.Common.Extensions;

public static class ConfigureServicesExtension
{
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAutoMapper(typeof(ConfigureServicesExtension).Assembly);
        services.AddMediatR(typeof(ConfigureServicesExtension).Assembly);
        services.AddValidatorsFromAssembly(typeof(ConfigureServicesExtension).Assembly);
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddScoped<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IRoomIdProvider, RoomIdProvider>();
        ValidatorOptions.Global.LanguageManager.Enabled = false;
        return services;
    }
}
