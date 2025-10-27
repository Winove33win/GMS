import { FormEvent, useState } from "react";
import { SEO } from "@/lib/seo";
import { Section } from "@/components/Section";
import { buttonClasses } from "@/components/Button";
import { toast } from "@/components/ui/use-toast";

export default function Participar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("quero mentorar");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { name, email, profile, message };
    console.info("Participar form submitted", payload);
    toast({ title: "Recebemos seu contato", description: "Em breve retornaremos com os próximos passos." });
    setName("");
    setEmail("");
    setProfile("quero mentorar");
    setMessage("");
  };

  return (
    <>
      <SEO
        title="Participar da Mentoria Solidária"
        description="Envie seu interesse para ser mentor voluntário ou apresentar um projeto socioambiental."
        canonical="/participar"
      />
      <main>
        <Section
          title="Participar"
          description="Preencha o formulário e conte como deseja contribuir: como mentor voluntário ou trazendo um projeto para evoluir com a rede."
        >
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 rounded-[1.5rem] border border-[rgba(15,15,15,0.08)] bg-white p-8 shadow-card-soft">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-brand-dark">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como devemos te chamar?"
                className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-brand-dark">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nome@exemplo.com"
                className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-semibold text-brand-dark">Perfil</span>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className={`flex-1 cursor-pointer rounded-[1.25rem] border px-4 py-3 text-sm transition ${
                  profile === "quero mentorar" ? "border-brand-green bg-brand-green/10 text-brand-dark" : "border-[rgba(15,15,15,0.12)]"
                }`}>
                  <input
                    type="radio"
                    name="profile"
                    value="quero mentorar"
                    checked={profile === "quero mentorar"}
                    onChange={(event) => setProfile(event.target.value)}
                    className="sr-only"
                  />
                  Quero mentorar
                </label>
                <label className={`flex-1 cursor-pointer rounded-[1.25rem] border px-4 py-3 text-sm transition ${
                  profile === "tenho projeto" ? "border-brand-green bg-brand-green/10 text-brand-dark" : "border-[rgba(15,15,15,0.12)]"
                }`}>
                  <input
                    type="radio"
                    name="profile"
                    value="tenho projeto"
                    checked={profile === "tenho projeto"}
                    onChange={(event) => setProfile(event.target.value)}
                    className="sr-only"
                  />
                  Tenho um projeto
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-brand-dark">
                Mensagem
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                placeholder="Conte rapidamente qual é o desafio e como podemos apoiar."
                className="w-full rounded-3xl border border-[rgba(15,15,15,0.1)] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className={buttonClasses("primary")}>Enviar formulário</button>
            </div>
          </form>
        </Section>
      </main>
    </>
  );
}
