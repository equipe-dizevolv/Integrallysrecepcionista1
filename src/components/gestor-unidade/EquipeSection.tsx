import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Search, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  User
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

export function EquipeSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [colaboradores] = useState([
    {
      id: 1,
      nome: 'Dr. João Santos',
      registro: 'CRM 12345',
      cpf: '123.456.789-00',
      contato: '(11) 9 9999-8888',
      especialidade: 'Cardiologia',
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Dra. Ana Lima',
      registro: 'CRM 54321',
      cpf: '987.654.321-00',
      contato: '(11) 9 8888-7777',
      especialidade: 'Pediatria',
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Ana Maria',
      registro: 'Func 001',
      cpf: '111.222.333-44',
      contato: '(11) 9 7777-6666',
      especialidade: 'Recepção',
      status: 'ativo'
    }
  ]);

  const handleNovo = () => {
    toast.info('Abrir modal para adicionar colaborador');
  };

  const handleVisualizar = (colaborador: any) => {
    toast.info(`Visualizar: ${colaborador.nome}`);
  };

  const handleEditar = (colaborador: any) => {
    toast.info(`Editar: ${colaborador.nome}`);
  };

  const handleExcluir = (colaborador: any) => {
    toast.success(`${colaborador.nome} removido da equipe`);
  };

  const colaboradoresFiltrados = colaboradores.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Equipe
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {colaboradoresFiltrados.length} colaborador(es)
          </p>
        </div>
        
        <Button 
          onClick={handleNovo}
          className="bg-[#244738] hover:bg-[#356b52] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Colaborador
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar colaborador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Lista de Colaboradores */}
      <Card>
        <CardHeader>
          <CardTitle>Colaboradores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {colaboradoresFiltrados.map((colaborador) => (
              <div
                key={colaborador.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {colaborador.nome}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {colaborador.registro} • {colaborador.especialidade}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {colaborador.contato}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Ativo
                  </Badge>
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
                        onClick={() => handleVisualizar(colaborador)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditar(colaborador)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleExcluir(colaborador)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {colaboradoresFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum colaborador encontrado
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
