import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Download, Printer, DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RelatorioFinanceiroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RelatorioFinanceiroModal({ open, onOpenChange }: RelatorioFinanceiroModalProps) {
  const [activeTab, setActiveTab] = useState<'caixa' | 'periodo'>('periodo');
  const [periodo, setPeriodo] = useState('30d');
  const [dataRelatorio] = useState(new Date().toLocaleDateString('pt-BR'));

  // Dados mock para Caixa Diário
  const dadosCaixa = {
    abertura: {
      hora: '08:00',
      responsavel: 'Ana Recepcionista',
      valorInicial: 200.00
    },
    movimentacoes: {
      dinheiro: 1250.00,
      debito: 3400.00,
      credito: 5600.00,
      pix: 2890.00
    },
    saidas: {
      despesas: 450.00,
      sangrias: 500.00
    },
    fechamento: {
      hora: '18:00',
      valorEsperado: 12390.00,
      valorContado: 12390.00,
      diferenca: 0
    }
  };

  // Dados mock para Período
  const dadosPeriodo = {
    receitas: {
      total: 68450.00,
      dinheiro: 12300.00,
      debito: 18900.00,
      credito: 25600.00,
      pix: 11650.00
    },
    despesas: {
      total: 15780.00,
      categorias: [
        { nome: 'Materiais', valor: 5600.00 },
        { nome: 'Salários', valor: 8000.00 },
        { nome: 'Infraestrutura', valor: 1200.00 },
        { nome: 'Outros', valor: 980.00 }
      ]
    },
    consultas: {
      pagas: 156,
      pendentes: 23,
      canceladas: 8
    },
    comparativo: {
      receitasAnterior: 62300.00,
      crescimento: 9.87
    }
  };

  const handleDownloadPDF = () => {
    toast.success('Relatório baixado com sucesso!');
  };

  const handleImprimir = () => {
    toast.success('Relatório enviado para impressão');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Relatório Financeiro
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Visualize e exporte informações financeiras detalhadas
          </DialogDescription>
        </DialogHeader>

        {/* Tabs customizadas */}
        <div className="w-full">
          <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-[#0f1b16] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('caixa')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'caixa'
                  ? 'bg-white dark:bg-[#244738] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Caixa Diário
            </button>
            <button
              onClick={() => setActiveTab('periodo')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'periodo'
                  ? 'bg-white dark:bg-[#244738] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Por Período
            </button>
          </div>

          {/* Aba Caixa Diário */}
          {activeTab === 'caixa' && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Movimentação do Caixa - {dataRelatorio}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Abertura */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Abertura de Caixa</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Hora:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{dadosCaixa.abertura.hora}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Responsável:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{dadosCaixa.abertura.responsavel}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Valor Inicial:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(dadosCaixa.abertura.valorInicial)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Entradas */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Entradas por Forma de Pagamento</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Dinheiro</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.movimentacoes.dinheiro)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cartão Débito</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.movimentacoes.debito)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Cartão Crédito</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.movimentacoes.credito)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">PIX</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.movimentacoes.pix)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Saídas */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Saídas</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Despesas</span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            -{formatCurrency(dadosCaixa.saidas.despesas)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Sangrias</span>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            -{formatCurrency(dadosCaixa.saidas.sangrias)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fechamento */}
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Fechamento de Caixa</h4>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Hora:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{dadosCaixa.fechamento.hora}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Valor Esperado:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(dadosCaixa.fechamento.valorEsperado)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Valor Contado:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(dadosCaixa.fechamento.valorContado)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Diferença:</span>
                        <p className={`font-medium ${dadosCaixa.fechamento.diferenca === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {dadosCaixa.fechamento.diferenca === 0 ? 'OK' : formatCurrency(Math.abs(dadosCaixa.fechamento.diferenca))}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Aba Por Período */}
          {activeTab === 'periodo' && (
            <div className="space-y-4">
              {/* Seletor de Período */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: 'Últimos 7 dias', value: '7d' },
                  { label: 'Últimos 30 dias', value: '30d' },
                  { label: 'Últimos 3 meses', value: '3m' },
                  { label: 'Este ano', value: 'year' }
                ].map((p) => (
                  <Button
                    key={p.value}
                    variant={periodo === p.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPeriodo(p.value)}
                    className={periodo === p.value ? 'bg-[#244738] hover:bg-[#356b52]' : ''}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>

              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total de Receitas</p>
                        <p className="text-2xl font-bold text-[#244738] dark:text-[#10b981]">
                          {formatCurrency(dadosPeriodo.receitas.total)}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 dark:text-green-400">+{dadosPeriodo.comparativo.crescimento}%</span>
                      <span className="text-gray-500 dark:text-gray-400">vs período anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total de Despesas</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {formatCurrency(dadosPeriodo.despesas.total)}
                        </p>
                      </div>
                      <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saldo Líquido</p>
                        <p className="text-2xl font-bold text-[#244738] dark:text-[#10b981]">
                          {formatCurrency(dadosPeriodo.receitas.total - dadosPeriodo.despesas.total)}
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detalhamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Receitas por Forma de Pagamento */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Receitas por Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cartão de Crédito</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(dadosPeriodo.receitas.credito)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cartão de Débito</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(dadosPeriodo.receitas.debito)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Dinheiro</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(dadosPeriodo.receitas.dinheiro)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">PIX</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(dadosPeriodo.receitas.pix)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Despesas por Categoria */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Despesas por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dadosPeriodo.despesas.categorias.map((cat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{cat.nome}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(cat.valor)}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Status de Consultas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Status de Consultas no Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {dadosPeriodo.consultas.pagas}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pagas</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {dadosPeriodo.consultas.pendentes}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pendentes</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {dadosPeriodo.consultas.canceladas}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Canceladas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button
            variant="outline"
            onClick={handleImprimir}
            className="flex-1"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
