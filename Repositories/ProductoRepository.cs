using WMS.API_ProyectoFinal.Data;
using WMS.API_ProyectoFinal.Interfaces;
using WMS.API_ProyectoFinal.Models;

namespace WMS.API_ProyectoFinal.Repositories
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

        // Crea un producto
        public Producto Crear(Producto producto)
        {
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

            _context.Productos.Remove(producto);
            _context.SaveChanges();

            return true;
        }
    }
}
