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
  Calendar,
  FileText
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { NovaEvolucaoModal } from '../evolucoes/NovaEvolucaoModal';
import { VisualizarEvolucaoModal } from '../evolucoes/VisualizarEvolucaoModal';
import { EditarEvolucaoModal } from '../evolucoes/EditarEvolucaoModal';
import { ExcluirEvolucaoModal } from '../evolucoes/ExcluirEvolucaoModal';
import { AdicionarNotaErrataModal } from '../evolucoes/AdicionarNotaErrataModal';

export function EvolucoesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNovaModal, setShowNovaModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [showNotaErrataModal, setShowNotaErrataModal] = useState(false);
  const [selectedEvolucao, setSelectedEvolucao] = useState<any>(null);
  
  const [evolucoes, setEvolucoes] = useState([
    {
      id: 1,
      paciente: 'Maria Silva',
      data: '2025-10-14',
      tipo: 'Consulta',
      status: 'finalizada',
      resumo: 'Paciente apresenta melhora significativa após tratamento',
      profissional: 'Dr. João Santos - CRM 12345',
      erratas: [
        {
          id: 1,
          texto: 'ERRATA: A pressão arterial mencionada estava incorreta. O valor correto é 130/85 mmHg (não 140/90 mmHg como registrado inicialmente).',
          data: '2025-10-15T09:30:00',
          profissional: 'Dr. João Santos - CRM 12345'
        }
      ]
    },
    {
      id: 2,
      paciente: 'João Santos',
      data: '2025-10-13',
      tipo: 'Exame',
      status: 'rascunho',
      resumo: 'Resultados de exames laboratoriais dentro da normalidade',
      profissional: 'Dra. Ana Lima - CRM 54321',
      erratas: []
    },
    {
      id: 3,
      paciente: 'Ana Costa',
      data: '2025-10-12',
      tipo: 'Retorno',
      status: 'finalizada',
      resumo: 'Acompanhamento pós-cirúrgico - evolução satisfatória',
      profissional: 'Dr. Carlos Rocha - CRM 67890',
      erratas: []
    }
  ]);

  const handleNovo = () => {
    setShowNovaModal(true);
  };

  const handleVisualizar = (evolucao: any) => {
    setSelectedEvolucao(evolucao);
    setShowVisualizarModal(true);
  };

  const handleEditar = (evolucao: any) => {
    setSelectedEvolucao(evolucao);
    setShowEditarModal(true);
  };

  const handleExcluir = (evolucao: any) => {
    setSelectedEvolucao(evolucao);
    setShowExcluirModal(true);
  };

  const handleNotaErrata = (evolucao: any) => {
    setSelectedEvolucao(evolucao);
    setShowNotaErrataModal(true);
  };

  const evolucoesFiltradas = evolucoes.filter(e =>
    e.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.resumo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Evoluções Clínicas
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Registro de evolução dos pacientes
          </p>
        </div>
        
        <Button 
          onClick={handleNovo}
          className="bg-[#244738] hover:bg-[#356b52] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Evolução
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Lista de Evoluções */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Evoluções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {evolucoesFiltradas.map((evolucao) => {
              const isFinalizada = evolucao.status === 'finalizada';
              
              return (
              <div
                key={evolucao.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {evolucao.paciente}
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {evolucao.tipo}
                    </Badge>
                    <Badge className={
                      isFinalizada 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }>
                      {isFinalizada ? 'Finalizada' : 'Rascunho'}
                    </Badge>
                    {evolucao.erratas && evolucao.erratas.length > 0 && (
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        <FileText className="w-3 h-3 mr-1" />
                        {evolucao.erratas.length} {evolucao.erratas.length === 1 ? 'Errata' : 'Erratas'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {evolucao.resumo}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(evolucao.data).toLocaleDateString('pt-BR')}
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
                      onClick={() => handleVisualizar(evolucao)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    
                    {/* Editar e Excluir apenas para rascunhos */}
                    {!isFinalizada && (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleEditar(evolucao)}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleExcluir(evolucao)}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {/* Adicionar Nota/Errata apenas para finalizadas */}
                    {isFinalizada && (
                      <DropdownMenuItem
                        onClick={() => handleNotaErrata(evolucao)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-[#244738] dark:text-[#10b981]"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Adicionar Nota/Errata
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
            })}

            {evolucoesFiltradas.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma evolução encontrada
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovaEvolucaoModal
        open={showNovaModal}
        onOpenChange={setShowNovaModal}
      />
      <VisualizarEvolucaoModal
        open={showVisualizarModal}
        onOpenChange={setShowVisualizarModal}
        evolucao={selectedEvolucao}
      />
      <EditarEvolucaoModal
        open={showEditarModal}
        onOpenChange={setShowEditarModal}
        evolucao={selectedEvolucao}
      />
      <ExcluirEvolucaoModal
        open={showExcluirModal}
        onOpenChange={setShowExcluirModal}
        evolucao={selectedEvolucao}
      />
      <AdicionarNotaErrataModal
        open={showNotaErrataModal}
        onOpenChange={setShowNotaErrataModal}
        evolucao={selectedEvolucao}
      />
    </div>
  );
}