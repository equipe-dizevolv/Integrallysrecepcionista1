import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { X, User, Calendar, Clock, Stethoscope, CreditCard, FileText } from 'lucide-react';

interface VisualizarConsultaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: any;
}

export function VisualizarConsultaModal({ 
  open, 
  onOpenChange, 
  consulta 
}: VisualizarConsultaModalProps) {
  if (!consulta) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'checkin':
        return 'bg-blue-200 text-blue-900 dark:bg-blue-800/30 dark:text-blue-300';
      case 'checkout':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'atraso':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmação de Consulta';
      case 'checkin':
        return 'Check-in';
      case 'checkout':
        return 'Check-out';
      case 'atraso':
        return 'Atraso';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'text-red-500';
      case 'parcial':
        return 'text-yellow-500';
      case 'completo':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pagamento pendente';
      case 'parcial':
        return 'Pagamento parcial';
      case 'completo':
        return 'Pagamento efetuado';
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Detalhes da Consulta
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Informações completas sobre o agendamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Paciente */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#244738] dark:text-[#10b981]" />
              <h3 className="font-medium text-gray-900 dark:text-white">Paciente</h3>
            </div>
            <div className="ml-6">
              <p className="font-medium text-gray-900 dark:text-white">{consulta.paciente}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {consulta.telefone || '(11) 9 9999-9999'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {consulta.email || 'paciente@email.com'}
              </p>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-600" />

          {/* Informações da Consulta */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#244738] dark:text-[#10b981]" />
              <h3 className="font-medium text-gray-900 dark:text-white">Consulta</h3>
            </div>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Especialista:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {consulta.especialista}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
                <Badge variant="outline" className="text-xs">
                  {consulta.tipo}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <Badge className={getStatusColor(consulta.status)}>
                  {getStatusText(consulta.status)}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-600" />

          {/* Informações de Data e Horário */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#244738] dark:text-[#10b981]" />
              <h3 className="font-medium text-gray-900 dark:text-white">Agendamento</h3>
            </div>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Data:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Horário:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {consulta.horario}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Duração:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {consulta.duracao}
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-600" />

          {/* Informações de Pagamento */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#244738] dark:text-[#10b981]" />
              <h3 className="font-medium text-gray-900 dark:text-white">Pagamento</h3>
            </div>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Valor:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  R$ {consulta.valor || '150,00'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getPaymentStatusColor(consulta.pagamentoStatus || 'pendente')}`}>
                    💸
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {getPaymentStatusText(consulta.pagamentoStatus || 'pendente')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {consulta.observacoes && (
            <>
              <Separator className="bg-gray-200 dark:bg-gray-600" />
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Observações</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#1a2e27] p-3 rounded-lg">
                  {consulta.observacoes}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}