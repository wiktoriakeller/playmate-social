using MediatR;
using Playmate.Social.Application.Common.BaseResponse;

namespace Playmate.Social.Application.Common;

public interface IHandlerWrapper<TRequest, TResponse> : IRequestHandler<TRequest, Response<TResponse>>
    where TRequest : IRequest<Response<TResponse>>
{
}
