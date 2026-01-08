import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Eye, DollarSign, Calendar, User, CreditCard, FileText } from 'lucide-react';

interface VisualizarPagamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pagamento: any;
}

export function VisualizarPagamentoModal({ open, onOpenChange, pagamento }: VisualizarPagamentoModalProps) {
  if (!pagamento) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'atrasado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'estornado':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pago':
        return 'Pago';
      case 'pendente':
        return 'Pendente';
      case 'atrasado':
        return 'Atrasado';
      case 'estornado':
        return 'Estornado';
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Eye className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Detalhes do Pagamento
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Visualizar informações completas do pagamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header com status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  R$ {pagamento.valor.toFixed(2).replace('.', ',')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pagamento.procedimento}</p>
              </div>
            </div>
            <Badge className={getStatusColor(pagamento.status)}>
              {getStatusText(pagamento.status)}
            </Badge>
          </div>

          {/* Informações do Paciente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-sm">Paciente</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {pagamento.paciente}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Procedimento</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {pagamento.procedimento}
              </p>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Valor</span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">
                R$ {pagamento.valor.toFixed(2).replace('.', ',')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Forma de Pagamento</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {pagamento.formaPagamento || 'Não informado'}
              </p>
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Data do Pagamento</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(pagamento.data).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Data de Vencimento</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(pagamento.vencimento).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Observações */}
          {pagamento.observacoes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Observações</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-[#1a2e27] rounded-lg border border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-900 dark:text-white">
                  {pagamento.observacoes}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
