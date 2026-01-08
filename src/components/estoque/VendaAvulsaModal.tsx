import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';
import { ShoppingCart, Plus, Trash2, AlertCircle, CheckCircle2, DollarSign, User } from 'lucide-react';

interface VendaAvulsaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produtosEstoque: Array<{
    id: number;
    nome: string;
    categoria: string;
    quantidade: number;
    preco: number;
    status: string;
  }>;
}

interface ItemVenda {
  produtoId: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export function VendaAvulsaModal({ open, onOpenChange, produtosEstoque }: VendaAvulsaModalProps) {
  const [formData, setFormData] = useState({
    paciente: '',
    formaPagamento: '',
    parcelas: '1',
    desconto: '0',
    observacoes: ''
  });

  const [itensVenda, setItensVenda] = useState<ItemVenda[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState('1');

  const pacientes = [
    'Maria Silva',
    'Pedro Costa',
    'Laura Oliveira',
    'Roberto Ferreira',
    'Fernanda Torres',
    'Carlos Mendes'
  ];

  const formasPagamento = [
    'Dinheiro',
    'PIX',
    'Cartão de Débito',
    'Cartão de Crédito',
    'Transferência Bancária',
    'Boleto'
  ];

  const handleAdicionarItem = () => {
    if (!produtoSelecionado) {
      toast.error('Selecione um produto');
      return;
    }

    const quantidade = parseInt(quantidadeSelecionada);
    if (quantidade <= 0) {
      toast.error('Quantidade deve ser maior que zero');
      return;
    }

    const produto = produtosEstoque.find(p => p.id.toString() === produtoSelecionado);
    if (!produto) return;

    // Verificar estoque disponível
    if (quantidade > produto.quantidade) {
      toast.error('Quantidade indisponível em estoque', {
        description: `Disponível: ${produto.quantidade} unidades`
      });
      return;
    }

    // Verificar se o produto já está na lista
    const itemExistente = itensVenda.find(item => item.produtoId === produto.id);
    if (itemExistente) {
      // Atualizar quantidade
      setItensVenda(itensVenda.map(item => 
        item.produtoId === produto.id
          ? { 
              ...item, 
              quantidade: item.quantidade + quantidade,
              subtotal: (item.quantidade + quantidade) * item.precoUnitario
            }
          : item
      ));
      toast.success('Quantidade atualizada');
    } else {
      // Adicionar novo item
      const novoItem: ItemVenda = {
        produtoId: produto.id,
        nome: produto.nome,
        quantidade,
        precoUnitario: produto.preco,
        subtotal: quantidade * produto.preco
      };
      setItensVenda([...itensVenda, novoItem]);
      toast.success('Item adicionado à venda');
    }

    // Limpar seleção
    setProdutoSelecionado('');
    setQuantidadeSelecionada('1');
  };

  const handleRemoverItem = (produtoId: number) => {
    setItensVenda(itensVenda.filter(item => item.produtoId !== produtoId));
    toast.info('Item removido da venda');
  };

  const calcularSubtotal = () => {
    return itensVenda.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const desconto = parseFloat(formData.desconto) || 0;
    return Math.max(0, subtotal - desconto);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.paciente) {
      toast.error('Selecione o paciente');
      return;
    }

    if (itensVenda.length === 0) {
      toast.error('Adicione pelo menos um item à venda');
      return;
    }

    if (!formData.formaPagamento) {
      toast.error('Selecione a forma de pagamento');
      return;
    }

    const total = calcularTotal();
    
    // Simular processamento da venda
    toast.success('Venda registrada com sucesso!', {
      description: `Total: R$ ${total.toFixed(2).replace('.', ',')} - ${formData.formaPagamento}`
    });

    // Integração com módulo de Recebimentos
    toast.info('Recebimento registrado', {
      description: 'A venda foi integrada ao caixa automaticamente'
    });

    // Baixa automática no estoque
    toast.info('Estoque atualizado', {
      description: `${itensVenda.length} item(ns) baixado(s) do estoque`
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      formaPagamento: '',
      parcelas: '1',
      desconto: '0',
      observacoes: ''
    });
    setItensVenda([]);
    setProdutoSelecionado('');
    setQuantidadeSelecionada('1');
  };

  const subtotal = calcularSubtotal();
  const total = calcularTotal();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#244738]" />
            Nova Venda Avulsa
          </DialogTitle>
          <DialogDescription>
            Registre uma venda de produtos sem prescrição
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de Paciente */}
          <div className="space-y-2">
            <Label htmlFor="paciente" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Paciente *
            </Label>
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

