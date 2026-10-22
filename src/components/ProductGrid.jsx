import ProductCard from './ProductCard'
import ProductSkeleton from './ProductSkeleton'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <p className="font-['Manrope'] text-lg font-bold text-slate-800">No encontramos productos</p>
        <p className="mt-2 text-sm text-slate-500">Prueba con otra búsqueda o categoría.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}
