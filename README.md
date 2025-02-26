# Pequeño Catálogo de Productos

Este proyecto es una aplicación web que permite a los usuarios explorar un catálogo de productos, registrarse e iniciar sesión, ver los precios de los productos solo si están autenticados y descargar la ficha técnica de los productos.

## Tecnologías utilizadas

- **Frontend:** Next.js
- **Backend:** Express.js
- **Base de datos:** SQLite

## Instalación

Sigue los siguientes pasos para ejecutar el proyecto localmente.

### 1. Clonar el repositorio

```bash
  git clone https://github.com/nee47/prueba_tecnica.git
  cd prueba_tecnica
```

### 2. Instalación del Frontend (client)

```bash
cd client
pnpm install  # O usa npm install o yarn
pnpm run dev  # Para ejecutar el frontend en modo desarrollo
```

El frontend correrá en `http://localhost:3000` por defecto.

### 3. Instalación del Backend (backend)

```bash
cd ../backend
pnpm install  # O usa npm install o yarn
pnpm run dev  # Para ejecutar el backend en modo desarrollo
```

El backend correrá en `http://localhost:5000` por defecto.

## Características del Proyecto

- **Catálogo de productos:** Los productos se listan para todos los usuarios.
- **Login y Registro:** Los usuarios pueden crear una cuenta e iniciar sesión.
- **Precios Condicionales:** Los precios de los productos solo se muestran a usuarios autenticados.
- **Descarga de ficha técnica:** Cada producto tiene un botón para descargar su ficha técnica en formato PDF.

## Variables de Entorno

Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:

```env
PORT=5000
JWT_SECRET=tu_secreto
```
