export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatCategory(category?: string): string {
  return category?.replace(/(^\w|\s\w)/g, (letter) => letter.toUpperCase()) ?? ''
}
