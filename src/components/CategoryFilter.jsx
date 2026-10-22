import { formatCategory } from '../utils/format'
import { useProductStore } from '../store/useProductStore'

export default function CategoryFilter({ categories = [] }) {
  const selectedCategory = useProductStore((state) => state.selectedCategory)
  const setCategory = useProductStore((state) => state.setCategory)

  return (
    <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filtrar por categoría">
      {['all', ...categories].map((category) => {
        const selected = selectedCategory === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => setCategory(category)}
            aria-pressed={selected}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              selected
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {category === 'all' ? 'Todos' : formatCategory(category)}
          </button>
        )
      })}
    </div>
  )
}
