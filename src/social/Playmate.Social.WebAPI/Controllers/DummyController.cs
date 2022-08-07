using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Playmate.Social.WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/dummy")]
    public class DummyController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetDummyData()
        {
            return Ok(await Task.FromResult("dummy data"));
        }
    }
}