namespace Playmate.Social.Infrastructure.Identity.Entities
{
    public class RefreshToken
    {
        public string Token { get; set; }
        public string JwtId { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}