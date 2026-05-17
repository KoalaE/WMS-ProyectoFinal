using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WMS.API_ProyectoFinal.Models;

namespace WMS.API_ProyectoFinal.Data

{
    // Clase que representa el contexto de la base de datos
    // Permite acceder a las tablas desde el código
    public class AppDbContext : DbContext
    {
        // Constructor que recibe la configuración de conexión
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Representa la tabla Productos en la base de datos
        public DbSet<Producto> Productos { get; set; }
    }
}
