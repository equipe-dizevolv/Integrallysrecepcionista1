import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { toast } from 'sonner@2.0.3';
import { ShoppingCart, Package, AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';

interface GerarVendaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescricao: any;
}

export function GerarVendaModal({ open, onOpenChange, prescricao }: GerarVendaModalProps) {
  const [formData, setFormData] = useState({
    metodoPagamento: '',
    parcelas: '1',
    desconto: '0',
    observacoes: ''
  });

  const [estoqueDisponivel, setEstoqueDisponivel] = useState(true);

  const metodosPagamento = [
    'Dinheiro',
    'PIX',
    'Cartão de Débito',
    'Cartão de Crédito',
    'Transferência Bancária',
    'Boleto'
  ];

  // Simular verificação de estoque
  const verificarEstoque = () => {
    // RF-001: Verificação de estoque antes da venda
    const todosDisponiveis = prescricao?.itens?.every((item: any) => {
      // Simulação - em produção, verificar no banco de dados
      return Math.random() > 0.1; // 90% de chance de estar disponível
    });
    
    setEstoqueDisponivel(todosDisponiveis);
    return todosDisponiveis;
  };

  const calcularTotal = () => {
    if (!prescricao) return 0;
    const desconto = parseFloat(formData.desconto) || 0;
    const total = prescricao.valorTotal - desconto;
    return Math.max(0, total);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.metodoPagamento) {
      toast.error('Selecione o método de pagamento');
      return;
    }

    // Verificar estoque
    if (!verificarEstoque()) {
      toast.error('Alguns itens não estão disponíveis no estoque', {
        description: 'Verifique a disponibilidade dos produtos antes de finalizar a venda'
      });
      return;
    }

    // RF-001: Processar venda e baixa de estoque
    const total = calcularTotal();
    
    // Simular processamento da venda
    toast.success('Venda registrada com sucesso!', {
      description: `Total: R$ ${total.toFixed(2).replace('.', ',')} - ${formData.metodoPagamento}`
    });

    // RF-001: Baixa automática no estoque
    toast.info('Estoque atualizado', {
      description: 'Os itens foram baixados do estoque automaticamente'
    });

    onOpenChange(false);
    
    // Reset form
    setFormData({
      metodoPagamento: '',
      parcelas: '1',
      desconto: '0',
      observacoes: ''
    });
  };

  if (!prescricao) return null;

  const total = calcularTotal();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#244738]" />
            Gerar Venda / Faturar
          </DialogTitle>
          <DialogDescription>
            Registre a venda dos itens da prescrição
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações da Prescrição */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Prescrição</p>
                <p className="font-medium text-gray-900 dark:text-white">{prescricao.numero}</p>
              </div>
              <Badge className={
                prescricao.status === 'ativa' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }>
                {prescricao.status === 'ativa' ? 'Ativa' : 'Vencida'}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Paciente</p>
                <p className="font-medium text-gray-900 dark:text-white">{prescricao.paciente}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Especialista</p>
                <p className="font-medium text-gray-900 dark:text-white">{prescricao.especialista}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Data Criação</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(prescricao.dataCriacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Tipo</p>
                <p className="font-medium text-gray-900 dark:text-white">{prescricao.tipo}</p>
              </div>
            </div>
          </div>

          {/* Itens da Prescrição */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <Label>Itens da Prescrição</Label>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="max-h-48 overflow-y-auto">
                {prescricao.itens?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left p-3 text-gray-600 dark:text-gray-400">Produto</TableHead>
                        <TableHead className="text-left p-3 text-gray-600 dark:text-gray-400">Dosagem</TableHead>
                        <TableHead className="text-left p-3 text-gray-600 dark:text-gray-400">Frequência</TableHead>
                        <TableHead className="text-center p-3 text-gray-600 dark:text-gray-400">Estoque</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prescricao.itens.map((item: any, index: number) => (
                        <TableRow key={index} className="border-t border-gray-200 dark:border-gray-700">
                          <TableCell className="p-3 font-medium text-gray-900 dark:text-white">{item.nome}</TableCell>
                          <TableCell className="p-3 text-gray-600 dark:text-gray-400">{item.dosagem}</TableCell>
                          <TableCell className="p-3 text-gray-600 dark:text-gray-400">{item.frequencia}</TableCell>
                          <TableCell className="p-3">
                            <div className="flex justify-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Disponível
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhum item na prescrição
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-white">
                R$ {prescricao.valorTotal.toFixed(2).replace('.', ',')}
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
                max={prescricao.valorTotal}
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

          {/* Método de Pagamento */}
          <div className="space-y-2">
            <Label htmlFor="metodoPagamento">Método de Pagamento *</Label>
            <Select 
              value={formData.metodoPagamento} 
              onValueChange={(value) => setFormData({ ...formData, metodoPagamento: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent>
                {metodosPagamento.map((metodo) => (
                  <SelectItem key={metodo} value={metodo}>
                    {metodo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.metodoPagamento === 'Cartão de Crédito' && (
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
          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 dark:text-blue-400">Baixa Automática de Estoque</p>
              <p className="text-blue-700 dark:text-blue-500">
                Ao confirmar a venda, os itens serão automaticamente baixados do estoque (RF-001).
              </p>
            </div>
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
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Confirmar Venda
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}