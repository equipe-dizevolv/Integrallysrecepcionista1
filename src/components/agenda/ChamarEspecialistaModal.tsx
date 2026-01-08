import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Bell, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ChamarEspecialistaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: any;
  onNotificationSent: (notification: any) => void;
}

export function ChamarEspecialistaModal({ 
  open, 
  onOpenChange, 
  consulta,
  onNotificationSent
}: ChamarEspecialistaModalProps) {
  const [especialistaSelecionado, setEspecialistaSelecionado] = useState(consulta?.especialista || '');
  const [mensagem, setMensagem] = useState('Paciente chegou e está pronto.');

  const especialistas = [
    'Dr. João Santos',
    'Dra. Ana Lima',
    'Dr. Carlos Rocha',
    'Dra. Lucia Mendes',
    'Dr. Paulo Silva',
    'Dra. Sofia Castro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!especialistaSelecionado) {
      toast.error('Selecione um especialista');
      return;
    }

    // Criar objeto de notificação
    const notification = {
      id: Date.now(),
      consultaId: consulta.id,
      paciente: consulta.paciente,
      especialista: especialistaSelecionado,
      mensagem,
      timestamp: new Date().toISOString(),
      status: 'enviado', // enviado -> entregue -> visto -> atendido
      tipo: 'alta', // alta prioridade
      remetente: 'Ana Recepcionista'
    };

    // Callback para adicionar à lista de notificações
    onNotificationSent(notification);

    // Feedback
    toast.success(`Aviso enviado ao ${especialistaSelecionado}`);
    
    // Fechar modal
    onOpenChange(false);
    
    // Reset
    setMensagem('Paciente chegou e está pronto.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Chamar Especialista
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Envie uma notificação de alta prioridade ao especialista
          </DialogDescription>
        </DialogHeader>

        {consulta && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Paciente: {consulta.paciente}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {consulta.horario} • {consulta.tipo}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="especialista" className="text-gray-900 dark:text-white">
              Especialista *
            </Label>
            <Select 
              value={especialistaSelecionado} 
              onValueChange={setEspecialistaSelecionado}
              required
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                <SelectValue placeholder="Selecione o especialista" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                {especialistas.map((esp) => (
                  <SelectItem key={esp} value={esp}>
                    {esp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem" className="text-gray-900 dark:text-white">
              Mensagem (opcional)
            </Label>
            <Textarea
              id="mensagem"
              placeholder="Paciente chegou e está pronto."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}