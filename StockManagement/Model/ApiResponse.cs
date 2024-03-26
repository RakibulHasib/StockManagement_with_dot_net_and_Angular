namespace StockManagement.Model;

public class ApiResponse<T> : ApiResponse
{
    public T? Data { get; set; }
}

public class ApiResponse
{
    public string? Message { get; set; }
    public Status? Status { get; set; }
    public int? StatusCode { get; set; }

}

public enum Status
{
    Approved = 1,
    Unapproved,
    Success,
    Failed,
    Unauthorized


}
