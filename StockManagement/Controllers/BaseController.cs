using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : ControllerBase
    {
        private IMediator _mediatR;
        protected IMediator _mediator => _mediatR ??= HttpContext.RequestServices.GetService<IMediator>()!;
    }
}
