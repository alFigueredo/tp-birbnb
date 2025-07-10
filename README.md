# Trabajo Práctico de Desarrollo de Software 2025 1c

## Integrantes
- Abigail Celina Tellez Cerna
- Alan Lionel Figueredo Aguilar
- Lara Nicole Galván

## Birbnb

**Birbnb** es una aplicación web que permite a usuarios buscar alojamientos, realizar y gestionar reservas, y recibir notificaciones.

## Acceder

- Aplicación: [https://birbnb-front.netlify.app/](https://birbnb-front.netlify.app/)
- Checkhealth Back-end: [https://birbnb-back.onrender.com/health/](https://birbnb-back.onrender.com/health/)
- Documentación Back-end hecho con Swagger-UI: [https://birbnb-back.onrender.com/api-docs/](https://birbnb-back.onrender.com/api-docs/)

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para la creación de APIs REST.
- **Mongoose**: ODM para la gestión de la base de datos.
- **Jest** y **Supertest**: Testing unitario e integración.
- **Swagger**: Documentación de la API.

### Frontend
- **Next.js**: Framework de React para SSR y SSG.
- **React**: Librería principal para la UI.
- **Tailwind CSS**: Utilidades CSS para estilos rápidos y responsivos.
- **Axios**: Cliente HTTP basado en promesas para Node.js y para el navegador.

### Base de Datos
- **MongoDB**: Base de datos no relacional utilizada en el entorno productivo y de desarrollo.

### General
- **Cypress**: Testing end-to-end.
- **Docker**: Contenedores para desarrollo y testing.

### Despliegue
- **Render**: Despliegue del back-end.
- **Netlify**: Despliegue del front-end.
- **MongoDB Atlas**: Proveedor de una base de datos MongoDB remota.

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
│   └── Dockerfile       # Imagen del backend
│   └── index.js         # Archivo inicial de JS
│   └── package.json     # Archivo de configuración de Node
│   └── rest.http        # Archivo con ejemplos de pedidos al servidor
│   └── sample.env       # Variables de entorno utilizadas
│
├── front/               # Frontend (Next.js + React)
│   ├── app/             # Páginas y componentes principales
│   │   ├── components/      # Componentes reutilizables
│   │   ├── context/         # Contextos globales (ej: usuario)
│   │   ├── services/        # Servicios de consumo de API
│   ├── cypress/         # Tests E2E
│   └── public/          # Archivos estáticos
│   └── Dockerfile       # Imagen del frontend
│   └── Dockerfile.cypress   # Imagen de cypress (Tests E2E)
│   └── public/          # Archivos estáticos
│   └── package.json     # Archivo de configuración de Node
│   └── sample.env       # Variables de entorno utilizadas
│
├── docs/                # Documentación general y utilidades
│
├── docker-compose-dev.yml  # Archivo de orquestación Docker para desarrollo
├── docker-compose-prod.yml  # Archivo de orquestación Docker para produccion
├── docker-compose-test.yml  # Archivo de orquestación Docker para tests unitarios y de integración en el backend
├── docker-compose-cypress.yml  # Archivo de orquestación Docker para tests E2E
└── README.md            # Documentación principal
```

## Scripts

### Backend

- **npm run start**: Iniciar backend con node para producción.
- **npm run dev**: Iniciar backend con nodemon para desarrollo.
- **npm run test**: Testear backend con jest (tests unitarios) y supertest (tests de integración). No requiere de una base de datos, sus respuestas se imitan con la herramienta de testing.

#### Variables de entorno del backend

Las variables de entorno se encuentran listadas en el sample.env correspondiente:
- **SERVER_PORT**: Puerto del servidor en el cual funcionará el servidor.
- **NODE_ENV**: Variable de entorno de Node.js, tenerlo en 'production' evita que se instalen las dependencias de desarrollo.
- **MONGO_URL**: Dirección para conectarse a una base de datos MongoDB.

Opcionales:
- **MONGO_INITDB_ROOT_USERNAME**: Usuario de la base de datos a crear (si es creada con Docker).
- **MONGO_INITDB_ROOT_PASSWORD**: Contraseña de la base de datos a crear (si es creada con Docker).

### Frontend

- **npm run dev**: Iniciar frontend con next.js para desarrollo.
- **npm run build**: Compilar frontend con next.js para producción.
- **npm run start**: Iniciar frontend anteriormente compilado con next.js para producción.
- **npm run lint**: ESLint revisa el código en busca de errores y/o warnings.
- **npm run test**: Cypress ejecuta los tests sin desplegar la interfaz gráfica. Se requiere la aplicación entera funcionando para su uso.
- **npm run test:open**: Cypress ejecuta los tests a través de la interfaz gráfica.

#### Variables de entorno del frontend

Las variables de entorno se encuentran listadas en el sample.env correspondiente:
- **NODE_ENV**: Variable de entorno de Node.js, tenerlo en 'production' evita que se instalen las dependencias de desarrollo.
- **NEXT_PUBLIC_APP_URL**: Dirección en donde funciona la aplicación (para uso de Cypress).
- **NEXT_PUBLIC_SERVER_URL**: Dirección en donde funciona el servidor.

## Docker

Se cuentan con 4 archivos docker-compose*.yml para desplegar la aplicación en distintos contenedores:
- **docker-compose-dev.yml**: despliega dos instancias de Node (uno para el backend y uno para el frontend), ambos para desarrollo, y una instancia de Mongo.
- **docker-compose-prod.yml**: despliega dos instancias de Node (uno para el backend y uno para el frontend), ambos para producción, y una instancia de Mongo.
- **docker-compose-test.yml**: despliega una instancia de Node (referida al backend). Al mockear la interacción con la base de datos, no requiere de una instancia de Mongo.
- **docker-compose-cypress.yml**: despliega dos instancias de Node (uno para el backend y uno para el frontend, ambos para producción), una instancia de mongo y una instancia de Cypress que ejecuta tests E2E. Al no mockear ninguna parte de la aplicación, se requiere el despliegue de la aplicación entera.
