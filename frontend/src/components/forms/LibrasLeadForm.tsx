import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = { onSuccess?: () => void };

export function LibrasLeadForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [hp, setHp] = useState(""); // honeypot

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hp) return; // bot

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/leads/libras`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      onSuccess?.();
      (e.currentTarget as HTMLFormElement).reset();
      window.gtag?.("event", "lead_submit", { service: "libras" });
    } catch (err) {
      alert("Não foi possível enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="hp_field"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <input required name="nome" placeholder="Seu nome*" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
        <input required type="email" name="email" placeholder="E-mail corporativo*" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
        <input name="telefone" placeholder="Telefone/WhatsApp" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
        <input name="empresa" placeholder="Empresa" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <select name="tipoServico" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800">
          <option value="Presencial SP">Presencial (São Paulo)</option>
          <option value="Gravado/Janela">Conteúdos gravados (janela de Libras)</option>
        </select>
        <input type="date" name="dataEvento" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input name="local" placeholder="Local do evento (se presencial)" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
        <input name="tamanhoPublico" placeholder="Público estimado (ex.: 200)" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input name="duracao" placeholder="Duração prevista (ex.: 2h)" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
        <input name="linkVideo" placeholder="Link do vídeo (se conteúdo gravado)" className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800" />
      </div>

      <textarea name="descricao" placeholder="Conte mais sobre o evento/vídeo"
        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 min-h-[120px]" />

      <label className="flex items-start gap-2 text-sm text-neutral-300">
        <input required type="checkbox" name="lgpdConsent" className="mt-1" />
        Autorizo o contato para fins de orçamento, conforme LGPD.
      </label>

      <button disabled={loading}
        className="px-5 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold disabled:opacity-60">
        {loading ? "Enviando..." : "Solicitar orçamento"}
      </button>
    </form>
  );
}
