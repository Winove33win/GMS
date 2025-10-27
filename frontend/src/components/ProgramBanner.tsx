import { useState } from "react"
import { ProgramModal } from "@/components/ProgramModal"

export function ProgramBanner() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-3xl border border-brand-green/30 bg-brand-green/10 p-6 text-brand-dark">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-brand-dark">
            Mentoria em grupo, 1× por semana. Cada encontro reúne vários mentores. Você participa do encontro coletivo e tem acesso a todos os mentores online naquele dia — não fazemos agendamento individual.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-brand-green/40 px-4 py-2 text-sm font-semibold text-brand-green transition hover:border-brand-green/60 hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          Como funcionam os encontros
        </button>
      </div>
      <ProgramModal open={open} onOpenChange={setOpen} />
    </div>
  )
}
