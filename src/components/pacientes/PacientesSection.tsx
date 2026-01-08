import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Plus, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { CadastroPacientePage } from './CadastroPacientePage';
import { VisualizarPacienteModal } from './VisualizarPacienteModal';
import { EditarPacienteModal } from './EditarPacienteModal';
import { ExcluirPacienteModal } from './ExcluirPacienteModal';

export function PacientesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCadastroPage, setShowCadastroPage] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);

  // Se estiver na página de cadastro, renderizar apenas ela
  if (showCadastroPage) {
    return (
      <CadastroPacientePage 
        onVoltar={() => setShowCadastroPage(false)}
      />
    );
  }

  const pacientes = [
    {
      id: 1,
      nome: 'Maria Silva',
      email: 'maria.silva@email.com',
      telefone: '(11) 98765-4321',
      idade: 45,
      cpf: '123.456.789-00',
      cep: '01310-100',
      rua: 'Av. Paulista',
      numero: '1578',
      complemento: 'Apto 501',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      planoSaude: 'Bradesco Saúde',
      origemIndicacao: 'Indicação de Paciente',
      status: 'ativo',
      statusCadastro: 'completo',
      ultimaConsulta: '2024-01-15',
      foto: null
    },
    {
      id: 2,
      nome: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      telefone: '(11) 98765-1234',
      idade: 32,
      cpf: '987.654.321-00',
      cep: '01310-200',
      rua: 'Av. Paulista',
      numero: '456',
      complemento: '',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      planoSaude: 'Amil',
      origemIndicacao: 'Google',
      status: 'ativo',
      statusCadastro: 'incompleto',
      ultimaConsulta: '2024-01-10',
      foto: null
    },
    {
      id: 3,
      nome: 'Laura Oliveira',
      email: 'laura.oliveira@email.com',
      telefone: '(11) 98765-5678',
      idade: 28,
      cpf: '456.789.123-00',
      cep: '05411-000',
      rua: 'Rua Augusta',
      numero: '789',
      complemento: 'Casa 2',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP',
      planoSaude: 'SulAmérica',
      origemIndicacao: 'Redes Sociais',
      status: 'ativo',
      statusCadastro: 'completo',
      ultimaConsulta: '2024-01-08',
      foto: null
    },
    {
      id: 4,
      nome: 'Roberto Ferreira',
      email: 'roberto.ferreira@email.com',
      telefone: '(11) 98765-9876',
      idade: 55,
      cpf: '789.123.456-00',
      cep: '01302-000',
      rua: 'Rua da Consolação',
      numero: '321',
      complemento: '',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP',
      planoSaude: 'Particular',
      origemIndicacao: 'Indicação de Médico',
      status: 'inativo',
      statusCadastro: 'completo',
      ultimaConsulta: '2023-12-20',
      foto: null
    },
    {
      id: 5,
      nome: 'Fernanda Torres',
      email: 'fernanda.torres@email.com',
      telefone: '(11) 98765-4567',
      idade: 38,
      cpf: '321.654.987-00',
      cep: '05437-000',
      rua: 'Av. Faria Lima',
      numero: '654',
      complemento: 'Conj 12',
      bairro: 'Itaim Bibi',
      cidade: 'São Paulo',
      estado: 'SP',
      planoSaude: 'Unimed',
      origemIndicacao: 'Plano de Saúde',
      status: 'ativo',
      statusCadastro: 'incompleto',
      ultimaConsulta: '2024-01-12',
      foto: null
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.telefone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    return status === 'ativo'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };
  
  const getStatusCadastroColor = (statusCadastro: string) => {
    return statusCadastro === 'completo'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  const handleVisualizar = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowVisualizarModal(true);
  };

  const handleEditar = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowEditarModal(true);
  };

  const handleExcluir = (paciente: any) => {
    setSelectedPaciente(paciente);
    setShowExcluirModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header com busca e ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCadastroPage(true)}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>
      </div>

      {/* Tabela de pacientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPacientes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Plano de Saúde</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Consulta</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPacientes.map((paciente) => (
                <TableRow key={paciente.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {paciente.nome}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {paciente.idade} anos
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {paciente.telefone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {paciente.email}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {paciente.planoSaude}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusCadastroColor(paciente.statusCadastro)}>
                        {paciente.statusCadastro === 'completo' ? 'Cadastro Completo' : 'Cadastro Incompleto'}
                      </Badge>
                      <Badge className={getStatusColor(paciente.status)}>
                        {paciente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVisualizar(paciente)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditar(paciente)}
                        className="hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleExcluir(paciente)}
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais */}
      <VisualizarPacienteModal 
        open={showVisualizarModal} 
        onOpenChange={setShowVisualizarModal}
        paciente={selectedPaciente}
      />
      
      <EditarPacienteModal 
        open={showEditarModal} 
        onOpenChange={setShowEditarModal}
        paciente={selectedPaciente}
      />
      
      <ExcluirPacienteModal 
        open={showExcluirModal} 
        onOpenChange={setShowExcluirModal}
        paciente={selectedPaciente}
      />
    </div>
  );
}