import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EstornarPagamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pagamento: any;
}

export function EstornarPagamentoModal({ open, onOpenChange, pagamento }: EstornarPagamentoModalProps) {
  const [motivo, setMotivo] = useState('');

  const handleEstornar = () => {
    if (!motivo.trim()) {
      toast.error('Informe o motivo do estorno');
      return;
    }

    toast.success('Pagamento estornado com sucesso!');
    onOpenChange(false);
    setMotivo('');
  };

  if (!pagamento) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Estornar Pagamento
          </DialogTitle>
          <DialogDescription>
            Reverta um pagamento já processado informando o motivo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Aviso */}
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-400">
              ⚠️ O estorno irá alterar o status do pagamento e pode afetar relatórios financeiros.
            </p>
          </div>

          {/* Informações do pagamento */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pagamento a ser estornado</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p><strong>Paciente:</strong> {pagamento.paciente}</p>
              <p><strong>Procedimento:</strong> {pagamento.procedimento}</p>
              <p><strong>Valor:</strong> R$ {pagamento.valor.toFixed(2).replace('.', ',')}</p>
              {pagamento.formaPagamento && (
                <p><strong>Forma de Pagamento:</strong> {pagamento.formaPagamento}</p>
              )}
              <p><strong>Data:</strong> {new Date(pagamento.data).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo do Estorno *</Label>
            <Input
              id="motivo"
              placeholder="Informe o motivo do estorno"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
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
              onClick={handleEstornar}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Confirmar Estorno
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}