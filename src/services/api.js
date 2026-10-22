import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: { Accept: 'application/json' },
})

export async function getProducts(signal) {
  const { data } = await api.get('/products', { signal })
  return data
}

export async function getProduct(id, signal) {
  const { data } = await api.get(`/products/${id}`, { signal })
  return data
}

export async function getCategories(signal) {
  const { data } = await api.get('/products/categories', { signal })
  return data
}

export async function getProductsByCategory(category, signal) {
  const { data } = await api.get(
    `/products/category/${encodeURIComponent(category)}`,
    { signal },
  )
  return data
}
