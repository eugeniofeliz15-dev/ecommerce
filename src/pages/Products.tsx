import { ArrowDownWideNarrow } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ErrorState from '../components/ErrorState'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import { useProductStore } from '../store/useProductStore'
import { formatCategory } from '../utils/format'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name'

export default function Products() {
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const products = useProductStore((state) => state.products)
  const categories = useProductStore((state) => state.categories)
  const selectedCategory = useProductStore((state) => state.selectedCategory)
  const searchQuery = useProductStore((state) => state.searchQuery)
  const loading = useProductStore((state) => state.loading)
  const error = useProductStore((state) => state.error)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const fetchCategories = useProductStore((state) => state.fetchCategories)

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts(selectedCategory, controller.signal)
    if (!categories.length) fetchCategories(controller.signal)
    return () => controller.abort()
  }, [selectedCategory, categories.length, fetchProducts, fetchCategories])

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase()
    const filtered = products.filter((product) => product.title.toLocaleLowerCase().includes(query))
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'name') return a.title.localeCompare(b.title)
      return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
    })
  }, [products, searchQuery, sortBy])

  return (
    <div className="page-container py-10 sm:py-14">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 px-6 py-9 text-white sm:px-10 sm:py-12">
        <p className="mb-2 text-xs font-bold tracking-[0.15em] text-blue-300">CATÁLOGO TECHSTORE</p>
        <h1 className="font-['Manrope'] text-3xl font-extrabold tracking-tight sm:text-4xl">Encuentra tu próximo favorito</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Explora nuestra selección de productos y descubre la tecnología que va contigo.</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar />
        <label className="flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 text-slate-500 shadow-sm sm:w-56">
          <ArrowDownWideNarrow size={17} />
          <span className="sr-only">Ordenar productos</span>
          <select value={sortBy} onChange={(event) => {
            const value = event.target.value
            if (isSortOption(value)) setSortBy(value)
          }} className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none">
            <option value="featured">Más valorados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre: A a Z</option>
          </select>
        </label>
      </div>

      <div className="mb-6">
        <CategoryFilter categories={categories} />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {loading ? 'Cargando productos...' : `${visibleProducts.length} productos`}
          {selectedCategory !== 'all' && <span> en <span className="font-semibold text-slate-700">{formatCategory(selectedCategory)}</span></span>}
        </p>
      </div>
      {error ? (
        <ErrorState message={error} onRetry={() => fetchProducts(selectedCategory)} />
      ) : (
        <ProductGrid products={visibleProducts} loading={loading} />
      )}
    </div>
  )
}

function isSortOption(value: string): value is SortOption {
  return ['featured', 'price-asc', 'price-desc', 'name'].includes(value)
}
