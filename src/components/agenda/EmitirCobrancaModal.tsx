import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X, CreditCard, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmitirCobrancaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: any;
  onCobrancaEmitida?: (consultaId: number, novoStatus: 'completo' | 'parcial', valorRecebido: number) => void;
}

export function EmitirCobrancaModal({ 
  open, 
  onOpenChange, 
  consulta,
  onCobrancaEmitida
}: EmitirCobrancaModalProps) {
  const [metodo, setMetodo] = useState('');
  const [valorReceber, setValorReceber] = useState('');
  const [observacao, setObservacao] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Cálculos automáticos
  const valorTotal = consulta ? parseFloat(consulta.valor.replace(',', '.')) : 0;
  const jaPago = consulta ? (consulta.jaPago || 0) : 0;
  const saldoAberto = valorTotal - jaPago;
  
  const valorReceberNum = valorReceber ? parseFloat(valorReceber.replace(',', '.')) : 0;
  const ficaraPago = jaPago + valorReceberNum;
  const saldoRestante = Math.max(0, valorTotal - ficaraPago);

  useEffect(() => {
    if (open && consulta) {
      // Definir valor padrão como saldo em aberto
      setValorReceber(saldoAberto.toFixed(2).replace('.', ','));
      setMetodo('');
      setObservacao('');
      setErrors({});
    }
  }, [open, consulta]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!metodo) {
      newErrors.metodo = 'Selecione um método de pagamento';
    }

    if (!valorReceber || valorReceberNum <= 0) {
      newErrors.valorReceber = 'Valor deve ser maior que zero';
    }

    if (valorReceberNum > saldoAberto) {
      newErrors.valorReceber = `Valor não pode exceder o saldo em aberto (R$ ${saldoAberto.toFixed(2).replace('.', ',')})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Determinar novo status do pagamento
    const novoStatus: 'completo' | 'parcial' = saldoRestante === 0 ? 'completo' : 'parcial';

    // Emitir cobrança
    if (onCobrancaEmitida && consulta) {
      onCobrancaEmitida(consulta.id, novoStatus, valorReceberNum);
    }

    toast.success(
      `Recebido R$ ${valorReceberNum.toFixed(2).replace('.', ',')}${
        saldoRestante > 0 
          ? `, saldo restante R$ ${saldoRestante.toFixed(2).replace('.', ',')}` 
          : ' - Pagamento completo!'
      }`
    );
    
    onOpenChange(false);
  };

  const formatCurrency = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '');
    // Converte para decimal
    const decimal = parseFloat(numbers) / 100;
    // Formata com vírgula
    return decimal.toFixed(2).replace('.', ',');
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValorReceber(formatted);
    // Limpar erro quando usuário digita
    if (errors.valorReceber) {
      setErrors(prev => ({ ...prev, valorReceber: '' }));
    }
  };

  if (!consulta) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600 scrollbar-nested">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Emitir Nova Cobrança
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Preencha os dados para registrar o recebimento
          </DialogDescription>
        </DialogHeader>

        {/* Dados da Consulta */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
            Paciente: {consulta.paciente}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {consulta.especialista} • {consulta.horario}
          </p>
        </div>

        {/* Resumo da Cobrança */}
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-3">
            Resumo da Cobrança
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Valor Total:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                R$ {valorTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Já Pago:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                R$ {jaPago.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-200 dark:border-blue-800">
              <span className="font-medium text-gray-900 dark:text-white">Saldo em Aberto:</span>
              <span className="font-bold text-[#244738] dark:text-[#10b981]">
                R$ {saldoAberto.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Método de Pagamento */}
          <div className="space-y-2">
            <Label htmlFor="metodo" className="text-gray-900 dark:text-white">
              Método de Pagamento *
            </Label>
            <Select value={metodo} onValueChange={(val) => {
              setMetodo(val);
              if (errors.metodo) setErrors(prev => ({ ...prev, metodo: '' }));
            }}>
              <SelectTrigger 
                id="metodo"
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                aria-label="Selecione o método de pagamento"
                aria-invalid={!!errors.metodo}
              >
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="cartao_debito">Cartão de Débito</SelectItem>
                <SelectItem value="cartao_credito">Cartão de Crédito</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
            {errors.metodo && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.metodo}
              </p>
            )}
          </div>

          {/* Valor a Receber */}
          <div className="space-y-2">
            <Label htmlFor="valorReceber" className="text-gray-900 dark:text-white">
              Valor a Receber Agora (R$) *
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                R$
              </span>
              <Input
                id="valorReceber"
                type="text"
                placeholder="0,00"
                value={valorReceber}
                onChange={handleValorChange}
                className={`pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white ${
                  errors.valorReceber ? 'border-red-500 dark:border-red-500' : ''
                }`}
                aria-label="Valor a receber agora"
                aria-invalid={!!errors.valorReceber}
                aria-describedby={errors.valorReceber ? "valorReceber-error" : undefined}
              />
            </div>
            {errors.valorReceber && (
              <p id="valorReceber-error" className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.valorReceber}
              </p>
            )}
          </div>

          {/* Preview do cálculo */}
          {valorReceberNum > 0 && (
            <div className="p-3 bg-gray-50 dark:bg-[#1a2e27] rounded-lg text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ficará Pago:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  R$ {ficaraPago.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Saldo Restante:</span>
                <span className={`font-medium ${
                  saldoRestante === 0 
                    ? 'text-[#12B76A] dark:text-[#12B76A]' 
                    : 'text-[#F79009] dark:text-[#F79009]'
                }`}>
                  R$ {saldoRestante.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          )}

          {/* Observação */}
          <div className="space-y-2">
            <Label htmlFor="observacao" className="text-gray-900 dark:text-white">
              Observação
            </Label>
            <Textarea
              id="observacao"
              placeholder="Informações adicionais sobre o recebimento..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white resize-none"
              rows={3}
              aria-label="Observações sobre o recebimento"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
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
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white disabled:opacity-60"
              disabled={!metodo || !valorReceber || valorReceberNum <= 0}
            >
              Confirmar Emissão
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
