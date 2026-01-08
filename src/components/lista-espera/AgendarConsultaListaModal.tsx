import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AgendarConsultaListaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
  onAgendar: (consulta: any) => void;
}

export function AgendarConsultaListaModal({
  open,
  onOpenChange,
  paciente,
  onAgendar
}: AgendarConsultaListaModalProps) {
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState('');
  const [especialista, setEspecialista] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const horariosDisponiveis = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const especialistas = [
    'Dr. Carlos Silva - Cardiologia',
    'Dra. Marina Costa - Dermatologia',
    'Dr. Roberto Alves - Ortopedia',
    'Dra. Ana Paula - Pediatria',
    'Dr. Fernando Santos - Neurologia',
    'Dra. Juliana Oliveira - Ginecologia'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!data) {
      newErrors.data = 'Selecione uma data';
    }
    
    if (!horario) {
      newErrors.horario = 'Selecione um horário';
    }
    
    if (!especialista) {
      newErrors.especialista = 'Selecione um especialista';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const novaConsulta = {
      id: Date.now(),
      paciente: paciente.paciente,
      data: format(data!, 'yyyy-MM-dd'),
      horario,
      especialista,
      especialidade: paciente.especialidade,
      tipo: 'Consulta',
      status: 'agendada',
      statusPagamento: 'pendente',
      valor: 250.00,
      observacoes
    };

    onAgendar(novaConsulta);
    toast.success(`Consulta agendada para ${paciente.paciente}`);
    
    // Reset
    setData(undefined);
    setHorario('');
    setEspecialista('');
    setObservacoes('');
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    setData(undefined);
    setHorario('');
    setEspecialista('');
    setObservacoes('');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            Agendar Consulta - {paciente?.paciente}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Selecione data, horário e especialista para a consulta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info do Paciente */}
          <div className="bg-gray-50 dark:bg-[#12211c] rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Paciente:</strong> {paciente?.paciente}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Especialidade:</strong> {paciente?.especialidade}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Data da Consulta *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                      errors.data ? 'border-red-500' : ''
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data ? format(data, 'dd/MM/yyyy', { locale: ptBR }) : 'Selecione a data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <Calendar
                    mode="single"
                    selected={data}
                    onSelect={(newDate) => {
                      setData(newDate);
                      if (errors.data) setErrors({ ...errors, data: '' });
                    }}
                    locale={ptBR}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.data && (
                <p className="text-xs text-red-500 mt-1">{errors.data}</p>
              )}
            </div>

            <div>
              <Label htmlFor="horario" className="text-gray-700 dark:text-gray-300">
                Horário *
              </Label>
              <Select
                value={horario}
                onValueChange={(value) => {
                  setHorario(value);
                  if (errors.horario) setErrors({ ...errors, horario: '' });
                }}
              >
                <SelectTrigger 
                  id="horario"
                  className={`mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                    errors.horario ? 'border-red-500' : ''
                  }`}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {horariosDisponiveis.map((h) => (
                    <SelectItem key={h} value={h}>{h}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.horario && (
                <p className="text-xs text-red-500 mt-1">{errors.horario}</p>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="especialista" className="text-gray-700 dark:text-gray-300">
                Especialista *
              </Label>
              <Select
                value={especialista}
                onValueChange={(value) => {
                  setEspecialista(value);
                  if (errors.especialista) setErrors({ ...errors, especialista: '' });
                }}
              >
                <SelectTrigger 
                  id="especialista"
                  className={`mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                    errors.especialista ? 'border-red-500' : ''
                  }`}
                >
                  <SelectValue placeholder="Selecione o especialista" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {especialistas.map((esp) => (
                    <SelectItem key={esp} value={esp}>{esp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.especialista && (
                <p className="text-xs text-red-500 mt-1">{errors.especialista}</p>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="observacoes" className="text-gray-700 dark:text-gray-300">
                Observações
              </Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] min-h-[80px]"
                placeholder="Observações sobre a consulta..."
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              O paciente será automaticamente removido da lista de espera após o agendamento.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#12211c]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Agendar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
