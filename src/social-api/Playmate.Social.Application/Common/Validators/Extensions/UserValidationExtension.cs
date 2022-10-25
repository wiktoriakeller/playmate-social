using FluentValidation;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Validators.Extensions;

public static class UserValidationExtension
{
    public static IRuleBuilderOptions<T, string> UserWithEmailShouldExist<T>(
        this IRuleBuilder<T, string> ruleBuilder, 
        bool shouldExist,
        IIdentityService identityService)
    {
        return ruleBuilder.MustAsync(async (rootObject, email, cancellationToken) =>
        {
            var response = await identityService.GetUserByEmail(email);
            if (shouldExist && response.Succeeded || !shouldExist && !response.Succeeded)
            {
                return true;
            }

            return false;
        });
    }

    public static IRuleBuilderOptions<T, string> UserWithUsernameShouldExist<T>(
        this IRuleBuilder<T, string> ruleBuilder,
        bool shouldExist,
        IRepository<User> repository)
    {
        return ruleBuilder.Must((rootObject, username, cancellationToken) =>
        {
            var user = repository.GetWhere(u => u.Username == username);
            if (shouldExist && user != null || !shouldExist && user == null)
            {
                return true;
            }

            return false;
        });
    }
}
