using WMS.API_ProyectoFinal.Core.Entities;
using WMS.API_ProyectoFinal.Modules.Inventario.DTOs;

namespace WMS.API_ProyectoFinal.Modules.Inventario.Interfaces
{
    public interface IInventarioRepository
    {
        List<Producto> ObtenerStock(string? nombre, string? codigo);
        InventarioReporteDTO ObtenerReporte(string? nombre, string? codigo);
    }
}
