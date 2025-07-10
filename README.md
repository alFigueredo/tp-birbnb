# Trabajo Práctico de Desarrollo de Software 2025 1c
## Integrantes
- Abigail Celina Tellez Cerna
- Alan Lionel Figueredo Aguilar
- Lara Galván

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para la creación de APIs REST.
- **Mongoose**: ORM para la gestión de la base de datos.
- **Jest** y **Supertest**: Testing unitario e integración.
- **Swagger**: Documentación de la API.

### Frontend
- **Next.js**: Framework de React para SSR y SSG.
- **React**: Librería principal para la UI.
- **Tailwind CSS**: Utilidades CSS para estilos rápidos y responsivos.
- **Cypress**: Testing end-to-end.

### Base de Datos
- **MongoDB**: Base de datos no relacional utilizada en el entorno productivo y de desarrollo.

### Despliegue
- **Docker**: Contenedores para desarrollo y testing.

## Estructura del Proyecto

```
2025-1c-tp-grupo-3/
│
├── back/                # Backend (API REST Node.js/Express)
│   ├── controllers/     # Controladores de rutas
│   ├── models/          # Modelos, esquemas y repositorios
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── middlewares/     # Middlewares personalizados
│   ├── errors/          # Manejo de errores
│   ├── config/          # Configuración (DB, etc)
│   ├── test/            # Tests unitarios e integración
│   ├── docs/            # Documentación Swagger
│   └── server/          # Inicialización del servidor
│
├── front/               # Frontend (Next.js + React)
│   ├── app/             # Páginas y componentes principales
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Contextos globales (ej: usuario)
│   ├── services/        # Servicios de consumo de API
│   ├── cypress/         # Tests E2E
│   └── public/          # Archivos estáticos
│
├── docs/                # Documentación general y utilidades
│
├── docker-compose*.yml  # Archivos de orquestación Docker
└── README.md            # Documentación principal
```



