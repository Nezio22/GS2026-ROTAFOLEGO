import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Pontos from "./pages/Pontos";
import PontoDetalhe from "./pages/PontoDetalhe";
import PlanejarTrajeto from "./pages/PlanejarTrajeto";
import Sobre from "./pages/Sobre";
import Integrantes from "./pages/Integrantes";
import IntegranteDetalhe from "./pages/IntegranteDetalhe";
import Faq from "./pages/Faq";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Institucionais */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrante/:rm" element={<IntegranteDetalhe />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />

          {/* Solução */}
          <Route path="/pontos" element={<Pontos />} />
          <Route path="/ponto/:id" element={<PontoDetalhe />} /> {/* rota dinâmica */}
          <Route path="/planejar" element={<PlanejarTrajeto />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
