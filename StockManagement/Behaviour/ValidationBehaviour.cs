using FluentValidation;
using MediatR;

namespace StockManagement.Behaviour;

public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;
    private readonly IHttpContextAccessor _hr;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators, IHttpContextAccessor hr )
    {
        _validators = validators;
        _hr = hr;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if(_validators.Any() && ((_hr.HttpContext?.Request.Method ?? string.Empty) == HttpMethods.Post || (_hr.HttpContext?.Request.Method ?? string.Empty) == HttpMethods.Put))
        {
            var context = new ValidationContext<TRequest>(request);
            var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
            var failures= validationResults.SelectMany(r=>r.Errors).Where(f=>f!=null).ToList();
            if(failures.Count!=0)
            {
                List<string> errorsMessage = new List<string>();
                foreach (var error in failures)
                {
                    errorsMessage.Add($"Property: {error.PropertyName}, Error: {error.ErrorMessage}");
                }
                TResponse validationResponse = CreateValidationResponse(errorsMessage);
                return validationResponse;

            }
           
        }
        return await next();
    }
    private TResponse CreateValidationResponse(List<string> errors)
    {
        return (TResponse)Convert.ChangeType(new ValidationResponse { Errors = errors }, typeof(TResponse));
    }
}
public class ValidationResponse
{
    public List<string>? Errors { get; set; }
}

