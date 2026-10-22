import { ArrowRight, Menu, Search, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const searchQuery = useProductStore((state) => state.searchQuery)
  const setSearchQuery = useProductStore((state) => state.setSearchQuery)
  const setCategory = useProductStore((state) => state.setCategory)
  const navigate = useNavigate()

  function submitSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setCategory('all')
    navigate('/productos')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="page-container flex h-[76px] items-center justify-between gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Techstore, inicio">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-lg font-extrabold tracking-tight text-white shadow-lg shadow-blue-600/20">
            T
          </span>
          <span className="font-['Manrope'] text-xl font-extrabold tracking-tight text-slate-900">
            tech<span className="text-blue-600">store</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
            Inicio
          </NavLink>
          <NavLink to="/productos" className={({ isActive }) => navClass(isActive)}>
            Productos
          </NavLink>
        </nav>

        <form onSubmit={submitSearch} className="hidden w-full max-w-[310px] lg:block">
          <label className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Buscar productos..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              aria-label="Buscar productos"
            />
            <button type="submit" aria-label="Buscar" className="text-slate-400 hover:text-blue-600">
              <ArrowRight size={17} />
            </button>
          </label>
        </form>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-4 md:hidden">
          <form onSubmit={submitSearch} className="mb-4">
            <label className="flex h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5">
              <Search size={17} className="text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar productos..."
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                aria-label="Buscar productos"
              />
              <button type="submit" aria-label="Buscar">
                <ArrowRight size={17} />
              </button>
            </label>
          </form>
          <div className="flex flex-col gap-1">
            <NavLink onClick={() => setMenuOpen(false)} to="/" className={({ isActive }) => mobileNavClass(isActive)}>
              Inicio
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/productos" className={({ isActive }) => mobileNavClass(isActive)}>
              Productos
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

function navClass(isActive: boolean): string {
  return `text-sm font-semibold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`
}

function mobileNavClass(isActive: boolean): string {
  return `rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`
}
