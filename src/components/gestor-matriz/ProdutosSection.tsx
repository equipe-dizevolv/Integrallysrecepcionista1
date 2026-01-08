import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Package, Search, Plus, MoreHorizontal, Eye, Edit, AlertTriangle, TrendingUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function ProdutosSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('todos');

  const produtos = [
    {
      id: 1,
      nome: 'Paracetamol 500mg',
      categoria: 'Medicamentos',
      estoqueTotal: 2500,
      estoqueMinimo: 500,
      valor: 15.50,
      unidades: [
        { unidade: 'Centro', estoque: 800 },
        { unidade: 'Zona Sul', estoque: 650 },
        { unidade: 'Zona Norte', estoque: 1050 }
      ]
    },
    {
      id: 2,
      nome: 'Luvas Cirúrgicas (cx)',
      categoria: 'Material Hospitalar',
      estoqueTotal: 150,
      estoqueMinimo: 50,
      valor: 45.00,
      unidades: [
        { unidade: 'Centro', estoque: 60 },
        { unidade: 'Zona Sul', estoque: 40 },
        { unidade: 'Zona Norte', estoque: 50 }
      ]
    },
    {
      id: 3,
      nome: 'Termômetro Digital',
      categoria: 'Equipamentos',
      estoqueTotal: 35,
      estoqueMinimo: 30,
      valor: 89.90,
      unidades: [
        { unidade: 'Centro', estoque: 15 },
        { unidade: 'Zona Sul', estoque: 10 },
        { unidade: 'Zona Norte', estoque: 10 }
      ]
    },
    {
      id: 4,
      nome: 'Álcool 70%',
      categoria: 'Higiene',
      estoqueTotal: 180,
      estoqueMinimo: 100,
      valor: 12.00,
      unidades: [
        { unidade: 'Centro', estoque: 70 },
        { unidade: 'Zona Sul', estoque: 60 },
        { unidade: 'Zona Norte', estoque: 50 }
      ]
    }
  ];

  const produtosFiltrados = produtos.filter(p => {
    const matchSearch = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = categoriaFilter === 'todos' || p.categoria === categoriaFilter;
    return matchSearch && matchCategoria;
  });

  const getEstoqueBadge = (produto: any) => {
    if (produto.estoqueTotal <= produto.estoqueMinimo) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    } else if (produto.estoqueTotal <= produto.estoqueMinimo * 1.5) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  };

  const getEstoqueStatus = (produto: any) => {
    if (produto.estoqueTotal <= produto.estoqueMinimo) {
      return 'Crítico';
    } else if (produto.estoqueTotal <= produto.estoqueMinimo * 1.5) {
      return 'Baixo';
    }
    return 'Normal';
  };

  const handleVisualizar = (produto: any) => {
    toast.info(`Visualizando ${produto.nome}`);
  };

  const handleEditar = (produto: any) => {
    toast.info(`Editando ${produto.nome}`);
  };

  const produtosCriticos = produtos.filter(p => p.estoqueTotal <= p.estoqueMinimo).length;
  const valorTotalEstoque = produtos.reduce((acc, p) => acc + (p.estoqueTotal * p.valor), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Produtos & Estoque
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gerencie o estoque consolidado de todas as unidades
          </p>
        </div>
        
        <Button className="bg-[#244738] hover:bg-[#356b52] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Produtos
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {produtos.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Estoque Crítico
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {produtosCriticos}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Valor Total
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  R$ {(valorTotalEstoque / 1000).toFixed(1)}K
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Categorias
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  4
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
          />
        </div>

        <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="Medicamentos">Medicamentos</SelectItem>
            <SelectItem value="Material Hospitalar">Material Hospitalar</SelectItem>
            <SelectItem value="Equipamentos">Equipamentos</SelectItem>
            <SelectItem value="Higiene">Higiene</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {produto.nome}
                      </p>
                      <Badge className={getEstoqueBadge(produto)}>
                        {getEstoqueStatus(produto)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {produto.categoria} • R$ {produto.valor.toFixed(2)}
                    </p>
                    <div className="flex gap-4 mt-2">
                      {produto.unidades.map((u, index) => (
                        <span key={index} className="text-xs text-gray-600 dark:text-gray-400">
                          {u.unidade}: {u.estoque} un.
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {produto.estoqueTotal} un.
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Mín: {produto.estoqueMinimo}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                      <DropdownMenuItem
                        onClick={() => handleVisualizar(produto)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditar(produto)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
    </div>
  );
}
