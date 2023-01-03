using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Users.Commands;
using Playmate.Social.Application.Users.Responses;

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

        var userByUsername = await _usersRepository.FirstOrDefaultAsync(x => x.Email == request.Username);

        if (userByUsername is not null)
        {
            return ResponseResult.ValidationError<UpdateUserResponse>("User with that username already exists");
        }

        var user = await _usersRepository.GetByIdAsync(request.UserId);

        if (user == null)
        {
            return ResponseResult.ValidationError<UpdateUserResponse>("User does not exist");
        }

        user.Username = request.Username;
        var newProfilePictureUrl = user.ProfilePictureUrl;

        if (request.Picture is not null)
        {
            var extension = Path.GetExtension(request.PictureName);
            var fileName = $"avatars/{user.Email}{extension}";
            newProfilePictureUrl = await _fileStorageService.UploadUserAvatarAsync(new FileDto
            {
                Content = request.Picture,
                Name = fileName
            });
        }

        user.ProfilePictureUrl = newProfilePictureUrl;
        await _usersRepository.UpdateAsync(user);

        var response = new UpdateUserResponse
        {
            Username = request.Username,
            ProfilePictureUrl = newProfilePictureUrl
        };

        return ResponseResult.Ok(response);
    }
}
