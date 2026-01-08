import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Plus, 
  Search, 
  Phone, 
  Calendar, 
  Clock,
  MoreHorizontal,
  Edit,
  X,
  ArrowUp,
  ArrowDown,
  CheckCircle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { AdicionarPacienteListaModal } from './AdicionarPacienteListaModal';
import { EditarPacienteListaModal } from './EditarPacienteListaModal';
import { RemoverPacienteListaModal } from './RemoverPacienteListaModal';
import { AgendarConsultaListaModal } from './AgendarConsultaListaModal';
import { RegistrarContatoModal } from './RegistrarContatoModal';

export function ListaEsperaSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [listaEspera, setListaEspera] = useState([
    {
      id: 1,
      paciente: 'João Carlos Silva',
      telefone: '(11) 9 8888-7777',
      especialidade: 'Cardiologia',
      prioridade: 'alta',
      dataInclusao: '2025-10-10',
      ultimoContato: '2025-10-14',
      observacoes: 'Preferência por manhãs'
    },
    {
      id: 2,
      paciente: 'Marina Santos',
      telefone: '(11) 9 7777-6666',
      especialidade: 'Dermatologia',
      prioridade: 'media',
      dataInclusao: '2025-10-11',
      ultimoContato: '2025-10-13',
      observacoes: 'Disponível apenas às quartas'
    },
    {
      id: 3,
      paciente: 'Ricardo Oliveira',
      telefone: '(11) 9 6666-5555',
      especialidade: 'Ortopedia',
      prioridade: 'baixa',
      dataInclusao: '2025-10-12',
      ultimoContato: '2025-10-12',
      observacoes: ''
    },
    {
      id: 4,
      paciente: 'Camila Ferreira',
      telefone: '(11) 9 5555-4444',
      especialidade: 'Pediatria',
      prioridade: 'alta',
      dataInclusao: '2025-10-09',
      ultimoContato: '2025-10-15',
      observacoes: 'Urgente - criança com febre recorrente'
    }
  ]);

  // Estados dos modais
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalRemover, setModalRemover] = useState(false);
  const [modalAgendar, setModalAgendar] = useState(false);
  const [modalContato, setModalContato] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any>(null);

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'baixa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPrioridadeText = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'Alta';
      case 'media':
        return 'Média';
      case 'baixa':
        return 'Baixa';
      default:
        return prioridade;
    }
  };

  const handleAdicionar = () => {
    setModalAdicionar(true);
  };

  const handleAdicionarPaciente = (novoPaciente: any) => {
    setListaEspera(prev => [...prev, novoPaciente]);
  };

  const handleEditar = (paciente: any) => {
    setPacienteSelecionado(paciente);
    setModalEditar(true);
  };

  const handleEditarPaciente = (pacienteAtualizado: any) => {
    setListaEspera(prev =>
      prev.map(p => p.id === pacienteAtualizado.id ? pacienteAtualizado : p)
    );
  };

  const handleRemover = (paciente: any) => {
    setPacienteSelecionado(paciente);
    setModalRemover(true);
  };

  const handleRemoverPaciente = (pacienteId: number) => {
    setListaEspera(prev => prev.filter(p => p.id !== pacienteId));
  };

  const handleAumentarPrioridade = (paciente: any) => {
    const novaPrioridade = paciente.prioridade === 'baixa' ? 'media' : 'alta';
    setListaEspera(prev =>
      prev.map(p =>
        p.id === paciente.id ? { ...p, prioridade: novaPrioridade } : p
      )
    );
    toast.success('Prioridade aumentada');
  };

  const handleDiminuirPrioridade = (paciente: any) => {
    const novaPrioridade = paciente.prioridade === 'alta' ? 'media' : 'baixa';
    setListaEspera(prev =>
      prev.map(p =>
        p.id === paciente.id ? { ...p, prioridade: novaPrioridade } : p
      )
    );
    toast.success('Prioridade diminuída');
  };

  const handleRegistrarContato = (paciente: any) => {
    setPacienteSelecionado(paciente);
    setModalContato(true);
  };

  const handleRegistrarContatoSubmit = (pacienteAtualizado: any) => {
    setListaEspera(prev =>
      prev.map(p => p.id === pacienteAtualizado.id ? pacienteAtualizado : p)
    );
  };

  const handleAgendar = (paciente: any) => {
    setPacienteSelecionado(paciente);
    setModalAgendar(true);
  };

  const handleAgendarConsulta = (consulta: any) => {
    // Remove o paciente da lista de espera após agendar
    setListaEspera(prev => prev.filter(p => p.id !== pacienteSelecionado.id));
  };

  const listaFiltrada = listaEspera.filter(paciente =>
    paciente.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Lista de Espera
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {listaFiltrada.length} paciente(s) aguardando vaga
          </p>
        </div>
        
        <Button 
          onClick={handleAdicionar}
          className="bg-[#244738] hover:bg-[#356b52] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Paciente
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar paciente ou especialidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27]"
        />
      </div>

      {/* Lista */}
      <Card>
        <CardHeader>
          <CardTitle>Pacientes Aguardando</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {listaFiltrada.map((paciente) => (
              <div
                key={paciente.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {paciente.paciente}
                    </p>
                    <Badge className={getPrioridadeColor(paciente.prioridade)}>
                      {getPrioridadeText(paciente.prioridade)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {paciente.telefone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Especialidade: {paciente.especialidade}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Último contato: {new Date(paciente.ultimoContato).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  
                  {paciente.observacoes && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Obs: {paciente.observacoes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {/* Botões de Prioridade */}
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAumentarPrioridade(paciente)}
                      disabled={paciente.prioridade === 'alta'}
                      className="h-6 w-6 p-0 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <ArrowUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDiminuirPrioridade(paciente)}
                      disabled={paciente.prioridade === 'baixa'}
                      className="h-6 w-6 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <ArrowDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                    </Button>
                  </div>

                  {/* Ações */}
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
                        onClick={() => handleAgendar(paciente)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Agendar Consulta
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRegistrarContato(paciente)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Registrar Contato
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditar(paciente)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRemover(paciente)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remover da Lista
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {listaFiltrada.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhum paciente encontrado na lista de espera
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <AdicionarPacienteListaModal
        open={modalAdicionar}
        onOpenChange={setModalAdicionar}
        onAdicionar={handleAdicionarPaciente}
      />

      {pacienteSelecionado && (
        <>
          <EditarPacienteListaModal
            open={modalEditar}
            onOpenChange={setModalEditar}
            paciente={pacienteSelecionado}
            onEditar={handleEditarPaciente}
          />

          <RemoverPacienteListaModal
            open={modalRemover}
            onOpenChange={setModalRemover}
            paciente={pacienteSelecionado}
            onRemover={handleRemoverPaciente}
          />

          <AgendarConsultaListaModal
            open={modalAgendar}
            onOpenChange={setModalAgendar}
            paciente={pacienteSelecionado}
            onAgendar={handleAgendarConsulta}
          />

          <RegistrarContatoModal
            open={modalContato}
            onOpenChange={setModalContato}
            paciente={pacienteSelecionado}
            onRegistrar={handleRegistrarContatoSubmit}
          />
        </>
      )}
    </div>
  );
}
