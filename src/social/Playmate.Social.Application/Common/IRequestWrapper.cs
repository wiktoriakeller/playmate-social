using MediatR;
using Playmate.Social.Application.Common.BaseResponse;

namespace Playmate.Social.Application.Common;

public interface IRequestWrapper<T> : IRequest<Response<T>>
{
}
