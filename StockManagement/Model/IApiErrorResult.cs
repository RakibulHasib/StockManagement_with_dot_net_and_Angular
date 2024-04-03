namespace StockManagement.Model
{
    public interface IApiErrorResult
    {
        int StatusCode { get; set; }
        List<string> Message { get; set; }
        string ErrorMessage { get; set; }
        string InnerException { get; set; }
        string Source { get; set; }
        string StackTrace { get; set; }

    }
}
