using System.ComponentModel.DataAnnotations;

namespace WMS.API_ProyectoFinal.Modules.Movimientos.DTOs
{
    public class MovimientoDTO
    {
        [Required]
        public int ProductoId { get; set; }

        [Required]
        [RegularExpression("^(Entrada|Salida)$", ErrorMessage = "El tipo debe ser Entrada o Salida")]
        public string Tipo { get; set; } = string.Empty;

        [Range(1, 99999, ErrorMessage = "La cantidad debe ser mayor a cero")]
        public int Cantidad { get; set; }

        public int? UsuarioId { get; set; }
    }
}
