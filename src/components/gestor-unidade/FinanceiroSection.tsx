import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

export function FinanceiroSection() {
  const [periodo] = useState('hoje');

  const resumo = {
    entradas: 5250.00,
    saidas: 1870.00,
    saldo: 3380.00
  };

  const movimentacoes = [
    {
      id: 1,
      data: '2025-10-15',
      tipo: 'entrada',
      categoria: 'Consulta',
      descricao: 'Consulta - Maria Silva',
      valor: 250.00,
      formaPagamento: 'PIX'
    },
    {
      id: 2,
      data: '2025-10-15',
      tipo: 'saida',
      categoria: 'Despesa',
      descricao: 'Material de escritório',
      valor: 120.00,
      formaPagamento: 'Dinheiro'
    },
    {
      id: 3,
      data: '2025-10-14',
      tipo: 'entrada',
      categoria: 'Venda',
      descricao: 'Venda de produto - João Santos',
      valor: 180.00,
      formaPagamento: 'Cartão'
    }
  ];

  const contas = [
    {
      id: 1,
      nome: 'Caixa Principal',
      saldo: 1250.00
    },
    {
      id: 2,
      nome: 'Conta Corrente - Banco do Brasil',
      saldo: 12500.00
    },
    {
      id: 3,
      nome: 'Conta Digital - Nubank',
      saldo: 5680.00
    }
  ];

  const handleExportar = () => {
    toast.success('Relatório exportado com sucesso');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financeiro
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gestão financeira da unidade
          </p>
        </div>
        
        <Button 
          onClick={handleExportar}
          variant="outline"
          className="border-[#244738] text-[#244738] hover:bg-[#244738]/10 dark:border-[#10b981] dark:text-[#10b981]"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar DRE
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Entradas
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  R$ {resumo.entradas.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <ArrowUpCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Saídas
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-2">
                  R$ {resumo.saidas.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <ArrowDownCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Saldo
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  R$ {resumo.saldo.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fluxo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-[#1a2e27]">
          <TabsTrigger 
            value="fluxo"
            className="data-[state=active]:bg-[#244738] data-[state=active]:text-white"
          >
            Fluxo de Caixa
          </TabsTrigger>
          <TabsTrigger 
            value="contas"
            className="data-[state=active]:bg-[#244738] data-[state=active]:text-white"
          >
            Contas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fluxo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimentações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {movimentacoes.map((mov) => (
                  <div
                    key={mov.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {mov.descricao}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {mov.categoria} • {mov.formaPagamento}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(mov.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <p className={`font-bold ${
                      mov.tipo === 'entrada' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {mov.tipo === 'entrada' ? '+' : '-'} R$ {mov.valor.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saldos por Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contas.map((conta) => (
                  <div
                    key={conta.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <p className="font-medium text-gray-900 dark:text-white">
                      {conta.nome}
                    </p>
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      R$ {conta.saldo.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
