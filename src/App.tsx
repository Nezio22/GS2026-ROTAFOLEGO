import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Páginas institucionais */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/integrante/:rm" element={<IntegranteDetalhe />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />

        {/* Páginas da solução */}
        <Route path="/pontos" element={<Pontos />} />
        <Route path="/ponto/:id" element={<PontoDetalhe />} /> {/* rota dinâmica */}
        <Route path="/planejar" element={<PlanejarTrajeto />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
