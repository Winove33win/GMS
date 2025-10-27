import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { buttonClasses } from "@/components/Button";

const navigation = [
  { label: "Início", href: "/", end: true },
  { label: "Mentores", href: "/mentores" },
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 12);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition duration-default ease-soft ${
        scrolled ? "bg-white/95 shadow-[0_1px_0_rgba(15,15,15,0.08)] backdrop-blur" : "bg-white/70 backdrop-blur"
      }`}
    >
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-green focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo principal
      </a>
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-bold text-brand-dark"
          onClick={closeMenu}
          aria-label="Mentoria Solidária"
        >
          <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white">
            MS
          </span>
          <span className="font-display text-xl tracking-tight">Mentoria Solidária</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-muted lg:flex" aria-label="Menu principal">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `transition duration-default ease-soft hover:text-brand-dark ${
                  isActive ? "text-brand-dark" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/participar" className={buttonClasses("primary")}>Quero participar</Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-brand-dark transition hover:border-brand-green/30 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${
          open ? "max-h-screen opacity-100" : "pointer-events-none max-h-0 opacity-0"
        } border-t border-[rgba(15,15,15,0.08)] bg-white transition-[max-height,opacity] duration-200 ease-soft lg:hidden`}
      >
        <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-4 text-sm font-semibold text-brand-dark" aria-label="Menu principal">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 transition hover:bg-brand-green/10 ${isActive ? "bg-brand-green/10" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/participar" onClick={closeMenu} className={buttonClasses("primary", "mt-3 w-full justify-center")}>
            Quero participar
          </Link>
        </nav>
      </div>
    </header>
  );
}
