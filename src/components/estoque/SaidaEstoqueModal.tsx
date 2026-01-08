import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { PackageMinus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SaidaEstoqueModalProps {
  open: boolean;
  onClose: () => void;
}

export function SaidaEstoqueModal({ open, onClose }: SaidaEstoqueModalProps) {
  const [formData, setFormData] = useState({
    produto: '',
    quantidade: '',
    justificativa: '',
    observacoes: ''
  });

  const produtos = [
    'Dipirona 500mg',
    'Gaze Estéril',
    'Luva Procedimento M',
    'Vitamina D3 1000 UI',
    'Ômega 3 1000mg',
    'Whey Protein 900g',
    'Creatina 300g',
    'Antibiótico X 500mg'
  ];

  const justificativasPredefinidas = [
    'Brinde',
    'Consumo Clínica',
    'Descarte por Vencimento',
    'Descarte por Avaria',
    'Uso Interno',
    'Demonstração',
    'Doação',
    'Transferência entre Unidades',
    'Outro - Especificar'
  ];

  const handleSubmit = () => {
    if (!formData.produto || !formData.quantidade || !formData.justificativa) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (formData.justificativa === 'Outro - Especificar' && !formData.observacoes) {
      toast.error('Especifique a justificativa nas observações');
      return;
    }

    toast.success('Saída de estoque registrada com sucesso!', {
      description: `${formData.quantidade} unidades baixadas - ${formData.justificativa}`
    });

    setFormData({
      produto: '',
      quantidade: '',
      justificativa: '',
      observacoes: ''
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <PackageMinus className="w-5 h-5 text-red-600 dark:text-red-400" />
            Saída Manual de Estoque
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Registre a saída de estoque manualmente, fornecendo detalhes sobre o produto, quantidade e justificativa.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Aviso */}
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-400">
                A saída manual deve ser justificada. Vendas normais são registradas automaticamente.
              </p>
            </div>
          </div>

          {/* Produto */}
          <div className="space-y-2">
            <Label htmlFor="produto" className="text-gray-900 dark:text-white">
              Produto *
            </Label>
            <Select 
              value={formData.produto} 
              onValueChange={(value) => setFormData({ ...formData, produto: value })}
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]">
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                {produtos.map((produto) => (
                  <SelectItem key={produto} value={produto}>
                    {produto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantidade" className="text-gray-900 dark:text-white">
              Quantidade *
            </Label>
            <Input
              id="quantidade"
              type="number"
              min="1"
              placeholder="0"
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
            />
          </div>

          {/* Justificativa */}
          <div className="space-y-2">
            <Label htmlFor="justificativa" className="text-gray-900 dark:text-white">
              Justificativa * (Obrigatório)
            </Label>
            <Select 
              value={formData.justificativa} 
              onValueChange={(value) => setFormData({ ...formData, justificativa: value })}
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]">
                <SelectValue placeholder="Selecione a justificativa" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                {justificativasPredefinidas.map((just) => (
                  <SelectItem key={just} value={just}>
                    {just}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Escolha uma justificativa pré-definida para a saída do estoque
            </p>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-gray-900 dark:text-white">
              Observações {formData.justificativa === 'Outro - Especificar' && '*'}
            </Label>
            <Textarea
              id="observacoes"
              placeholder={formData.justificativa === 'Outro - Especificar' 
                ? "Especifique o motivo da saída (obrigatório)" 
                : "Detalhes adicionais (opcional)"}
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 dark:border-gray-600"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <PackageMinus className="w-4 h-4 mr-2" />
            Registrar Saída
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}