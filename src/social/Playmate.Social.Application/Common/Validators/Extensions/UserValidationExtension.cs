using FluentValidation;
using Playmate.Social.Application.Common.Contracts.Identity;

namespace Playmate.Social.Application.Common.Validators.Extensions;

public static class UserValidationExtension
{
    public static IRuleBuilderOptions<T, string> EmailIsPresent<T>(
        this IRuleBuilder<T, string> ruleBuilder, bool isPresent,
        IIdentityService identityService)
    {
        return ruleBuilder.MustAsync(async (rootObject, email, cancellationToken) =>
        {
            var response = await identityService.GetUserByEmail(email);
            if (isPresent && response.Succeeded || !isPresent && !response.Succeeded)
            {
                return true;
            }

            return false;
        });
    }
}
