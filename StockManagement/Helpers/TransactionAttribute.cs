using Microsoft.AspNetCore.Mvc.Filters;
using System.Transactions;

namespace StockManagement.Helpers
{
    public class TransactionAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            TransactionOptions transactionOptions = new TransactionOptions
            {
                Timeout = TransactionManager.MaximumTimeout
            };
            using(TransactionScope transactionScope= new TransactionScope(TransactionScopeOption.Required,transactionOptions,TransactionScopeAsyncFlowOption.Enabled))
            {
                ActionExecutedContext actionExecutedContext=await next();
                if(actionExecutedContext != null)
                {
                    transactionScope.Complete();
                }
            }
        }
    }
}
