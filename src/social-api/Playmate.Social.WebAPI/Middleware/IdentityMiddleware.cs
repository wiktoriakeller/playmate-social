using Microsoft.AspNetCore.Authentication;
using Playmate.Social.Application.Common.Contracts.Identity;
using System.Net;

namespace Playmate.Social.WebAPI.Middleware;

public class IdentityMiddleware
{
    private readonly RequestDelegate _next;

    public IdentityMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IIdentityService identityService)
    {
        var token = await context.GetTokenAsync("access_token");

        if (token is not null)
        {
            var user = identityService.GetUserByJwtToken(token);

            if (user is not null)
            {
                context.Items["User"] = user;
                await _next(context);
            }
            else
            {
                var contextResponse = context.Response;
                contextResponse.ContentType = "application/json";
                contextResponse.StatusCode = (int)HttpStatusCode.Unauthorized;
                await contextResponse.WriteAsync("Unauthorized access");
            }
        }
        else
        {
            await _next(context);
        }
    }
}

public static class IdentityMiddlewareExtension
{
    public static IApplicationBuilder UseIdentityMiddleware(this IApplicationBuilder builder) => builder.UseMiddleware<IdentityMiddleware>();
}
