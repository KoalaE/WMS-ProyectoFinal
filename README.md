# WMS — Proyecto Final

Monorepo con **backend** (.NET 8) y **frontend** (React + Vite).

```
PROYECTO-FINAL/
├── backend/          ← API, SQL Server, Swagger
├── frontend/         ← Interfaz web
└── README.md
```

## Backend

```bash
cd backend
export PATH="$PATH:$HOME/.dotnet/tools"
dotnet ef database update --project WMS.API-ProyectoFinal.csproj
dotnet run --project WMS.API-ProyectoFinal.csproj
```

- API: http://localhost:5129  
- Swagger: http://localhost:5129/swagger  

## Frontend

```bash
cd frontend
npm install
npm run dev
```

- App: http://localhost:5173  

## Git (un solo repositorio)

Todo el proyecto vive en **una carpeta** con un solo `.git` en la raíz. No clones el repo otra vez dentro de `backend/` ni `frontend/`.

```bash
cd PROYECTO-FINAL
git status
git add backend/ frontend/ README.md .gitignore
git commit -m "Organizar monorepo: backend y frontend"
git push
```

Más detalle en `backend/README.md` y `frontend/README.md`.
