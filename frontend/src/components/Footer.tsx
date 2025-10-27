import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { buttonClasses } from "@/components/Button";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) {
      console.info("Newsletter signup:", email.trim());
      setEmail("");
    }
  };

  return (
    <footer className="bg-ink text-white" role="contentinfo">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-white">
            <span aria-hidden className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-white">
              MS
            </span>
            Mentoria Solidária
          </Link>
          <p className="max-w-xl text-sm text-white/80">
            Mentoria Solidária. Rede colaborativa para acelerar soluções alinhadas aos ODS.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            <a href="mailto:contato@mentoriasolidaria.org" className="hover:text-white">
              contato@mentoriasolidaria.org
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="grid gap-10 text-sm text-white/70 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Institucional</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/sobre" className="hover:text-white">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="hover:text-white">
                  Projetos
                </Link>
              </li>
              <li>
                <Link to="/mentores" className="hover:text-white">
                  Mentores
                </Link>
              </li>
              <li>
                <Link to="/participar" className="hover:text-white">
                  Quero participar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Newsletter</h3>
            <p className="mt-4 text-sm text-white/70">
              Receba novidades e oportunidades da rede colaborativa.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                E-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Seu melhor e-mail"
                className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              />
              <button
                type="submit"
                className={buttonClasses(
                  "secondary",
                  "h-12 rounded-full border-white/40 bg-white text-brand-dark hover:bg-white/90 sm:px-6",
                )}
              >
                Assinar
              </button>
            </form>
            <p className="mt-2 text-xs text-white/60">Sem spam. Cancelamento a qualquer momento.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>&copy; {new Date().getFullYear()} Mentoria Solidária. Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/termos" className="hover:text-white">
              Termos de uso
            </Link>
            <Link to="/privacidade" className="hover:text-white">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
