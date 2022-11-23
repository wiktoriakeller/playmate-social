namespace Playmate.Social.Application.GameResults.Dtos;

public class GameResultDto
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public Guid WinnerId { get; set; }
    public Guid LoserId { get; set; }
}
