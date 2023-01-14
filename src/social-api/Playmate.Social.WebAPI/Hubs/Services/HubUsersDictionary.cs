using System.Collections.Concurrent;
using Playmate.Social.WebAPI.Hubs.Interfaces;

namespace Playmate.Social.WebAPI.Hubs.Services;

public class HubUsersDictionary : IHubUsersDictionary
{
    private readonly ConcurrentDictionary<string, int> _usersDictionary = new();

    public void AddUserConnection(string userId)
    {
        _usersDictionary.AddOrUpdate(userId, 1, (key, oldValue) => oldValue + 1);
    }

    public void RemoveUserConnection(string userId)
    {
        var newValue = _usersDictionary.AddOrUpdate(userId, 0, (key, oldValue) =>
        {
            if (oldValue > 0)
            {
                return oldValue - 1;
            }

            return 0;
        });

        if (newValue == 0)
        {
            _usersDictionary.TryRemove(new KeyValuePair<string, int>(userId, newValue));
        }
    }

    public int GetConnectionsCountByUserId(string userId)
    {
        var found = _usersDictionary.TryGetValue(userId, out int count);

        if (found)
        {
            return count;
        }

        return 0;
    }

    public IEnumerable<string> GetConnectedUsers() =>
        _usersDictionary
        .Where(x => x.Value > 0)
        .Select(x => x.Key)
        .ToList();
}
