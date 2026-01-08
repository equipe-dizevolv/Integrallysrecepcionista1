# 📋 DOCUMENTAÇÃO COMPLETA - TELA DE AGENDA

## 🎯 VISÃO GERAL

A tela de Agenda é um sistema completo de gerenciamento de consultas médicas com visualização em **Dia** e **Semana**, filtros por status e profissional, sistema de notificações, gestão de pagamentos e múltiplos modais de ação.

---

## 🎨 PADRÃO VISUAL - LIGHT E DARK MODE

### **Light Mode:**
- Fundo principal: `#FFFFFF`
- Cards: `bg-white`
- Bordas: `border-gray-200`
- Textos: `text-gray-900`, `text-gray-600`
- CTAs principais: `bg-[#244738]` hover `bg-[#356b52]`
- Tabs ativas: `bg-[#244738] text-white`

### **Dark Mode:**
- Fundo principal: `#12211C`
- Cards: `dark:bg-[#12211c]`
- Bordas: `dark:border-gray-700` ou `dark:border-gray-600`
- Textos: `dark:text-white`, `dark:text-gray-400`
- CTAs principais: `dark:bg-[#244738]` hover `dark:bg-[#356b52]`
- Tabs ativas: `dark:bg-[#356b52]`
- Hover em cards: `dark:hover:bg-[#1a2e27]`
- Inputs/Selects: `dark:bg-[#1a2e27]`
- Dropdowns: `dark:bg-[#1a2e27]`

---

## 🧩 ESTRUTURA DE COMPONENTES

### **Arquivo Principal:**
`/components/agenda/AgendaSection.tsx`

### **Modais:**
- `/components/agenda/AgendarConsultaModal.tsx` - Marcar nova consulta
- `/components/agenda/RemarcarConsultaModal.tsx` - Reagendar consulta existente
- `/components/agenda/CancelarConsultaModal.tsx` - Cancelar/desmarcar consulta
- `/components/agenda/EmitirCobrancaModal.tsx` - Emitir cobrança de pagamento
- `/components/agenda/VisualizarConsultaModal.tsx` - Visualizar detalhes da consulta
- `/components/agenda/ChamarEspecialistaModal.tsx` - Enviar notificação para especialista
- `/components/agenda/RegistrarRecebimentoModal.tsx` - Registrar pagamento recebido

---

## 📊 ESTRUTURA DE DADOS

### **Interface de Consulta:**
```typescript
{
  id: number;
  paciente: string;
  especialista: string;
  horario: string;           // "08:00"
  duracao: string;          // "30min", "45min"
  tipo: string;             // "Consulta", "Retorno", "Exame", "Procedimento"
  status: string;           // "confirmado", "checkin", "checkout", "atraso", "cancelado"
  valor: string;            // "150,00"
  pagamentoStatus: string;  // "pendente", "parcial", "completo"
  jaPago: number;           // 0, 75, 150
  telefone: string;
  email: string;
  diaSemana: number;        // 0 (Domingo) a 6 (Sábado)
}
```

### **Interface de Notificação:**
```typescript
{
  id: number;
  consultaId: number;
  paciente: string;
  especialista: string;
  mensagem: string;
  timestamp: string;        // ISO string
  status: string;           // "enviado", "entregue"
  tipo: string;             // "normal", "urgente"
  remetente: string;        // Nome de quem enviou
}
```

---

## 🎨 SISTEMA DE CORES POR STATUS

### **Status de Consulta:**

#### **1. Confirmado (Azul)**
```typescript
// Light Mode
bg: 'bg-blue-100/50'
badge: 'bg-blue-100 text-blue-800'

// Dark Mode
bg: 'dark:bg-blue-900'
badge: 'dark:bg-[#1e3a8a] dark:text-white'

// Week View
bg: 'bg-[#f0f5ff] dark:bg-[#1c398e]'
badge: 'bg-[#dbe8fe] dark:bg-[#2a4d9f] dark:border dark:border-[#4d6fb8]'
text: 'text-[#193cb8] dark:text-[#a8c5ff]'
```

