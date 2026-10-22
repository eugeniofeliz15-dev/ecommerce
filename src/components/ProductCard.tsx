import { ArrowUpRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatCategory, formatPrice } from '../utils/format'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-900/10">
      <Link
        to={`/productos/${product.id}`}
        className="flex min-h-[220px] items-center justify-center bg-white p-8 sm:min-h-[245px]"
        aria-label={`Ver ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-36 max-w-full object-contain transition duration-500 group-hover:scale-105 sm:h-40"
        />
        <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-blue-600 text-white opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600">
          {formatCategory(product.category)}
        </p>
        <Link
          to={`/productos/${product.id}`}
          className="line-clamp-2 min-h-12 font-['Manrope'] text-sm font-bold leading-6 text-slate-800 transition-colors hover:text-blue-700"
        >
          {product.title}
        </Link>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="font-['Manrope'] text-lg font-extrabold tracking-tight text-slate-900">
            {formatPrice(product.price)}
          </span>
          <span className="mb-0.5 flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {product.rating?.rate.toFixed(1) ?? '—'}
          </span>
        </div>
      </div>
    </article>
  )
}
