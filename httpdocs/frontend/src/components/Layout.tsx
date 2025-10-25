import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

const Nav = () => (
  <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
    <Link to="/" className="font-extrabold text-xl">
      Mentoria Solidária
    </Link>
    <div className="flex gap-4 text-sm">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "font-semibold underline" : "hover:underline"
        }
      >
        Início
      </NavLink>
      <NavLink
        to="/mentores"
        className={({ isActive }) =>
          isActive ? "font-semibold underline" : "hover:underline"
        }
      >
        Mentores
      </NavLink>
    </div>
  </nav>
);

export default function Layout() {
  return (
    <>
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="container mx-auto px-4 py-10 text-sm text-neutral-500">
        © Mentoria Solidária
      </footer>
    </>
  );
}
