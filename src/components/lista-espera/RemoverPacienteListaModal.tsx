import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RemoverPacienteListaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
  onRemover: (pacienteId: number) => void;
}

export function RemoverPacienteListaModal({
  open,
  onOpenChange,
  paciente,
  onRemover
}: RemoverPacienteListaModalProps) {
  const handleConfirm = () => {
    onRemover(paciente.id);
    toast.success(`${paciente.paciente} removido da lista de espera`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Remover da Lista de Espera
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Confirme a remoção do paciente da lista de espera.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Tem certeza que deseja remover <strong className="text-gray-900 dark:text-white">{paciente?.paciente}</strong> da lista de espera?
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-sm text-yellow-800 dark:text-yellow-400">
              Esta ação não poderá ser desfeita. O paciente precisará ser adicionado novamente se necessário.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#12211c]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remover da Lista
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
