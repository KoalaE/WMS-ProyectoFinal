using Microsoft.AspNetCore.Mvc;
using WMS.API_ProyectoFinal.Modules.Inventario.Interfaces;
using WMS.API_ProyectoFinal.Modules.Movimientos.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Reportes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private readonly IInventarioRepository _inventario;
        private readonly IMovimientoRepository _movimientos;

        public ReportesController(
            IInventarioRepository inventario,
            IMovimientoRepository movimientos)
        {
            _inventario = inventario;
            _movimientos = movimientos;
        }

        [HttpGet("inventario")]
        public IActionResult ReporteInventario(
            [FromQuery] string? nombre,
            [FromQuery] string? codigo)
        {
            return Ok(_inventario.ObtenerReporte(nombre, codigo));
        }

        [HttpGet("movimientos")]
        public IActionResult ReporteMovimientos(
            [FromQuery] string? tipo,
            [FromQuery] int? productoId,
            [FromQuery] DateTime? desde,
            [FromQuery] DateTime? hasta)
        {
            var filtros = new MovimientoFiltros
            {
                Tipo = tipo,
                ProductoId = productoId,
                Desde = desde,
                Hasta = hasta
            };

            return Ok(_movimientos.ObtenerTodos(filtros));
        }
    }
}
