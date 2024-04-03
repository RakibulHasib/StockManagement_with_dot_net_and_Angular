namespace StockManagement.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException()
        {
            Errors = new List<string>();
        }

        public ValidationException(List<string> errors) : base()
        {
            Errors = errors;
        }

        public ValidationException(IEnumerable<FluentValidation.Results.ValidationFailure> failures)
            : this()
        {
            Errors = failures.Select(x => x.ErrorMessage).ToList();
        }
        public List<string> Errors { get; }
    }
}
