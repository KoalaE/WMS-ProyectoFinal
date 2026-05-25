using Microsoft.AspNetCore.Mvc;
using WMS.API_ProyectoFinal.Modules.Movimientos.DTOs;
using WMS.API_ProyectoFinal.Modules.Movimientos.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Movimientos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovimientosController : ControllerBase
    {
        private readonly IMovimientoRepository _repository;

        public MovimientosController(IMovimientoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("")]
        public IActionResult GetAll(
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

            return Ok(_repository.ObtenerTodos(filtros));
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var movimiento = _repository.ObtenerPorId(id);
            if (movimiento == null)
            {
                return NotFound();
            }

            return Ok(movimiento);
        }

        [HttpPost]
        public IActionResult Post([FromBody] MovimientoDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var creado = _repository.Crear(dto);

            if (creado == null)
            {
                var productoExiste = dto.ProductoId > 0;
                if (productoExiste && dto.Tipo == "Salida")
                {
                    return BadRequest(new { mensaje = "Stock insuficiente o datos inválidos." });
                }

                return BadRequest(new { mensaje = "No se pudo registrar el movimiento." });
            }

            return Ok(new { mensaje = "Movimiento registrado correctamente.", movimiento = creado });
        }

        [HttpPut("{id:int}")]
        public IActionResult Put(int id, [FromBody] MovimientoDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actualizado = _repository.Actualizar(id, dto);

            if (actualizado == null)
            {
                var existe = _repository.ObtenerPorId(id) != null;
                if (existe)
                {
                    return BadRequest(new { mensaje = "Stock insuficiente o datos inválidos." });
                }

                return NotFound();
            }

            return Ok(new { mensaje = "Movimiento actualizado correctamente.", movimiento = actualizado });
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var eliminado = _repository.Eliminar(id);

            if (!eliminado)
            {
                var existe = _repository.ObtenerPorId(id) != null;
                if (existe)
                {
                    return BadRequest(new { mensaje = "No se puede eliminar: dejaría stock negativo." });
                }

                return NotFound();
            }

            return Ok(new { mensaje = "Movimiento eliminado correctamente." });
        }
    }
}
