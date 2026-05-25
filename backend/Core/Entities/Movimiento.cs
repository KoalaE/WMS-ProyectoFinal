using System.ComponentModel.DataAnnotations;

namespace WMS.API_ProyectoFinal.Core.Entities
{
    public class Movimiento
    {
        public int Id { get; set; }

        [Required]
        public string Tipo { get; set; } = string.Empty;

        [Range(1, 99999)]
        public int Cantidad { get; set; }

        public DateTime Fecha { get; set; }

        public int ProductoId { get; set; }
        public Producto Producto { get; set; } = null!;

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; } = null!;
    }
}
