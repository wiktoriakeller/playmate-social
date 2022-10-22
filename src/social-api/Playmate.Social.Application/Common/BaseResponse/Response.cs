using System.Net;

namespace Playmate.Social.Application.Common.BaseResponse;

public class Response<T> : IResponse
{
    public T? Data { get; init; }
    public bool Succeeded => ResponseError == ResponseError.None;
    public List<string> Errors { get; private set; } = new();
    public ResponseError ResponseError { get; init; }
    public HttpStatusCode HttpStatusCode { get; init; }

    public Response(HttpStatusCode httpStatusCode, T? value = default)
    {
        ResponseError = ResponseError.None;
        HttpStatusCode = httpStatusCode;
        Data = value;
    }

    public Response(
        IEnumerable<string> errors,
        ResponseError responseError,
        HttpStatusCode httpStatusCode,
        T? value = default)
    {
        Errors = errors.ToList();
        ResponseError = responseError;
        HttpStatusCode = httpStatusCode;
        Data = value;
    }

    public Response(
        string error,
        ResponseError responseError,
        HttpStatusCode httpStatusCode,
        T? value = default)
    {
        ResponseError = responseError;
        HttpStatusCode = httpStatusCode;
        Data = value;
        AddErrorMessage(error);
    }

    public void AddErrorMessage(string message) => Errors.Add(message);

    public void AddErrorMessages(IEnumerable<string> messages) => Errors.AddRange(messages);
}
