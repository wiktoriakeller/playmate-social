namespace Playmate.Social.Domain.Entities;

public class Game
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ServerUrl { get; set; }
    public string ImageUrl { get; set; }
    public string ImageName { get; set; }
}
