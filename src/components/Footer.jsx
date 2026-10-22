import { ArrowUpRight, Github, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="page-container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:py-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 font-extrabold text-white">T</span>
            <span className="font-['Manrope'] text-lg font-extrabold text-slate-900">
              tech<span className="text-blue-600">store</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
            Tecnología que acompaña tus ideas. Descubre productos para hacer más de lo que te gusta.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Explora</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
            <Link to="/" className="transition hover:text-blue-600">Inicio</Link>
            <Link to="/productos" className="transition hover:text-blue-600">Todos los productos</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Conecta con nosotros</p>
          <div className="mt-4 flex gap-2">
            <SocialLink label="Instagram"><Instagram size={17} /></SocialLink>
            <SocialLink label="Twitter"><Twitter size={17} /></SocialLink>
            <SocialLink label="GitHub"><Github size={17} /></SocialLink>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="page-container flex flex-col justify-between gap-2 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Techstore. Proyecto de demostración.</p>
          <a href="https://fakestoreapi.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-blue-600">
            Datos proporcionados por FakeStore API <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ children, label }) {
  return (
    <a href="https://github.com" target="_blank" rel="noreferrer" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
      {children}
    </a>
  )
}
