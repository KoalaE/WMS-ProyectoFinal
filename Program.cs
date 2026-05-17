using Microsoft.EntityFrameworkCore;
using WMS.API_ProyectoFinal.Data;
using WMS.API_ProyectoFinal.Interfaces;
using WMS.API_ProyectoFinal.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configuración de Entity Framework para conectar con SQL Server
// Usa la cadena de conexión definida en appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
