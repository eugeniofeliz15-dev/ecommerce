export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex min-h-[245px] items-center justify-center bg-slate-50">
        <div className="h-36 w-36 rounded-xl bg-slate-200" />
      </div>
      <div className="space-y-3 border-t border-slate-100 p-5">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
        <div className="h-6 w-24 rounded bg-slate-200 pt-1" />
      </div>
    </div>
  )
}