          <Separator />

          {/* Adicionar Produtos */}
          <div className="space-y-4">
            <Label>Adicionar Produtos</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-7">
                <Select 
                  value={produtoSelecionado} 
                  onValueChange={setProdutoSelecionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {produtosEstoque.map((produto) => (
                      <SelectItem 
                        key={produto.id} 
                        value={produto.id.toString()}
                        disabled={produto.quantidade === 0}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>{produto.nome}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            (Disp: {produto.quantidade}) - R$ {produto.preco.toFixed(2)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-3">
                <Input
                  type="number"
                  min="1"
                  placeholder="Qtd"
                  value={quantidadeSelecionada}
                  onChange={(e) => setQuantidadeSelecionada(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <Button
                  type="button"
                  onClick={handleAdicionarItem}
                  className="w-full bg-[#244738] hover:bg-[#356b52] text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Lista de Itens */}
          {itensVenda.length > 0 && (
            <div className="space-y-2">
              <Label>Itens da Venda ({itensVenda.length})</Label>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                      <tr>
                        <th className="text-left p-3 text-gray-600 dark:text-gray-400">Produto</th>
                        <th className="text-center p-3 text-gray-600 dark:text-gray-400">Qtd</th>
                        <th className="text-right p-3 text-gray-600 dark:text-gray-400">Preço Unit.</th>
                        <th className="text-right p-3 text-gray-600 dark:text-gray-400">Subtotal</th>
                        <th className="text-center p-3 text-gray-600 dark:text-gray-400">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itensVenda.map((item) => (
                        <tr key={item.produtoId} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="p-3 font-medium text-gray-900 dark:text-white">{item.nome}</td>
                          <td className="p-3 text-center text-gray-600 dark:text-gray-400">{item.quantidade}</td>
                          <td className="p-3 text-right text-gray-600 dark:text-gray-400">
                            R$ {item.precoUnitario.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="p-3 text-right font-medium text-gray-900 dark:text-white">
                            R$ {item.subtotal.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="p-3">
                            <div className="flex justify-center">
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoverItem(item.produtoId)}
                                className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Valores */}
          <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-white">
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <Label htmlFor="desconto" className="text-sm text-gray-600 dark:text-gray-400">
                Desconto (R$)
              </Label>
              <Input
                id="desconto"
                type="number"
                step="0.01"
                min="0"
                max={subtotal}
                placeholder="0,00"
                value={formData.desconto}
                onChange={(e) => setFormData({ ...formData, desconto: e.target.value })}
                className="w-32 text-right"
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 dark:text-white">Total a Pagar</span>
              <span className="text-2xl font-bold text-[#244738] dark:text-green-400">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Forma de Pagamento */}
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

          {formData.formaPagamento === 'Cartão de Crédito' && (
            <div className="space-y-2">
              <Label htmlFor="parcelas">Parcelas</Label>
              <Select 
                value={formData.parcelas} 
                onValueChange={(value) => setFormData({ ...formData, parcelas: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}x de R$ {(total / num).toFixed(2).replace('.', ',')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Input
              id="observacoes"
              placeholder="Observações sobre a venda"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </div>

          {/* Alertas */}
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-400">Baixa Automática de Estoque</p>
                <p className="text-blue-700 dark:text-blue-500">
                  Os itens serão automaticamente baixados do estoque após a finalização.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800 dark:text-green-400">Integração com Recebimentos</p>
                <p className="text-green-700 dark:text-green-500">
                  A venda será automaticamente registrada no módulo de Recebimentos/Caixa.
                </p>
              </div>
            </div>
          </div>

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
              disabled={itensVenda.length === 0}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Finalizar Venda
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
