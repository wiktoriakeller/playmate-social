namespace Playmate.Social.WebAPI.Hubs.Interfaces;

public interface IHubUsersDictionary
{
    void AddUserConnection(string userId);

    int GetConnectionsCountByUserId(string userId);

    void RemoveUserConnection(string userId);

    IEnumerable<string> GetConnectedUsers();
}
