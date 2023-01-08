namespace Playmate.Social.Domain.Entities;

public class GameResult
{
    public Guid Id { get; set; }
    public Guid GameId { get; set; }
    public Game Game { get; set; }
    public DateTimeOffset Date { get; set; }
    public Guid WinnerId { get; set; }
    public User Winner { get; set; }
    public Guid LoserId { get; set; }
    public User Loser { get; set; }
}
