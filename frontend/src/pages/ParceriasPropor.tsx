import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/lib/seo";
import { buttonClasses } from "@/components/Button";
import { toast } from "@/components/ui/use-toast";

const partnerTypes = ["Empresa", "Fundação", "Universidade", "Governo", "ONG", "Outro"] as const;
const partnerCategories = [
  "Conhecimento",
  "Infraestrutura",
  "Comunicação",
  "Financiamento",
  "Governança/ESG",
];
const odsOptions = Array.from({ length: 17 }, (_, index) => index + 1);
const windowOptions = [
  { value: "", label: "Selecione uma janela" },
  { value: "prox-trimestre", label: "Próximo trimestre" },
  { value: "semestre", label: "Próximo semestre" },
  { value: "ano", label: "Dentro de 12 meses" },
  { value: "avaliar", label: "A definir" },
];

type FormState = {
  organization: string;
  type: (typeof partnerTypes)[number] | "";
  website: string;
  contactName: string;
  contactEmail: string;
  categories: string[];
  ods: number[];
  objective: string;
  window: string;
  policyAccepted: boolean;
};

const initialState: FormState = {
  organization: "",
  type: "",
  website: "",
  contactName: "",
  contactEmail: "",
  categories: [],
  ods: [],
  objective: "",
  window: "",
  policyAccepted: false,
};

export default function ParceriasPropor() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const navigate = useNavigate();

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, selectedOptions, value } = event.target;
    if (name === "ods") {
      const values = Array.from(selectedOptions).map((option) => Number(option.value));
      setFormState((prev) => ({ ...prev, ods: values }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleCategory = (category: string) => {
    setFormState((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.policyAccepted) {
      return;
    }

    const payload = {
      ...formState,
      submittedAt: new Date().toISOString(),
    };

    console.log("Parceria proposta", payload);
    toast({
      title: "Recebemos sua proposta",
      description: "Nossa equipe vai analisar e responder dentro da janela do programa.",
    });
    setFormState(initialState);
    navigate("/parcerias?proposta=ok");
  };

  return (
    <>
      <SEO
        title="Propor parceria — Mentoria Solidária (GMS)"
        description="Envie informações da sua organização para cocriar iniciativas com a Mentoria Solidária."
        canonical="/parcerias/propor"
      />
      <main className="bg-surface text-ink">
        <section className="py-16">
          <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6">
            <header className="space-y-4 text-center">
              <h1 className="text-3xl font-semibold text-brand-dark sm:text-4xl">Propor parceria</h1>
              <p className="text-base text-ink-muted">
                Toda parceria é operada via GMS, alinhada às janelas de programa e sem contato direto com mentores.
              </p>
            </header>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 rounded-3xl border border-[rgba(15,15,15,0.08)] bg-white p-8 shadow-card-soft"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 space-y-2">
                  <label htmlFor="organization" className="text-sm font-semibold text-brand-dark">
                    Organização
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    required
                    value={formState.organization}
                    onChange={handleChange("organization")}
                    className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    placeholder="Nome da organização"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-semibold text-brand-dark">
                    Tipo de organização
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formState.type}
                    onChange={handleSelectChange}
                    className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {partnerTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-semibold text-brand-dark">
                    Site ou LinkedIn
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formState.website}
                    onChange={handleChange("website")}
                    className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    placeholder="https://"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactName" className="text-sm font-semibold text-brand-dark">
                    Nome do contato
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    required
                    value={formState.contactName}
                    onChange={handleChange("contactName")}
                    className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    placeholder="Quem será o ponto focal"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactEmail" className="text-sm font-semibold text-brand-dark">
                    E-mail do contato
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    required
                    value={formState.contactEmail}
                    onChange={handleChange("contactEmail")}
                    className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                    placeholder="nome@organizacao.org"
                  />
                </div>
              </div>
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-brand-dark">Categoria de parceria</legend>
                <div className="flex flex-wrap gap-3">
                  {partnerCategories.map((category) => {
                    const checked = formState.categories.includes(category);
                    return (
                      <label
                        key={category}
                        className={`group inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-xs font-semibold transition focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-offset-2 ${
                          checked
                            ? "bg-brand-green text-white shadow-card-soft"
                            : "bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="categories"
                          value={category}
                          checked={checked}
                          onChange={() => toggleCategory(category)}
                          className="sr-only"
                        />
                        <span>{category}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="ods" className="text-sm font-semibold text-brand-dark">
                    ODS de interesse
                  </label>
                  <select
                    id="ods"
                    name="ods"
                    multiple
                    value={formState.ods.map(String)}
                    onChange={handleSelectChange}
                    className="min-h-[120px] w-full rounded-3xl border border-[rgba(15,15,15,0.12)] px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    {odsOptions.map((value) => (
                      <option key={value} value={value}>
                        ODS {value}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-ink-muted">Segure Ctrl ou Cmd para selecionar mais de uma opção.</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="window" className="text-sm font-semibold text-brand-dark">
                    Janela desejada
                  </label>
                  <select
                    id="window"
                    name="window"
                    value={formState.window}
                    onChange={handleSelectChange}
                    className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.12)] px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  >
                    {windowOptions.map((option) => (
                      <option key={option.value || "empty"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="objective" className="text-sm font-semibold text-brand-dark">
                  Objetivo da parceria
                </label>
                <textarea
                  id="objective"
                  name="objective"
                  required
                  value={formState.objective}
                  onChange={handleChange("objective")}
                  className="min-h-[140px] w-full rounded-3xl border border-[rgba(15,15,15,0.12)] px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                  placeholder="Descreva o desafio, metas e recursos envolvidos"
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  name="policyAccepted"
                  required
                  checked={formState.policyAccepted}
                  onChange={handleChange("policyAccepted")}
                  className="mt-1 h-4 w-4 rounded border border-[rgba(15,15,15,0.25)] text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                />
                <span>
                  Concordo com a Política de participação e autorizo o contato da equipe GMS.
                </span>
              </label>
              <div className="flex justify-end">
                <button type="submit" className={buttonClasses()}>
                  Enviar proposta
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
