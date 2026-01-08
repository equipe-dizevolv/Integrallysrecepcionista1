import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditarPrescricaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescricao: any;
}

export function EditarPrescricaoModal({ open, onOpenChange, prescricao }: EditarPrescricaoModalProps) {
  const [formData, setFormData] = useState({
    tipo: '',
    valorTotal: '',
    validade: '',
    fatoGerador: '',
    observacoes: ''
  });

  useEffect(() => {
    if (prescricao) {
      setFormData({
        tipo: prescricao.tipo || '',
        valorTotal: prescricao.valorTotal?.toString() || '',
        validade: prescricao.validade?.toString() || '30',
        fatoGerador: prescricao.fatoGerador || 'automática',
        observacoes: ''
      });
    }
  }, [prescricao]);

  const tiposPrescricao = [
    'Suplementação',
    'Medicação',
    'Tratamento Completo',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.valorTotal) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Prescrição atualizada com sucesso!');
    onOpenChange(false);
  };

  if (!prescricao) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Edit className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Editar Prescrição
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Editar prescrição {prescricao.numero} - {prescricao.paciente}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo" className="text-gray-900 dark:text-white">Tipo *</Label>
              <Select 
                value={formData.tipo} 
                onValueChange={(value) => setFormData({ ...formData, tipo: value })}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {tiposPrescricao.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorTotal" className="text-gray-900 dark:text-white">Valor Total *</Label>
              <Input
                id="valorTotal"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valorTotal}
                onChange={(e) => setFormData({ ...formData, valorTotal: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validade" className="text-gray-900 dark:text-white">Validade (dias) *</Label>
              <Select 
                value={formData.validade} 
                onValueChange={(value) => setFormData({ ...formData, validade: value })}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="60">60 dias</SelectItem>
                  <SelectItem value="90">90 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatoGerador" className="text-gray-900 dark:text-white">Fato Gerador</Label>
              <Select 
                value={formData.fatoGerador} 
                onValueChange={(value) => setFormData({ ...formData, fatoGerador: value })}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  <SelectItem value="automática">Automática</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-gray-900 dark:text-white">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações sobre as alterações"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white min-h-[80px]"
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
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
