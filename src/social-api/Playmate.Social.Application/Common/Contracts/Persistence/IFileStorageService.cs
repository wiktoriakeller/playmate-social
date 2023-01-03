using Playmate.Social.Application.Common.Dtos;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IFileStorageService
{
    Task<string> UploadUserAvatarAsync(FileDto file);
}
