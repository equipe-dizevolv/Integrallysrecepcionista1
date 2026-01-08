import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  CalendarDays, 
  Plus, 
  Edit, 
  X, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  MoreVertical,
  Eye,
  CreditCard,
  Calendar as CalendarIcon,
  DollarSign,
  Bell,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { AgendarConsultaModal } from './AgendarConsultaModal';
import { RemarcarConsultaModal } from './RemarcarConsultaModal';
import { CancelarConsultaModal } from './CancelarConsultaModal';
import { EmitirCobrancaModal } from './EmitirCobrancaModal';
import { VisualizarConsultaModal } from './VisualizarConsultaModal';
import { ChamarEspecialistaModal } from './ChamarEspecialistaModal';
import { RegistrarRecebimentoModal } from './RegistrarRecebimentoModal';
import { EmitirNotaFiscalModal } from './EmitirNotaFiscalModal';
import { toast } from 'sonner@2.0.3';

interface AgendaSectionProps {
  notifications?: any[];
  onNotificationsChange?: (notifications: any[]) => void;
}

export function AgendaSection({ notifications = [], onNotificationsChange = () => {} }: AgendaSectionProps) {
  const [showAgendarModal, setShowAgendarModal] = useState(false);
  const [showRemarcarModal, setShowRemarcarModal] = useState(false);
  const [showCancelarModal, setShowCancelarModal] = useState(false);
  const [showEmitirCobrancaModal, setShowEmitirCobrancaModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showChamarEspecialistaModal, setShowChamarEspecialistaModal] = useState(false);
  const [showEmitirNFModal, setShowEmitirNFModal] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState<any>(null);
  const [lastNotificationTime, setLastNotificationTime] = useState<{[key: number]: number}>({});
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedProfissional, setSelectedProfissional] = useState<string>('todos');
  const [consultasData, setConsultasData] = useState([
    {
      id: 1,
      paciente: 'Maria Silva',
      especialista: 'Dr. João Santos',
      horario: '08:00',
      duracao: '30min',
      tipo: 'Consulta',
      status: 'confirmado',
      valor: '150,00',
      pagamentoStatus: 'completo',
      jaPago: 150,
      telefone: '(11) 9 9999-9999',
      email: 'maria.silva@email.com',
      diaSemana: 1 // Segunda (ajustado de 0 para 1)
    },
    {
      id: 2,
      paciente: 'Pedro Costa',
      especialista: 'Dra. Ana Lima',
      horario: '08:30',
      duracao: '45min',
      tipo: 'Retorno',
      status: 'checkin',
      valor: '120,00',
      pagamentoStatus: 'parcial',
      jaPago: 60,
      telefone: '(11) 9 8888-8888',
      email: 'pedro.costa@email.com',
      diaSemana: 1 // Segunda (ajustado)
    },
    {
      id: 3,
      paciente: 'Laura Oliveira',
      especialista: 'Dr. Carlos Rocha',
      horario: '09:15',
      duracao: '30min',
      tipo: 'Exame',
      status: 'atraso',
      valor: '200,00',
      pagamentoStatus: 'pendente',
      jaPago: 0,
      telefone: '(11) 9 7777-7777',
      email: 'laura.oliveira@email.com',
      diaSemana: 2 // Terça (ajustado)
    },
    {
      id: 4,
      paciente: 'Roberto Ferreira',
      especialista: 'Dra. Lucia Mendes',
      horario: '10:00',
      duracao: '30min',
      tipo: 'Consulta',
      status: 'checkout',
      valor: '180,00',
      pagamentoStatus: 'completo',
      jaPago: 180,
      telefone: '(11) 9 6666-6666',
      email: 'roberto.ferreira@email.com',
      diaSemana: 2 // Terça (ajustado)
    },
    {
      id: 5,
      paciente: 'Fernanda Torres',
      especialista: 'Dr. Paulo Silva',
      horario: '14:30',
      duracao: '30min',
      tipo: 'Retorno',
      status: 'cancelado',
      valor: '100,00',
      pagamentoStatus: 'pendente',
      jaPago: 0,
      telefone: '(11) 9 5555-5555',
      email: 'fernanda.torres@email.com',
      diaSemana: 3 // Quarta (ajustado)
    },
    {
      id: 6,
      paciente: 'Carlos Mendes',
      especialista: 'Dra. Sofia Castro',
      horario: '15:00',
      duracao: '45min',
      tipo: 'Consulta',
      status: 'confirmado',
      valor: '150,00',
      pagamentoStatus: 'completo',
      jaPago: 150,
      telefone: '(11) 9 4444-4444',
      email: 'carlos.mendes@email.com',
      diaSemana: 4 // Quinta (ajustado)
    },
    {
      id: 7,
      paciente: 'Ana Paula Santos',
      especialista: 'Dr. João Santos',
      horario: '09:00',
      duracao: '30min',
      tipo: 'Consulta',
      status: 'checkin',
      valor: '150,00',
      pagamentoStatus: 'parcial',
      jaPago: 75,
      telefone: '(11) 9 3333-3333',
      email: 'ana.paula@email.com',
      diaSemana: 5 // Sexta (ajustado)
    },
    {
      id: 8,
      paciente: 'Julia Martins',
      especialista: 'Dr. Ricardo Alves',
      horario: '10:00',
      duracao: '30min',
      tipo: 'Consulta',
      status: 'confirmado',
      valor: '200,00',
      pagamentoStatus: 'completo',
      jaPago: 200,
      telefone: '(11) 9 2222-2222',
      email: 'julia.martins@email.com',
      diaSemana: 6 // Sábado
    },
    {
      id: 9,
      paciente: 'Marcos Oliveira',
      especialista: 'Dra. Patricia Souza',
      horario: '11:30',
      duracao: '45min',
      tipo: 'Retorno',
      status: 'checkout',
      valor: '180,00',
      pagamentoStatus: 'completo',
      jaPago: 180,
      telefone: '(11) 9 1111-1111',
      email: 'marcos.oliveira@email.com',
      diaSemana: 6 // Sábado
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-blue-100/50 dark:bg-blue-900';
      case 'checkin':
        return 'bg-blue-200/50 dark:bg-blue-800';
      case 'checkout':
        return 'bg-green-100/50 dark:bg-green-900';
      case 'atraso':
        return 'bg-yellow-100/50 dark:bg-yellow-900';
      case 'cancelado':
        return 'bg-red-100/50 dark:bg-red-900';
      default:
        return 'bg-gray-100/50 dark:bg-gray-900';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-blue-100 text-blue-800 dark:bg-[#1e3a8a] dark:text-white';
      case 'checkin':
        return 'bg-blue-200 text-blue-900 dark:bg-[#1e40af] dark:text-white';
      case 'checkout':
        return 'bg-green-100 text-green-800 dark:bg-[#14532d] dark:text-white';
      case 'atraso':
        return 'bg-yellow-100 text-yellow-800 dark:bg-[#78350f] dark:text-white';
      case 'cancelado':
        return 'bg-red-100 text-red-800 dark:bg-[#7f1d1d] dark:text-white';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmação';
      case 'checkin':
        return 'Check-in';
      case 'checkout':
        return 'Check-out';
      case 'atraso':
        return 'Atraso';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getPaymentIconColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'text-[#F04438]'; // Vermelho - Pendente
      case 'parcial':
        return 'text-[#F79009]'; // Amarelo - Pago Parcial
      case 'completo':
        return 'text-[#12B76A]'; // Verde - Pago
      default:
        return 'text-gray-500';
    }
  };

  const getPaymentTooltipText = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pagamento: Pendente';
      case 'parcial':
        return 'Pagamento: Pago parcial';
      case 'completo':
        return 'Pagamento: Pago';
      default:
        return status;
    }
  };

  const handleStatusChange = (consultaId: number, newStatus: string) => {
    const consulta = consultasData.find(c => c.id === consultaId);
    
    // Regra: CHECK-IN só habilita se pagamento QUITADO (completo)
    if (newStatus === 'checkin' && consulta?.pagamentoStatus !== 'completo') {
      toast.error('Check-in bloqueado. Pagamento não está quitado.');
      return;
    }
    
    // Se mudou para check-in, disparar notificação normal
    if (newStatus === 'checkin' && consulta) {
      const notification = {
        id: Date.now(),
        consultaId: consulta.id,
        paciente: consulta.paciente,
        especialista: consulta.especialista,
        mensagem: 'Paciente realizou check-in e está aguardando atendimento.',
        timestamp: new Date().toISOString(),
        status: 'enviado',
        tipo: 'normal',
        remetente: 'Ana Recepcionista'
      };
      
      onNotificationsChange([...notifications, notification]);
      toast.success(`Notificação enviada para ${consulta.especialista}`);
    }
    
    setConsultasData(prev => 
      prev.map(consulta => 
        consulta.id === consultaId 
          ? { ...consulta, status: newStatus }
          : consulta
      )
    );
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(selectedDate.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(selectedDate.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const handleRemarcar = (consulta: any) => {
    setSelectedConsulta(consulta);
    setShowRemarcarModal(true);
  };

  const handleCancelar = (consulta: any) => {
    setSelectedConsulta(consulta);
    setShowCancelarModal(true);
  };

  const handleEmitirCobranca = (consulta: any) => {
    setSelectedConsulta(consulta);
    setShowEmitirCobrancaModal(true);
  };

  const handleEmitirNF = (consulta: any) => {
    if (consulta.pagamentoStatus !== 'completo') {
      toast.error('A NF/Recibo só pode ser emitida após pagamento completo');
      return;
    }
    setSelectedConsulta(consulta);
    setShowEmitirNFModal(true);
  };

  const handleCobrancaEmitida = (consultaId: number, novoStatus: 'completo' | 'parcial', valorRecebido: number) => {
    setConsultasData(prev =>
      prev.map(consulta => {
        if (consulta.id === consultaId) {
          const jaPago = consulta.jaPago || 0;
          return {
            ...consulta,
            pagamentoStatus: novoStatus,
            jaPago: jaPago + valorRecebido
          };
        }
        return consulta;
      })
    );
  };

  const handleVisualizar = (consulta: any) => {
    setSelectedConsulta(consulta);
    setShowVisualizarModal(true);
  };

  const handlePaymentClick = (consulta: any) => {
    setSelectedConsulta(consulta);
    setShowPaymentModal(true);
  };

  const handleRecebimentoRegistrado = () => {
    // Callback será implementado para atualizar o status após recebimento
    // Por enquanto apenas fecha o modal
  };

  const handleChamarEspecialista = (consulta: any) => {
    // Verificar rate-limit (2 minutos)
    const lastTime = lastNotificationTime[consulta.id];
    if (lastTime) {
      const minutesPassed = (Date.now() - lastTime) / 1000 / 60;
      if (minutesPassed < 2) {
        toast.error('Não foi possível enviar. Tente novamente em 2 minutos.');
        return;
      }
    }
    
    setSelectedConsulta(consulta);
    setShowChamarEspecialistaModal(true);
  };

  const handleNotificationSent = (notification: any) => {
    onNotificationsChange([...notifications, notification]);
    setLastNotificationTime(prev => ({
      ...prev,
      [notification.consultaId]: Date.now()
    }));
  };

  const getConsultaNotifications = (consultaId: number) => {
    return notifications.filter(n => n.consultaId === consultaId);
  };

  const hasRecentNotification = (consultaId: number) => {
    const consultaNotifications = getConsultaNotifications(consultaId);
    return consultaNotifications.length > 0;
  };

  const getLatestNotificationStatus = (consultaId: number) => {
    const consultaNotifications = getConsultaNotifications(consultaId);
    if (consultaNotifications.length === 0) return null;
    
    const latest = consultaNotifications[consultaNotifications.length - 1];
    return {
      status: latest.status,
      timestamp: latest.timestamp,
      remetente: latest.remetente,
      especialista: latest.especialista
    };
  };

  const filterConsultasByTab = (consultas: any[]) => {
    switch (activeTab) {
      case 'em-atendimento':
        return consultas.filter(c => c.status === 'checkin');
      case 'aguardando':
        return consultas.filter(c => c.status === 'confirmado' || c.status === 'atraso');
      case 'atendidos':
        return consultas.filter(c => c.status === 'checkout');
      case 'agendamentos':
        return consultas.filter(c => c.status === 'confirmado');
      default:
        return consultas;
    }
  };

  // Extrair profissionais únicos
  const profissionaisUnicos = ['todos', ...Array.from(new Set(consultasData.map(c => c.especialista)))];

  // Aplicar filtros
  let consultasFiltradas = filterConsultasByTab(consultasData);
  
  // Filtrar por profissional se não for "todos"
  if (selectedProfissional !== 'todos') {
    consultasFiltradas = consultasFiltradas.filter(c => c.especialista === selectedProfissional);
  }

  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const StatusLegend = () => (
    <div className="hidden md:flex flex-col gap-3 p-3 bg-gray-50 dark:bg-[#1a2e27] rounded-lg mb-4">
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-400"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Confirmação</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-600"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Check-in</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Check-out</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Atraso</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Cancelado</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pagamento:</span>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-[#12B76A]" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Pago</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-[#F79009]" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Pago Parcial</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-[#F04438]" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Pendente</span>
        </div>
      </div>
    </div>
  );

  const renderDayView = () => (
    <div className="space-y-2">
      {consultasFiltradas.map((consulta) => (
        <div 
          key={consulta.id}
          className={`flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 ${getStatusColor(consulta.status)} hover:shadow-md`}
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="text-center min-w-[60px]">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {consulta.horario}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 justify-center">
                <Clock className="w-3 h-3" />
                {consulta.duracao}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {consulta.paciente}
                </p>
                <Badge variant="outline" className="text-xs dark:border-white">
                  {consulta.tipo}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {consulta.especialista}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Dropdown de Status */}
              <Select 
                value={consulta.status} 
                onValueChange={(value) => handleStatusChange(consulta.id, value)}
              >
                <SelectTrigger className={`w-[140px] border-none ${getStatusBadgeColor(consulta.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#0f1b16] border-gray-200 dark:border-gray-600">
                  <SelectItem value="confirmado">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-blue-400"></div>
                      Confirmação
                    </div>
                  </SelectItem>
                  <SelectItem value="checkin">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-blue-600"></div>
                      Check-in
                    </div>
                  </SelectItem>
                  <SelectItem value="checkout">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                      Check-out
                    </div>
                  </SelectItem>
                  <SelectItem value="atraso">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-yellow-500"></div>
                      Atraso
                    </div>
                  </SelectItem>
                  <SelectItem value="cancelado">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-red-500"></div>
                      Cancelado
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {/* Ícone de Pagamento */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handlePaymentClick(consulta)}
                    className="hover:scale-110 transition-transform"
                  >
                    <DollarSign className={`w-5 h-5 ${getPaymentIconColor(consulta.pagamentoStatus)}`} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getPaymentTooltipText(consulta.pagamentoStatus)}</p>
                </TooltipContent>
              </Tooltip>

              {/* Selo de Notificação */}
              {hasRecentNotification(consulta.id) && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Badge 
                        className={`text-xs ${
                          getLatestNotificationStatus(consulta.id)?.status === 'entregue' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Notificado
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Enviado às {new Date(getLatestNotificationStatus(consulta.id)?.timestamp || '').toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} por {getLatestNotificationStatus(consulta.id)?.remetente} — {getLatestNotificationStatus(consulta.id)?.especialista}
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Botão Chamar Especialista */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleChamarEspecialista(consulta)}
                className="hover:bg-gray-100 dark:hover:bg-[#1a2e27] mr-2"
              >
                <Bell className="w-4 h-4 text-[#244738] dark:text-[#10b981]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chamar Especialista</p>
            </TooltipContent>
          </Tooltip>
          
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
                onClick={() => handleEmitirCobranca(consulta)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Emitir nova cobrança
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleEmitirNF(consulta)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
              >
                <FileText className="w-4 h-4 mr-2" />
                Emitir NF/Recibo
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleVisualizar(consulta)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
              >
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleRemarcar(consulta)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
              >
                <Edit className="w-4 h-4 mr-2" />
                Reagendar
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleCancelar(consulta)}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
              >
                <X className="w-4 h-4 mr-2" />
                Desmarcar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );

  const renderWeekView = () => {
    const getWeekStatusColor = (status: string) => {
      switch (status) {
        case 'confirmado':
          return { 
            bg: 'bg-[#f0f5ff] dark:bg-[#1c398e]', 
            badge: 'bg-[#dbe8fe] dark:bg-[#2a4d9f] dark:border dark:border-[#4d6fb8]', 
            text: 'text-[#193cb8] dark:text-[#a8c5ff]' 
          };
        case 'checkin':
          return { 
            bg: 'bg-[#d9e9ff] dark:bg-[#193cb8]', 
            badge: 'bg-[#bedbff] dark:bg-[#2549c9] dark:border dark:border-[#4d6fb8]', 
            text: 'text-[#1c398e] dark:text-[#bedbff]' 
          };
        case 'checkout':
          return { 
            bg: 'bg-[#e6f9f0] dark:bg-[#0d542b]', 
            badge: 'bg-[#d1fadf] dark:bg-[#0f6938] dark:border dark:border-[#2f8f56]', 
            text: 'text-[#027a48] dark:text-[#a8f5c8]' 
          };
        case 'atraso':
          return { 
            bg: 'bg-[#fff8e6] dark:bg-[#733e0a]', 
            badge: 'bg-[#fef9c2] dark:bg-[#9f6315] dark:border dark:border-[#b8812f]', 
            text: 'text-[#894b00] dark:text-[#ffd98f]' 
          };
        case 'cancelado':
          return { 
            bg: 'bg-[#ffe2e2] dark:bg-[#82181a]', 
            badge: 'bg-[#ffe2e2] dark:bg-[#a82328] dark:border dark:border-[#c84448]', 
            text: 'text-[#9f0712] dark:text-[#ffa8ab]' 
          };
        default:
          return { bg: 'bg-white dark:bg-[#12211c]', badge: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400' };
      }
    };

    const isToday = (dayIndex: number) => {
      const today = new Date().getDay();
      return today === dayIndex;
    };

    return (
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 pb-4" style={{ minWidth: 'max-content' }}>
          {diasSemana.map((dia, index) => {
            const consultasDoDia = consultasFiltradas.filter(c => c.diaSemana === index);
            const diaEhHoje = isToday(index);
            
            return (
              <div key={index} className="flex flex-col" style={{ width: '175px', flexShrink: 0 }}>
                {/* Header do dia */}
                <div 
                  className={`${diaEhHoje ? 'bg-[#244738]' : 'bg-[#f8f9fa] dark:bg-[#192b23]'} rounded-t-[10px] px-2 pt-3 pb-3`}
                  style={{ height: '76px' }}
                >
                  <p className={`text-[12px] text-center ${diaEhHoje ? 'text-white' : 'text-[#6a7282] dark:text-[#99a1af]'}`}>
                    {dia}
                  </p>
                  <p className={`text-[14px] text-center mt-1 ${diaEhHoje ? 'text-white' : 'text-[#4a5565] dark:text-white'}`}>
                    {16 + index}
                  </p>
                  <p className={`text-[12px] text-center mt-1 ${diaEhHoje ? 'text-white/80' : 'text-[#6a7282] dark:text-[rgba(255,255,255,0.8)]'}`}>
                    ({consultasDoDia.length} consulta{consultasDoDia.length !== 1 ? 's' : ''})
                  </p>
                </div>

                {/* Corpo com consultas */}
                <div className="bg-white dark:bg-[#12211c] border-x border-b border-gray-200 dark:border-[#2a3d35] rounded-b-[10px] flex-1 px-2 py-2 space-y-2">
                  {consultasDoDia.length > 0 ? (
                    consultasDoDia.map((consulta) => {
                      const colors = getWeekStatusColor(consulta.status);
                      return (
                        <div 
                          key={consulta.id}
                          className={`${colors.bg} border border-gray-200 dark:border-[#3d5a4f] rounded-[10px] p-3 relative group hover:shadow-md transition-all`}
                          style={{ width: '157px', minHeight: '155px' }}
                        >
                          {/* Menu Dropdown - Topo Direita */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
                              >
                                <MoreVertical className="w-3.5 h-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                              <DropdownMenuItem 
                                onClick={() => handleEmitirCobranca(consulta)}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Emitir nova cobrança
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleEmitirNF(consulta)}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Emitir NF/Recibo
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleVisualizar(consulta)}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRemarcar(consulta)}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c]"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Reagendar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleCancelar(consulta)}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#12211c] text-red-600 dark:text-red-400"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Desmarcar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <p className="text-[14px] font-bold text-[#101828] dark:text-white">
                            {consulta.horario}
                          </p>
                          <p className="text-[13px] text-[#364153] dark:text-white mt-1.5 truncate">
                            {consulta.paciente}
                          </p>
                          <p className="text-[11px] text-[#6a7282] dark:text-white mt-1 truncate">
                            {consulta.especialista}
                          </p>
                          <div 
                            className={`${colors.badge} ${colors.text} rounded-[6px] px-2 py-0.5 inline-block text-[11px] mt-2`}
                          >
                            {getStatusText(consulta.status)}
                          </div>

                          {/* Ícones de Ação - Alinhados à Direita */}
                          <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-[#3d5a4f]">
                            {/* Ícone de Pagamento */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handlePaymentClick(consulta)}
                                  className="hover:scale-110 transition-transform"
                                >
                                  <DollarSign className={`w-4 h-4 ${getPaymentIconColor(consulta.pagamentoStatus)}`} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{getPaymentTooltipText(consulta.pagamentoStatus)}</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* Botão Chamar Especialista */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleChamarEspecialista(consulta)}
                                  className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
                                >
                                  <Bell className="w-3.5 h-3.5 text-[#244738] dark:text-[#10b981]" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Chamar Especialista</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-[12px] text-gray-400 text-center">Sem consultas</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="space-y-4">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
          <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Visualização mensal simplificada</p>
          <p className="mt-2">Total de consultas no mês: {consultasFiltradas.length}</p>
        </div>
        
        {/* Lista resumida das consultas do mês */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {consultasFiltradas.map((consulta) => (
            <Card key={consulta.id} className={`${getStatusColor(consulta.status)} border border-gray-200 dark:border-gray-700`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {consulta.horario}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {consulta.tipo}
                      </Badge>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {consulta.paciente}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
                      {consulta.especialista}
                    </p>
                  </div>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => handlePaymentClick(consulta)}>
                        <DollarSign className={`w-4 h-4 ${getPaymentIconColor(consulta.pagamentoStatus)}`} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getPaymentTooltipText(consulta.pagamentoStatus)}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex items-center justify-between gap-2 mt-3">
                  <Badge className={`text-xs ${getStatusBadgeColor(consulta.status)}`}>
                    {getStatusText(consulta.status)}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                      <DropdownMenuItem onClick={() => handleVisualizar(consulta)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRemarcar(consulta)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Reagendar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCancelar(consulta)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Desmarcar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-full overflow-hidden">
        {/* Header com controles */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Agenda
            </h2>
            <Badge variant="outline" className="text-sm">
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            {/* Navegação de data */}
            <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousDay}
                className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-[#1a2e27]">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }
                    }}
                    initialFocus
                    className="bg-white dark:bg-[#1a2e27]"
                  />
                </PopoverContent>
              </Popover>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextDay}
                className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Seletor de visualização */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg">
              <Button
                variant={viewMode === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
                className={viewMode === 'day' ? 'bg-[#244738] text-white hover:bg-[#356b52]' : 'hover:bg-gray-100 dark:hover:bg-[#1a2e27]'}
              >
                Dia
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? 'bg-[#244738] text-white hover:bg-[#356b52]' : 'hover:bg-gray-100 dark:hover:bg-[#1a2e27]'}
              >
                Semana
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                className={viewMode === 'month' ? 'bg-[#244738] text-white hover:bg-[#356b52]' : 'hover:bg-gray-100 dark:hover:bg-[#1a2e27]'}
              >
                Mês
              </Button>
            </div>
            
            <Button 
              onClick={() => setShowAgendarModal(true)}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Marcar Consulta
            </Button>
          </div>
        </div>

        {/* Tabs de Filtro */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-[#1a2e27]">
            <TabsTrigger 
              value="todos"
              className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger 
              value="em-atendimento"
              className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
            >
              Em Atendimento
            </TabsTrigger>
            <TabsTrigger 
              value="aguardando"
              className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
            >
              Aguardando
            </TabsTrigger>
            <TabsTrigger 
              value="atendidos"
              className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
            >
              Atendidos
            </TabsTrigger>
            <TabsTrigger 
              value="agendamentos"
              className="data-[state=active]:bg-[#244738] data-[state=active]:text-white dark:data-[state=active]:bg-[#356b52]"
            >
              Agendamentos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Lista de consultas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Consultas ({consultasFiltradas.length})
              </CardTitle>
              
              {/* Filtro por Profissional */}
              <Select value={selectedProfissional} onValueChange={setSelectedProfissional}>
                <SelectTrigger className="w-[240px] border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue placeholder="Filtrar por profissional" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {profissionaisUnicos.map((prof) => (
                    <SelectItem key={prof} value={prof}>
                      {prof === 'todos' ? 'Todos os profissionais' : prof}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="min-h-[600px]">
            <StatusLegend />
            
            {/* Desktop View */}
            <div className="hidden md:block">
              {viewMode === 'day' && renderDayView()}
              {viewMode === 'week' && renderWeekView()}
              {viewMode === 'month' && renderMonthView()}
            </div>

            {/* Mobile View - Cards */}
            <div className="block md:hidden">
              <div className="space-y-4">
                {consultasFiltradas.map((consulta) => (
                  <Card key={consulta.id} className={`${getStatusColor(consulta.status)} transition-all duration-200`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {consulta.paciente}
                            </h3>
                            <DollarSign className={`w-4 h-4 ${getPaymentIconColor(consulta.pagamentoStatus)}`} />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {consulta.especialista}
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
                            <DropdownMenuItem onClick={() => handleEmitirCobranca(consulta)}>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Emitir cobrança
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEmitirNF(consulta)}>
                              <FileText className="w-4 h-4 mr-2" />
                              Emitir NF/Recibo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleVisualizar(consulta)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRemarcar(consulta)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Reagendar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleCancelar(consulta)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Desmarcar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            {consulta.horario}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {consulta.tipo}
                          </Badge>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {consulta.duracao}
                        </span>
                      </div>

                      <Select 
                        value={consulta.status} 
                        onValueChange={(value) => handleStatusChange(consulta.id, value)}
                      >
                        <SelectTrigger className={`w-full ${getStatusBadgeColor(consulta.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#0f1b16] border-gray-200 dark:border-gray-600">
                          <SelectItem value="confirmado">Confirmação</SelectItem>
                          <SelectItem value="checkin">Check-in</SelectItem>
                          <SelectItem value="checkout">Check-out</SelectItem>
                          <SelectItem value="atraso">Atraso</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modais */}
        <AgendarConsultaModal 
          open={showAgendarModal} 
          onOpenChange={setShowAgendarModal}
        />
        
        <RemarcarConsultaModal 
          open={showRemarcarModal} 
          onOpenChange={setShowRemarcarModal}
          consulta={selectedConsulta}
        />
        
        <CancelarConsultaModal 
          open={showCancelarModal} 
          onOpenChange={setShowCancelarModal}
          consulta={selectedConsulta}
        />

        <EmitirCobrancaModal 
          open={showEmitirCobrancaModal} 
          onOpenChange={setShowEmitirCobrancaModal}
          consulta={selectedConsulta}
          onCobrancaEmitida={handleCobrancaEmitida}
        />

        <VisualizarConsultaModal 
          open={showVisualizarModal} 
          onOpenChange={setShowVisualizarModal}
          consulta={selectedConsulta}
        />

        <ChamarEspecialistaModal
          open={showChamarEspecialistaModal}
          onOpenChange={setShowChamarEspecialistaModal}
          consulta={selectedConsulta}
          onNotificationSent={handleNotificationSent}
        />

        <RegistrarRecebimentoModal
          open={showPaymentModal}
          onOpenChange={setShowPaymentModal}
          consulta={selectedConsulta}
          onRecebimentoRegistrado={handleRecebimentoRegistrado}
        />

        <EmitirNotaFiscalModal
          open={showEmitirNFModal}
          onOpenChange={setShowEmitirNFModal}
          consulta={selectedConsulta}
        />
      </div>
    </TooltipProvider>
  );
}