#### **2. Check-in (Azul Escuro)**
```typescript
// Light Mode
bg: 'bg-blue-200/50'
badge: 'bg-blue-200 text-blue-900'

// Dark Mode
bg: 'dark:bg-blue-800'
badge: 'dark:bg-[#1e40af] dark:text-white'

// Week View
bg: 'bg-[#d9e9ff] dark:bg-[#193cb8]'
badge: 'bg-[#bedbff] dark:bg-[#2549c9] dark:border dark:border-[#4d6fb8]'
text: 'text-[#1c398e] dark:text-[#bedbff]'
```

#### **3. Check-out (Verde)**
```typescript
// Light Mode
bg: 'bg-green-100/50'
badge: 'bg-green-100 text-green-800'

// Dark Mode
bg: 'dark:bg-green-900'
badge: 'dark:bg-[#14532d] dark:text-white'

// Week View
bg: 'bg-[#e6f9f0] dark:bg-[#0d542b]'
badge: 'bg-[#d1fadf] dark:bg-[#0f6938] dark:border dark:border-[#2f8f56]'
text: 'text-[#027a48] dark:text-[#a8f5c8]'
```

#### **4. Atraso (Amarelo)**
```typescript
// Light Mode
bg: 'bg-yellow-100/50'
badge: 'bg-yellow-100 text-yellow-800'

// Dark Mode
bg: 'dark:bg-yellow-900'
badge: 'dark:bg-[#78350f] dark:text-white'

// Week View
bg: 'bg-[#fff8e6] dark:bg-[#733e0a]'
badge: 'bg-[#fef9c2] dark:bg-[#9f6315] dark:border dark:border-[#b8812f]'
text: 'text-[#894b00] dark:text-[#ffd98f]'
```

#### **5. Cancelado (Vermelho)**
```typescript
// Light Mode
bg: 'bg-red-100/50'
badge: 'bg-red-100 text-red-800'

// Dark Mode
bg: 'dark:bg-red-900'
badge: 'dark:bg-[#7f1d1d] dark:text-white'

// Week View
bg: 'bg-[#ffe2e2] dark:bg-[#82181a]'
badge: 'bg-[#ffe2e2] dark:bg-[#a82328] dark:border dark:border-[#c84448]'
text: 'text-[#9f0712] dark:text-[#ffa8ab]'
```

### **Status de Pagamento:**

```typescript
// Pendente
color: 'text-[#F04438]'  // Vermelho
tooltip: 'Pagamento: Pendente'

// Parcial
color: 'text-[#F79009]'  // Amarelo/Laranja
tooltip: 'Pagamento: Pago parcial'

// Completo
color: 'text-[#12B76A]'  // Verde
tooltip: 'Pagamento: Pago'
```

---

## ⚙️ REGRAS DE NEGÓCIO CRÍTICAS

### **1. BLOQUEIO DE CHECK-IN**
```typescript
// CHECK-IN só é permitido se pagamento estiver COMPLETO (quitado)
if (newStatus === 'checkin' && consulta?.pagamentoStatus !== 'completo') {
  toast.error('Check-in bloqueado. Pagamento não está quitado.');
  return;
}
```

### **2. NOTIFICAÇÃO AUTOMÁTICA NO CHECK-IN**
```typescript
// Quando o status muda para check-in, automaticamente:
// - Cria uma notificação
// - Envia para o especialista
// - Toast de confirmação
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
```

### **3. RATE LIMIT - CHAMAR ESPECIALISTA**
```typescript
// Limite de 1 notificação a cada 2 minutos por consulta
const handleChamarEspecialista = (consulta: any) => {
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
```

