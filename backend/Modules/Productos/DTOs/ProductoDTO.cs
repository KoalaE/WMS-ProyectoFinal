using System.ComponentModel.DataAnnotations;

namespace WMS.API_ProyectoFinal.Modules.Productos.DTOs

{
    public class ProductoDTO
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El código es obligatorio")]
        [StringLength(50)]
        public string Codigo { get; set; } = string.Empty;

        [Range(0, 9999, ErrorMessage = "La cantidad debe ser válida")]
        public int Cantidad { get; set; }
    }
}
