import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon, Phone, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RegistrarContatoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
  onRegistrar: (pacienteAtualizado: any) => void;
}

export function RegistrarContatoModal({
  open,
  onOpenChange,
  paciente,
  onRegistrar
}: RegistrarContatoModalProps) {
  const [dataContato, setDataContato] = useState<Date>(new Date());
  const [tipoContato, setTipoContato] = useState('telefone');
  const [observacoes, setObservacoes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!dataContato) {
      newErrors.dataContato = 'Selecione a data do contato';
    }
    
    if (!observacoes.trim()) {
      newErrors.observacoes = 'Adicione observações sobre o contato';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const pacienteAtualizado = {
      ...paciente,
      ultimoContato: format(dataContato, 'yyyy-MM-dd'),
      historico: [
        ...(paciente.historico || []),
        {
          data: format(dataContato, 'yyyy-MM-dd'),
          tipo: tipoContato,
          observacoes
        }
      ]
    };

    onRegistrar(pacienteAtualizado);
    toast.success(`Contato com ${paciente.paciente} registrado`);
    
    // Reset
    setDataContato(new Date());
    setTipoContato('telefone');
    setObservacoes('');
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    setDataContato(new Date());
    setTipoContato('telefone');
    setObservacoes('');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            Registrar Contato
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Registre detalhes sobre o contato realizado com o paciente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info do Paciente */}
          <div className="bg-gray-50 dark:bg-[#12211c] rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Paciente:</strong> {paciente?.paciente}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Telefone:</strong> {paciente?.telefone}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                Data do Contato *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                      errors.dataContato ? 'border-red-500' : ''
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataContato ? format(dataContato, 'dd/MM/yyyy', { locale: ptBR }) : 'Selecione a data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <Calendar
                    mode="single"
                    selected={dataContato}
                    onSelect={(date) => {
                      if (date) {
                        setDataContato(date);
                        if (errors.dataContato) setErrors({ ...errors, dataContato: '' });
                      }
                    }}
                    locale={ptBR}
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.dataContato && (
                <p className="text-xs text-red-500 mt-1">{errors.dataContato}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tipoContato" className="text-gray-700 dark:text-gray-300">
                Tipo de Contato
              </Label>
              <Select
                value={tipoContato}
                onValueChange={setTipoContato}
              >
                <SelectTrigger 
                  id="tipoContato"
                  className="mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <SelectItem value="telefone">Telefone</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="observacoes" className="text-gray-700 dark:text-gray-300">
                Observações *
              </Label>
              <Textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => {
                  setObservacoes(e.target.value);
                  if (errors.observacoes) setErrors({ ...errors, observacoes: '' });
                }}
                className={`mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] min-h-[100px] ${
                  errors.observacoes ? 'border-red-500' : ''
                }`}
                placeholder="Ex: Paciente informou que ainda está aguardando. Demonstrou interesse em horários da tarde. Ligará novamente na próxima semana."
              />
              {errors.observacoes && (
                <p className="text-xs text-red-500 mt-1">{errors.observacoes}</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              A data do último contato será atualizada automaticamente.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
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
              Registrar Contato
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
