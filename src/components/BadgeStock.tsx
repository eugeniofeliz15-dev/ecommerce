interface BadgeStockProps {
  stock: number;
}

export function BadgeStock({ stock }: BadgeStockProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
        stock === 0
          ? "bg-rose-100 text-rose-700"
          : "bg-emerald-100 text-emerald-700"
      }`}
    >
      {stock === 0 ? "Agotado" : `${stock} disponibles`}
    </span>
  );
}
