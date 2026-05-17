using WMS.API_ProyectoFinal.Models;

namespace WMS.API_ProyectoFinal.Interfaces
{
    public interface IProductoRepository
    {
        List<Producto> ObtenerTodos();

        Producto? ObtenerPorId(int id);

        Producto Crear(Producto producto);

        Producto? Actualizar(int id, Producto producto);

        bool Eliminar(int id);
    }
}
