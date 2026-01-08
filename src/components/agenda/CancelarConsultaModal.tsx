import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CancelarConsultaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: any;
}

export function CancelarConsultaModal({ open, onOpenChange, consulta }: CancelarConsultaModalProps) {
  const [motivo, setMotivo] = useState('');

  const handleCancelar = () => {
    if (!motivo.trim()) {
      toast.error('Informe o motivo do cancelamento');
      return;
    }

    toast.success('Consulta cancelada com sucesso!');
    onOpenChange(false);
    setMotivo('');
  };

  if (!consulta) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Cancelar Consulta
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Cancele a consulta agendada informando o motivo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Aviso */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-400">
              ⚠️ Esta ação não pode ser desfeita. A consulta será removida da agenda.
            </p>
          </div>

          {/* Informações da consulta */}
          <div className="p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Consulta a ser cancelada</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Paciente:</strong> {consulta.paciente}</p>
              <p><strong>Especialista:</strong> {consulta.especialista}</p>
              <p><strong>Horário:</strong> {consulta.horario}</p>
              <p><strong>Tipo:</strong> {consulta.tipo}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo" className="text-gray-900 dark:text-white">Motivo do Cancelamento *</Label>
            <Input
              id="motivo"
              placeholder="Informe o motivo do cancelamento"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
            >
              Voltar
            </Button>
            <Button 
              onClick={handleCancelar}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Confirmar Cancelamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}