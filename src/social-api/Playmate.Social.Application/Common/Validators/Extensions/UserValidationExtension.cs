﻿using FluentValidation;
using Playmate.Social.Application.Common.Contracts.Identity;

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
}
