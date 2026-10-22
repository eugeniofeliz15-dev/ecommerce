interface LoaderProps {
  label?: string
}

export default function Loader({ label = 'Cargando...' }: LoaderProps) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4 text-slate-500" role="status">
      <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
