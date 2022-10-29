    
namespace Playmate.Social.Application.Friends.Dtos;
public class FriendRequestDto
{
    public Guid RequestId { get; set; }
    public FriendDto From { get; set; }
}
