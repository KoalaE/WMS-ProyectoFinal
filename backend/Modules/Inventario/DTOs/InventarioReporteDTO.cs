using WMS.API_ProyectoFinal.Core.Entities;

namespace WMS.API_ProyectoFinal.Modules.Inventario.DTOs
{
    public class InventarioReporteDTO
    {
        public List<Producto> Productos { get; set; } = new();
        public int TotalProductos { get; set; }
        public int TotalUnidades { get; set; }
        public int ProductosSinStock { get; set; }
    }
}
