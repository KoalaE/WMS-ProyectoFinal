# WMS — Proyecto Final

Sistema de gestión de bodega (Warner & Spencer).

## Estructura

- `WMS-ProyectoFinal/` — API .NET 8 + SQL Server
- `wms-frontend/` — React + Vite

## Cómo correr

### 1. Base de datos

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=TuPassword123!" \
  -p 1433:1433 --name wms-sql -d mcr.microsoft.com/mssql/server:2022-latest
```

Agrega en `WMS-ProyectoFinal/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=WMSDB;User Id=sa;Password=TuPassword123!;TrustServerCertificate=True;"
  }
}
```

### 2. Backend

```bash
cd WMS-ProyectoFinal
export PATH="$PATH:$HOME/.dotnet/tools"
dotnet ef database update --project WMS.API-ProyectoFinal.csproj
dotnet run --project WMS.API-ProyectoFinal.csproj
```

> Tras cambios en modelos, vuelve a ejecutar `dotnet ef database update`. Si el API ya estaba corriendo, reinícialo con Ctrl+C y `dotnet run`.

API: http://localhost:5129 — Swagger: http://localhost:5129/swagger

### 3. Frontend

```bash
cd wms-frontend
npm install
npm run dev
```

App: http://localhost:5173

## Pantallas

| Ruta | Descripción |
|------|-------------|
| `/login` | Inicio de sesión |
| `/dashboard` | Resumen + tabla de productos |
| `/productos` | CRUD conectado a la API |
| `/movimientos` | Entradas/salidas + historial (actualiza stock) |
| `/inventario` | Stock en tiempo real con filtros |
| `/reportes` | Reporte inventario + auditoría de movimientos |

API: `Movimientos`, `Inventario`, `Reportes/inventario`, `Reportes/movimientos`.
