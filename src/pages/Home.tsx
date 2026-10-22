import { ArrowRight, ArrowUpRight, Camera, Headphones, Laptop, ShieldCheck, Smartphone, Truck, Watch } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import ProductGrid from '../components/ProductGrid'
import { useProductStore } from '../store/useProductStore'
import { formatCategory } from '../utils/format'

const categoryIcons = [Smartphone, Laptop, Headphones, Camera, Watch]
const benefits = [
  { icon: Truck, title: 'Envío gratuito', text: 'En pedidos seleccionados' },
  { icon: ShieldCheck, title: 'Compra segura', text: 'Tus datos siempre protegidos' },
  { icon: Headphones, title: 'Estamos para ayudarte', text: 'Soporte cuando lo necesitas' },
]

export default function Home() {
  const products = useProductStore((state) => state.products)
  const categories = useProductStore((state) => state.categories)
  const loading = useProductStore((state) => state.loading)
  const error = useProductStore((state) => state.error)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const fetchCategories = useProductStore((state) => state.fetchCategories)

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts('all', controller.signal)
    fetchCategories(controller.signal)
    return () => controller.abort()
  }, [fetchProducts, fetchCategories])

  const featured = [...products]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 4)

  return (
    <>
      <section className="page-container pt-6 sm:pt-8">
        <div className="relative isolate min-h-[470px] overflow-hidden rounded-[28px] bg-hero-glow px-7 py-12 text-white sm:min-h-[510px] sm:px-12 sm:py-16 lg:flex lg:items-center lg:px-16">
          <div className="absolute -right-16 top-5 h-72 w-72 rounded-full border border-white/10 sm:right-12 sm:top-1/2 sm:h-96 sm:w-96 sm:-translate-y-1/2" />
          <div className="absolute -right-3 top-14 h-60 w-60 rounded-full border border-white/10 sm:right-24 sm:top-1/2 sm:h-72 sm:w-72 sm:-translate-y-1/2" />
          <div className="relative z-10 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              TECNOLOGÍA PARA TU DÍA A DÍA
            </div>
            <h1 className="font-['Manrope'] text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Ideas nuevas.
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">Tecnología que inspira.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-300 sm:text-lg">
              Encuentra eso que estabas buscando y lleva tus proyectos un paso más allá.
            </p>
            <Link to="/productos" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400">
              Explorar productos <ArrowRight size={17} />
            </Link>
            <div className="mt-10 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex -space-x-2">
                {['bg-cyan-300', 'bg-violet-300', 'bg-emerald-300'].map((color) => (
                  <span key={color} className={`h-7 w-7 rounded-full border-2 border-slate-800 ${color}`} />
                ))}
              </span>
              <span>Todo lo que necesitas, en un solo lugar</span>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 hidden h-72 w-72 items-center justify-center sm:flex lg:right-20 lg:h-96 lg:w-96">
            <div className="absolute inset-8 rounded-full bg-blue-400/10 blur-2xl" />
            <div className="relative grid h-56 w-56 rotate-[-8deg] place-items-center rounded-[38px] border border-white/20 bg-gradient-to-br from-white/20 to-white/5 shadow-2xl shadow-blue-950/40 backdrop-blur-xl transition duration-700 hover:rotate-0 lg:h-64 lg:w-64">
              <Smartphone size={118} strokeWidth={0.8} className="text-blue-100 drop-shadow-[0_0_24px_rgba(96,165,250,0.45)]" />
            </div>
            <span className="absolute right-0 top-12 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-blue-100 backdrop-blur-md">Diseñado para ti</span>
            <span className="absolute bottom-8 left-0 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md">Descubre más ↗</span>
          </div>
        </div>
      </section>

      <section className="page-container py-14 sm:py-20">
        <SectionHeading eyebrow="COMPRA CON CONFIANZA" title="Una mejor experiencia, de principio a fin" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={21} /></span>
              <div><p className="text-sm font-bold text-slate-800">{title}</p><p className="mt-1 text-xs text-slate-500">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100/70 py-14 sm:py-20">
        <div className="page-container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <SectionHeading eyebrow="ENCUENTRA LO QUE BUSCAS" title="Explora por categoría" />
            <Link to="/productos" className="hidden items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 sm:inline-flex">
              Ver todo <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index % categoryIcons.length]
              return (
                <Link
                  key={category}
                  to="/productos"
                  onClick={() => useProductStore.getState().setCategory(category)}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-card sm:p-6"
                >
                  <span className="mb-8 grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-blue-600 group-hover:text-white"><Icon size={20} /></span>
                  <span className="block text-sm font-bold text-slate-800">{formatCategory(category)}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">Explorar <ArrowUpRight size={12} /></span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="page-container py-14 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading eyebrow="SELECCIÓN ESPECIAL" title="Favoritos de la comunidad" />
          <Link to="/productos" className="hidden items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 sm:inline-flex">
            Ver catálogo <ArrowRight size={16} />
          </Link>
        </div>
        {error ? (
          <ErrorState message={error} onRetry={() => fetchProducts('all')} />
        ) : (
          <ProductGrid products={featured} loading={loading} />
        )}
        <Link to="/productos" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 sm:hidden">
          Ver todos los productos <ArrowRight size={16} />
        </Link>
      </section>
    </>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
}

function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-extrabold tracking-[0.16em] text-blue-600">{eyebrow}</p>
      <h2 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
    </div>
  )
}
