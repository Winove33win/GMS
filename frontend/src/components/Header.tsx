import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Cases", href: "/cases" },
  { label: "Templates", href: "/templates" },
  { label: "Cursos", href: "/cursos" },
  { label: "Contato", href: "/central-atendimento" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((value) => !value);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          onClick={closeMenu}
        >
          Winove Infrastructure
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={closeMenu}
              className={({ isActive }) =>
                `transition-colors hover:text-foreground ${isActive ? "text-foreground" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          onClick={toggleMenu}
          aria-label="Alternar menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium text-muted-foreground">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition-colors hover:bg-muted hover:text-foreground ${
                    isActive ? "text-foreground" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
