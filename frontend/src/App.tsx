import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Mentores from "@/pages/Mentores";
import MentorDetail from "@/pages/MentorDetail";
import Projetos from "@/pages/Projetos";
import Sobre from "@/pages/Sobre";
import Participar from "@/pages/Participar";
import Termos from "@/pages/Termos";
import Privacidade from "@/pages/Privacidade";
import NotFound from "@/pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Header />
      <main id="conteudo-principal" className="flex min-h-screen flex-col bg-white text-ink">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mentores" element={<Mentores />} />
            <Route path="/mentores/:slug" element={<MentorDetail />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/participar" element={<Participar />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