### **4. VALIDAÇÃO DE FORMULÁRIO - AGENDAR CONSULTA**
```typescript
// Validações obrigatórias:
// - CPF deve ter 11 dígitos
// - Telefone deve ter 10 ou 11 dígitos
// - Todos os campos obrigatórios preenchidos

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.paciente || !formData.cpf || !formData.telefone || 
      !formData.especialista || !formData.data || !formData.horario || !formData.tipo) {
    toast.error('Preencha todos os campos obrigatórios');
    return;
  }

  const cpfNumeros = formData.cpf.replace(/\D/g, '');
  if (cpfNumeros.length !== 11) {
    toast.error('CPF inválido. Digite 11 dígitos.');
    return;
  }

  const telefoneNumeros = formData.telefone.replace(/\D/g, '');
  if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
    toast.error('Telefone inválido. Digite 10 ou 11 dígitos.');
    return;
  }

  toast.success('Consulta agendada com sucesso!');
  onOpenChange(false);
};
```

---

## 🎛️ FILTROS E VISUALIZAÇÕES

### **Tabs de Filtro:**
```typescript
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
      return consultas; // 'todos'
  }
};
```

### **Filtro por Profissional:**
```typescript
// Extrair profissionais únicos
const profissionaisUnicos = ['todos', ...Array.from(new Set(consultasData.map(c => c.especialista)))];

// Aplicar filtro
if (selectedProfissional !== 'todos') {
  consultasFiltradas = consultasFiltradas.filter(c => c.especialista === selectedProfissional);
}
```

---

## 📱 RESPONSIVIDADE

### **Desktop (md e acima):**
- Visualização Day ou Week
- Legenda de status visível
- Todos os ícones e ações visíveis

### **Mobile (< md):**
- Visualização em cards verticais
- Legenda de status oculta
- Menu dropdown compacto
- Layout simplificado

```typescript
{/* Desktop View */}
<div className="hidden md:block">
  {viewMode === 'day' ? renderDayView() : renderWeekView()}
</div>

{/* Mobile View - Cards */}
<div className="block md:hidden">
  <div className="space-y-4">
    {consultasFiltradas.map((consulta) => (
      <Card key={consulta.id}>...</Card>
    ))}
  </div>
</div>
```

---

## 🔔 SISTEMA DE NOTIFICAÇÕES

### **Badge de Notificação:**
```typescript
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
```

---

## 🎨 VISUALIZAÇÃO WEEK (SEMANA)

### **Estrutura:**
- 7 colunas (Domingo a Sábado)
- Header colorido para o dia atual (`bg-[#244738]`)
- Cards de consulta dentro de cada coluna
- Largura fixa: `175px` por coluna
- Scroll horizontal se necessário

### **Dia Atual:**
```typescript
const isToday = (dayIndex: number) => {
  const today = new Date().getDay();
  return today === dayIndex;
};

// Aplicar classes condicionais
className={`${diaEhHoje ? 'bg-[#244738]' : 'bg-[#f8f9fa] dark:bg-[#192b23]'}`}
```

