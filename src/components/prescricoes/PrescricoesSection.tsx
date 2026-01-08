import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Plus, Search, MoreVertical, Eye, Edit, Trash2, ShoppingCart, FileText, Pill, MoreHorizontal } from 'lucide-react';
import { VisualizarPrescricaoModal } from './VisualizarPrescricaoModal';
import { GerarVendaModal } from './GerarVendaModal';
import { NovaPrescricaoModal } from './NovaPrescricaoModal';
import { EditarPrescricaoModal } from './EditarPrescricaoModal';
import { ExcluirPrescricaoModal } from './ExcluirPrescricaoModal';
import { EmitirNFeModal } from './EmitirNFeModal';
import { toast } from 'sonner';

interface PrescricoesSectionProps {
  userRole?: string;
}

export function PrescricoesSection({ userRole = 'recepcionista' }: PrescricoesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showGerarVendaModal, setShowGerarVendaModal] = useState(false);
  const [showNovaModal, setShowNovaModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [showEmitirNFeModal, setShowEmitirNFeModal] = useState(false);
  const [selectedPrescricao, setSelectedPrescricao] = useState<any>(null);

  // Permissões baseadas no perfil
  const canCreateEdit = userRole === 'especialista';
  const canOnlyViewAndSell = userRole === 'recepcionista';
  const canGenerateSale = userRole === 'recepcionista'; // Apenas recepcionista pode gerar venda

  const prescricoes = [
    {
      id: 1,
      numero: 'PRESC-001',
      paciente: 'Maria Silva',
      dataCriacao: '2024-01-15',
      valorTotal: 450.00,
      tipo: 'Suplementação',
      status: 'ativa',
      fatoGerador: 'automática',
      validade: 30,
      especialista: 'Dr. João Santos',
      itens: [
        { nome: 'Vitamina D3', dosagem: '1000 UI', frequencia: '1x ao dia' },
        { nome: 'Ômega 3', dosagem: '1000mg', frequencia: '2x ao dia' }
      ]
    },
    {
      id: 2,
      numero: 'PRESC-002',
      paciente: 'Pedro Costa',
      dataCriacao: '2024-01-10',
      valorTotal: 320.00,
      tipo: 'Medicação',
      status: 'ativa',
      fatoGerador: 'manual',
      validade: 60,
      especialista: 'Dra. Ana Lima',
      itens: [
        { nome: 'Antibiótico X', dosagem: '500mg', frequencia: '8/8h' }
      ]
    },
    {
      id: 3,
      numero: 'PRESC-003',
      paciente: 'Laura Oliveira',
      dataCriacao: '2023-11-20',
      valorTotal: 280.00,
      tipo: 'Suplementação',
      status: 'vencida',
      fatoGerador: 'automática',
      validade: 30,
      especialista: 'Dr. Carlos Rocha',
      itens: [
        { nome: 'Magnésio', dosagem: '400mg', frequencia: '1x ao dia' }
      ]
    },
    {
      id: 4,
      numero: 'PRESC-004',
      paciente: 'Roberto Ferreira',
      dataCriacao: '2024-01-05',
      valorTotal: 650.00,
      tipo: 'Tratamento Completo',
      status: 'ativa',
      fatoGerador: 'manual',
      validade: 90,
      especialista: 'Dra. Lucia Mendes',
      itens: [
        { nome: 'Medicamento A', dosagem: '250mg', frequencia: '12/12h' },
        { nome: 'Medicamento B', dosagem: '100mg', frequencia: '1x ao dia' },
        { nome: 'Suplemento C', dosagem: '500mg', frequencia: '2x ao dia' }
      ]
    },
    {
      id: 5,
      numero: 'PRESC-005',
      paciente: 'Fernanda Torres',
      dataCriacao: '2024-01-12',
      valorTotal: 180.00,
      tipo: 'Medicação',
      status: 'cancelada',
      fatoGerador: 'automática',
      validade: 30,
      especialista: 'Dr. Paulo Silva',
      itens: []
    },
    {
      id: 6,
      numero: 'PRESC-006',
      paciente: 'Carlos Mendes',
      dataCriacao: '2024-01-18',
      valorTotal: 520.00,
      tipo: 'Suplementação',
      status: 'ativa',
      fatoGerador: 'manual',
      validade: 60,
      especialista: 'Dra. Sofia Castro',
      itens: [
        { nome: 'Whey Protein', dosagem: '30g', frequencia: '2x ao dia' },
        { nome: 'Creatina', dosagem: '5g', frequencia: '1x ao dia' }
      ]
    }
  ];

  const filteredPrescricoes = prescricoes.filter(prescricao => {
    const matchSearch = 
      prescricao.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescricao.numero.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = statusFilter === 'todos' || prescricao.status === statusFilter;
    const matchTipo = tipoFilter === 'todos' || prescricao.tipo === tipoFilter;
    
    return matchSearch && matchStatus && matchTipo;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'vencida':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'Ativa';
      case 'vencida':
        return 'Vencida';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const handleVisualizar = (prescricao: any) => {
    setSelectedPrescricao(prescricao);
    setShowVisualizarModal(true);
  };

  const handleGerarVenda = (prescricao: any) => {
    setSelectedPrescricao(prescricao);
    setShowGerarVendaModal(true);
  };

  const handleNovaPrescricao = () => {
    setShowNovaModal(true);
  };

  const handleEditarPrescricao = (prescricao: any) => {
    setSelectedPrescricao(prescricao);
    setShowEditarModal(true);
  };

  const handleExcluirPrescricao = (prescricao: any) => {
    setSelectedPrescricao(prescricao);
    setShowExcluirModal(true);
  };

  const handleEmitirNFe = (prescricao: any) => {
    setSelectedPrescricao(prescricao);
    setShowEmitirNFeModal(true);
  };

  const prescricoesAtivas = prescricoes.filter(p => p.status === 'ativa').length;
  const prescricoesVencidas = prescricoes.filter(p => p.status === 'vencida').length;
  const valorTotalAtivas = prescricoes
    .filter(p => p.status === 'ativa')
    .reduce((sum, p) => sum + p.valorTotal, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Prescrições Clínicas
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {canCreateEdit 
              ? 'Gerencie e crie prescrições para seus pacientes' 
              : 'Visualize prescrições e gere vendas'}
          </p>
        </div>
        
        {canCreateEdit && (
          <Button 
            onClick={handleNovaPrescricao}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Prescrição
          </Button>
        )}
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Prescrições Ativas
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {prescricoesAtivas}
                </p>
              </div>
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Prescrições Vencidas
                </p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  {prescricoesVencidas}
                </p>
              </div>
              <FileText className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Valor Total (Ativas)
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  R$ {valorTotalAtivas.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header com busca e filtros */}
      <div className="flex flex-col gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por paciente ou número..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="vencida">Vencida</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-48">
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="Suplementação">Suplementação</SelectItem>
                <SelectItem value="Medicação">Medicação</SelectItem>
                <SelectItem value="Tratamento Completo">Tratamento Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabela de prescrições - Desktop */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>Lista de Prescrições ({filteredPrescricoes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Data Criação</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fato Gerador</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescricoes.map((prescricao) => (
                <TableRow key={prescricao.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {prescricao.numero}
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {prescricao.paciente}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {prescricao.especialista}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(prescricao.dataCriacao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    R$ {prescricao.valorTotal.toFixed(2).replace('.', ',')}
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {prescricao.tipo}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(prescricao.status)}>
                      {getStatusText(prescricao.status)}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {prescricao.fatoGerador}
                  </TableCell>
                  
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                    {prescricao.validade} dias
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVisualizar(prescricao)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {canGenerateSale && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleGerarVenda(prescricao)}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      )}
                      {canCreateEdit && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                            <DropdownMenuItem 
                              onClick={() => handleEditarPrescricao(prescricao)}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleExcluirPrescricao(prescricao)}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleEmitirNFe(prescricao)}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-blue-600 dark:text-blue-400"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Emitir NFe
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cards - Mobile */}
      <div className="block md:hidden space-y-4">
        {filteredPrescricoes.map((prescricao) => (
          <Card key={prescricao.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {prescricao.numero}
                    </p>
                    <Badge className={getStatusColor(prescricao.status)}>
                      {getStatusText(prescricao.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {prescricao.paciente}
                  </p>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleVisualizar(prescricao)}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {canGenerateSale && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleGerarVenda(prescricao)}
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  )}
                  {canCreateEdit && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                        <DropdownMenuItem 
                          onClick={() => handleEditarPrescricao(prescricao)}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleExcluirPrescricao(prescricao)}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEmitirNFe(prescricao)}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-blue-600 dark:text-blue-400"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Emitir NFe
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Data:</span>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(prescricao.dataCriacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Valor:</span>
                  <p className="text-gray-900 dark:text-white">
                    R$ {prescricao.valorTotal.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Tipo:</span>
                  <p className="text-gray-900 dark:text-white">{prescricao.tipo}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Validade:</span>
                  <p className="text-gray-900 dark:text-white">{prescricao.validade} dias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modais */}
      <VisualizarPrescricaoModal 
        open={showVisualizarModal} 
        onOpenChange={setShowVisualizarModal}
        prescricao={selectedPrescricao}
      />
      
      <GerarVendaModal 
        open={showGerarVendaModal} 
        onOpenChange={setShowGerarVendaModal}
        prescricao={selectedPrescricao}
      />
      
      <NovaPrescricaoModal 
        open={showNovaModal} 
        onOpenChange={setShowNovaModal}
      />
      
      <EditarPrescricaoModal 
        open={showEditarModal} 
        onOpenChange={setShowEditarModal}
        prescricao={selectedPrescricao}
      />
      
      <ExcluirPrescricaoModal 
        open={showExcluirModal} 
        onOpenChange={setShowExcluirModal}
        prescricao={selectedPrescricao}
      />
      
      <EmitirNFeModal 
        open={showEmitirNFeModal} 
        onOpenChange={setShowEmitirNFeModal}
        prescricao={selectedPrescricao}
      />
    </div>
  );
}