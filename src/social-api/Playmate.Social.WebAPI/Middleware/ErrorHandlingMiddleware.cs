using Playmate.Social.Application.Common.BaseResponse;
using System.Net;
using System.Text.Json;

namespace Playmate.Social.WebAPI.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private const string ErrorMessage = "Something went wrong...";

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var httpResponse = ResponseResult.HttpError<int>(ErrorMessage, HttpStatusCode.InternalServerError);
            var result = JsonSerializer.Serialize(httpResponse);
            await response.WriteAsync(result);
        }
    }
}

public static class ErrorHandlingMiddlewareExtension
{
    public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder) =>
        builder.UseMiddleware<ErrorHandlingMiddleware>();
}
