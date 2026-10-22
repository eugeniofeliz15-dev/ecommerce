export function formatPrice(price) {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatCategory(category) {
  return category?.replace(/(^\w|\s\w)/g, (letter) => letter.toUpperCase()) ?? ''
}
