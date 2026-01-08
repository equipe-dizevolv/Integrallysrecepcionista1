import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RemarcarConsultaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: any;
}

export function RemarcarConsultaModal({ open, onOpenChange, consulta }: RemarcarConsultaModalProps) {
  const [formData, setFormData] = useState({
    data: '',
    horario: '',
    motivo: ''
  });

  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  useEffect(() => {
    if (consulta && open) {
      // Pré-preencher com data atual se disponível
      const hoje = new Date().toISOString().split('T')[0];
      setFormData({
        data: hoje,
        horario: '',
        motivo: ''
      });
    }
  }, [consulta, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.data || !formData.horario) {
      toast.error('Preencha a nova data e horário');
      return;
    }

    toast.success('Consulta remarcada com sucesso!');
    onOpenChange(false);
    setFormData({ data: '', horario: '', motivo: '' });
  };

  if (!consulta) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader className="relative">
          <DialogTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Remarcar Consulta
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Altere a data e horário da consulta agendada
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informações atuais */}
          <div className="p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Consulta Atual</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Paciente:</strong> {consulta.paciente}</p>
              <p><strong>Especialista:</strong> {consulta.especialista}</p>
              <p><strong>Horário:</strong> {consulta.horario}</p>
              <p><strong>Tipo:</strong> {consulta.tipo}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nova-data" className="text-gray-900 dark:text-white">Nova Data *</Label>
                <Input
                  id="nova-data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="novo-horario" className="text-gray-900 dark:text-white">Novo Horário *</Label>
                <Select 
                  value={formData.horario} 
                  onValueChange={(value) => setFormData({ ...formData, horario: value })}
                >
                  <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                    <SelectValue placeholder="Horário" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                    {horarios.map((horario) => (
                      <SelectItem key={horario} value={horario}>
                        {horario}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivo" className="text-gray-900 dark:text-white">Motivo da Remarcação</Label>
              <Input
                id="motivo"
                placeholder="Motivo (opcional)"
                value={formData.motivo}
                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-2 pt-4">
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
                Remarcar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}