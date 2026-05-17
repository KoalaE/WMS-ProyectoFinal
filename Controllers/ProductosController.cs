using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WMS.API_ProyectoFinal.Interfaces;
using WMS.API_ProyectoFinal.DTOs;
using WMS.API_ProyectoFinal.Models;

namespace WMS.API_ProyectoFinal.Controllers
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

        // Obtiene todos los productos
        [HttpGet("{id}")]
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

            _repository.Crear(producto);

            return Ok(producto);
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
                return NotFound();
            }

            return Ok(actualizado);
        }

        // Elimina un producto
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var eliminado = _repository.Eliminar(id);

            if (!eliminado)
            {
                return NotFound();
            }

            return Ok("Producto eliminado correctamente");
        }
    }
}
