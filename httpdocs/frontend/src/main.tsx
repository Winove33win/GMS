import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Mentores from './pages/Mentores';
import Amentorados from './pages/Amentorados';
import Projetos from './pages/Projetos';
import ProjetoDetalhe from './pages/ProjetoDetalhe';
import Parcerias from './pages/Parcerias';
import Encontros from './pages/Encontros';
import Roteiro from './pages/Roteiro';
import Metas from './pages/Metas';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contato from './pages/Contato';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/mentores" element={<Mentores />} />
        <Route path="/amentorados" element={<Amentorados />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/:slug" element={<ProjetoDetalhe />} />
        <Route path="/parcerias" element={<Parcerias />} />
        <Route path="/encontros" element={<Encontros />} />
        <Route path="/roteiro" element={<Roteiro />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contato" element={<Contato />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
