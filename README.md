# Ecommerce - Grupo 2

Repositorio oficial para el desarrollo de ecommerce del grupo 2.

## Techstore

Frontend de ecommerce de demostracion, construido con React y TypeScript, para descubrir productos tecnologicos. Consume productos y categorias desde [FakeStore API](https://fakestoreapi.com/).

## Requisitos

- Node.js 18 o superior
- npm
- TypeScript con comprobacion estricta habilitada en el build

## Ejecutar localmente

```bash
npm install
npm run dev
```

Vite mostrara la direccion local en la que quedo disponible la aplicacion.

## Comandos

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la version de produccion en `dist`.
- `npm run preview`: sirve localmente la compilacion de produccion.

## Funcionalidades

- Inicio con productos destacados y categorias.
- Catalogo con busqueda, ordenamiento y filtro por categoria persistido localmente.
- Pagina de detalle con informacion obtenida por ID.
- El boton "Agregar al carrito" es unicamente visual; no existe carrito ni flujo de compra.
