export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagenUrl: string | null;
}

export interface CrearProductoDTO {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion?: string;
  imagenUrl?: string;
}

// Modelo de producto utilizado por fakestore API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
