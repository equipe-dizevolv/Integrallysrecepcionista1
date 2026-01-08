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
  FileText,
  Filter
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { NovoModeloModal } from '../prontuario/NovoModeloModal';
import { VisualizarModeloModal } from '../prontuario/VisualizarModeloModal';
import { EditarModeloModal } from '../prontuario/EditarModeloModal';

interface ProntuarioSectionProps {
  userRole?: string;
}

export function ProntuarioSection({ userRole = 'especialista' }: ProntuarioSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('todos');
  const [especialidadeFilter, setEspecialidadeFilter] = useState('todos');
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [selectedModelo, setSelectedModelo] = useState<any>(null);

  // Permissões baseadas no perfil
  const canCreateEdit = userRole === 'gestor_unidade' || userRole === 'gestora_matriz' || userRole === 'admin_sistema';
  const isEspecialista = userRole === 'especialista';

  const [modelos] = useState([
    {
      id: 1,
      nome: 'Consulta Inicial - Cardiologia',
      finalidade: 'Primeira consulta cardiológica',
      categoria: 'Consulta Inicial',
      especialidade: 'Cardiologia',
      ultimaAtualizacao: '2025-10-10',
      criador: 'Dr. João Silva'
    },
    {
      id: 2,
      nome: 'Retorno Pós-Operatório',
      finalidade: 'Acompanhamento cirúrgico',
      categoria: 'Retorno Pós-Operatório',
      especialidade: 'Ortopedia',
      ultimaAtualizacao: '2025-10-08',
      criador: 'Dra. Maria Costa'
    },
    {
      id: 3,
      nome: 'Avaliação Pré-Operatória',
      finalidade: 'Exame antes de procedimento',
      categoria: 'Avaliação Pré-Operatória',
      especialidade: 'Clínica Geral',
      ultimaAtualizacao: '2025-10-05',
      criador: 'Dr. Pedro Santos'
    }
  ]);

  const handleNovo = () => {
    setShowNovoModal(true);
  };

  const handleVisualizar = (modelo: any) => {
    setSelectedModelo(modelo);
    setShowVisualizarModal(true);
  };

  const handleEditar = (modelo: any) => {
    setSelectedModelo(modelo);
    setShowEditarModal(true);
  };

  const handleExcluir = (modelo: any) => {
    toast.success(`Modelo "${modelo.nome}" excluído com sucesso`);
  };

  const modelosFiltrados = modelos.filter(m => {
    const matchSearch = m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.finalidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = categoriaFilter === 'todos' || m.categoria === categoriaFilter;
    const matchEspecialidade = especialidadeFilter === 'todos' || m.especialidade === especialidadeFilter;
    
    return matchSearch && matchCategoria && matchEspecialidade;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Prontuário (Modelos)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {canCreateEdit 
              ? 'Gerencie modelos de prontuário' 
              : 'Visualize e use modelos de prontuário'}
          </p>
        </div>
        
        {canCreateEdit && (
          <Button 
            onClick={handleNovo}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Modelo
          </Button>
        )}
      </div>

      {/* Alerta informativo para Especialista */}
      {isEspecialista && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-400">
            <strong>💡 Modo de Visualização:</strong> Você pode visualizar e usar os modelos disponíveis. 
            Para criar ou editar modelos, entre em contato com o Gestor da Unidade ou Administrador.
          </p>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Select
          value={categoriaFilter}
          onValueChange={setCategoriaFilter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Consulta Inicial">Consulta Inicial</SelectItem>
            <SelectItem value="Retorno Pós-Operatório">Retorno Pós-Operatório</SelectItem>
            <SelectItem value="Avaliação Pré-Operatória">Avaliação Pré-Operatória</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={especialidadeFilter}
          onValueChange={setEspecialidadeFilter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Cardiologia">Cardiologia</SelectItem>
            <SelectItem value="Ortopedia">Ortopedia</SelectItem>
            <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Modelos */}
      <Card>
        <CardHeader>
          <CardTitle>Modelos de Prontuário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {modelosFiltrados.map((modelo) => (
              <div
                key={modelo.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {modelo.nome}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {modelo.finalidade}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Atualizado em {new Date(modelo.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                    </p>
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
                      onClick={() => handleVisualizar(modelo)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEditar(modelo)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      disabled={!canCreateEdit}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleExcluir(modelo)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                      disabled={!canCreateEdit}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {modelosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum modelo encontrado
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovoModeloModal
        open={showNovoModal}
        onOpenChange={setShowNovoModal}
      />
      <VisualizarModeloModal
        open={showVisualizarModal}
        onOpenChange={setShowVisualizarModal}
        modelo={selectedModelo}
      />
      <EditarModeloModal
        open={showEditarModal}
        onOpenChange={setShowEditarModal}
        modelo={selectedModelo}
      />
    </div>
  );
}