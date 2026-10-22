import { ArrowLeft, ArrowUpRight, Check, PackageCheck, ShieldCheck, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import Loader from '../components/Loader'
import { getProduct } from '../services/api'
import { formatCategory, formatPrice } from '../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    getProduct(id, controller.signal)
      .then(setProduct)
      .catch((requestError) => {
        if (requestError.code !== 'ERR_CANCELED') {
          setError('No pudimos cargar este producto. Inténtalo de nuevo.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [id, retryCount])

  if (loading) return <Loader label="Cargando producto..." />
  if (error) {
    return (
      <div className="page-container py-16">
        <ErrorState message={error} onRetry={() => setRetryCount((count) => count + 1)} />
      </div>
    )
  }
  if (!product || !product.id) {
    return <div className="page-container py-20 text-center text-slate-600">Producto no encontrado.</div>
  }

  return (
    <div className="page-container py-8 sm:py-12">
      <Link to="/productos" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600">
        <ArrowLeft size={16} /> Volver al catálogo
      </Link>
      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card lg:grid-cols-2">
        <div className="flex min-h-[360px] items-center justify-center bg-white p-10 sm:min-h-[520px] sm:p-16">
          <img src={product.image} alt={product.title} className="max-h-[380px] max-w-full object-contain" />
        </div>
        <div className="flex flex-col border-t border-slate-100 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.15em] text-blue-600">{formatCategory(product.category)}</p>
          <h1 className="font-['Manrope'] text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">{product.title}</h1>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm font-bold text-slate-700">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              {product.rating?.rate?.toFixed(1) ?? '—'}
            </span>
            <span className="text-sm text-slate-400">({product.rating?.count ?? 0} reseñas)</span>
          </div>
          <p className="mt-7 font-['Manrope'] text-3xl font-extrabold tracking-tight text-slate-900">{formatPrice(product.price)}</p>
          <div className="my-7 h-px bg-slate-100" />
          <h2 className="text-sm font-bold text-slate-900">Descripción</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">{product.description}</p>
          <button type="button" className="mt-8 flex h-13 min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            Agregar al carrito <ArrowUpRight size={17} />
          </button>
          <p className="mt-2 text-center text-xs text-slate-400">Vista de demostración, sin funcionalidad de compra.</p>
          <div className="mt-7 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><PackageCheck size={17} className="text-blue-600" /> Disponibilidad inmediata</div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><ShieldCheck size={17} className="text-blue-600" /> Compra protegida</div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Check size={17} className="text-blue-600" /> Calidad garantizada</div>
          </div>
        </div>
      </div>
    </div>
  )
}
