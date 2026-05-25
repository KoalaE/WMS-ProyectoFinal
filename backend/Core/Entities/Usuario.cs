using System.ComponentModel.DataAnnotations;

namespace WMS.API_ProyectoFinal.Core.Entities
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public string Correo { get; set; } = string.Empty;

        [Required]
        public string Contrasena { get; set; } = string.Empty;

        [Required]
        public string Rol { get; set; } = string.Empty;

        public ICollection<Movimiento> Movimientos { get; set; } = new List<Movimiento>();
    }
}
