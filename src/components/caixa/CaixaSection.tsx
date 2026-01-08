import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Smartphone,
  Banknote,
  ArrowRightLeft,
  Download,
  FileText
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

export function CaixaSection() {
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [saldoInicial, setSaldoInicial] = useState(250.00);
  const [saldoAtual, setSaldoAtual] = useState(250.00);
  const [showAbrirCaixaModal, setShowAbrirCaixaModal] = useState(false);
  const [showFecharCaixaModal, setShowFecharCaixaModal] = useState(false);
  const [showTransferenciaModal, setShowTransferenciaModal] = useState(false);
  const [valorAbertura, setValorAbertura] = useState('250.00');
  const [valorTransferencia, setValorTransferencia] = useState('');
  
  // Movimentações do dia
  const [movimentacoes, setMovimentacoes] = useState([
    {
      id: 1,
      tipo: 'entrada',
      descricao: 'Recebimento - Maria Silva',
      valor: 150.00,
      formaPagamento: 'dinheiro',
      horario: '08:15',
      responsavel: 'Ana Recepcionista'
    },
    {
      id: 2,
      tipo: 'entrada',
      descricao: 'Recebimento - Pedro Costa',
      valor: 120.00,
      formaPagamento: 'cartao-credito',
      horario: '09:30',
      responsavel: 'Ana Recepcionista'
    },
    {
      id: 3,
      tipo: 'entrada',
      descricao: 'Recebimento - Laura Oliveira',
      valor: 200.00,
      formaPagamento: 'pix',
      horario: '10:45',
      responsavel: 'Ana Recepcionista'
    },
    {
      id: 4,
      tipo: 'entrada',
      descricao: 'Recebimento - Roberto Ferreira',
      valor: 180.00,
      formaPagamento: 'dinheiro',
      horario: '11:20',
      responsavel: 'Ana Recepcionista'
    },
    {
      id: 5,
      tipo: 'entrada',
      descricao: 'Recebimento - Carlos Mendes',
      valor: 150.00,
      formaPagamento: 'cartao-debito',
      horario: '14:30',
      responsavel: 'Ana Recepcionista'
    },
    {
      id: 6,
      tipo: 'entrada',
      descricao: 'Recebimento - Julia Martins',
      valor: 200.00,
      formaPagamento: 'pix',
      horario: '15:10',
      responsavel: 'Ana Recepcionista'
    }
  ]);

  // Calcular totais por forma de pagamento
  const calcularTotais = () => {
    const totais = {
      dinheiro: 0,
      pix: 0,
      cartaoDebito: 0,
      cartaoCredito: 0,
      total: 0
    };

    movimentacoes.forEach(mov => {
      if (mov.tipo === 'entrada') {
        switch (mov.formaPagamento) {
          case 'dinheiro':
            totais.dinheiro += mov.valor;
            break;
          case 'pix':
            totais.pix += mov.valor;
            break;
          case 'cartao-debito':
            totais.cartaoDebito += mov.valor;
            break;
          case 'cartao-credito':
            totais.cartaoCredito += mov.valor;
            break;
        }
        totais.total += mov.valor;
      }
    });

    return totais;
  };

  const totais = calcularTotais();
  const saldoEsperadoCaixa = saldoInicial + totais.dinheiro;

  const handleAbrirCaixa = () => {
    const valor = parseFloat(valorAbertura);
    if (isNaN(valor) || valor < 0) {
      toast.error('Valor inválido para abertura de caixa');
      return;
    }

    setSaldoInicial(valor);
    setSaldoAtual(valor);
    setCaixaAberto(true);
    setShowAbrirCaixaModal(false);
    
    toast.success(`Caixa aberto com saldo inicial de R$ ${valor.toFixed(2)}`);
  };

  const handleFecharCaixa = () => {
    if (totais.dinheiro > 0) {
      // Simular transferência automática para o caixa financeiro do administrador
      toast.success(
        `Caixa fechado! R$ ${totais.dinheiro.toFixed(2)} transferido para o caixa financeiro do administrador`,
        { duration: 5000 }
      );
    } else {
      toast.success('Caixa fechado com sucesso!');
    }
    
    setCaixaAberto(false);
    setSaldoAtual(saldoInicial);
    setShowFecharCaixaModal(false);
  };

  const handleTransferencia = () => {
    const valor = parseFloat(valorTransferencia);
    if (isNaN(valor) || valor <= 0) {
      toast.error('Valor inválido para transferência');
      return;
    }

    if (valor > totais.dinheiro) {
      toast.error('Valor maior que o disponível em dinheiro');
      return;
    }

    toast.success(
      `R$ ${valor.toFixed(2)} transferido para o caixa financeiro do administrador`,
      { duration: 4000 }
    );
    
    setShowTransferenciaModal(false);
    setValorTransferencia('');
  };

  const formatarFormaPagamento = (forma: string) => {
    switch (forma) {
      case 'dinheiro':
        return 'Dinheiro';
      case 'pix':
        return 'PIX';
      case 'cartao-debito':
        return 'Cartão de Débito';
      case 'cartao-credito':
        return 'Cartão de Crédito';
      default:
        return forma;
    }
  };

  const getIconeFormaPagamento = (forma: string) => {
    switch (forma) {
      case 'dinheiro':
        return <Banknote className="w-4 h-4" />;
      case 'pix':
        return <Smartphone className="w-4 h-4" />;
      case 'cartao-debito':
      case 'cartao-credito':
        return <CreditCard className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Controle de Caixa
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gerenciamento de recebimentos e fechamento de caixa
          </p>
        </div>
        
        <div className="flex gap-3">
          {!caixaAberto ? (
            <Button
              onClick={() => setShowAbrirCaixaModal(true)}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Abrir Caixa
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setShowTransferenciaModal(true)}
                variant="outline"
                className="border-[#244738] text-[#244738] hover:bg-[#244738] hover:text-white dark:border-[#10b981] dark:text-[#10b981] dark:hover:bg-[#10b981] dark:hover:text-white"
              >
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Transferir para Financeiro
              </Button>
              <Button
                onClick={() => setShowFecharCaixaModal(true)}
                variant="destructive"
              >
                <Lock className="w-4 h-4 mr-2" />
                Fechar Caixa
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Status do Caixa */}
      <Card className={caixaAberto ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {caixaAberto ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-green-900 dark:text-green-400">Caixa Aberto</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <span className="text-red-900 dark:text-red-400">Caixa Fechado</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">Saldo Inicial</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-400">
                R$ {saldoInicial.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Recebido em Dinheiro</span>
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-400">
                R$ {totais.dinheiro.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Saldo Esperado</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-400">
                R$ {saldoEsperadoCaixa.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Total Recebido</span>
              </div>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-400">
                R$ {totais.total.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Resumo e Movimentações */}
      <Tabs defaultValue="resumo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-[#1a2e27]">
          <TabsTrigger 
            value="resumo"
            className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
          >
            Resumo por Forma de Pagamento
          </TabsTrigger>
          <TabsTrigger 
            value="movimentacoes"
            className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
          >
            Movimentações do Dia
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo por Forma de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dinheiro */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                      <Banknote className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dinheiro</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Precisa bater com o físico
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      R$ {totais.dinheiro.toFixed(2)}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      Em caixa: R$ {saldoEsperadoCaixa.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                {/* PIX */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                      <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">PIX</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Conferir com extrato bancário
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    R$ {totais.pix.toFixed(2)}
                  </p>
                </div>

                {/* Cartão de Débito */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded">
                      <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Cartão de Débito</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Conferir com relatório de vendas
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    R$ {totais.cartaoDebito.toFixed(2)}
                  </p>
                </div>

                {/* Cartão de Crédito */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded">
                      <CreditCard className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Cartão de Crédito</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Conferir com relatório de vendas
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    R$ {totais.cartaoCredito.toFixed(2)}
                  </p>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-4 bg-[#244738] dark:bg-[#356b52] rounded-lg mt-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-white text-lg">Total Recebido</p>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    R$ {totais.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Resumo
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimentacoes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Movimentações do Dia ({movimentacoes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Forma de Pagamento</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimentacoes.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell className="font-medium">{mov.horario}</TableCell>
                      <TableCell>{mov.descricao}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIconeFormaPagamento(mov.formaPagamento)}
                          <span>{formatarFormaPagamento(mov.formaPagamento)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{mov.responsavel}</TableCell>
                      <TableCell className="text-right">
                        <span className={mov.tipo === 'entrada' ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
                          {mov.tipo === 'entrada' ? '+' : '-'} R$ {mov.valor.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Abrir Caixa */}
      <Dialog open={showAbrirCaixaModal} onOpenChange={setShowAbrirCaixaModal}>
        <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Abrir Caixa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="valorAbertura" className="text-gray-900 dark:text-white">
                Saldo Inicial em Dinheiro
              </Label>
              <Input
                id="valorAbertura"
                type="number"
                step="0.01"
                placeholder="250.00"
                value={valorAbertura}
                onChange={(e) => setValorAbertura(e.target.value)}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Este valor deve corresponder ao dinheiro físico no caixa
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAbrirCaixaModal(false)}
              className="border-gray-200 dark:border-gray-600"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAbrirCaixa}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Abrir Caixa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Fechar Caixa */}
      <Dialog open={showFecharCaixaModal} onOpenChange={setShowFecharCaixaModal}>
        <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Fechar Caixa</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <h4 className="font-medium text-amber-900 dark:text-amber-400 mb-2">Resumo do Fechamento</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Saldo Inicial:</span>
                  <span className="font-medium text-gray-900 dark:text-white">R$ {saldoInicial.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Recebido em Dinheiro:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">+ R$ {totais.dinheiro.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-amber-200 dark:border-amber-800">
                  <span className="font-medium text-gray-900 dark:text-white">Saldo Esperado em Caixa:</span>
                  <span className="font-bold text-gray-900 dark:text-white">R$ {saldoEsperadoCaixa.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-2">Ação de Fechamento</h4>
              <p className="text-sm text-blue-800 dark:text-blue-400">
                Ao fechar o caixa:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-400 mt-2 space-y-1">
                <li>R$ {totais.dinheiro.toFixed(2)} será transferido automaticamente para o caixa financeiro do administrador</li>
                <li>O saldo do caixa retornará para R$ {saldoInicial.toFixed(2)}</li>
                <li>Confira se o dinheiro físico corresponde a R$ {saldoEsperadoCaixa.toFixed(2)}</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowFecharCaixaModal(false)}
              className="border-gray-200 dark:border-gray-600"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleFecharCaixa}
              variant="destructive"
            >
              <Lock className="w-4 h-4 mr-2" />
              Confirmar Fechamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Transferência */}
      <Dialog open={showTransferenciaModal} onOpenChange={setShowTransferenciaModal}>
        <DialogContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Transferir para Caixa Financeiro</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-400">
                <strong>Disponível em dinheiro:</strong> R$ {totais.dinheiro.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorTransferencia" className="text-gray-900 dark:text-white">
                Valor a Transferir
              </Label>
              <Input
                id="valorTransferencia"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={valorTransferencia}
                onChange={(e) => setValorTransferencia(e.target.value)}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Este valor será transferido para o caixa financeiro do administrador
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTransferenciaModal(false)}
              className="border-gray-200 dark:border-gray-600"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleTransferencia}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Transferir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
