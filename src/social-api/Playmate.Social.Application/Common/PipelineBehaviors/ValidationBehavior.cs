using FluentValidation;
using MediatR;
using Playmate.Social.Application.Common.BaseResponse;
using System.Net;

namespace Playmate.Social.Application.Common.PipelineBehaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (_validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);
            var validationTasks = _validators.Select(x => x.ValidateAsync(request));

            var results = await Task.WhenAll(validationTasks);
            var errors = results
                .SelectMany(x => x.Errors)
                .Where(x => x != null);

            var notFound = errors.FirstOrDefault(x => x.ErrorCode == ResponseError.NotFound.ToString());
            if (notFound is not null)
            {
                return (TResponse)Activator.CreateInstance(typeof(TResponse), notFound.ErrorMessage,
                    ResponseError.NotFound, HttpStatusCode.NotFound, default);
            }
            else if (errors.Any())
            {
                var messages = errors.Select(x => x.ErrorMessage);
                return (TResponse)Activator.CreateInstance(typeof(TResponse), messages,
                   ResponseError.ValidationError, HttpStatusCode.BadRequest, default);
            }
        }

        return await next();
    }
}
