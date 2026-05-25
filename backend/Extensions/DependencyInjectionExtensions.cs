using WMS.API_ProyectoFinal.Modules.Inventario.Interfaces;
using WMS.API_ProyectoFinal.Modules.Inventario.Repositories;
using WMS.API_ProyectoFinal.Modules.Movimientos.Interfaces;
using WMS.API_ProyectoFinal.Modules.Movimientos.Repositories;
using WMS.API_ProyectoFinal.Modules.Productos.Interfaces;
using WMS.API_ProyectoFinal.Modules.Productos.Repositories;

namespace WMS.API_ProyectoFinal.Extensions;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddWmsModules(this IServiceCollection services)
    {
        services.AddScoped<IProductoRepository, ProductoRepository>();
        services.AddScoped<IMovimientoRepository, MovimientoRepository>();
        services.AddScoped<IInventarioRepository, InventarioRepository>();
        return services;
    }

    public static IServiceCollection AddWmsCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy =>
                policy.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod());
        });
        return services;
    }
}
