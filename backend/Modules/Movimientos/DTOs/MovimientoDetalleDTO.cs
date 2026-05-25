namespace WMS.API_ProyectoFinal.Modules.Movimientos.DTOs
{
    public class MovimientoDetalleDTO
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public int Cantidad { get; set; }
        public DateTime Fecha { get; set; }
        public int ProductoId { get; set; }
        public string ProductoNombre { get; set; } = string.Empty;
        public string ProductoCodigo { get; set; } = string.Empty;
        public int UsuarioId { get; set; }
        public string UsuarioNombre { get; set; } = string.Empty;
    }
}
