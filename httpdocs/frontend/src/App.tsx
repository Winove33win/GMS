import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';
import Mentores from '@/pages/Mentores';
import Amentorados from '@/pages/Amentorados';
import Projetos from '@/pages/Projetos';
import ProjetoDetalhe from '@/pages/ProjetoDetalhe';
import Parcerias from '@/pages/Parcerias';
import Encontros from '@/pages/Encontros';
import Roteiro from '@/pages/Roteiro';
import Metas from '@/pages/Metas';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contato from '@/pages/Contato';

function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-ink-900">Página não encontrada</h1>
      <p className="text-sm text-ink-600">Verifique o endereço digitado ou volte para a página inicial.</p>
      <a className="text-brand-green underline" href="/">
        Ir para a home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mentores" element={<Mentores />} />
        <Route path="amentorados" element={<Amentorados />} />
        <Route path="projetos" element={<Projetos />} />
        <Route path="projetos/:slug" element={<ProjetoDetalhe />} />
        <Route path="parcerias" element={<Parcerias />} />
        <Route path="encontros" element={<Encontros />} />
        <Route path="roteiro" element={<Roteiro />} />
        <Route path="metas" element={<Metas />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