### **Cards da Semana:**
```typescript
<div 
  className={`${colors.bg} border border-gray-200 dark:border-[#3d5a4f] rounded-[10px] p-3 relative group hover:shadow-md transition-all`}
  style={{ width: '157px', minHeight: '155px' }}
>
  {/* Menu Dropdown - Topo Direita */}
  <DropdownMenu>...</DropdownMenu>
  
  <p className="text-[14px] font-bold text-[#101828] dark:text-white">
    {consulta.horario}
  </p>
  <p className="text-[13px] text-[#364153] dark:text-white mt-1.5 truncate">
    {consulta.paciente}
  </p>
  <p className="text-[11px] text-[#6a7282] dark:text-white mt-1 truncate">
    {consulta.especialista}
  </p>
  
  <div className={`${colors.badge} ${colors.text} rounded-[6px] px-2 py-0.5 inline-block text-[11px] mt-2`}>
    {getStatusText(consulta.status)}
  </div>

  {/* Ícones de Ação */}
  <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-[#3d5a4f]">
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

    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={() => handleChamarEspecialista(consulta)}>
          <Bell className="w-3.5 h-3.5 text-[#244738] dark:text-[#10b981]" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Chamar Especialista</p>
      </TooltipContent>
    </Tooltip>
  </div>
</div>
```

---

## 📋 LEGENDA DE STATUS E PAGAMENTO

```typescript
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
```

---

## 🎯 DROPDOWN MENU DE AÇÕES

### **Ações Disponíveis:**
1. **Emitir nova cobrança** - Ícone: `CreditCard`
2. **Visualizar** - Ícone: `Eye`
3. **Reagendar** - Ícone: `Edit`
4. **Desmarcar** - Ícone: `X` (texto vermelho)

```typescript
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-[#1a2e27]">
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
```

---

## 🔍 MODAL: AGENDAR CONSULTA

### **Funcionalidades:**
1. **Busca de Paciente** com autocomplete
2. **Criar paciente incompleto** se não encontrar
3. **Formatação automática** de CPF e Telefone
4. **Validação completa** do formulário

### **Formatação de CPF:**
```typescript
const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return formData.cpf;
};
```

### **Formatação de Telefone:**
```typescript
const formatTelefone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  return formData.telefone;
};
```

### **Autocomplete de Paciente:**
```typescript
<div className="relative">
  <Input
    id="paciente"
    placeholder="Pesquise por nome, CPF ou telefone..."
    value={searchPaciente}
    onChange={(e) => {
      setSearchPaciente(e.target.value);
      setShowResults(true);
    }}
    onFocus={() => setShowResults(true)}
    className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white pl-10"
  />
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
  
  {showResults && searchPaciente && (
    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-[#1a2e27] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {/* Resultados filtrados */}
      {pacientesCadastrados
        .filter(paciente => 
          paciente.nome.toLowerCase().includes(searchPaciente.toLowerCase()) ||
          paciente.cpf.includes(searchPaciente) ||
          paciente.telefone.includes(searchPaciente)
        )
        .map(paciente => (
          <div
            key={paciente.id}
            onClick={() => {
              setFormData({
                ...formData,
                paciente: paciente.nome,
                cpf: paciente.cpf,
                telefone: paciente.telefone
              });
              setSearchPaciente(paciente.nome);
              setShowResults(false);
            }}
            className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#244738]/30 text-gray-900 dark:text-white"
          >
            <div className="flex flex-col">
              <span className="font-medium">{paciente.nome}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {paciente.cpf} • {paciente.telefone}
              </span>
            </div>
          </div>
        ))}
      
      {/* Opção de criar paciente incompleto */}
      <div className="border-t border-gray-200 dark:border-gray-600">
        <div
          onClick={() => {
            handleCriarPacienteIncompleto();
            setShowResults(false);
          }}
          className="cursor-pointer flex items-center gap-2 bg-[#244738]/5 dark:bg-[#244738]/20 hover:bg-[#244738]/10 dark:hover:bg-[#244738]/30 text-[#244738] dark:text-[#10b981] px-3 py-2.5"
        >
          <UserPlus className="w-4 h-4" />
          <span className="font-medium">Criar paciente incompleto</span>
        </div>
      </div>
    </div>
  )}
</div>
```

---

## 📦 IMPORTS NECESSÁRIOS

```typescript
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
  CheckCircle2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
```

---

## 🎯 PROPS E ESTADOS PRINCIPAIS

### **Props do Componente:**
```typescript
interface AgendaSectionProps {
  notifications?: any[];
  onNotificationsChange?: (notifications: any[]) => void;
}
```

### **Estados:**
```typescript
const [showAgendarModal, setShowAgendarModal] = useState(false);
const [showRemarcarModal, setShowRemarcarModal] = useState(false);
const [showCancelarModal, setShowCancelarModal] = useState(false);
const [showEmitirCobrancaModal, setShowEmitirCobrancaModal] = useState(false);
const [showVisualizarModal, setShowVisualizarModal] = useState(false);
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [showChamarEspecialistaModal, setShowChamarEspecialistaModal] = useState(false);
const [selectedConsulta, setSelectedConsulta] = useState<any>(null);
const [lastNotificationTime, setLastNotificationTime] = useState<{[key: number]: number}>({});
const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
const [showCalendar, setShowCalendar] = useState(false);
const [activeTab, setActiveTab] = useState('todos');
const [selectedProfissional, setSelectedProfissional] = useState<string>('todos');
const [consultasData, setConsultasData] = useState([...]); // Array de consultas
```

---

## 🚀 COMPONENTES SHADCN UTILIZADOS

1. `Card`, `CardContent`, `CardHeader`, `CardTitle` - Cards de conteúdo
2. `Button` - Botões de ação
3. `Badge` - Badges de status e tipo
4. `Tabs`, `TabsList`, `TabsTrigger` - Sistema de abas
5. `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` - Tooltips
6. `Calendar` - Seletor de data
7. `Popover`, `PopoverContent`, `PopoverTrigger` - Popovers
8. `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` - Seletores
9. `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuTrigger` - Menus dropdown
10. `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription` - Modais
11. `Input` - Campos de texto
12. `Label` - Labels de formulário

---

## 📝 CHECKLIST DE IMPLEMENTAÇÃO

### **Fase 1: Estrutura Base**
- [ ] Criar arquivo `/components/agenda/AgendaSection.tsx`
- [ ] Importar todos os componentes UI necessários
- [ ] Definir interfaces TypeScript
- [ ] Criar estado inicial de consultas

### **Fase 2: Visualizações**
- [ ] Implementar `renderDayView()` - Vista de dia
- [ ] Implementar `renderWeekView()` - Vista de semana
- [ ] Criar `StatusLegend()` - Legenda de cores
- [ ] Adicionar sistema de tabs de filtro

### **Fase 3: Cores e Status**
- [ ] Implementar `getStatusColor()` - Cores de fundo
- [ ] Implementar `getStatusBadgeColor()` - Cores de badge
- [ ] Implementar `getWeekStatusColor()` - Cores específicas da week view
- [ ] Implementar `getPaymentIconColor()` - Cores de pagamento

### **Fase 4: Lógica de Negócio**
- [ ] Implementar `handleStatusChange()` com bloqueio de check-in
- [ ] Implementar `handleChamarEspecialista()` com rate limit
- [ ] Implementar `filterConsultasByTab()` - Filtros de tab
- [ ] Implementar filtro por profissional

### **Fase 5: Modais**
- [ ] Criar `/components/agenda/AgendarConsultaModal.tsx`
- [ ] Criar `/components/agenda/RemarcarConsultaModal.tsx`
- [ ] Criar `/components/agenda/CancelarConsultaModal.tsx`
- [ ] Criar `/components/agenda/EmitirCobrancaModal.tsx`
- [ ] Criar `/components/agenda/VisualizarConsultaModal.tsx`
- [ ] Criar `/components/agenda/ChamarEspecialistaModal.tsx`
- [ ] Criar `/components/agenda/RegistrarRecebimentoModal.tsx`

### **Fase 6: Notificações**
- [ ] Implementar sistema de notificações
- [ ] Criar badge de "Notificado"
- [ ] Implementar tooltip com informações da notificação
- [ ] Adicionar rate limit de 2 minutos

### **Fase 7: Responsividade**
- [ ] Implementar vista mobile com cards
- [ ] Ocultar legenda em mobile
- [ ] Ajustar menus para mobile
- [ ] Testar em diferentes resoluções

### **Fase 8: Dark Mode**
- [ ] Aplicar todas as classes `dark:` necessárias
- [ ] Testar cores de status no dark mode
- [ ] Verificar contraste de textos
- [ ] Ajustar cores de hover e focus

---

## 🎨 GUIA DE ESTILO - TAILWIND CLASSES

### **Backgrounds:**
- Light: `bg-white`, `bg-gray-50`, `bg-[#f8f9fa]`
- Dark: `dark:bg-[#12211c]`, `dark:bg-[#1a2e27]`, `dark:bg-[#0f1b16]`

### **Borders:**
- Light: `border-gray-200`
- Dark: `dark:border-gray-700`, `dark:border-gray-600`, `dark:border-[#3d5a4f]`

### **Text:**
- Primary Light: `text-gray-900`
- Primary Dark: `dark:text-white`
- Secondary Light: `text-gray-600`, `text-[#6a7282]`
- Secondary Dark: `dark:text-gray-400`, `dark:text-gray-300`

### **CTAs:**
- Primário: `bg-[#244738] hover:bg-[#356b52] text-white`
- Dark: `dark:bg-[#244738] dark:hover:bg-[#356b52]`

### **Hover:**
- Light: `hover:bg-gray-100`
- Dark: `dark:hover:bg-[#1a2e27]`, `dark:hover:bg-[#244738]/30`

---

## 💡 DICAS DE IMPLEMENTAÇÃO

### **1. Use TooltipProvider no componente raiz:**
```typescript
return (
  <TooltipProvider>
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Conteúdo */}
    </div>
  </TooltipProvider>
);
```

### **2. Sempre use keys únicas em listas:**
```typescript
{consultasFiltradas.map((consulta) => (
  <div key={consulta.id}>...</div>
))}
```

### **3. Use toast do Sonner:**
```typescript
import { toast } from 'sonner@2.0.3';

toast.success('Operação realizada com sucesso!');
toast.error('Erro ao realizar operação');
```

### **4. Classes condicionais com template literals:**
```typescript
className={`${isActive ? 'bg-blue-500' : 'bg-gray-200'} px-4 py-2`}
```

### **5. Formatação de datas:**
```typescript
selectedDate.toLocaleDateString('pt-BR', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})
```

---

## 🔄 FLUXO DE TRABALHO COMPLETO

### **1. Carregamento Inicial:**
1. Componente carrega com `consultasData` mock
2. Define `viewMode` como 'day'
3. Define `selectedDate` como hoje
4. Define `activeTab` como 'todos'
5. Define `selectedProfissional` como 'todos'

### **2. Visualizar Consulta:**
1. Usuário clica em "Visualizar" no dropdown
2. `setSelectedConsulta(consulta)` salva a consulta
3. `setShowVisualizarModal(true)` abre o modal
4. Modal exibe informações detalhadas

### **3. Mudar Status para Check-in:**
1. Usuário seleciona "Check-in" no dropdown de status
2. Sistema valida se `pagamentoStatus === 'completo'`
3. Se **NÃO** completo: `toast.error('Check-in bloqueado...')`
4. Se **SIM** completo:
   - Muda status para 'checkin'
   - Cria notificação automática
   - Envia para especialista
   - Mostra `toast.success()`
   - Adiciona badge "Notificado" na consulta

### **4. Chamar Especialista Manualmente:**
1. Usuário clica no ícone de sino (Bell)
2. Sistema verifica rate limit (2 min)
3. Se **dentro** do limite: `toast.error('Tente novamente em 2 minutos')`
4. Se **OK**:
   - Abre `ChamarEspecialistaModal`
   - Usuário escolhe tipo (normal/urgente) e mensagem
   - Envia notificação
   - Atualiza `lastNotificationTime`
   - Mostra badge "Notificado"

### **5. Emitir Cobrança:**
1. Usuário clica em "Emitir nova cobrança"
2. Abre `EmitirCobrancaModal`
3. Usuário preenche valor e método
4. Sistema atualiza `pagamentoStatus` (parcial/completo)
5. Atualiza `jaPago` somando valor recebido
6. Atualiza cor do ícone $ conforme status

### **6. Agendar Nova Consulta:**
1. Usuário clica em "Marcar Consulta"
2. Abre `AgendarConsultaModal`
3. Busca paciente ou cria incompleto
4. Preenche formulário
5. Sistema valida CPF e telefone
6. Adiciona nova consulta ao `consultasData`
7. Toast de sucesso

---

## 🎯 CONCLUSÃO

Esta documentação cobre **100% da funcionalidade** da tela de Agenda, incluindo:

✅ **Estrutura completa** de componentes e modais  
✅ **Todas as regras de negócio** (bloqueios, validações, rate limits)  
✅ **Sistema de cores** completo (Light e Dark Mode)  
✅ **Código de referência** para funções críticas  
✅ **Guia de implementação** passo a passo  
✅ **Padrões visuais** e Tailwind classes  
✅ **Fluxos de trabalho** completos  
✅ **Sistema de notificações** integrado  

**Use esta documentação como referência absoluta para replicar a tela de Agenda em qualquer outra jornada do sistema!** 🚀
