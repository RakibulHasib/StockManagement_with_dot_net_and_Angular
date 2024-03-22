namespace StockManagement.Model;

public class ApiResponse<T> : ApiResponse
{
    public T? Data { get; set; }
}

public class ApiResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }
}
