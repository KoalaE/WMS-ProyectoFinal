# WMS API — Estructura del proyecto

API .NET 8 organizada por **módulos** (cada funcionalidad en su carpeta).

```
WMS-ProyectoFinal/
├── Core/                          # Compartido
│   ├── Data/                      # AppDbContext, EF
│   └── Entities/                  # Producto, Usuario, Movimiento
├── Modules/
│   ├── Productos/                 # CRUD productos
│   │   ├── Controllers/
│   │   ├── DTOs/
│   │   ├── Interfaces/
│   │   └── Repositories/
│   ├── Movimientos/               # Entradas/salidas + stock
│   ├── Inventario/                # Consulta de stock
│   └── Reportes/                  # Reportes inventario y auditoría
├── Extensions/                    # Registro DI (AddWmsModules)
├── Migrations/
└── Program.cs
```

## Ejecutar

```bash
dotnet ef database update --project WMS.API-ProyectoFinal.csproj
dotnet run --project WMS.API-ProyectoFinal.csproj
```

Frontend React: carpeta `frontend/` en la raíz del repo.
