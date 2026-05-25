using Microsoft.AspNetCore.Mvc;
using WMS.API_ProyectoFinal.Core.Entities;
using WMS.API_ProyectoFinal.Modules.Productos.DTOs;
using WMS.API_ProyectoFinal.Modules.Productos.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Productos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        // Repository utilizado para acceder a los datos
        private readonly IProductoRepository _repository;

        public ProductosController(IProductoRepository repository)
        {
            _repository = repository;
        }

        // GET api/Productos — listar todos (debe ir antes de {id})
        [HttpGet("")]
        public IActionResult GetAll()
        {
            return Ok(_repository.ObtenerTodos());
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var producto = _repository.ObtenerPorId(id);

            if (producto == null)
            {
                return NotFound();
            }

            return Ok(producto);
        }

        // Agrega un nuevo producto
        [HttpPost]
        public IActionResult Post([FromBody] ProductoDTO productoDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producto = new Producto
            {
                Nombre = productoDTO.Nombre,
                Codigo = productoDTO.Codigo,
                Cantidad = productoDTO.Cantidad
            };

            var creado = _repository.Crear(producto);

            if (creado == null)
            {
                return Conflict(new { mensaje = "Ya existe un producto con ese código." });
            }

            return Ok(new { mensaje = "Producto guardado correctamente.", producto = creado });
        }

        // Actualiza un producto existente
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProductoDTO productoDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producto = new Producto
            {
                Nombre = productoDTO.Nombre,
                Codigo = productoDTO.Codigo,
                Cantidad = productoDTO.Cantidad
            };

            var actualizado = _repository.Actualizar(id, producto);

            if (actualizado == null)
            {
                var existe = _repository.ObtenerPorId(id) != null;
                if (existe)
                {
                    return Conflict(new { mensaje = "Ya existe un producto con ese código." });
                }

                return NotFound();
            }

            return Ok(new { mensaje = "Producto actualizado correctamente.", producto = actualizado });
        }

        // Elimina un producto
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var eliminado = _repository.Eliminar(id);

            if (!eliminado)
            {
                var existe = _repository.ObtenerPorId(id) != null;
                if (existe)
                {
                    return BadRequest(new { mensaje = "No se puede eliminar: el producto tiene movimientos registrados." });
                }

                return NotFound();
            }

            return Ok(new { mensaje = "Producto eliminado correctamente." });
        }
    }
}
