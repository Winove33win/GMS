import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/Button"

interface ProgramModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProgramModal({ open, onOpenChange }: ProgramModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-labelledby="program-modal-title">
        <DialogHeader>
          <DialogTitle id="program-modal-title">Como funcionam os encontros</DialogTitle>
          <DialogDescription>
            Saiba o que esperar dos encontros coletivos do programa Mentoria Solidária.
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Formato coletivo e remoto</li>
          <li>Duração 60 min, 1×/semana</li>
          <li>Inscrição por coorte/data</li>
          <li>Toda comunicação via GMS (sem contato direto com mentores)</li>
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
