import { type ReactNode, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/mentores', label: 'Mentores' },
  { to: '/amentorados', label: 'Amentorados' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/parcerias', label: 'Parcerias' },
  { to: '/encontros', label: 'Encontros' },
  { to: '/roteiro', label: 'Roteiro' },
  { to: '/metas', label: 'Metas/ODS' },
  { to: '/blog', label: 'Blog' },
  { to: '/contato', label: 'Contato' },
];

const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-sm text-ink-500 hover:text-brand-green">
    {children}
  </a>
);

export function Layout() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <div className="min-h-screen bg-surface-50">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-brand-amber focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Ir para o conteúdo principal
      </a>
      <motion.header
        className="sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur shadow-none"
        style={{ boxShadow: shadowOpacity.to((value) => `0px 1px 0px rgba(17, 19, 21, ${0.06 * value})`) }}
        role="banner"
      >
        <div className="app-container flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-green text-lg font-bold text-white">
              GMS
            </span>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-ink-900">Mentoria Solidária</span>
              <span className="text-sm text-ink-500">Rede colaborativa de impacto</span>
            </div>
          </div>
          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-2 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green',
                        isActive ? 'bg-surface-100 text-brand-green' : 'text-ink-700'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="secondary" size="sm">
              <NavLink to="/mentores">Quero ser mentor(a)</NavLink>
            </Button>
            <Button asChild size="sm" variant="default">
              <NavLink to="/contato">Tenho um projeto</NavLink>
            </Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="secondary" aria-label="Abrir menu">
                <span className="sr-only">Abrir menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-label="Menu de navegação">
              <SheetHeader>
                <SheetTitle className="text-ink-900">Navegue pela GMS</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 text-base">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'rounded-xl px-3 py-2 font-medium',
                        isActive ? 'bg-surface-100 text-brand-green' : 'text-ink-700 hover:bg-surface-50'
                      )
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Button asChild variant="secondary">
                  <NavLink to="/mentores" onClick={() => setOpen(false)}>
                    Quero ser mentor(a)
                  </NavLink>
                </Button>
                <Button asChild variant="tonal">
                  <NavLink to="/contato" onClick={() => setOpen(false)}>
                    Tenho um projeto
                  </NavLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.header>
      <main id="conteudo-principal" className="app-container pb-16 pt-10">
        <Outlet />
      </main>
      <footer className="bg-surface-100" aria-label="Rodapé">
        <div className="app-container grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold">Mentoria Solidária</h2>
            <p className="mt-3 text-sm text-ink-500">
              Rede colaborativa de mentoria para acelerar projetos com impacto social e ambiental na Região Metropolitana de
              Campinas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Institucional</h3>
            <FooterLink href="/politica">Política de privacidade</FooterLink>
            <FooterLink href="/contato">Contato</FooterLink>
            <FooterLink href="/parcerias">Apoiadores</FooterLink>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">Newsletter</h3>
            <p className="text-sm text-ink-500">
              Cadastre-se para acompanhar mentorias, encontros e oportunidades da comunidade GMS.
            </p>
            <form className="flex w-full max-w-sm gap-2" noValidate onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="newsletter-email">
                E-mail
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                className="h-11 flex-1 rounded-xl border border-ink-500/20 bg-white px-4 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="seuemail@exemplo.com"
              />
              <Button type="submit" size="sm">
                Assinar
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-surface-100">
          <div className="app-container flex flex-col gap-3 py-6 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} GMS Mentoria Solidária. Todos os direitos reservados.</span>
            <span>Feito em colaboração com a rede de voluntariado.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
