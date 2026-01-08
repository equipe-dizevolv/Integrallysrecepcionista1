import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditarPagamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pagamento: any;
}

export function EditarPagamentoModal({ open, onOpenChange, pagamento }: EditarPagamentoModalProps) {
  const [formData, setFormData] = useState({
    valor: '',
    formaPagamento: '',
    vencimento: '',
    observacoes: ''
  });

  useEffect(() => {
    if (pagamento) {
      setFormData({
        valor: pagamento.valor?.toString() || '',
        formaPagamento: pagamento.formaPagamento || '',
        vencimento: pagamento.vencimento || '',
        observacoes: pagamento.observacoes || ''
      });
    }
  }, [pagamento]);

  const formasPagamento = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'PIX',
    'Transferência Bancária',
    'Boleto'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.valor) {
      toast.error('Preencha o valor do pagamento');
      return;
    }

    toast.success('Pagamento atualizado com sucesso!');
    onOpenChange(false);
  };

  if (!pagamento) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Edit className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Editar Pagamento
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Editar informações do pagamento de {pagamento.paciente}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor" className="text-gray-900 dark:text-white">Valor *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formaPagamento" className="text-gray-900 dark:text-white">Forma de Pagamento</Label>
              <Select 
                value={formData.formaPagamento} 
                onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {formasPagamento.map((forma) => (
                    <SelectItem key={forma} value={forma}>
                      {forma}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vencimento" className="text-gray-900 dark:text-white">Data de Vencimento</Label>
            <Input
              id="vencimento"
              type="date"
              value={formData.vencimento}
              onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-gray-900 dark:text-white">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Observações sobre o pagamento"
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
