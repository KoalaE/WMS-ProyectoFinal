using WMS.API_ProyectoFinal.Core.Data;
using WMS.API_ProyectoFinal.Core.Entities;
using WMS.API_ProyectoFinal.Modules.Productos.Interfaces;

namespace WMS.API_ProyectoFinal.Modules.Productos.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly AppDbContext _context;

        public ProductoRepository(AppDbContext context)
        {
            _context = context;
        }

        // Obtiene todos los productos
        public List<Producto> ObtenerTodos()
        {
            return _context.Productos.ToList();
        }

        // Obtiene un producto por ID
        public Producto? ObtenerPorId(int id)
        {
            return _context.Productos.Find(id);
        }

        public bool ExisteCodigo(string codigo, int? excluirId = null)
        {
            return _context.Productos.Any(p =>
                p.Codigo == codigo && (excluirId == null || p.Id != excluirId));
        }

        // Crea un producto (null si el código ya existe)
        public Producto? Crear(Producto producto)
        {
            if (ExisteCodigo(producto.Codigo))
            {
                return null;
            }

            _context.Productos.Add(producto);
            _context.SaveChanges();

            return producto;
        }

        // Actualiza un producto
        public Producto? Actualizar(int id, Producto productoActualizado)
        {
            var producto = _context.Productos.Find(id);

            if (producto == null)
            {
                return null;
            }

            if (ExisteCodigo(productoActualizado.Codigo, id))
            {
                return null;
            }

            producto.Nombre = productoActualizado.Nombre;
            producto.Codigo = productoActualizado.Codigo;
            producto.Cantidad = productoActualizado.Cantidad;

            _context.SaveChanges();

            return producto;
        }

        // Elimina un producto
        public bool Eliminar(int id)
        {
            var producto = _context.Productos.Find(id);

            if (producto == null)
            {
                return false;
            }

            if (_context.Movimientos.Any(m => m.ProductoId == id))
            {
                return false;
            }

            _context.Productos.Remove(producto);
            _context.SaveChanges();

            return true;
        }
    }
}
