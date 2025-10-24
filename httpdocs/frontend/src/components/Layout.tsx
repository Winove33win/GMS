import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  'sobre',
  'mentores',
  'amentorados',
  'projetos',
  'parcerias',
  'encontros',
  'roteiro',
  'metas',
  'blog',
  'contato',
];

const NavItem = ({ to }: { to: string }) => (
  <NavLink
    to={`/${to}`}
    className={({ isActive }) =>
      `capitalize hover:underline ${isActive ? 'font-semibold underline' : ''}`
    }
  >
    {to}
  </NavLink>
);

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark">
      <header className="border-b border-neutral-200">
        <nav className="container flex flex-wrap items-center justify-between py-4 gap-4">
          <Link to="/" className="font-extrabold text-xl tracking-tight">
            Mentoria Solidária
          </Link>
          <div className="flex flex-wrap gap-4 text-sm">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item} to={item} />
            ))}
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <div className="container py-10">
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="container flex flex-col gap-2 py-6 text-sm text-neutral-600">
          <span>© {new Date().getFullYear()} Mentoria Solidária</span>
          <span>
            Rede colaborativa voluntária conectando mentores e amentorados para gerar impacto
            socioambiental.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
