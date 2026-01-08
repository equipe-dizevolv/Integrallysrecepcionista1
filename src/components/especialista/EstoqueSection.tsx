import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Search, 
  Package,
  AlertCircle,
  PackagePlus,
  PackageMinus
} from 'lucide-react';
import { EntradaEstoqueModal } from '../estoque/EntradaEstoqueModal';
import { SaidaEstoqueModal } from '../estoque/SaidaEstoqueModal';

export function EstoqueSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntradaModal, setShowEntradaModal] = useState(false);
  const [showSaidaModal, setShowSaidaModal] = useState(false);
  const [produtos] = useState([
    {
      id: 1,
      nome: 'Dipirona 500mg',
      categoria: 'Medicamento',
      quantidade: 150,
      minimo: 50,
      preco: 25.00,
      status: 'disponivel'
    },
    {
      id: 2,
      nome: 'Gaze Estéril',
      categoria: 'Suprimento',
      quantidade: 30,
      minimo: 50,
      preco: 8.50,
      status: 'baixo'
    },
    {
      id: 3,
      nome: 'Luva Procedimento M',
      categoria: 'Suprimento',
      quantidade: 5,
      minimo: 20,
      preco: 12.00,
      status: 'critico'
    },
    {
      id: 4,
      nome: 'Vitamina D3 1000 UI',
      categoria: 'Suplemento',
      quantidade: 80,
      minimo: 30,
      preco: 45.00,
      status: 'disponivel'
    },
    {
      id: 5,
      nome: 'Ômega 3 1000mg',
      categoria: 'Suplemento',
      quantidade: 60,
      minimo: 25,
      preco: 55.00,
      status: 'disponivel'
    },
    {
      id: 6,
      nome: 'Whey Protein 900g',
      categoria: 'Suplemento',
      quantidade: 40,
      minimo: 15,
      preco: 120.00,
      status: 'disponivel'
    },
    {
      id: 7,
      nome: 'Creatina 300g',
      categoria: 'Suplemento',
      quantidade: 15,
      minimo: 20,
      preco: 80.00,
      status: 'baixo'
    },
    {
      id: 8,
      nome: 'Antibiótico X 500mg',
      categoria: 'Medicamento',
      quantidade: 45,
      minimo: 20,
      preco: 35.00,
      status: 'disponivel'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'baixo':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critico':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'Disponível';
      case 'baixo':
        return 'Estoque Baixo';
      case 'critico':
        return 'Crítico';
      default:
        return status;
    }
  };

  const produtosFiltrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Estoque & Suprimentos
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gerenciamento completo de estoque
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => setShowEntradaModal(true)}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <PackagePlus className="w-4 h-4 mr-2" />
            Entrada
          </Button>
          <Button 
            onClick={() => setShowSaidaModal(true)}
            variant="destructive"
          >
            <PackageMinus className="w-4 h-4 mr-2" />
            Saída
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Alertas */}
      {produtos.filter(p => p.status !== 'disponivel').length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                {produtos.filter(p => p.status !== 'disponivel').length} produto(s) com estoque baixo ou crítico
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos em Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {produto.nome}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {produto.categoria}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Qtd: {produto.quantidade}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Mín: {produto.minimo}
                    </p>
                  </div>
                  <Badge className={getStatusColor(produto.status)}>
                    {getStatusText(produto.status)}
                  </Badge>
                </div>
              </div>
            ))}

            {produtosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum produto encontrado
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <EntradaEstoqueModal 
        open={showEntradaModal} 
        onClose={() => setShowEntradaModal(false)}
      />
      
      <SaidaEstoqueModal 
        open={showSaidaModal} 
        onClose={() => setShowSaidaModal(false)}
      />
    </div>
  );
}