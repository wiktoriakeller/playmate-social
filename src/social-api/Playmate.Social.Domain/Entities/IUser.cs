namespace Playmate.Social.Domain.Entities;

public interface IUser : IEntity
{
    string UserName { get; set; }
}
