namespace Playmate.Social.Application.Dtos
{
    public class Response<T>
    {
        public T? Value { get; init; }
        public bool Succeeded { get; init; }
        public IDictionary<string, List<string>> Errors { get; set; }

        public Response(bool succeeded, IDictionary<string, List<string>> errors, T? value = default)
        {
            Succeeded = succeeded;
            Errors = errors;
            Value = value;
        }

        public Response(bool succeeded, T? value = default)
        {
            Succeeded = succeeded;
            Errors = new Dictionary<string, List<string>>();
            Value = value;
        }

        public void AddErrorMessage(string errorName, string message)
        {
            if (Errors.ContainsKey(errorName))
            {
                Errors[errorName].Add(message);
            }
            else
            {
                Errors[errorName] = new List<string>() { message };
            }
        }

        public void AddErrorMessage(string errorName, IEnumerable<string> message)
        {
            if (Errors.ContainsKey(errorName))
            {
                Errors[errorName].AddRange(message);
            }
            else
            {
                Errors[errorName] = message.ToList();
            }
        }
    }
}