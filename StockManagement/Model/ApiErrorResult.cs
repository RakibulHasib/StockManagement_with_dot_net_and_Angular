namespace StockManagement.Model
{
    public class ApiErrorResult : IApiErrorResult
    {
        public int StatusCode { get; set; }
        public List<string> Message { get; set; } = new();
        public string InnerException { get; set; }
        public string Source { get; set; }
        public string StackTrace { get; set; }
        public string ErrorMessage { get; set; }

        public static IApiErrorResult RaiseErrorForDeveloper(int statusCode, List<string> message, Exception ex) =>
            new ApiErrorResult
            {
                StatusCode = statusCode,
                Message = message,
                ErrorMessage = ex?.Message,
                InnerException = ex?.InnerException?.Message,
                Source = ex?.Source,
                StackTrace = ex?.StackTrace
            };
    }
}
