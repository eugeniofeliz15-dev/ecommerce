import { useState } from "react";
import { ArrowUpRight, Star, Edit, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCategory, formatPrice } from "../utils/format";
import { useAuthStore } from "../store/useAuthStore";
import { BadgeStock } from "./BadgeStock";

// Usamos 'any' para que no chille TypeScript mientras el grupo no unifique la API
interface ProductCardProps {
  product: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const esAdmin = useAuthStore((state) => state.esAdmin());

  // 👇 ESTA ES LA MAGIA: Toma los datos viejos o los nuevos 👇
  const nombre = product.title || product.nombre;
  const precio = product.price || product.precio;
  const imagenUrl = product.image || product.imagenUrl;
  const categoria = product.category || product.categoria;
  // FakeStore no tiene stock, así que le ponemos 10 por defecto para que se vea bien
  const stock = product.stock !== undefined ? product.stock : 10;

  const [imagenDisponible, setImagenDisponible] = useState(Boolean(imagenUrl));

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl">
      <Link
        to={`/productos/${product.id}`}
        className="relative flex min-h-[220px] items-center justify-center bg-white p-8 sm:min-h-[245px]"
        aria-label={`Ver ${nombre}`}
      >
        {imagenUrl && imagenDisponible ? (
          <img
            src={imagenUrl}
            alt={nombre}
            loading="lazy"
            onError={() => setImagenDisponible(false)}
            className="h-36 max-w-full object-contain transition duration-500 group-hover:scale-105 sm:h-40"
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center rounded-xl bg-slate-50 text-sm font-medium text-slate-400">
            Sin imagen
          </div>
        )}

        <span className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full bg-blue-600 text-white opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600">
          {formatCategory(categoria)}
        </p>

        <Link
          to={`/productos/${product.id}`}
          className="line-clamp-2 min-h-12 font-['Manrope'] text-sm font-bold leading-6 text-slate-800 transition-colors hover:text-blue-700"
        >
          {nombre}
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="font-['Manrope'] text-lg font-extrabold tracking-tight text-slate-900">
            {formatPrice(precio)}
          </span>
          <span className="mb-0.5 flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {stock} en stock
          </span>
        </div>

        {/* 👇 ACÁ SE VE TU TAREA (Roles) 👇 */}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <BadgeStock stock={stock} />

            <div className="ml-auto flex gap-2">
              {esAdmin ? (
                <>
                  <button
                    onClick={onEdit}
                    className="flex items-center justify-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                  >
                    <Edit size={14} /> Editar
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex items-center justify-center gap-1 rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </>
              ) : (
                <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700">
                  <ShoppingCart size={14} /> Comprar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
