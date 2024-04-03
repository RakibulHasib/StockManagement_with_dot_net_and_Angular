using Serilog;
using StockManagement.Exceptions;
using StockManagement.Models;
using ValidationException = StockManagement.Exceptions.ValidationException;

namespace StockManagement.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _environment;

        public ExceptionHandlerMiddleware(RequestDelegate next, IHostEnvironment environment)
        {
            _next = next;
            _environment = environment;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "{errorMessage}", ex.Message);
                var response = context.Response;
                response.ContentType = "application/json";

                IApiResult result;

                switch (ex)
                {
                    case ValidationException e:
                        result = ApiResult.ValidationError(e.Errors);
                        break;
                    case NotFoundException e:
                        result = ApiResult.NotFound(e.Error);
                        break;
                    case UnauthorizedException e:
                        result = ApiResult.Unauthorized();
                        break;
                    case ServerErrorException e:
                        result = ApiResult.ServerError();
                        break;
                    default:
                        result = ApiResult.ServerError();
                        break;
                }

                if (_environment.IsProduction())
                {
                    response.StatusCode = result.StatusCode;
                    await response.WriteAsJsonAsync(result);
                    await response.CompleteAsync();
                }
                else
                {
                    var res = ApiErrorResult.RaiseErrorForDeveloper(result.StatusCode, result.Message, ex);
                    response.StatusCode = res.StatusCode;
                    await response.WriteAsJsonAsync(res);
                    await response.CompleteAsync();
                }
            }
        }
    }
}
