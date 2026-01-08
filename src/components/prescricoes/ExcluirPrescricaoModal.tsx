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
import { Badge } from '../ui/badge';

interface ExcluirPrescricaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescricao: {
    id: number;
    numero: string;
    paciente: string;
    dataCriacao: string;
    valorTotal: number;
    tipo: string;
    status: string;
  } | null;
}

export function ExcluirPrescricaoModal({ open, onOpenChange, prescricao }: ExcluirPrescricaoModalProps) {
  if (!prescricao) return null;

  const handleConfirm = () => {
    // Lógica para excluir a prescrição
    toast.success('Prescrição excluída com sucesso!', {
      description: `A prescrição ${prescricao.numero} foi removida do sistema.`
    });
    onOpenChange(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'vencida':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'Ativa';
      case 'vencida':
        return 'Vencida';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
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
              Excluir Prescrição
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            Tem certeza que deseja excluir esta prescrição? Esta ação não poderá ser desfeita e todos os dados relacionados serão perdidos.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Detalhes da Prescrição */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Número:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {prescricao.numero}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Paciente:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {prescricao.paciente}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Data de Criação:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(prescricao.dataCriacao).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Valor Total:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              R$ {prescricao.valorTotal.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Tipo:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {prescricao.tipo}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
            <Badge className={getStatusColor(prescricao.status)}>
              {getStatusText(prescricao.status)}
            </Badge>
          </div>
        </div>

        {/* Aviso Importante */}
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-400">
            <strong>Atenção:</strong> Esta ação é permanente e não pode ser revertida. Certifique-se de que deseja realmente excluir esta prescrição.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700"
          >
            Excluir Prescrição
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
