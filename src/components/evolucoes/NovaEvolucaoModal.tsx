import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';
import { Calendar, FileText, User, Plus } from 'lucide-react';

interface NovaEvolucaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NovaEvolucaoModal({ open, onOpenChange }: NovaEvolucaoModalProps) {
  const [formData, setFormData] = useState({
    paciente: '',
    data: new Date().toISOString().split('T')[0],
    tipo: '',
    queixaPrincipal: '',
    evolucao: '',
    pressaoArterial: '',
    frequenciaCardiaca: '',
    temperatura: '',
    peso: '',
    sinaisVitais: '',
    avaliacaoClinica: '',
    condutaTerapeutica: '',
    observacoes: ''
  });

  const pacientes = [
    'Maria Silva',
    'João Santos',
    'Ana Costa',
    'Pedro Oliveira',
    'Laura Ferreira',
    'Carlos Mendes'
  ];

  const tiposEvolucao = [
    'Consulta',
    'Retorno',
    'Exame',
    'Procedimento',
    'Acompanhamento',
    'Intercorrência'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.paciente) {
      toast.error('Selecione o paciente');
      return;
    }

    if (!formData.tipo) {
      toast.error('Selecione o tipo de evolução');
      return;
    }

    if (!formData.evolucao.trim()) {
      toast.error('Digite a evolução clínica');
      return;
    }

    toast.success('Evolução clínica registrada com sucesso!', {
      description: `Paciente: ${formData.paciente}`
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      data: new Date().toISOString().split('T')[0],
      tipo: '',
      queixaPrincipal: '',
      evolucao: '',
      pressaoArterial: '',
      frequenciaCardiaca: '',
      temperatura: '',
      peso: '',
      sinaisVitais: '',
      avaliacaoClinica: '',
      condutaTerapeutica: '',
      observacoes: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738]" />
            Nova Evolução Clínica
          </DialogTitle>
          <DialogDescription>
            Registre a evolução clínica do paciente
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente *</Label>
                <Select 
                  value={formData.paciente} 
                  onValueChange={(value) => setFormData({ ...formData, paciente: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {pacientes.map((paciente) => (
                      <SelectItem key={paciente} value={paciente}>
                        {paciente}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Evolução *</Label>
                <Select 
                  value={formData.tipo} 
                  onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposEvolucao.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="queixaPrincipal">Queixa Principal</Label>
                <Input
                  id="queixaPrincipal"
                  placeholder="Ex: Dor torácica"
                  value={formData.queixaPrincipal}
                  onChange={(e) => setFormData({ ...formData, queixaPrincipal: e.target.value })}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Sinais Vitais */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Sinais Vitais</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pressaoArterial">Pressão Arterial</Label>
                <Input
                  id="pressaoArterial"
                  placeholder="120/80"
                  value={formData.pressaoArterial}
                  onChange={(e) => setFormData({ ...formData, pressaoArterial: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequenciaCardiaca">FC (bpm)</Label>
                <Input
                  id="frequenciaCardiaca"
                  type="number"
                  placeholder="72"
                  value={formData.frequenciaCardiaca}
                  onChange={(e) => setFormData({ ...formData, frequenciaCardiaca: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperatura">Temperatura (°C)</Label>
                <Input
                  id="temperatura"
                  type="number"
                  step="0.1"
                  placeholder="36.5"
                  value={formData.temperatura}
                  onChange={(e) => setFormData({ ...formData, temperatura: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sinaisVitais">Observações sobre Sinais Vitais</Label>
              <Textarea
                id="sinaisVitais"
                placeholder="Observações adicionais sobre os sinais vitais..."
                value={formData.sinaisVitais}
                onChange={(e) => setFormData({ ...formData, sinaisVitais: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <Separator />

          {/* Evolução Clínica */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Evolução Clínica</h3>
            
            <div className="space-y-2">
              <Label htmlFor="evolucao">Descrição da Evolução *</Label>
              <Textarea
                id="evolucao"
                placeholder="Descreva a evolução clínica do paciente..."
                value={formData.evolucao}
                onChange={(e) => setFormData({ ...formData, evolucao: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avaliacaoClinica">Avaliação Clínica</Label>
              <Textarea
                id="avaliacaoClinica"
                placeholder="Avaliação do estado clínico atual..."
                value={formData.avaliacaoClinica}
                onChange={(e) => setFormData({ ...formData, avaliacaoClinica: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condutaTerapeutica">Conduta Terapêutica</Label>
              <Textarea
                id="condutaTerapeutica"
                placeholder="Descrição da conduta e orientações..."
                value={formData.condutaTerapeutica}
                onChange={(e) => setFormData({ ...formData, condutaTerapeutica: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações Gerais</Label>
              <Textarea
                id="observacoes"
                placeholder="Observações adicionais..."
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <Separator />

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Evolução
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
