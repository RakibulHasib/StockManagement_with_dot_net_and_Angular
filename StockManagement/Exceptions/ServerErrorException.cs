namespace StockManagement.Exceptions
{
    public class ServerErrorException : Exception
    {
        public List<string> Errors { get; } = new();

        public HttpStatusCode StatusCode { get; }

        public ServerErrorException(string message, List<string> errors = default, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
            : base(message)
        {
            Errors = errors;
            StatusCode = statusCode;
        }
    }
}
