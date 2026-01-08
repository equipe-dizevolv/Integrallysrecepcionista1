import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface ExcluirPagamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pagamento: any;
}

export function ExcluirPagamentoModal({ open, onOpenChange, pagamento }: ExcluirPagamentoModalProps) {
  const handleExcluir = () => {
    toast.success('Pagamento excluído com sucesso!');
    onOpenChange(false);
  };

  if (!pagamento) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-white">
            Excluir Pagamento
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            Tem certeza que deseja excluir o pagamento de <strong>{pagamento.paciente}</strong> no valor de <strong>R$ {pagamento.valor.toFixed(2).replace('.', ',')}</strong>? 
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2e27]">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleExcluir}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
