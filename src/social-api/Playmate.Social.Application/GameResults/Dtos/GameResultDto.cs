namespace Playmate.Social.Application.GameResults.Dtos;

public class GameResultDto
{
    public Guid Id { get; set; }
    public DateTimeOffset Date { get; set; }
    public Guid WinnerId { get; set; }
    public Guid LoserId { get; set; }
}
