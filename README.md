# Ecommerce · Grupo 2

Repositorio oficial para el desarrollo de ecommerce del grupo 2.

## Techstore

Frontend de ecommerce de demostración para descubrir productos tecnológicos. Consume productos y categorías desde [FakeStore API](https://fakestoreapi.com/).

## Requisitos

- Node.js 18 o superior
- npm

## Ejecutar localmente

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la que quedó disponible la aplicación.

## Comandos

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist`.
- `npm run preview`: sirve localmente la compilación de producción.

## Funcionalidades

- Inicio con productos destacados y categorías.
- Catálogo con búsqueda, ordenamiento y filtro por categoría persistido localmente.
- Página de detalle con información obtenida por ID.
- El botón “Agregar al carrito” es únicamente visual; no existe carrito ni flujo de compra.
