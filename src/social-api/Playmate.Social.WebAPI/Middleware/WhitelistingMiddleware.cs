using Microsoft.Extensions.Options;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.WebAPI.Configurations;
using System.Net;

namespace Playmate.Social.WebAPI.Middleware;

public class WhitelistingMiddleware
{
    private readonly RequestDelegate _next;

    public WhitelistingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(
        HttpContext context,
        IGamesRepository gamesRepository,
        IOptions<WhitelistingConfiguration> whitelistingConfiguration)
    {
        if (context.Request.Method == HttpMethod.Post.Method
            && context.Request.Path.ToString().Contains("results")
            && whitelistingConfiguration.Value.UseWhitelisting)
        {
            var connectionIp = context.Connection.RemoteIpAddress;
            var games = gamesRepository.GetAll();
            var registeredIpAddresses = games
                .Where(g => !string.IsNullOrWhiteSpace(g.ServerUrl))
                .Select(g => Dns.GetHostEntry(new Uri(g.ServerUrl).Host).AddressList)
                .SelectMany(ip => ip)
                .Distinct();

            if (registeredIpAddresses.Contains(connectionIp))
            {
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

public static class WhitelistingMiddlewareExtension
{
    public static IApplicationBuilder UseWhitelistingMiddleware(this IApplicationBuilder builder) => builder.UseMiddleware<WhitelistingMiddleware>();
}
