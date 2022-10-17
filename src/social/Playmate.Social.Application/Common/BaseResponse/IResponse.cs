using System.Net;

namespace Playmate.Social.Application.Common.BaseResponse;

public interface IResponse
{
    bool Succeeded { get; }
    List<string> Errors { get; }
    ResponseError ResponseError { get; }
    HttpStatusCode HttpStatusCode { get; }
    void AddErrorMessage(string message);
    void AddErrorMessages(IEnumerable<string> messages);
}
