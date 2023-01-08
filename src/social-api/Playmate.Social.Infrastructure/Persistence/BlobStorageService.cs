using Azure.Storage.Blobs;
using Microsoft.Extensions.Options;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Infrastructure.Common.Configurations;

namespace Playmate.Social.Infrastructure.Persistence;

public class BlobStorageService : IFileStorageService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly BlobStorageConfiguration _blobStorageConfiguration;

    public BlobStorageService(BlobServiceClient blobServiceClient, IOptions<BlobStorageConfiguration> blobStorageConfiguration)
    {
        _blobServiceClient = blobServiceClient;
        _blobStorageConfiguration = blobStorageConfiguration.Value;
    }

    public async Task<string> UploadUserAvatarAsync(FileDto file) => await UploadFile(file, _blobStorageConfiguration.UsersAvatarsContainerName);

    public async Task DeleteUserAvatarAsync(string fileName) => await DeleteFile(fileName, _blobStorageConfiguration.UsersAvatarsContainerName);

    public async Task<string> UploadGameAvatarAsync(FileDto file) => await UploadFile(file, _blobStorageConfiguration.GamesAvatarsContainerName);

    private async Task<string> UploadFile(FileDto file, string blobContainerName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(blobContainerName);
        var blobClient = containerClient.GetBlobClient(file.Name);
        await blobClient.UploadAsync(file.Content);
        return blobClient.Uri.ToString();
    }

    private async Task DeleteFile(string fileName, string blobContainerName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(blobContainerName);
        var blobClient = containerClient.GetBlobClient(fileName);
        await blobClient.DeleteIfExistsAsync(Azure.Storage.Blobs.Models.DeleteSnapshotsOption.IncludeSnapshots);
    }
}
