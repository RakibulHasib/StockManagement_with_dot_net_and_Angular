namespace StockManagement.Exceptions
{
    public class UnauthorizedException : Exception
    {
        public List<string> Errors { get; } = new();

        public UnauthorizedException(string message = "Unauthorized")
            : base(message)
        {
            Errors = new List<string> { message };
        }
    }
}
