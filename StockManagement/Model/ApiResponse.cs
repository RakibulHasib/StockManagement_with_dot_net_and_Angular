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
    Success = 1,
    Failed,
    Authorized,
    Unapproved,
    Unauthorized,
    UserNameNotFound,
    WrongPassword,
    Inactive,
    UserExist
}
