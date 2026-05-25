using Microsoft.EntityFrameworkCore;
using WMS.API_ProyectoFinal.Core.Entities;

namespace WMS.API_ProyectoFinal.Core.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Movimiento> Movimientos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movimiento>()
                .HasOne(m => m.Producto)
                .WithMany()
                .HasForeignKey(m => m.ProductoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Movimiento>()
                .HasOne(m => m.Usuario)
                .WithMany(u => u.Movimientos)
                .HasForeignKey(m => m.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Usuario>().HasData(
                new Usuario
                {
                    Id = 1,
                    Nombre = "Carla Duque",
                    Correo = "carla.duque@warner.com",
                    Contrasena = "demo123",
                    Rol = "Administrador"
                },
                new Usuario
                {
                    Id = 2,
                    Nombre = "Operador Bodega",
                    Correo = "operador@warner.com",
                    Contrasena = "demo123",
                    Rol = "Operador"
                }
            );
        }
    }
}
