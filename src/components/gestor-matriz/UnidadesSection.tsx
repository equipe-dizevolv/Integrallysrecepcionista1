import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Building, Search, Plus, MoreHorizontal, Eye, Edit, MapPin, Users, DollarSign } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

export function UnidadesSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const unidades = [
    {
      id: 1,
      nome: 'Unidade Centro',
      endereco: 'Av. Paulista, 1000 - São Paulo/SP',
      especialistas: 12,
      pacientesAtivos: 450,
      receitaMensal: 'R$ 85.000',
      status: 'ativa'
    },
    {
      id: 2,
      nome: 'Unidade Zona Sul',
      endereco: 'Rua dos Três Irmãos, 500 - São Paulo/SP',
      especialistas: 8,
      pacientesAtivos: 320,
      receitaMensal: 'R$ 62.000',
      status: 'ativa'
    },
    {
      id: 3,
      nome: 'Unidade Zona Norte',
      endereco: 'Av. Tucuruvi, 2000 - São Paulo/SP',
      especialistas: 10,
      pacientesAtivos: 380,
      receitaMensal: 'R$ 71.500',
      status: 'ativa'
    },
    {
      id: 4,
      nome: 'Unidade ABC',
      endereco: 'Rua Industrial, 750 - Santo André/SP',
      especialistas: 6,
      pacientesAtivos: 210,
      receitaMensal: 'R$ 45.000',
      status: 'inativa'
    }
  ];

  const unidadesFiltradas = unidades.filter(u =>
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === 'ativa' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const handleVisualizar = (unidade: any) => {
    toast.info(`Visualizando ${unidade.nome}`);
  };

  const handleEditar = (unidade: any) => {
    toast.info(`Editando ${unidade.nome}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Unidades
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gerencie todas as unidades da rede
          </p>
        </div>
        
        <Button className="bg-[#244738] hover:bg-[#356b52] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nova Unidade
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Unidades
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  12
                </p>
              </div>
              <Building className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Unidades Ativas
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  10
                </p>
              </div>
              <Building className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Especialistas
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  84
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Receita Total
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  R$ 850K
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar unidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Lista de Unidades */}
      <Card>
        <CardHeader>
          <CardTitle>Todas as Unidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unidadesFiltradas.map((unidade) => (
              <div
                key={unidade.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {unidade.nome}
                      </p>
                      <Badge className={getStatusBadge(unidade.status)}>
                        {unidade.status === 'ativa' ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {unidade.endereco}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        <Users className="w-3 h-3 inline mr-1" />
                        {unidade.especialistas} especialistas
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {unidade.pacientesAtivos} pacientes ativos
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        {unidade.receitaMensal}/mês
                      </span>
                    </div>
                  </div>
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
                      onClick={() => handleVisualizar(unidade)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEditar(unidade)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {unidadesFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma unidade encontrada
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
