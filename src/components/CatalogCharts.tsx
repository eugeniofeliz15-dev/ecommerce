import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Product } from "../types/product";
import { formatCategory } from "../utils/format";

interface CatalogChartsProps {
  products: Product[];
}

const COLORS = [
  "#2563eb",
  "#06b6d4",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
];

export default function CatalogCharts({ products }: CatalogChartsProps) {
  const categoryMap = products.reduce<
    Record<
      string,
      {
        category: string;
        products: number;
        ratingTotal: number;
        ratedProducts: number;
      }
    >
  >((acc, product) => {
    const category = product.category || "Sin categoría";
    if (!acc[category]) {
      acc[category] = {
        category,
        products: 0,
        ratingTotal: 0,
        ratedProducts: 0,
      };
    }
    acc[category].products += 1;
    if (typeof product.rating?.rate === "number") {
      acc[category].ratingTotal += product.rating.rate;
      acc[category].ratedProducts += 1;
    }
    return acc;
  }, {});

  const categoryData = Object.values(categoryMap).map((item) => ({
    ...item,
    name: formatCategory(item.category),
    averageRating: item.ratedProducts
      ? Number((item.ratingTotal / item.ratedProducts).toFixed(2))
      : 0,
  }));

  if (!products.length) return null;

  return (
    <section
      className="page-container py-12 sm:py-16"
      aria-labelledby="catalog-insights-title"
    >
      <div className="mb-7">
        <p className="mb-2 text-[11px] font-extrabold tracking-[0.16em] text-blue-600">
          DATOS DEL CATÁLOGO
        </p>
        <h2
          id="catalog-insights-title"
          className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
        >
          El catálogo en gráficos
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Una vista rápida de los productos cargados desde la API, agrupados por
          categoría y valoración.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-sm font-bold text-slate-800">
            Productos por categoría
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Cantidad de productos en cada categoría
          </p>
          <div className="mt-5 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 8, right: 8, left: -18, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  interval={0}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip
                  formatter={(value) => [value, "Productos"]}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="products"
                  name="Productos"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-sm font-bold text-slate-800">
            Distribución del catálogo
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Proporción de productos por categoría
          </p>
          <div className="mt-5 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="products"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={98}
                  innerRadius={48}
                  paddingAngle={3}
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [value, "Productos"]}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-800">
            Valoración media por categoría
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Promedio de estrellas de los productos disponibles (escala de 0 a 5)
          </p>
          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 8, right: 12, left: -10, bottom: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  interval={0}
                />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip
                  formatter={(value) => [`${value} / 5`, "Valoración media"]}
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e2e8f0",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="averageRating"
                  name="Valoración media"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
}
