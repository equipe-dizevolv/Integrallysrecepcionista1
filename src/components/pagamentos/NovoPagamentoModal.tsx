import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface NovoPagamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NovoPagamentoModal({ open, onOpenChange }: NovoPagamentoModalProps) {
  const [formData, setFormData] = useState({
    paciente: '',
    procedimento: '',
    valor: '',
    vencimento: '',
    formaPagamento: '',
    parcelas: '1',
    conta: '',
    observacoes: ''
  });

  const pacientes = [
    'Maria Silva',
    'Pedro Costa',
    'Laura Oliveira',
    'Roberto Ferreira',
    'Fernanda Torres',
    'Carlos Mendes'
  ];

  const procedimentos = [
    'Consulta Cardiologia - R$ 250,00',
    'Consulta Pediatria - R$ 200,00',
    'Consulta Neurologia - R$ 300,00',
    'Consulta Ginecologia - R$ 230,00',
    'Consulta Ortopedia - R$ 280,00',
    'Consulta Dermatologia - R$ 220,00',
    'Exame de Sangue - R$ 180,00',
    'Exame de Imagem - R$ 450,00',
    'Procedimento Cirúrgico - R$ 800,00'
  ];

  const formasPagamento = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Boleto',
    'Transferência Bancária'
  ];

  const contas = [
    'Caixa Principal',
    'Conta Corrente - Banco do Brasil',
    'Conta Corrente - Itaú',
    'Conta Digital - Nubank',
    'Conta Poupança'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.paciente || !formData.procedimento || !formData.valor || !formData.vencimento || !formData.formaPagamento || !formData.conta) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simular criação do pagamento
    toast.success('Recebimento registrado com sucesso!');
    onOpenChange(false);
    setFormData({
      paciente: '',
      procedimento: '',
      valor: '',
      vencimento: '',
      formaPagamento: '',
      parcelas: '1',
      conta: '',
      observacoes: ''
    });
  };

  const handleProcedimentoChange = (value: string) => {
    setFormData({ ...formData, procedimento: value });
    
    // Extrair valor do procedimento se disponível
    const match = value.match(/R\$ ([\d,]+\.?\d*)/);
    if (match) {
      const valor = match[1].replace(',', '');
      setFormData(prev => ({ ...prev, procedimento: value, valor }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Recebimento</DialogTitle>
          <DialogDescription>
            Registre um novo recebimento no sistema
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paciente">Paciente *</Label>
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

          <div className="space-y-2">
            <Label htmlFor="procedimento">Procedimento *</Label>
            <Select 
              value={formData.procedimento} 
              onValueChange={handleProcedimentoChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o procedimento" />
              </SelectTrigger>
              <SelectContent>
                {procedimentos.map((procedimento) => (
                  <SelectItem key={procedimento} value={procedimento}>
                    {procedimento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$) *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vencimento">Vencimento *</Label>
              <Input
                id="vencimento"
                type="date"
                value={formData.vencimento}
                onChange={(e) => setFormData({ ...formData, vencimento: e.target.value })}
                required
              />
            </div>
          </div>

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
                {formasPagamento.map((formaPagamento) => (
                  <SelectItem key={formaPagamento} value={formaPagamento}>
                    {formaPagamento}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parcelas">Parcelas</Label>
            <Input
              id="parcelas"
              type="number"
              min="1"
              value={formData.parcelas}
              onChange={(e) => setFormData({ ...formData, parcelas: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conta">Conta de Destino *</Label>
            <Select 
              value={formData.conta} 
              onValueChange={(value) => setFormData({ ...formData, conta: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                {contas.map((conta) => (
                  <SelectItem key={conta} value={conta}>
                    {conta}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Input
              id="observacoes"
              placeholder="Observações adicionais"
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
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Registrar Recebimento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}