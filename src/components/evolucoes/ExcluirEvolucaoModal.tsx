import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { AlertTriangle } from 'lucide-react';

interface ExcluirEvolucaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evolucao: {
    id: number;
    paciente: string;
    data: string;
    tipo: string;
  } | null;
}

export function ExcluirEvolucaoModal({ open, onOpenChange, evolucao }: ExcluirEvolucaoModalProps) {
  if (!evolucao) return null;

  const handleConfirm = () => {
    // Lógica para excluir a evolução
    toast.success('Evolução excluída com sucesso!', {
      description: `A evolução de ${evolucao.paciente} foi removida do sistema.`
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-gray-900 dark:text-white">
              Excluir Evolução Clínica
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            Tem certeza que deseja excluir esta evolução clínica? Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Detalhes da Evolução */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Paciente:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {evolucao.paciente}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Data:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(evolucao.data).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Tipo:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {evolucao.tipo}
            </span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"
          >
            Excluir Evolução
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
