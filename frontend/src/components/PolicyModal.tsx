import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"

interface PolicyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PolicyModal({ open, onOpenChange }: PolicyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-labelledby="policy-title">
        <DialogHeader>
          <DialogTitle id="policy-title">Política de participação</DialogTitle>
          <DialogDescription>
            Conheça os princípios do programa Mentoria Solidária antes de solicitar sua conexão.
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Mentoria voluntária, sem custo.</li>
          <li>Encontros 1×/semana, 60 min, por 6–8 semanas.</li>
          <li>Agendamento apenas nas janelas do programa.</li>
          <li>Toda comunicação acontece pelo Mentoria Solidária.</li>
        </ul>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
