using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Users.Commands;
using Playmate.Social.Application.Users.Responses;
using System.Security.Cryptography;

namespace Playmate.Social.Application.Users.Handlers;

public class UpdateUserCommandHandler : IHandlerWrapper<UpdateUserCommand, UpdateUserResponse>
{
    private readonly IUsersRepository _usersRepository;
    private readonly IFileStorageService _fileStorageService;
    private readonly ICurrentUserService _currentUserService;

    public UpdateUserCommandHandler(
        IUsersRepository usersRepository,
        IFileStorageService fileStorageService,
        ICurrentUserService currentUserService)
    {
        _usersRepository = usersRepository;
        _fileStorageService = fileStorageService;
        _currentUserService = currentUserService;
    }

    public async Task<Response<UpdateUserResponse>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        if (_currentUserService.CurrentUser.Id != request.UserId)
        {
            return ResponseResult.ValidationError<UpdateUserResponse>("User ID is invalid");
        }

        var userByUsername = await _usersRepository.FirstOrDefaultAsync(x => x.Username == request.Username && x.Id != request.UserId);

        if (userByUsername is not null)
        {
            return ResponseResult.ValidationError<UpdateUserResponse>("User with that username already exists");
        }

        var user = await _usersRepository.GetByIdAsync(request.UserId);

        if (user is null)
        {
            return ResponseResult.ValidationError<UpdateUserResponse>("User was not found");
        }

        user.Username = request.Username;
        var newProfilePictureUrl = user.ProfilePictureUrl;
        var newProfilePictureName = user.ProfilePictureName;
        var fileMetadata = request.FileMetadata;

        if (fileMetadata is not null)
        {
            var randomToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(10));
            newProfilePictureName = $"avatars/{user.Id}/{user.Email}-{randomToken}.jpg";
            newProfilePictureUrl = await _fileStorageService.UploadUserAvatarAsync(new FileDto
            {
                Content = fileMetadata.Content,
                Name = newProfilePictureName
            });

            if (!string.IsNullOrEmpty(user.ProfilePictureUrl) && !string.IsNullOrEmpty(user.ProfilePictureName))
            {
                await _fileStorageService.DeleteUserAvatarAsync(user.ProfilePictureName);
            }
        }

        user.ProfilePictureUrl = newProfilePictureUrl;
        user.ProfilePictureName = newProfilePictureName;

        await _usersRepository.UpdateAsync(user);

        var response = new UpdateUserResponse
        {
            Username = request.Username,
            ProfilePictureUrl = newProfilePictureUrl
        };

        return ResponseResult.Ok(response);
    }
}
