﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Constants;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Configuration;
using Playmate.Social.Infrastructure.Identity.Entities;
using Playmate.Social.Infrastructure.Identity.Interfaces;
using System.Security.Cryptography;

namespace Playmate.Social.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IRepository<RefreshToken> _refreshTokenRepository;
    private readonly IMapper _mapper;
    private readonly JwtOptions _jwtOptions;

    public IdentityService(
        UserManager<User> userManager,
        IJwtTokenService jwtTokenService,
        IRepository<RefreshToken> refreshTokenRepository,
        IOptions<JwtOptions> jwtOptions,
        IMapper mapper)
    {
        _userManager = userManager;
        _jwtTokenService = jwtTokenService;
        _refreshTokenRepository = refreshTokenRepository;
        _mapper = mapper;
        _jwtOptions = jwtOptions.Value;
    }

    public async Task<Response<IUser>> GetUserByEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return ResponseResult.NotFound<IUser>(ErrorMessages.Identity.UserNotFound);
        }

        return ResponseResult.Ok<IUser>(user);
    }

    public async Task<Response<IUser>> GetUserByJwtTokenAsync(string jwtToken)
    {
        var result = _jwtTokenService.IsJwtTokenValid(jwtToken, true);

        if (!result.success)
        {
            return ResponseResult.Unauthorized<IUser>(ErrorMessages.Identity.InvalidToken);
        }

        var user = await _userManager.FindByIdAsync(result.userId);

        if (user == null)
        {
            return ResponseResult.NotFound<IUser>(ErrorMessages.Identity.UserNotFound);
        }

        return ResponseResult.Ok<IUser>(user);
    }

    public async Task<Response<CreateUserResponse>> CreateUserAsync(CreateUserCommand createUserCommand)
    {
        var newUser = new User
        {
            Email = createUserCommand.Email,
            UserName = createUserCommand.UserName
        };

        var result = await _userManager.CreateAsync(newUser, createUserCommand.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            return ResponseResult.ValidationError<CreateUserResponse>(errors);
        }

        var response = _mapper.Map<CreateUserResponse>(newUser);
        return ResponseResult.Ok(response);
    }

    public async Task<Response<AuthenticateUserResponse>> AuthenticateUserAync(AuthenticateUserCommand authenticateUserCommand)
    {
        var user = await _userManager.FindByEmailAsync(authenticateUserCommand.Email);

        if (user == null)
        {
            return ResponseResult.ValidationError<AuthenticateUserResponse>(ErrorMessages.Identity.IncorrectCredentials);
        }

        var userPasswordIsValid = await _userManager.CheckPasswordAsync(user, authenticateUserCommand.Password);

        if (!userPasswordIsValid)
        {
            return ResponseResult.ValidationError<AuthenticateUserResponse>(ErrorMessages.Identity.IncorrectCredentials);
        }

        var newJwt = await _jwtTokenService.CreateJwtToken(user);
        var newRefreshToken = await CreateRefreshToken(newJwt.Jti, user);

        var response = new AuthenticateUserResponse
        {
            JwtToken = newJwt.JwtToken,
            RefreshToken = newRefreshToken
        };

        return ResponseResult.Ok(response);
    }

    public async Task<Response<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenCommand refreshTokenCommand)
    {
        var result = _jwtTokenService.IsJwtTokenValid(refreshTokenCommand.JwtToken, false);

        if (!result.success)
        {
            return ResponseResult.Unauthorized<RefreshTokenResponse>(ErrorMessages.Identity.InvalidToken);
        }

        var refreshTokens = _refreshTokenRepository
            .GetWhere(x => x.Token == refreshTokenCommand.RefreshToken)
            .ToList();

        if (refreshTokens.Count != 1)
        {
            return ResponseResult.Unauthorized<RefreshTokenResponse>(ErrorMessages.Identity.InvalidToken);
        }

        var currentRefreshToken = refreshTokens.First();

        if (currentRefreshToken.ExpiryDate >= DateTime.UtcNow || currentRefreshToken.JwtId != result.jti)
        {
            return ResponseResult.Unauthorized<RefreshTokenResponse>(ErrorMessages.Identity.InvalidToken);
        }

        var user = await _userManager.FindByIdAsync(result.userId);
        var newJwt = await _jwtTokenService.CreateJwtToken(user);
        var newRefreshToken = await CreateRefreshToken(newJwt.Jti, user);

        var response = new RefreshTokenResponse
        {
            JwtToken = newJwt.JwtToken,
            RefreshToken = newRefreshToken
        };

        return ResponseResult.Ok(response);
    }

    private async Task<string> CreateRefreshToken(string jti, User user)
    {
        var currentRefresh = await _refreshTokenRepository.FirstOrDefaultAsync(t => t.UserId == user.Id);

        if (currentRefresh != null)
        {
            await _refreshTokenRepository.DeleteAsync(currentRefresh);
        }

        var refreshToken = new RefreshToken
        {
            Token = GetUniqueToken(),
            JwtId = jti,
            CreationDate = DateTime.UtcNow,
            ExpiryDate = DateTime.UtcNow.AddDays(_jwtOptions.RefreshTokenExpirationInDays),
            UserId = user.Id,
            User = user
        };

        await _refreshTokenRepository.AddAsync(refreshToken);
        return refreshToken.Token;
    }

    private string GetUniqueToken()
    {
        var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        var tokenIsUsed = _userManager.Users.Any(u => u.RefreshToken != null && u.RefreshToken.Token == token);

        if (tokenIsUsed)
        {
            return GetUniqueToken();
        }

        return token;
    }
}
