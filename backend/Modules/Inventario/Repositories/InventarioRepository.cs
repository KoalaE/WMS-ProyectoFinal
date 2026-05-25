using WMS.API_ProyectoFinal.Core.Data;
using WMS.API_ProyectoFinal.Core.Entities;
using WMS.API_ProyectoFinal.Modules.Inventario.DTOs;
using WMS.API_ProyectoFinal.Modules.Inventario.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Inventario.Repositories
{
    public class InventarioRepository : IInventarioRepository
    {
        private readonly AppDbContext _context;

        public InventarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Producto> ObtenerStock(string? nombre, string? codigo)
        {
            var query = _context.Productos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(nombre))
            {
                query = query.Where(p => p.Nombre.Contains(nombre));
            }

            if (!string.IsNullOrWhiteSpace(codigo))
            {
                query = query.Where(p => p.Codigo.Contains(codigo));
            }

            return query.OrderBy(p => p.Nombre).ToList();
        }

        public InventarioReporteDTO ObtenerReporte(string? nombre, string? codigo)
        {
            var productos = ObtenerStock(nombre, codigo);

            return new InventarioReporteDTO
            {
                Productos = productos,
                TotalProductos = productos.Count,
                TotalUnidades = productos.Sum(p => p.Cantidad),
                ProductosSinStock = productos.Count(p => p.Cantidad == 0)
            };
        }
    }
}
