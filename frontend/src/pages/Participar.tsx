import { FormEvent, useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import sessionsData from "@/data/sessions.json"
import type { CollectiveSession } from "@/types/program"
import { SEO } from "@/lib/seo"
import { Section } from "@/components/Section"
import { buttonClasses } from "@/components/Button"
import { toast } from "@/components/ui/use-toast"
import { formatLanguageName, formatSessionCompact } from "@/lib/format"

const sessions = sessionsData as CollectiveSession[]

export default function Participar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [challenge, setChallenge] = useState("")
  const [areas, setAreas] = useState("")
  const [preferredLanguage, setPreferredLanguage] = useState("Português")
  const [cohortId, setCohortId] = useState("")
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const preselectedCohort = searchParams.get("coorte") ?? ""
  const mentorInfo = searchParams.get("mentorInfo") ?? ""

  useEffect(() => {
    if (preselectedCohort && sessions.some((session) => session.id === preselectedCohort)) {
      setCohortId(preselectedCohort)
    }
  }, [preselectedCohort])

  const sessionOptions = useMemo(
    () =>
      sessions.map((session) => ({
        id: session.id,
        label: `${formatSessionCompact(session.date, session.time)} • ${session.lang.map((code) => formatLanguageName(code)).join(" / ")}`,
      })),
    [],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!policyAccepted) {
      setSubmitMessage("É necessário aceitar a política de participação para concluir sua inscrição.")
      return
    }

    const payload = {
      name,
      email,
      challenge,
      areas,
      preferredLanguage,
      cohortId,
      mentorInfo,
    }

    console.info("Inscrição em encontro coletivo", payload)
    toast({
      title: "Inscrição enviada",
      description: "Recebemos suas informações. Em breve entraremos em contato com os próximos passos.",
    })
    setSubmitMessage("Inscrição enviada com sucesso. Você será redirecionado para a lista de mentores.")

    setName("")
    setEmail("")
    setChallenge("")
    setAreas("")
    setPreferredLanguage("Português")
    setCohortId("")
    setPolicyAccepted(false)

    navigate("/mentores?inscricao=ok", { replace: true })
  }

  return (
    <>
      <SEO
        title="Participar dos encontros coletivos"
        description="Escolha a próxima data de encontro coletivo e conte como a rede GMS pode apoiar sua iniciativa."
        canonical="/participar"
      />
      <main>
        <Section
          title="Participar"
          description="Preencha o formulário para se inscrever nos encontros coletivos da sua coorte. A equipe GMS fará a curadoria dos mentores que estarão online na data escolhida."
        >
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-2xl space-y-6 rounded-[1.5rem] border border-[rgba(15,15,15,0.08)] bg-white p-8 shadow-card-soft"
          >
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
              <label htmlFor="challenge" className="text-sm font-semibold text-brand-dark">
                Seu desafio
              </label>
              <textarea
                id="challenge"
                required
                value={challenge}
                onChange={(event) => setChallenge(event.target.value)}
                rows={5}
                placeholder="Conte rapidamente qual é o desafio e o contexto do projeto."
                className="w-full rounded-3xl border border-[rgba(15,15,15,0.1)] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="areas" className="text-sm font-semibold text-brand-dark">
                Áreas/ODS de interesse
              </label>
              <input
                id="areas"
                type="text"
                value={areas}
                onChange={(event) => setAreas(event.target.value)}
                placeholder="Ex.: Governança, ODS 13, captação de recursos"
                className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.1)] px-4 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-semibold text-brand-dark">
                Idioma preferido
              </label>
              <select
                id="language"
                value={preferredLanguage}
                onChange={(event) => setPreferredLanguage(event.target.value)}
                className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.1)] bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <option value="Português">Português</option>
                <option value="Inglês">Inglês</option>
                <option value="Espanhol">Espanhol</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="cohort" className="text-sm font-semibold text-brand-dark">
                Escolha o encontro coletivo
              </label>
              <select
                id="cohort"
                required
                value={cohortId}
                onChange={(event) => setCohortId(event.target.value)}
                className="h-12 w-full rounded-full border border-[rgba(15,15,15,0.1)] bg-white px-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <option value="" disabled>
                  Selecione uma data
                </option>
                {sessionOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-start gap-3 rounded-3xl bg-slate-50 p-4">
              <input
                id="policy"
                type="checkbox"
                required
                checked={policyAccepted}
                onChange={(event) => setPolicyAccepted(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              />
              <label htmlFor="policy" className="text-sm text-slate-700">
                Li e concordo com a política de participação: encontros coletivos, duração de 60 minutos e comunicação mediada pelo GMS.
              </label>
            </div>

            <div className="flex flex-col gap-2" role="status" aria-live="polite">
              <span className="sr-only">Status do envio</span>
              {submitMessage && <span className="text-sm text-slate-600">{submitMessage}</span>}
            </div>

            <div className="flex justify-end">
              <button type="submit" className={buttonClasses("primary")}>Participar do encontro coletivo</button>
            </div>
          </form>
        </Section>
      </main>
    </>
  )
}
