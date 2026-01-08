import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, UserCog } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

export function UsuariosSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios] = useState([
    {
      id: 1,
      nome: 'Ana Maria',
      email: 'ana.maria@integrallys.com',
      perfil: 'Recepcionista',
      unidade: 'São Paulo - Centro',
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Dr. João Santos',
      email: 'joao.santos@integrallys.com',
      perfil: 'Especialista',
      unidade: 'São Paulo - Centro',
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'João Pereira',
      email: 'joao.pereira@integrallys.com',
      perfil: 'Gestor da Unidade',
      unidade: 'São Paulo - Centro',
      status: 'ativo'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Usuários</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{usuarios.length} usuário(s)</p>
        </div>
        <Button onClick={() => toast.info('Novo usuário')} className="bg-[#244738] hover:bg-[#356b52] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {usuarios.map((usuario) => (
              <div
                key={usuario.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <UserCog className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{usuario.nome}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{usuario.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{usuario.perfil} • {usuario.unidade}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Ativo</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]">
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
