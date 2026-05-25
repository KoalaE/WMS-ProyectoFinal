using Microsoft.EntityFrameworkCore;
using WMS.API_ProyectoFinal.Core.Data;
using WMS.API_ProyectoFinal.Core.Entities;
using WMS.API_ProyectoFinal.Modules.Movimientos.DTOs;
using WMS.API_ProyectoFinal.Modules.Movimientos.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Movimientos.Repositories
{
    public class MovimientoRepository : IMovimientoRepository
    {
        private readonly AppDbContext _context;

        public MovimientoRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<MovimientoDetalleDTO> ObtenerTodos(MovimientoFiltros? filtros = null)
        {
            var query = _context.Movimientos
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .AsQueryable();

            if (filtros != null)
            {
                if (!string.IsNullOrWhiteSpace(filtros.Tipo))
                {
                    query = query.Where(m => m.Tipo == filtros.Tipo);
                }

                if (filtros.ProductoId.HasValue)
                {
                    query = query.Where(m => m.ProductoId == filtros.ProductoId.Value);
                }

                if (filtros.Desde.HasValue)
                {
                    query = query.Where(m => m.Fecha >= filtros.Desde.Value);
                }

                if (filtros.Hasta.HasValue)
                {
                    var hasta = filtros.Hasta.Value.Date.AddDays(1).AddTicks(-1);
                    query = query.Where(m => m.Fecha <= hasta);
                }
            }

            return query
                .OrderByDescending(m => m.Fecha)
                .Select(m => new MovimientoDetalleDTO
                {
                    Id = m.Id,
                    Tipo = m.Tipo,
                    Cantidad = m.Cantidad,
                    Fecha = m.Fecha,
                    ProductoId = m.ProductoId,
                    ProductoNombre = m.Producto.Nombre,
                    ProductoCodigo = m.Producto.Codigo,
                    UsuarioId = m.UsuarioId,
                    UsuarioNombre = m.Usuario.Nombre
                })
                .ToList();
        }

        public MovimientoDetalleDTO? ObtenerPorId(int id)
        {
            var movimiento = _context.Movimientos
                .Include(m => m.Producto)
                .Include(m => m.Usuario)
                .FirstOrDefault(m => m.Id == id);

            return movimiento == null ? null : MapToDetalle(movimiento);
        }

        public MovimientoDetalleDTO? Crear(MovimientoDTO dto)
        {
            var producto = _context.Productos.Find(dto.ProductoId);
            if (producto == null)
            {
                return null;
            }

            if (!EsTipoValido(dto.Tipo))
            {
                return null;
            }

            if (dto.Tipo == "Salida" && dto.Cantidad > producto.Cantidad)
            {
                return null;
            }

            var usuarioId = dto.UsuarioId ?? 1;
            if (!_context.Usuarios.Any(u => u.Id == usuarioId))
            {
                usuarioId = 1;
            }

            AplicarMovimientoEnStock(producto, dto.Tipo, dto.Cantidad);

            var movimiento = new Movimiento
            {
                Tipo = dto.Tipo,
                Cantidad = dto.Cantidad,
                Fecha = DateTime.Now,
                ProductoId = dto.ProductoId,
                UsuarioId = usuarioId
            };

            _context.Movimientos.Add(movimiento);
            _context.SaveChanges();

            return ObtenerPorId(movimiento.Id);
        }

        public MovimientoDetalleDTO? Actualizar(int id, MovimientoDTO dto)
        {
            var movimiento = _context.Movimientos
                .Include(m => m.Producto)
                .FirstOrDefault(m => m.Id == id);

            if (movimiento == null || !EsTipoValido(dto.Tipo))
            {
                return null;
            }

            var productoDestino = _context.Productos.Find(dto.ProductoId);
            if (productoDestino == null)
            {
                return null;
            }

            RevertirMovimientoEnStock(movimiento.Producto, movimiento.Tipo, movimiento.Cantidad);

            if (dto.Tipo == "Salida" && dto.Cantidad > productoDestino.Cantidad)
            {
                AplicarMovimientoEnStock(movimiento.Producto, movimiento.Tipo, movimiento.Cantidad);
                _context.SaveChanges();
                return null;
            }

            AplicarMovimientoEnStock(productoDestino, dto.Tipo, dto.Cantidad);

            movimiento.Tipo = dto.Tipo;
            movimiento.Cantidad = dto.Cantidad;
            movimiento.ProductoId = dto.ProductoId;
            movimiento.Fecha = DateTime.Now;

            if (dto.UsuarioId.HasValue && _context.Usuarios.Any(u => u.Id == dto.UsuarioId.Value))
            {
                movimiento.UsuarioId = dto.UsuarioId.Value;
            }

            _context.SaveChanges();

            return ObtenerPorId(id);
        }

        public bool Eliminar(int id)
        {
            var movimiento = _context.Movimientos
                .Include(m => m.Producto)
                .FirstOrDefault(m => m.Id == id);

            if (movimiento == null)
            {
                return false;
            }

            RevertirMovimientoEnStock(movimiento.Producto, movimiento.Tipo, movimiento.Cantidad);

            if (movimiento.Producto.Cantidad < 0)
            {
                AplicarMovimientoEnStock(movimiento.Producto, movimiento.Tipo, movimiento.Cantidad);
                _context.SaveChanges();
                return false;
            }

            _context.Movimientos.Remove(movimiento);
            _context.SaveChanges();

            return true;
        }

        private static bool EsTipoValido(string tipo) =>
            tipo is "Entrada" or "Salida";

        private static void AplicarMovimientoEnStock(Producto producto, string tipo, int cantidad)
        {
            if (tipo == "Entrada")
            {
                producto.Cantidad += cantidad;
            }
            else
            {
                producto.Cantidad -= cantidad;
            }
        }

        private static void RevertirMovimientoEnStock(Producto producto, string tipo, int cantidad)
        {
            if (tipo == "Entrada")
            {
                producto.Cantidad -= cantidad;
            }
            else
            {
                producto.Cantidad += cantidad;
            }
        }

        private static MovimientoDetalleDTO MapToDetalle(Movimiento m) => new()
        {
            Id = m.Id,
            Tipo = m.Tipo,
            Cantidad = m.Cantidad,
            Fecha = m.Fecha,
            ProductoId = m.ProductoId,
            ProductoNombre = m.Producto.Nombre,
            ProductoCodigo = m.Producto.Codigo,
            UsuarioId = m.UsuarioId,
            UsuarioNombre = m.Usuario.Nombre
        };
    }
}
