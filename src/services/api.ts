import axios from "axios";
import type { Product } from "../types/product";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products", { signal });
  return data;
}

export async function getProduct(
  id: string,
  signal?: AbortSignal,
): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`, { signal });
  return data;
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const { data } = await api.get<string[]>("/products/categories", { signal });
  return data;
}

export async function getProductsByCategory(
  category: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  const { data } = await api.get(
    `/products/category/${encodeURIComponent(category)}`,
    { signal },
  );
  return data;
}
