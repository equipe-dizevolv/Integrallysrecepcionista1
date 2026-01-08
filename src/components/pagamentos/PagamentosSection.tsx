import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Plus, DollarSign, CheckCircle, XCircle, RotateCcw, Eye, Edit, Trash2, CreditCard } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { NovoPagamentoModal } from './NovoPagamentoModal';
import { MarcarPagoModal } from './MarcarPagoModal';
import { EstornarPagamentoModal } from './EstornarPagamentoModal';
import { VisualizarPagamentoModal } from './VisualizarPagamentoModal';
import { EditarPagamentoModal } from './EditarPagamentoModal';
import { ExcluirPagamentoModal } from './ExcluirPagamentoModal';

export function PagamentosSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNovoModal, setShowNovoModal] = useState(false);
  const [showMarcarPagoModal, setShowMarcarPagoModal] = useState(false);
  const [showEstornarModal, setShowEstornarModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [selectedPagamento, setSelectedPagamento] = useState<any>(null);

  const pagamentos = [
    {
      id: 1,
      paciente: 'Maria Silva',
      procedimento: 'Consulta Cardiologia',
      valor: 250.00,
      data: '2024-01-15',
      vencimento: '2024-01-20',
      status: 'pago',
      formaPagamento: 'Cartão de Crédito',
      observacoes: ''
    },
    {
      id: 2,
      paciente: 'Pedro Costa',
      procedimento: 'Exame de Sangue',
      valor: 180.00,
      data: '2024-01-12',
      vencimento: '2024-01-17',
      status: 'pendente',
      formaPagamento: '',
      observacoes: 'Aguardando autorização do convênio'
    },
    {
      id: 3,
      paciente: 'Laura Oliveira',
      procedimento: 'Consulta Neurologia',
      valor: 300.00,
      data: '2024-01-10',
      vencimento: '2024-01-15',
      status: 'atrasado',
      formaPagamento: '',
      observacoes: 'Cliente foi contatado'
    },
    {
      id: 4,
      paciente: 'Roberto Ferreira',
      procedimento: 'Procedimento Ortopedia',
      valor: 800.00,
      data: '2024-01-08',
      vencimento: '2024-01-13',
      status: 'pago',
      formaPagamento: 'PIX',
      observacoes: ''
    },
    {
      id: 5,
      paciente: 'Fernanda Torres',
      procedimento: 'Consulta Dermatologia',
      valor: 220.00,
      data: '2024-01-05',
      vencimento: '2024-01-10',
      status: 'estornado',
      formaPagamento: 'Dinheiro',
      observacoes: 'Estorno solicitado pelo paciente'
    },
    {
      id: 6,
      paciente: 'Carlos Mendes',
      procedimento: 'Exame de Imagem',
      valor: 450.00,
      data: '2024-01-03',
      vencimento: '2024-01-08',
      status: 'pendente',
      formaPagamento: '',
      observacoes: ''
    }
  ];

  const filteredPagamentos = pagamentos.filter(pagamento =>
    pagamento.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pagamento.procedimento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'atrasado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'estornado':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pago':
        return 'Pago';
      case 'pendente':
        return 'Pendente';
      case 'atrasado':
        return 'Atrasado';
      case 'estornado':
        return 'Estornado';
      default:
        return status;
    }
  };

  const handleMarcarPago = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowMarcarPagoModal(true);
  };

  const handleEstornar = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowEstornarModal(true);
  };

  const handleVisualizar = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowVisualizarModal(true);
  };

  const handleEditar = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowEditarModal(true);
  };

  const handleExcluir = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowExcluirModal(true);
  };

  const handleEmitirCobranca = (pagamento: any) => {
    setSelectedPagamento(pagamento);
    setShowNovoModal(true);
  };

  const totalPago = filteredPagamentos
    .filter(p => p.status === 'pago')
    .reduce((sum, p) => sum + p.valor, 0);

  const totalPendente = filteredPagamentos
    .filter(p => p.status === 'pendente' || p.status === 'atrasado')
    .reduce((sum, p) => sum + p.valor, 0);

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Recebido
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  R$ {totalPago.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Pendente
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  R$ {totalPendente.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total de Registros
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {filteredPagamentos.length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header com busca e ações */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar recebimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowNovoModal(true)}
            variant="outline"
            className="border-[#244738] text-[#244738] hover:bg-[#244738]/10 dark:border-[#10b981] dark:text-[#10b981]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Venda
          </Button>
          <Button 
            onClick={() => setShowNovoModal(true)}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Registrar Recebimento
          </Button>
        </div>
      </div>

      {/* Tabela de recebimentos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Recebimentos ({filteredPagamentos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Procedimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPagamentos.map((pagamento) => (
                <TableRow key={pagamento.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {pagamento.paciente}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {pagamento.procedimento}
                    </p>
                    {pagamento.observacoes && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {pagamento.observacoes}
                      </p>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <p className="font-medium text-gray-900 dark:text-white">
                      R$ {pagamento.valor.toFixed(2).replace('.', ',')}
                    </p>
                    {pagamento.formaPagamento && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {pagamento.formaPagamento}
                      </p>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(pagamento.vencimento).toLocaleDateString('pt-BR')}
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(pagamento.status)}>
                      {getStatusText(pagamento.status)}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVisualizar(pagamento)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditar(pagamento)}
                        className="hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleExcluir(pagamento)}
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                          {pagamento.status === 'pendente' || pagamento.status === 'atrasado' ? (
                            <DropdownMenuItem 
                              onClick={() => handleMarcarPago(pagamento)}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Marcar como pago
                            </DropdownMenuItem>
                          ) : pagamento.status === 'pago' ? (
                            <DropdownMenuItem 
                              onClick={() => handleEstornar(pagamento)}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Estornar
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem 
                            onClick={() => handleEmitirCobranca(pagamento)}
                            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                          >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Emitir nova cobrança
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais */}
      <NovoPagamentoModal 
        open={showNovoModal} 
        onOpenChange={setShowNovoModal}
      />
      
      <MarcarPagoModal 
        open={showMarcarPagoModal} 
        onOpenChange={setShowMarcarPagoModal}
        pagamento={selectedPagamento}
      />
      
      <EstornarPagamentoModal 
        open={showEstornarModal} 
        onOpenChange={setShowEstornarModal}
        pagamento={selectedPagamento}
      />

      <VisualizarPagamentoModal 
        open={showVisualizarModal} 
        onOpenChange={setShowVisualizarModal}
        pagamento={selectedPagamento}
      />

      <EditarPagamentoModal 
        open={showEditarModal} 
        onOpenChange={setShowEditarModal}
        pagamento={selectedPagamento}
      />

      <ExcluirPagamentoModal 
        open={showExcluirModal} 
        onOpenChange={setShowExcluirModal}
        pagamento={selectedPagamento}
      />
    </div>
  );
}