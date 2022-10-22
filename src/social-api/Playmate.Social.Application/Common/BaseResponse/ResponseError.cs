namespace Playmate.Social.Application.Common.BaseResponse;

public class ResponseError : Enumeration
{
    public static ResponseError None = new(1, nameof(None));
    public static ResponseError AuthorizationError = new(2, nameof(AuthorizationError));
    public static ResponseError Fail = new(3, nameof(Fail));
    public static ResponseError HttpError = new(4, nameof(HttpError));
    public static ResponseError NotFound = new(5, nameof(NotFound));
    public static ResponseError ValidationError = new(6, nameof(ValidationError));

    public ResponseError(int id, string name) : base(id, name)
    {
    }
}
