import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ExcluirPacienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
}

export function ExcluirPacienteModal({ open, onOpenChange, paciente }: ExcluirPacienteModalProps) {
  const handleExcluir = () => {
    // Simular exclusão
    toast.success('Paciente excluído com sucesso!');
    onOpenChange(false);
  };

  if (!paciente) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Excluir Paciente
          </DialogTitle>
          <DialogDescription>
            Remova permanentemente o paciente do sistema
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Aviso */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-400">
              ⚠️ Esta ação não pode ser desfeita. Todos os dados do paciente serão permanentemente removidos do sistema.
            </p>
          </div>

          {/* Informações do paciente */}
          <div className="p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{paciente.nome}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {paciente.email} • {paciente.telefone}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  CPF: {paciente.cpf}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Tem certeza que deseja excluir este paciente?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              • Histórico de consultas será mantido para fins de auditoria
              • O paciente não poderá mais agendar consultas
              • Esta ação é irreversível
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleExcluir}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Confirmar Exclusão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}