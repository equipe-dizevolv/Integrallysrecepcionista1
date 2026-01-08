import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Users, Search, Plus, MoreHorizontal, Eye, Edit, Building, Mail, Phone } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

export function EquipesSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const equipes = [
    {
      id: 1,
      nome: 'Dr. João Silva',
      especialidade: 'Cardiologia',
      unidade: 'Unidade Centro',
      email: 'joao.silva@integrallys.com',
      telefone: '(11) 98765-4321',
      pacientesAtivos: 145,
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Dra. Maria Santos',
      especialidade: 'Ortopedia',
      unidade: 'Unidade Zona Sul',
      email: 'maria.santos@integrallys.com',
      telefone: '(11) 98765-4322',
      pacientesAtivos: 98,
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Dr. Pedro Costa',
      especialidade: 'Neurologia',
      unidade: 'Unidade Zona Norte',
      email: 'pedro.costa@integrallys.com',
      telefone: '(11) 98765-4323',
      pacientesAtivos: 120,
      status: 'ativo'
    },
    {
      id: 4,
      nome: 'Dra. Ana Lima',
      especialidade: 'Clínica Geral',
      unidade: 'Unidade Centro',
      email: 'ana.lima@integrallys.com',
      telefone: '(11) 98765-4324',
      pacientesAtivos: 210,
      status: 'férias'
    }
  ];

  const equipesFiltradas = equipes.filter(e =>
    e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.unidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'férias':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inativo':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleVisualizar = (membro: any) => {
    toast.info(`Visualizando ${membro.nome}`);
  };

  const handleEditar = (membro: any) => {
    toast.info(`Editando ${membro.nome}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Equipes
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Gerencie todos os profissionais da rede
          </p>
        </div>
        
        <Button className="bg-[#244738] hover:bg-[#356b52] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Profissional
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Profissionais
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  84
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ativos
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  78
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Em Férias
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  4
                </p>
              </div>
              <Users className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Especialidades
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  18
                </p>
              </div>
              <Building className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar profissional..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Lista de Equipes */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Profissionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {equipesFiltradas.map((membro) => (
              <div
                key={membro.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {membro.nome}
                      </p>
                      <Badge className={getStatusBadge(membro.status)}>
                        {membro.status.charAt(0).toUpperCase() + membro.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {membro.especialidade}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {membro.unidade}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {membro.email}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {membro.telefone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {membro.pacientesAtivos}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      pacientes
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
                        onClick={() => handleVisualizar(membro)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditar(membro)}
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

            {equipesFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum profissional encontrado
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
