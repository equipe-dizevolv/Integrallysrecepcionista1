import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Bell, RefreshCw, X as XIcon, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: number;
  consultaId: number;
  paciente: string;
  especialista: string;
  mensagem: string;
  timestamp: string;
  status: 'enviado' | 'entregue' | 'visto' | 'atendido';
  tipo: 'normal' | 'alta';
  remetente: string;
}

interface NotificacoesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onReenviar: (notificationId: number) => void;
  onCancelar: (notificationId: number) => void;
}

export function NotificacoesDrawer({ 
  open, 
  onOpenChange, 
  notifications,
  onReenviar,
  onCancelar
}: NotificacoesDrawerProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'entregue':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'visto':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'atendido':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'enviado':
        return 'Enviado';
      case 'entregue':
        return 'Entregue';
      case 'visto':
        return 'Visto';
      case 'atendido':
        return 'Atendido';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enviado':
        return <Clock className="w-3 h-3" />;
      case 'entregue':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'visto':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'atendido':
        return <CheckCircle2 className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const canReenviar = (notification: Notification) => {
    if (notification.status !== 'enviado') return false;
    const timeSent = new Date(notification.timestamp).getTime();
    const now = new Date().getTime();
    const minutesPassed = (now - timeSent) / 1000 / 60;
    return minutesPassed >= 2;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleReenviar = (notificationId: number) => {
    onReenviar(notificationId);
    toast.success('Notificação reenviada com sucesso');
  };

  const handleCancelar = (notificationId: number) => {
    onCancelar(notificationId);
    toast.success('Aviso cancelado');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[320px] sm:w-[400px] bg-white dark:bg-[#12211c] border-l border-gray-200 dark:border-gray-600 p-0"
      >
        <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-600">
          <SheetTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Bell className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Notificações
          </SheetTitle>
          <SheetDescription className="text-gray-600 dark:text-gray-400">
            {notifications.length} {notifications.length === 1 ? 'notificação' : 'notificações'}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nenhuma notificação enviada
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg border border-gray-200 dark:border-gray-600 space-y-3"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-[#244738] dark:text-[#10b981]" />
                        <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                          {notification.paciente}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Para: {notification.especialista}
                      </p>
                    </div>
                    <Badge 
                      className={`${getStatusColor(notification.status)} text-xs flex items-center gap-1`}
                    >
                      {getStatusIcon(notification.status)}
                      {getStatusText(notification.status)}
                    </Badge>
                  </div>

                  {/* Mensagem */}
                  {notification.mensagem && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#12211c] p-2 rounded border border-gray-200 dark:border-gray-600">
                      {notification.mensagem}
                    </p>
                  )}

                  {/* Footer com tempo e tipo */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(notification.timestamp)}
                    </div>
                    {notification.tipo === 'alta' && (
                      <Badge variant="outline" className="text-xs border-orange-400 text-orange-600 dark:text-orange-400">
                        Alta Prioridade
                      </Badge>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReenviar(notification.id)}
                      disabled={!canReenviar(notification)}
                      className="flex-1 text-xs h-8 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#12211c] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Reenviar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelar(notification.id)}
                      className="flex-1 text-xs h-8 border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400"
                    >
                      <XIcon className="w-3 h-3 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
