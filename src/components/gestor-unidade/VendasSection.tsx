import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { DollarSign, Plus, Search, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function VendasSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendas] = useState([
    {
      id: 1,
      data: '2025-10-15',
      paciente: 'Maria Silva',
      profissional: 'Dr. João Santos',
      itens: 3,
      valor: 250.00,
      formaPagamento: 'PIX',
      status: 'concluida'
    },
    {
      id: 2,
      data: '2025-10-14',
      paciente: 'Pedro Costa',
      profissional: 'Dra. Ana Lima',
      itens: 2,
      valor: 180.00,
      formaPagamento: 'Cartão',
      status: 'concluida'
    }
  ]);

  const handleNovaVenda = () => {
    toast.info('Abrir modal para nova venda');
  };

  const vendasFiltradas = vendas.filter(v =>
    v.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.profissional.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalVendas = vendasFiltradas.reduce((sum, v) => sum + v.valor, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Vendas
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gerencie vendas sem prescrição
          </p>
        </div>
        
        <Button 
          onClick={handleNovaVenda}
          className="bg-[#244738] hover:bg-[#356b52] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Venda
        </Button>
      </div>

      {/* KPI */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Vendas
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                R$ {totalVendas.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar venda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Lista de Vendas */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vendasFiltradas.map((venda) => (
              <div
                key={venda.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {venda.paciente}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {venda.profissional} • {venda.itens} item(ns)
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(venda.data).toLocaleDateString('pt-BR')} • {venda.formaPagamento}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    R$ {venda.valor.toFixed(2).replace('.', ',')}
                  </p>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 mt-1">
                    Concluída
                  </Badge>
                </div>
              </div>
            ))}

            {vendasFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma venda encontrada
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
