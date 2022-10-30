namespace Playmate.Social.Domain.Entities;

public class RefreshToken : IEntity
{
    public Guid Id { get; set; }
    public string Token { get; set; }
    public string JwtId { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
}
