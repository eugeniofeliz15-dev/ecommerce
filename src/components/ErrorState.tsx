import { AlertCircle, RotateCcw } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center" role="alert">
      <AlertCircle className="mx-auto mb-3 text-rose-500" size={28} />
      <p className="font-semibold text-slate-800">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <RotateCcw size={15} />
          Intentar de nuevo
        </button>
      )}
    </div>
  )
}
