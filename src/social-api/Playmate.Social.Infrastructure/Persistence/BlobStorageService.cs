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

    public async Task<string> UploadUserAvatarAsync(FileDto file)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(_blobStorageConfiguration.UsersAvatarsContainerName);
        var blobClient = containerClient.GetBlobClient(file.Name);
        await blobClient.UploadAsync(file.Content, true);
        return blobClient.Uri.ToString();
    }
}
