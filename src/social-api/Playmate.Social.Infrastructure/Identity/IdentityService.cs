using AutoMapper;
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
using Playmate.Social.Infrastructure.Identity.Interfaces;
using System.Security.Cryptography;

namespace Playmate.Social.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IRepository<RefreshToken> _refreshTokenRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IMapper _mapper;
    private readonly JwtOptions _jwtOptions;

    public IdentityService(
        IJwtTokenService jwtTokenService,
        IRepository<RefreshToken> refreshTokenRepository,
        IOptions<JwtOptions> jwtOptions,
        IMapper mapper,
        IRepository<User> userRepository,
        IPasswordHasher<User> passwordHasher)
    {
        _jwtTokenService = jwtTokenService;
        _refreshTokenRepository = refreshTokenRepository;
        _mapper = mapper;
        _jwtOptions = jwtOptions.Value;
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public Task<Response<User>> GetUserByEmail(string email)
    {
        var user = _userRepository.GetWhere(u => u.Email == email).FirstOrDefault();

        if (user == null)
        {
            return Task.FromResult(ResponseResult.NotFound<User>(ErrorMessages.Identity.UserNotFound));
        }

        return Task.FromResult(ResponseResult.Ok(user));
    }

    public Response<User> GetUserByJwtToken(string jwtToken)
    {
        var result = _jwtTokenService.IsJwtTokenValid(jwtToken, true);

        if (!result.success)
        {
            return ResponseResult.Unauthorized<User>(ErrorMessages.Identity.InvalidToken);
        }

        var user = _userRepository.GetWhere(u => u.Id.ToString() == result.userId).FirstOrDefault();

        if (user == null)
        {
            return ResponseResult.NotFound<User>(ErrorMessages.Identity.UserNotFound);
        }

        return ResponseResult.Ok(user);
    }

    public async Task<Response<CreateUserResponse>> CreateUserAsync(CreateUserCommand createUserCommand)
    {
        var newUser = new User
        {
            Email = createUserCommand.Email,
            Username = createUserCommand.UserName
        };

        var hashedPassword = _passwordHasher.HashPassword(newUser, createUserCommand.Password);
        newUser.PasswordHash = hashedPassword;

        await _userRepository.AddAsync(newUser);

        var response = _mapper.Map<CreateUserResponse>(newUser);
        return ResponseResult.Ok(response);
    }

    public async Task<Response<AuthenticateUserResponse>> AuthenticateUserAync(AuthenticateUserCommand authenticateUserCommand)
    {
        var user = _userRepository.GetWhere(u => u.Email == authenticateUserCommand.Email).FirstOrDefault();

        if (user == null)
        {
            return ResponseResult.ValidationError<AuthenticateUserResponse>(ErrorMessages.Identity.IncorrectCredentials);
        }

        var passwordVerification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, authenticateUserCommand.Password);

        if (passwordVerification == PasswordVerificationResult.Failed)
        {
            return ResponseResult.ValidationError<AuthenticateUserResponse>(ErrorMessages.Identity.IncorrectCredentials);
        }

        var newJwt = _jwtTokenService.CreateJwtToken(user);
        var newRefreshToken = await CreateRefreshToken(newJwt.Jti, user);

        var response = new AuthenticateUserResponse
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
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

        var user = _userRepository.GetWhere(u => u.Id.ToString() == result.userId).FirstOrDefault();
        var newJwt = _jwtTokenService.CreateJwtToken(user);
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
        var tokenIsUsed = _userRepository.GetWhere(u => u.RefreshToken != null && u.RefreshToken.Token == token).Any();

        if (tokenIsUsed)
        {
            return GetUniqueToken();
        }

        return token;
    }
}
