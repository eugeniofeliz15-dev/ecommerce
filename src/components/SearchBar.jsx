import { Search } from 'lucide-react'
import { useProductStore } from '../store/useProductStore'

export default function SearchBar() {
  const searchQuery = useProductStore((state) => state.searchQuery)
  const setSearchQuery = useProductStore((state) => state.setSearchQuery)

  return (
    <label className="flex h-12 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 sm:max-w-sm">
      <Search size={18} className="shrink-0 text-slate-400" />
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="¿Qué estás buscando?"
        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        aria-label="Buscar por nombre de producto"
      />
    </label>
  )
}
