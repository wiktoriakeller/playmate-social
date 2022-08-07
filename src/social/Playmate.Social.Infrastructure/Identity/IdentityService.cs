using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Playmate.Social.Infrastructure.Identity.Entities;
using Playmate.Social.Infrastructure.Interfaces;
using Playmate.Social.Infrastructure.Constants;
using Playmate.Social.Application.Dtos.Responses;
using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Contracts.Identity;
using Playmate.Social.Application.Contracts.DataAccess;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtService _jwtService;
        private readonly IRepository<RefreshToken> _refreshTokenRepository;
        private readonly JwtOptions _jwtOptions;

        public IdentityService(UserManager<ApplicationUser> userManager,
            IJwtService jwtService,
            IRepository<RefreshToken> refreshTokenRepository,
            IOptions<JwtOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _refreshTokenRepository = refreshTokenRepository;
            _jwtOptions = jwtOptions.Value;
        }

        public async Task<Response<CreateUserResponse>> CreateUserAsync(CreateUserCommand createUserCommand)
        {
            var newUser = new ApplicationUser
            {
                Email = createUserCommand.Email,
                UserName = createUserCommand.Email,
                FirstName = createUserCommand.FirstName,
                LastName = createUserCommand.LastName
            };

            var result = await _userManager.CreateAsync(newUser, createUserCommand.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                var errorResponse = new Response<CreateUserResponse>(false);
                errorResponse.AddErrorMessage("Identity", errors);
                return errorResponse;
            }

            var response = new CreateUserResponse
            {
                UserId = newUser.Id
            };

            return new Response<CreateUserResponse>(true, response);
        }

        public async Task<Response<AuthenticateUserResponse>> AuthenticateUserAync(AuthenticateUserCommand authenticateUserCommand)
        {
            var errorResponse = new Response<AuthenticateUserResponse>(false);
            var user = await _userManager.FindByEmailAsync(authenticateUserCommand.Email);

            if (user == null)
            {
                errorResponse.AddErrorMessage("Identity", ErrorMessages.Identity.IncorrectCredentials);
                return errorResponse;
            }

            var userPasswordIsValid = await _userManager.CheckPasswordAsync(user, authenticateUserCommand.Password);

            if (!userPasswordIsValid)
            {
                errorResponse.AddErrorMessage("Identity", ErrorMessages.Identity.IncorrectCredentials);
                return errorResponse;
            }

            var (jwtToken, jti) = _jwtService.CreateJwtToken(user);
            var storedRefresh = await _refreshTokenRepository.FirstOrDefaultAsync(t => t.UserId == user.Id);
            var refreshToken = await CreateRefreshToken(jti, user, storedRefresh);

            var response = new AuthenticateUserResponse
            {
                Token = jwtToken,
                RefreshToken = refreshToken
            };

            return new Response<AuthenticateUserResponse>(true, response);
        }

        public async Task<Response<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenCommand refreshTokenCommand)
        {
            var errorResponse = new Response<RefreshTokenResponse>(false);
            var validatedJwt = _jwtService.GetPrincipalFromJwtToken(refreshTokenCommand.Token);

            if (validatedJwt == null)
            {
                errorResponse.AddErrorMessage("Identity", ErrorMessages.Identity.InvalidJwt);
                return errorResponse;
            }

            var jti = validatedJwt.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.Value;
            var userId = validatedJwt.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            if (jti == null || userId == null)
            {
                errorResponse.AddErrorMessage("Identity", ErrorMessages.Identity.InvalidJwt);
                return errorResponse;
            }

            var storedTokens = await _refreshTokenRepository.GetWhereAsync(x => x.Token == refreshTokenCommand.RefreshToken);

            if (storedTokens.Count() != 1)
            {
                errorResponse.AddErrorMessage("Identity", ErrorMessages.Identity.InvalidJwt);
                return errorResponse;
            }

            var storedToken = storedTokens.First();

            if (storedToken.ExpiryDate >= DateTime.UtcNow ||
                storedToken.JwtId != jti)
            {
                errorResponse.AddErrorMessage("Identity", ErrorMessages.Identity.InvalidRefreshToken);
                return errorResponse;
            }

            var user = await _userManager.FindByIdAsync(userId);
            var (jwtToken, newJti) = _jwtService.CreateJwtToken(user);
            var refreshToken = await CreateRefreshToken(newJti, user, storedToken);

            var result = new RefreshTokenResponse
            {
                Token = jwtToken,
                RefreshToken = refreshToken
            };

            return new Response<RefreshTokenResponse>(true, result);
        }

        private async Task<string> CreateRefreshToken(string jti, ApplicationUser user, RefreshToken? storedRefresh = null)
        {
            if (storedRefresh != null)
            {
                await _refreshTokenRepository.DeleteAsync(storedRefresh);
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
}