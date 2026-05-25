using System.ComponentModel.DataAnnotations;


namespace WMS.API_ProyectoFinal.Core.Entities
{

    // Modelo que representa un producto dentro del sistema
    public class Producto
    {
        public int Id { get; set; } // Identificador único

        // Nombre del producto
        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Nombre { get; set; } = string.Empty;

        // Código interno del producto
        [Required(ErrorMessage = "El código es obligatorio")]
        public string Codigo { get; set; } = string.Empty;

        // Cantidad disponible en inventario
        [Range(1, 9999, ErrorMessage = "La cantidad debe ser mayor a 0")]
        public int Cantidad { get; set; }
    }

}
