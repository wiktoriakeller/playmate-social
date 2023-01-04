namespace Playmate.Social.Domain.Entities;

public class Friend
{
    public Guid Id { get; set; }
    public User Requester { get; set; }
    public Guid RequesterId { get; set; }
    public User Addressee { get; set; }
    public Guid AddresseeId { get; set; }
    public DateTimeOffset FriendsSince { get; set; }
}
