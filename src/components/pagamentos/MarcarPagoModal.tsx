import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MarcarPagoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pagamento: any;
}

export function MarcarPagoModal({ open, onOpenChange, pagamento }: MarcarPagoModalProps) {
  const [formData, setFormData] = useState({
    formaPagamento: '',
    dataPagamento: new Date().toISOString().split('T')[0],
    valorPago: '',
    observacoes: ''
  });

  const formasPagamento = [
    'Dinheiro',
    'Cartão de Débito',
    'Cartão de Crédito',
    'PIX',
    'Transferência Bancária',
    'Boleto',
    'Convênio'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.formaPagamento || !formData.dataPagamento || !formData.valorPago) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Pagamento confirmado com sucesso!');
    onOpenChange(false);
    setFormData({
      formaPagamento: '',
      dataPagamento: new Date().toISOString().split('T')[0],
      valorPago: '',
      observacoes: ''
    });
  };

  if (!pagamento) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle className="w-5 h-5" />
            Marcar como Pago
          </DialogTitle>
          <DialogDescription>
            Confirme o pagamento e registre os detalhes da transação
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informações do pagamento */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Informações do Pagamento</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Paciente:</strong> {pagamento.paciente}</p>
              <p><strong>Procedimento:</strong> {pagamento.procedimento}</p>
              <p><strong>Valor:</strong> R$ {pagamento.valor.toFixed(2).replace('.', ',')}</p>
              <p><strong>Vencimento:</strong> {new Date(pagamento.vencimento).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
              <Select 
                value={formData.formaPagamento} 
                onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a forma de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  {formasPagamento.map((forma) => (
                    <SelectItem key={forma} value={forma}>
                      {forma}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataPagamento">Data do Pagamento *</Label>
                <Input
                  id="dataPagamento"
                  type="date"
                  value={formData.dataPagamento}
                  onChange={(e) => setFormData({ ...formData, dataPagamento: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorPago">Valor Pago (R$) *</Label>
                <Input
                  id="valorPago"
                  type="number"
                  step="0.01"
                  placeholder={pagamento.valor.toFixed(2)}
                  value={formData.valorPago}
                  onChange={(e) => setFormData({ ...formData, valorPago: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input
                id="observacoes"
                placeholder="Observações sobre o pagamento"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Confirmar Pagamento
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}