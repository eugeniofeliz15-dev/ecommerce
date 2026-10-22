import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import AuthPage from "./components/AuthPage";
import { useAuthStore } from "./store/useAuthStore";

export default function App() {
  const mostrarAuth = useAuthStore((s) => s.mostrarAuth);
  const verificandoSesion = useAuthStore((s) => s.verificandoSesion);
  const verificarSesion = useAuthStore((s) => s.verificarSesion);
  const cerrarAuth = useAuthStore((s) => s.cerrarAuth);
  const autenticado = useAuthStore((s) => s.autenticado);

  useEffect(() => {
    void verificarSesion();
  }, [verificarSesion]);

  if (verificandoSesion) {
    return (
      <div className="flex h-screen items-center justify-center font-bold text-slate-500">
        Verificando sesión...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />

      {/* Si mostrarAuth es true, se abre el modal */}
      {mostrarAuth && !autenticado && <AuthPage onCancel={cerrarAuth} />}
    </div>
  );
}
