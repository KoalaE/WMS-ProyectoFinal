using WMS.API_ProyectoFinal.Core.Entities;

namespace WMS.API_ProyectoFinal.Modules.Productos.Interfaces
{
    public interface IProductoRepository
    {
        List<Producto> ObtenerTodos();

        Producto? ObtenerPorId(int id);

        Producto? Crear(Producto producto);

        bool ExisteCodigo(string codigo, int? excluirId = null);

        Producto? Actualizar(int id, Producto producto);

        bool Eliminar(int id);
    }
}
