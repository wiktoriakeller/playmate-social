﻿using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Services;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Common.Configurations;
using System.Security.Cryptography;

namespace Playmate.Social.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IRepository<RefreshToken> _refreshTokenRepository;
    private readonly IUsersRepository _usersRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly JwtTokensConfiguration _jwtOptions;

    private const string InvalidToken = "Token is invalid";
    private const string IncorrectCredentials = "Incorrect credentials";
    private const string UserNotFound = "User does not exists";

    public IdentityService(
        IJwtTokenService jwtTokenService,
        IRepository<RefreshToken> refreshTokenRepository,
        IOptions<JwtTokensConfiguration> jwtOptions,
        IUsersRepository userRepository,
        IPasswordHasher<User> passwordHasher,
        IDateTimeProvider dateTimeProvider)
    {
        _jwtTokenService = jwtTokenService;
        _refreshTokenRepository = refreshTokenRepository;
        _jwtOptions = jwtOptions.Value;
        _usersRepository = userRepository;
        _passwordHasher = passwordHasher;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<User?> GetUserByJwtToken(string jwtToken)
    {
        var (success, jti, userId) = _jwtTokenService.IsJwtTokenValid(jwtToken, true);

        if (success)
        {
            return await _usersRepository.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        }

        return null;
    }

    public async Task<Guid> CreateUserAsync(CreateUserCommand createUserCommand)
    {
        var newUser = new User
        {
            Email = createUserCommand.Email,
            Username = createUserCommand.Username,
            ProfilePictureUrl = createUserCommand.ProfilePictureUrl,
            ProfilePictureName = createUserCommand.ProfilePictureName,
            IsExternalUser = createUserCommand.IsExternalUser
        };

        var hashedPassword = _passwordHasher.HashPassword(newUser, createUserCommand.Password);
        newUser.PasswordHash = hashedPassword;

        await _usersRepository.AddAsync(newUser);
        return newUser.Id;
    }

    public async Task<Response<AuthenticateUserResponse>> AuthenticateUserAync(AuthenticateUserCommand authenticateUserCommand)
    {
        var user = await _usersRepository.FirstOrDefaultAsync(u => u.Email == authenticateUserCommand.Email);
        if (user is null)
        {
            return ResponseResult.ValidationError<AuthenticateUserResponse>(IncorrectCredentials);
        }

        var passwordVerification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, authenticateUserCommand.Password);
        if (passwordVerification == PasswordVerificationResult.Failed)
        {
            return ResponseResult.ValidationError<AuthenticateUserResponse>(IncorrectCredentials);
        }

        var newJwt = _jwtTokenService.CreateJwtToken(user);
        var newRefreshToken = await CreateRefreshToken(newJwt.Jti, user);

        var response = new AuthenticateUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            ProfilePictureUrl = user.ProfilePictureUrl,
            JwtToken = newJwt.Token,
            RefreshToken = newRefreshToken
        };

        return ResponseResult.Ok(response);
    }

    public async Task<Response<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenCommand refreshTokenCommand)
    {
        var result = _jwtTokenService.IsJwtTokenValid(refreshTokenCommand.JwtToken, false);
        if (!result.success)
        {
            return ResponseResult.Unauthorized<RefreshTokenResponse>(InvalidToken);
        }

        var refreshTokens = _refreshTokenRepository.GetWhere(x => x.Token == refreshTokenCommand.RefreshToken).ToList();
        if (refreshTokens.Count != 1)
        {
            return ResponseResult.Unauthorized<RefreshTokenResponse>(InvalidToken);
        }

        var currentRefreshToken = refreshTokens.First();
        if (currentRefreshToken.ExpiryDate < DateTime.UtcNow || currentRefreshToken.JwtId != result.jti)
        {
            return ResponseResult.Unauthorized<RefreshTokenResponse>(InvalidToken);
        }

        var user = await _usersRepository.FirstOrDefaultAsync(u => u.Id.ToString() == result.userId);
        if(user is null)
        {
            return ResponseResult.ValidationError<RefreshTokenResponse>(UserNotFound);
        }
        
        var newJwt = _jwtTokenService.CreateJwtToken(user);
        var newRefreshToken = await CreateRefreshToken(newJwt.Jti, user);

        var response = new RefreshTokenResponse
        {
            JwtToken = newJwt.Token,
            RefreshToken = newRefreshToken
        };

        return ResponseResult.Ok(response);
    }

    public async Task<string> CreateRefreshToken(string jti, User user)
    {
        var currentRefresh = await _refreshTokenRepository.FirstOrDefaultAsync(t => t.UserId == user.Id);
        if (currentRefresh is not null)
        {
            await _refreshTokenRepository.DeleteAsync(currentRefresh);
        }

        var refreshToken = new RefreshToken
        {
            Token = GetUniqueToken(),
            JwtId = jti,
            CreationDate = _dateTimeProvider.CurrentTimeUtc,
            ExpiryDate = _dateTimeProvider.CurrentTimeUtc.AddDays(_jwtOptions.RefreshTokenExpirationInDays),
            UserId = user.Id,
            User = user
        };

        await _refreshTokenRepository.AddAsync(refreshToken);
        return refreshToken.Token;
    }

    private string GetUniqueToken()
    {
        var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        var tokenIsUsed = _usersRepository.GetWhere(u => u.RefreshToken != null && u.RefreshToken.Token == token).Any();

        if (tokenIsUsed)
        {
            return GetUniqueToken();
        }

        return token;
    }
}
