import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PackagePlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EntradaEstoqueModalProps {
  open: boolean;
  onClose: () => void;
}

export function EntradaEstoqueModal({ open, onClose }: EntradaEstoqueModalProps) {
  const [formData, setFormData] = useState({
    produto: '',
    quantidade: '',
    numeroNF: '',
    dataEmissaoNF: '',
    fornecedor: '',
    valorNF: '',
    chaveAcessoNF: ''
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

  const handleSubmit = () => {
    if (!formData.produto || !formData.quantidade || !formData.numeroNF || !formData.fornecedor) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    toast.success('Entrada de estoque registrada com sucesso!', {
      description: `${formData.quantidade} unidades adicionadas`
    });

    setFormData({
      produto: '',
      quantidade: '',
      numeroNF: '',
      dataEmissaoNF: '',
      fornecedor: '',
      valorNF: '',
      chaveAcessoNF: ''
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <PackagePlus className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Entrada de Estoque com Nota Fiscal
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Registre a entrada de estoque utilizando os dados da nota fiscal.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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

          {/* Dados da Nota Fiscal */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-400">Dados da Nota Fiscal</h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numeroNF" className="text-gray-900 dark:text-white">
                  Número da NF *
                </Label>
                <Input
                  id="numeroNF"
                  placeholder="Ex: 123456"
                  value={formData.numeroNF}
                  onChange={(e) => setFormData({ ...formData, numeroNF: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataEmissaoNF" className="text-gray-900 dark:text-white">
                  Data de Emissão
                </Label>
                <Input
                  id="dataEmissaoNF"
                  type="date"
                  value={formData.dataEmissaoNF}
                  onChange={(e) => setFormData({ ...formData, dataEmissaoNF: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor" className="text-gray-900 dark:text-white">
                Fornecedor *
              </Label>
              <Input
                id="fornecedor"
                placeholder="Nome do fornecedor"
                value={formData.fornecedor}
                onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorNF" className="text-gray-900 dark:text-white">
                Valor da NF
              </Label>
              <Input
                id="valorNF"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.valorNF}
                onChange={(e) => setFormData({ ...formData, valorNF: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chaveAcessoNF" className="text-gray-900 dark:text-white">
                Chave de Acesso (Opcional)
              </Label>
              <Input
                id="chaveAcessoNF"
                placeholder="44 dígitos da chave de acesso"
                maxLength={44}
                value={formData.chaveAcessoNF}
                onChange={(e) => setFormData({ ...formData, chaveAcessoNF: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white font-mono text-xs"
              />
            </div>
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
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <PackagePlus className="w-4 h-4 mr-2" />
            Registrar Entrada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}