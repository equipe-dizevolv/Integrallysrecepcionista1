import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

interface RegistrarRecebimentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: any;
  onRecebimentoRegistrado?: () => void;
}

export function RegistrarRecebimentoModal({ 
  open, 
  onOpenChange, 
  consulta,
  onRecebimentoRegistrado 
}: RegistrarRecebimentoModalProps) {
  const [formData, setFormData] = useState({
    valorPago: '',
    metodoPagamento: '',
    parcelas: '1',
    observacoes: ''
  });

  const [valorRestante, setValorRestante] = useState(0);
  const [percentualPago, setPercentualPago] = useState(0);
  const [statusPagamento, setStatusPagamento] = useState<'pendente' | 'parcial' | 'completo'>('pendente');

  const metodosPagamento = [
    'Dinheiro',
    'PIX',
    'Cartão de Débito',
    'Cartão de Crédito',
    'Transferência Bancária',
    'Cheque',
    'Boleto'
  ];

  useEffect(() => {
    if (consulta && open) {
      const valorTotal = parseFloat(consulta.valor.replace(',', '.'));
      const jaPago = consulta.jaPago || 0;
      const restante = valorTotal - jaPago;
      
      setValorRestante(restante);
      setFormData({
        valorPago: restante.toFixed(2),
        metodoPagamento: '',
        parcelas: '1',
        observacoes: ''
      });
      
      // Calcular percentual já pago
      const percentual = (jaPago / valorTotal) * 100;
      setPercentualPago(percentual);
      
      // Determinar status atual
      if (jaPago === 0) {
        setStatusPagamento('pendente');
      } else if (jaPago < valorTotal) {
        setStatusPagamento('parcial');
      } else {
        setStatusPagamento('completo');
      }
    }
  }, [consulta, open]);

  const handleValorChange = (valor: string) => {
    setFormData({ ...formData, valorPago: valor });
    
    if (consulta && valor) {
      const valorTotal = parseFloat(consulta.valor.replace(',', '.'));
      const jaPago = consulta.jaPago || 0;
      const novoPagamento = parseFloat(valor);
      const totalPago = jaPago + novoPagamento;
      const percentual = (totalPago / valorTotal) * 100;
      
      setPercentualPago(percentual);
      
      // Atualizar status baseado no percentual
      if (percentual === 0) {
        setStatusPagamento('pendente');
      } else if (percentual < 100) {
        setStatusPagamento('parcial');
      } else {
        setStatusPagamento('completo');
      }
    }
  };

  const handlePagamentoParcial50 = () => {
    if (consulta) {
      const valorTotal = parseFloat(consulta.valor.replace(',', '.'));
      const valorParcial = (valorTotal * 0.5).toFixed(2);
      handleValorChange(valorParcial);
      toast.info('Valor ajustado para 50% do total');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.valorPago || !formData.metodoPagamento) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const valorPago = parseFloat(formData.valorPago);
    
    // Validação de valor
    if (valorPago <= 0) {
      toast.error('O valor pago deve ser maior que zero');
      return;
    }

    if (valorPago > valorRestante) {
      toast.error('O valor pago não pode ser maior que o valor restante');
      return;
    }

    // RN-002: Validação de cobrança parcial (50%)
    if (consulta) {
      const valorTotal = parseFloat(consulta.valor.replace(',', '.'));
      const jaPago = consulta.jaPago || 0;
      const totalPago = jaPago + valorPago;
      const percentualFinal = (totalPago / valorTotal) * 100;
      
      // Verificar se está entre 50% e 99% (parcial) ou 100% (completo)
      if (percentualFinal >= 50 && percentualFinal < 100) {
        // Status: Parcial (ícone amarelo)
        toast.success(`Recebimento parcial registrado (${percentualFinal.toFixed(0)}%)`);
      } else if (percentualFinal >= 100) {
        // Status: Completo (ícone verde)
        toast.success('Pagamento completo registrado!');
      } else {
        // Menos de 50% - alertar
        toast.warning(`Valor recebido: ${percentualFinal.toFixed(0)}% do total`);
      }
    }

    // Callback para atualizar a lista
    if (onRecebimentoRegistrado) {
      onRecebimentoRegistrado();
    }

    onOpenChange(false);
    
    // Reset form
    setFormData({
      valorPago: '',
      metodoPagamento: '',
      parcelas: '1',
      observacoes: ''
    });
  };

  if (!consulta) return null;

  const valorTotal = parseFloat(consulta.valor.replace(',', '.'));
  const jaPago = consulta.jaPago || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Recebimento</DialogTitle>
          <DialogDescription>
            Registre o pagamento da consulta
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Informações da Consulta */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paciente</p>
                <p className="font-medium text-gray-900 dark:text-white">{consulta.paciente}</p>
              </div>
              <Badge 
                className={
                  statusPagamento === 'completo' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : statusPagamento === 'parcial'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }
              >
                {statusPagamento === 'completo' ? (
                  <><CheckCircle2 className="w-3 h-3 mr-1" />Completo</>
                ) : statusPagamento === 'parcial' ? (
                  <><AlertCircle className="w-3 h-3 mr-1" />Parcial</>
                ) : (
                  <><AlertCircle className="w-3 h-3 mr-1" />Pendente</>
                )}
              </Badge>
            </div>
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Valor Total</p>
                  <p className="font-medium text-gray-900 dark:text-white">R$ {consulta.valor}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Já Pago</p>
                  <p className="font-medium text-gray-900 dark:text-white">R$ {jaPago.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Valor Restante</p>
                <p className="text-lg font-bold text-[#244738] dark:text-green-400">
                  R$ {valorRestante.toFixed(2).replace('.', ',')}
                </p>
              </div>
              
              {percentualPago > 0 && percentualPago < 100 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progresso do Pagamento</span>
                    <span>{percentualPago.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        percentualPago >= 50 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(percentualPago, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Campos do Formulário */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="valorPago">Valor a Receber (R$) *</Label>
              {valorRestante > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handlePagamentoParcial50}
                  className="text-xs h-auto py-1 px-2 text-[#244738] hover:bg-[#244738]/10"
                >
                  50% do total
                </Button>
              )}
            </div>
            <Input
              id="valorPago"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={formData.valorPago}
              onChange={(e) => handleValorChange(e.target.value)}
              required
              max={valorRestante}
            />
          </div>

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
                      {num}x
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
              placeholder="Observações sobre o pagamento"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            />
          </div>

          {/* Alertas de Validação RN-002 */}
          {formData.valorPago && (
            <>
              {(() => {
                const valorPagoNum = parseFloat(formData.valorPago);
                const totalAposPagamento = jaPago + valorPagoNum;
                const percentualFinal = (totalAposPagamento / valorTotal) * 100;
                
                if (percentualFinal >= 50 && percentualFinal < 100) {
                  return (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800 dark:text-yellow-400">Pagamento Parcial</p>
                        <p className="text-yellow-700 dark:text-yellow-500">
                          Este pagamento será registrado como parcial ({percentualFinal.toFixed(0)}% do total).
                        </p>
                      </div>
                    </div>
                  );
                } else if (percentualFinal >= 100) {
                  return (
                    <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-green-800 dark:text-green-400">Pagamento Completo</p>
                        <p className="text-green-700 dark:text-green-500">
                          Este pagamento quitará completamente a consulta.
                        </p>
                      </div>
                    </div>
                  );
                } else if (percentualFinal > 0 && percentualFinal < 50) {
                  return (
                    <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-red-800 dark:text-red-400">Valor Abaixo de 50%</p>
                        <p className="text-red-700 dark:text-red-500">
                          O valor informado representa apenas {percentualFinal.toFixed(0)}% do total.
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </>
          )}

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
              Confirmar Recebimento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
