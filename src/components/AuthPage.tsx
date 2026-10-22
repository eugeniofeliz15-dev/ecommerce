import { useState } from "react";
import axios from "axios";
import { authService } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

interface AuthPageProps {
  onCancel?: () => void;
}

const obtenerErrorAuth = (error: unknown, mensaje: string) => {
  if (axios.isAxiosError(error)) {
    const detalle = error.response?.data?.detail;
    if (typeof detalle === "string") return detalle;
  }
  return mensaje;
};

export default function AuthPage({ onCancel }: AuthPageProps) {
  const loginStore = useAuthStore((s) => s.login);
  const [modo, setModo] = useState<"Login" | "registro">("Login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiarModo = (nuevoModo: "Login" | "registro") => {
    setModo(nuevoModo);
    setError("");
    setMensaje("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    setError("");
    setMensaje("");
    try {
      if (modo === "registro") {
        await authService.register({ nombre, email, password });
        setMensaje("Registro completo, ya puedes iniciar sesión");
        setModo("Login");
        setNombre("");
        setPassword("");
      } else {
        await loginStore({ email, password });
      }
    } catch (err) {
      setError(
        obtenerErrorAuth(
          err,
          modo === "registro"
            ? "No se pudo completar el registro"
            : "Email o contraseña inválidos",
        ),
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <section className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {onCancel && (
          <button
            type="button"
            className="absolute right-6 top-6 text-sm font-bold text-blue-600 hover:text-blue-800"
            onClick={onCancel}
          >
            Volver
          </button>
        )}

        <p className="text-xs font-extrabold tracking-[0.15em] text-blue-600">
          TIENDA ONLINE
        </p>
        <h1 className="mt-2 font-['Manrope'] text-2xl font-extrabold text-slate-900">
          {modo === "Login" ? "Iniciar Sesión" : "Crear cuenta"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {modo === "Login"
            ? "Accede a tu cuenta para ver más información"
            : "Regístrate para realizar tus compras"}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            className={`rounded-md py-2 text-sm font-bold transition ${modo === "Login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            onClick={() => cambiarModo("Login")}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={`rounded-md py-2 text-sm font-bold transition ${modo === "registro" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            onClick={() => cambiarModo("registro")}
          >
            Registrarse
          </button>
        </div>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => void handleSubmit(e)}
        >
          {modo === "registro" && (
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
              Nombre
              <input
                required
                value={nombre}
                placeholder="Ingresa tu nombre"
                onChange={(e) => setNombre(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            Email
            <input
              required
              type="email"
              value={email}
              placeholder="correo@ejemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 px-4 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
            Contraseña
            <input
              required
              minLength={6}
              type="password"
              value={password}
              placeholder="Mínimo 6 caracteres"
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 px-4 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-600">
              {error}
            </p>
          )}
          {mensaje && (
            <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-2 h-11 rounded-xl bg-blue-600 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {cargando
              ? "Procesando..."
              : modo === "Login"
                ? "Ingresar"
                : "Crear cuenta"}
          </button>
        </form>
      </section>
    </div>
  );
}
