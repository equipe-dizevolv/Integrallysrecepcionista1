import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface EditarPacienteListaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
  onEditar: (pacienteAtualizado: any) => void;
}

export function EditarPacienteListaModal({
  open,
  onOpenChange,
  paciente,
  onEditar
}: EditarPacienteListaModalProps) {
  const [formData, setFormData] = useState({
    paciente: '',
    telefone: '',
    especialidade: '',
    prioridade: 'media',
    observacoes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (paciente) {
      setFormData({
        paciente: paciente.paciente || '',
        telefone: paciente.telefone || '',
        especialidade: paciente.especialidade || '',
        prioridade: paciente.prioridade || 'media',
        observacoes: paciente.observacoes || ''
      });
    }
  }, [paciente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    const newErrors: Record<string, string> = {};
    
    if (!formData.paciente.trim()) {
      newErrors.paciente = 'Nome do paciente é obrigatório';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s?\d{1}\s?\d{4}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Formato inválido. Use: (11) 9 8888-7777';
    }
    
    if (!formData.especialidade.trim()) {
      newErrors.especialidade = 'Especialidade é obrigatória';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const pacienteAtualizado = {
      ...paciente,
      paciente: formData.paciente,
      telefone: formData.telefone,
      especialidade: formData.especialidade,
      prioridade: formData.prioridade,
      observacoes: formData.observacoes
    };

    onEditar(pacienteAtualizado);
    toast.success(`Dados de ${formData.paciente} atualizados`);
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (paciente) {
      setFormData({
        paciente: paciente.paciente || '',
        telefone: paciente.telefone || '',
        especialidade: paciente.especialidade || '',
        prioridade: paciente.prioridade || 'media',
        observacoes: paciente.observacoes || ''
      });
    }
    setErrors({});
    onOpenChange(false);
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 3) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            Editar Paciente da Lista de Espera
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Atualize os dados do paciente na lista de espera.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="paciente" className="text-gray-700 dark:text-gray-300">
                Nome do Paciente *
              </Label>
              <Input
                id="paciente"
                value={formData.paciente}
                onChange={(e) => {
                  setFormData({ ...formData, paciente: e.target.value });
                  if (errors.paciente) setErrors({ ...errors, paciente: '' });
                }}
                className={`mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                  errors.paciente ? 'border-red-500' : ''
                }`}
                placeholder="Digite o nome completo"
              />
              {errors.paciente && (
                <p className="text-xs text-red-500 mt-1">{errors.paciente}</p>
              )}
            </div>

            <div>
              <Label htmlFor="telefone" className="text-gray-700 dark:text-gray-300">
                Telefone *
              </Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => {
                  const formatted = formatTelefone(e.target.value);
                  setFormData({ ...formData, telefone: formatted });
                  if (errors.telefone) setErrors({ ...errors, telefone: '' });
                }}
                className={`mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                  errors.telefone ? 'border-red-500' : ''
                }`}
                placeholder="(11) 9 8888-7777"
                maxLength={17}
              />
              {errors.telefone && (
                <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="especialidade" className="text-gray-700 dark:text-gray-300">
                Especialidade *
              </Label>
              <Select
                value={formData.especialidade}
                onValueChange={(value) => {
                  setFormData({ ...formData, especialidade: value });
                  if (errors.especialidade) setErrors({ ...errors, especialidade: '' });
                }}
              >
                <SelectTrigger 
                  id="especialidade"
                  className={`mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] ${
                    errors.especialidade ? 'border-red-500' : ''
                  }`}
                >
                  <SelectValue placeholder="Selecione a especialidade" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                  <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                  <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                  <SelectItem value="Pediatria">Pediatria</SelectItem>
                  <SelectItem value="Neurologia">Neurologia</SelectItem>
                  <SelectItem value="Ginecologia">Ginecologia</SelectItem>
                  <SelectItem value="Oftalmologia">Oftalmologia</SelectItem>
                  <SelectItem value="Psiquiatria">Psiquiatria</SelectItem>
                </SelectContent>
              </Select>
              {errors.especialidade && (
                <p className="text-xs text-red-500 mt-1">{errors.especialidade}</p>
              )}
            </div>

            <div className="col-span-2">
              <Label htmlFor="prioridade" className="text-gray-700 dark:text-gray-300">
                Prioridade
              </Label>
              <Select
                value={formData.prioridade}
                onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
              >
                <SelectTrigger 
                  id="prioridade"
                  className="mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="observacoes" className="text-gray-700 dark:text-gray-300">
                Observações
              </Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="mt-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#12211c] min-h-[80px]"
                placeholder="Preferências de horário, observações médicas, etc."
              />
            </div>
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
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
