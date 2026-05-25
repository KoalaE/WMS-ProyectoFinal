using WMS.API_ProyectoFinal.Modules.Movimientos.DTOs;

namespace WMS.API_ProyectoFinal.Modules.Movimientos.Interfaces
{
    public class MovimientoFiltros
    {
        public string? Tipo { get; set; }
        public int? ProductoId { get; set; }
        public DateTime? Desde { get; set; }
        public DateTime? Hasta { get; set; }
    }

    public interface IMovimientoRepository
    {
        List<MovimientoDetalleDTO> ObtenerTodos(MovimientoFiltros? filtros = null);
        MovimientoDetalleDTO? ObtenerPorId(int id);
        MovimientoDetalleDTO? Crear(MovimientoDTO dto);
        MovimientoDetalleDTO? Actualizar(int id, MovimientoDTO dto);
        bool Eliminar(int id);
    }
}
