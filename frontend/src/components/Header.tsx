import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Início", href: "/", end: true },
  { label: "Mentores", href: "/mentores" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((value) => !value);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-neutral-600"
          onClick={closeMenu}
        >
          Mentoria Solidária
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-500 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `transition-colors hover:text-neutral-900 ${isActive ? "text-neutral-900 font-semibold" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:hidden"
          onClick={toggleMenu}
          aria-label="Alternar menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium text-neutral-500">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition-colors hover:bg-neutral-100 hover:text-neutral-900 ${
                    isActive ? "text-neutral-900 font-semibold" : ""
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
