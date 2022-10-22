using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Common.BaseResponse;

namespace Playmate.Social.WebAPI.Controllers;

[ApiController]
public class BaseApiController : ControllerBase
{
    protected readonly IMediator _medaitor;
    protected readonly IMapper _mapper;

    public BaseApiController(IMediator mediator, IMapper mapper)
    {
        _medaitor = mediator;
        _mapper = mapper;
    }

    protected IActionResult GetStatusCode(IResponse response) => StatusCode((int)response.HttpStatusCode, response);
}
