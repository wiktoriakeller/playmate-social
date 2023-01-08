namespace Playmate.Social.Infrastructure.Common.Configurations;

public class BlobStorageConfiguration
{
    public static readonly string Section = "BlobStorage";

    public string ConnectionString { get; init; }
    public string UsersAvatarsContainerName { get; init; }
    public string GamesAvatarsContainerName { get; init; }
}
