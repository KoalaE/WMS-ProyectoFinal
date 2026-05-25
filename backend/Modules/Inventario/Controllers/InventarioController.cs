using Microsoft.AspNetCore.Mvc;
using WMS.API_ProyectoFinal.Modules.Inventario.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Inventario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly IInventarioRepository _repository;

        public InventarioController(IInventarioRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("")]
        public IActionResult GetStock(
            [FromQuery] string? nombre,
            [FromQuery] string? codigo)
        {
            return Ok(_repository.ObtenerStock(nombre, codigo));
        }
    }
}
