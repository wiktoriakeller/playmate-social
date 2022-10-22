namespace Playmate.Social.Application.Common.BaseResponse;

public abstract class Enumeration : IComparable
{
    public int Id { get; private set; }
    public string Name { get; private set; }

    public override string ToString() => Name;

    protected Enumeration(int id, string name) => (Id, Name) = (id, name);

    public override bool Equals(object obj)
    {
        if (obj is not Enumeration otherValue)
        {
            return false;
        }

        var typeMatches = GetType().Equals(obj.GetType());
        var valueMatches = Id.Equals(otherValue.Id);

        return typeMatches && valueMatches;
    }

    public int CompareTo(object other) => Id.CompareTo(((Enumeration)other).Id);
}
