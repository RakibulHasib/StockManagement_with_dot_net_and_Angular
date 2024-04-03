using StockManagement.Models;

namespace StockManagement.Model
{
    public class ApiResult : IApiResult
    {
        public int StatusCode { get; set; }
        public List<string> Message { get; set; } = new();

        public static IApiResult Success(string message = "") =>
            new ApiResult { StatusCode = 200, Message = new List<string> { message } };

        public static async Task<IApiResult> SuccessAsync(string message = "") =>
            await Task.FromResult(new ApiResult { StatusCode = 200, Message = new List<string> { message } });

        public static IApiResult NoContent() =>
            new ApiResult { StatusCode = 204 };

        public static IApiResult Fail(string message = "") =>
            new ApiResult { StatusCode = 400, Message = new List<string> { message } };

        public static async Task<IApiResult> FailAsync(string message = "") =>
            await Task.FromResult(new ApiResult { StatusCode = 400, Message = new List<string> { message } });

        public static IApiResult Fail(List<string> message) =>
            new ApiResult { StatusCode = 400, Message = message };

        public static async Task<IApiResult> FailAsync(List<string> message) =>
            await Task.FromResult(new ApiResult { StatusCode = 400, Message = message });

        public static IApiResult NotFound(string message = "") =>
            new ApiResult { StatusCode = 404, Message = new List<string> { message } };

        public static IApiResult ValidationError(List<string> message) =>
            new ApiResult { StatusCode = 409, Message = message };

        public static IApiResult ServerError(string message = "") =>
            new ApiResult { StatusCode = 500, Message = new List<string> { message } };

        public static IApiResult Unauthorized(string message = "") =>
            new ApiResult { StatusCode = 401, Message = new List<string> { message } };

        public static IApiResult Forbidden(string message = "") =>
            new ApiResult { StatusCode = 403, Message = new List<string> { message } };
    }
}
