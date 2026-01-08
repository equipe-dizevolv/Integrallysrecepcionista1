import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  User, 
  Bell, 
  Calendar, 
  Shield, 
  Camera, 
  Sun, 
  Volume2,
  Save,
  Mail,
  Phone,
  Printer,
  MessageSquare,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'perfil' | 'notificacoes' | 'agenda' | 'seguranca' | 'atendimento';

interface ConfiguracoesSectionProps {
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export function ConfiguracoesSection({ theme = 'light', onThemeChange }: ConfiguracoesSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('perfil');
  
  // Estados do Perfil
  const [nomeCompleto, setNomeCompleto] = useState('Ana Recepcionista');
  const [cargo, setCargo] = useState('Recepcionista');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [email, setEmail] = useState('ana.recepcionista@clinica.com');
  const [telefone, setTelefone] = useState('(11) 98765-4321');
  
  // Estados de Notificações
  const [notificacoesSistema, setNotificacoesSistema] = useState(true);
  const [somNotificacoes, setSomNotificacoes] = useState(true);
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [tempoToast, setTempoToast] = useState('3');
  
  const [notifNovasConsultas, setNotifNovasConsultas] = useState(true);
  const [notifCheckin, setNotifCheckin] = useState(true);
  const [notifConsultasProximas, setNotifConsultasProximas] = useState(true);
  const [notifAtrasos, setNotifAtrasos] = useState(true);
  const [notifCancelamentos, setNotifCancelamentos] = useState(true);
  const [notifPagamentos, setNotifPagamentos] = useState(true);
  const [notifConfirmacoesPendentes, setNotifConfirmacoesPendentes] = useState(true);
  const [notifPacientesAguardando, setNotifPacientesAguardando] = useState(true);
  const [notifRetornos, setNotifRetornos] = useState(true);
  
  // Estados de Agenda
  const [visualizacaoPadrao, setVisualizacaoPadrao] = useState('semana');
  const [horarioInicio, setHorarioInicio] = useState('08:00');
  const [duracaoPadrao, setDuracaoPadrao] = useState('30');
  const [intervaloConsultas, setIntervaloConsultas] = useState('10');
  const [mostrarCanceladas, setMostrarCanceladas] = useState(false);
  const [lembreteAntes, setLembreteAntes] = useState('15');
  
  // Estados de Segurança
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [autenticacaoDoisFatores, setAutenticacaoDoisFatores] = useState(false);
  
  // Estados de Atendimento
  const [imprimirAutomatico, setImprimirAutomatico] = useState(false);
  const [enviarSMSConfirmacao, setEnviarSMSConfirmacao] = useState(true);
  const [enviarEmailLembrete, setEnviarEmailLembrete] = useState(true);
  const [lembreteAntecedencia, setLembreteAntecedencia] = useState('24');

  const handleSalvarPerfil = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleAtualizarSenha = () => {
    if (novaSenha !== confirmarSenha) {
      toast.error('As senhas não coincidem');
      return;
    }
    toast.success('Senha atualizada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-6">
      {/* Heading */}
      <div className="flex flex-col gap-0">
        <h1 className="text-[24px] leading-[32px] text-neutral-950 dark:text-white">
          Configurações
        </h1>
        <p className="text-[16px] leading-[24px] text-[#6c757d] dark:text-gray-400">
          Gerencie suas preferências e configurações do sistema
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 dark:bg-[#0f1b16] rounded-[14px] p-[3px]">
        <div className="flex gap-[3px]">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`flex-1 h-[32px] rounded-[14px] px-4 py-1.5 text-[14px] leading-[20px] transition-colors flex items-center justify-center ${
              activeTab === 'perfil'
                ? 'bg-[#244738] text-white dark:bg-[#244738]'
                : 'text-[#1e2939] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#244738]/30'
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('notificacoes')}
            className={`flex-1 h-[32px] rounded-[14px] px-4 py-1.5 text-[14px] leading-[20px] transition-colors flex items-center justify-center ${
              activeTab === 'notificacoes'
                ? 'bg-[#244738] text-white dark:bg-[#244738]'
                : 'text-[#1e2939] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#244738]/30'
            }`}
          >
            Notificações
          </button>
          <button
            onClick={() => setActiveTab('agenda')}
            className={`flex-1 h-[32px] rounded-[14px] px-4 py-1.5 text-[14px] leading-[20px] transition-colors flex items-center justify-center ${
              activeTab === 'agenda'
                ? 'bg-[#244738] text-white dark:bg-[#244738]'
                : 'text-[#1e2939] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#244738]/30'
            }`}
          >
            Agenda
          </button>
          <button
            onClick={() => setActiveTab('seguranca')}
            className={`flex-1 h-[32px] rounded-[14px] px-4 py-1.5 text-[14px] leading-[20px] transition-colors flex items-center justify-center ${
              activeTab === 'seguranca'
                ? 'bg-[#244738] text-white dark:bg-[#244738]'
                : 'text-[#1e2939] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#244738]/30'
            }`}
          >
            Segurança
          </button>
          <button
            onClick={() => setActiveTab('atendimento')}
            className={`flex-1 h-[32px] rounded-[14px] px-4 py-1.5 text-[14px] leading-[20px] transition-colors flex items-center justify-center ${
              activeTab === 'atendimento'
                ? 'bg-[#244738] text-white dark:bg-[#244738]'
                : 'text-[#1e2939] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#244738]/30'
            }`}
          >
            Atendimento
          </button>
        </div>
      </div>

      {/* Content Cards */}
      {activeTab === 'perfil' && (
        <Card className="border-[rgba(0,0,0,0.1)] dark:border-gray-700 rounded-[14px]">
          <CardHeader className="pt-6 px-6">
            <CardTitle className="flex items-center gap-2 text-[16px]">
              <User className="w-5 h-5" />
              Perfil do Usuário
            </CardTitle>
            <CardDescription className="text-[16px] text-[#6c757d] dark:text-gray-400">
              Informações pessoais e profissionais
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#244738] flex items-center justify-center">
                <span className="text-[20px] text-white leading-[28px]">AR</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="h-[32px] px-4 rounded-[8px] border-[rgba(0,0,0,0.1)] dark:border-gray-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Alterar Foto
                </Button>
                <p className="text-[12px] leading-[16px] text-[#6c757d] dark:text-gray-400">
                  JPG, PNG ou GIF. Máx. 2MB
                </p>
              </div>
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="nome" className="text-[14px] leading-[14px]">
                  Nome Completo *
                </Label>
                <Input
                  id="nome"
                  value={nomeCompleto}
                  onChange={(e) => setNomeCompleto(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="cargo" className="text-[14px] leading-[14px]">
                  Cargo *
                </Label>
                <Input
                  id="cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="cpf" className="text-[14px] leading-[14px]">
                  CPF *
                </Label>
                <Input
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  disabled
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0 opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="telefone" className="text-[14px] leading-[14px]">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[14px] leading-[14px]">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
              />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            {/* Tema */}
            <div className="space-y-4">
              <h3 className="text-[18px] leading-[28px] text-neutral-950 dark:text-white">
                Preferências de Tema
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <Label className="text-[14px] leading-[14px]">Modo Escuro</Label>
                  </div>
                  <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                    Alterna entre tema claro e escuro
                  </p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => onThemeChange?.(checked ? 'dark' : 'light')}
                />
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleSalvarPerfil}
                className="bg-[#244738] hover:bg-[#1a3329] text-white h-[36px] px-6 rounded-[8px]"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notificacoes' && (
        <Card className="border-[rgba(0,0,0,0.1)] dark:border-gray-700 rounded-[14px]">
          <CardHeader className="pt-6 px-6">
            <CardTitle className="flex items-center gap-2 text-[16px]">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
            <CardDescription className="text-[16px] text-[#6c757d] dark:text-gray-400">
              Configure como deseja receber alertas e notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6">
            {/* Notificações do Sistema */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <Label className="text-[14px] leading-[14px]">Notificações do Sistema</Label>
                <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                  Receba alertas sobre consultas, pacientes e lembretes
                </p>
              </div>
              <Switch checked={notificacoesSistema} onCheckedChange={setNotificacoesSistema} />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            {/* Som das Notificações */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <Label className="text-[14px] leading-[14px]">Som das Notificações</Label>
                </div>
                <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                  Reproduzir som ao receber novas notificações
                </p>
              </div>
              <Switch checked={somNotificacoes} onCheckedChange={setSomNotificacoes} />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            {/* Notificações por Email */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <Label className="text-[14px] leading-[14px]">Notificações por Email</Label>
                <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                  Receber resumo diário de consultas e eventos
                </p>
              </div>
              <Switch checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            {/* Tempo de Exibição do Toast */}
            <div className="flex flex-col gap-2">
              <Label className="text-[14px] leading-[14px]">Tempo de Exibição do Toast</Label>
              <Select value={tempoToast} onValueChange={setTempoToast}>
                <SelectTrigger className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#0f1b16]">
                  <SelectItem value="2">2 segundos</SelectItem>
                  <SelectItem value="3">3 segundos</SelectItem>
                  <SelectItem value="5">5 segundos</SelectItem>
                  <SelectItem value="10">10 segundos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notificar sobre */}
            <div className="space-y-3">
              <Label className="text-[14px] leading-[14px]">Notificar sobre:</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Novas consultas agendadas
                  </p>
                  <Switch checked={notifNovasConsultas} onCheckedChange={setNotifNovasConsultas} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Check-in de pacientes
                  </p>
                  <Switch checked={notifCheckin} onCheckedChange={setNotifCheckin} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Consultas próximas (15 min antes)
                  </p>
                  <Switch checked={notifConsultasProximas} onCheckedChange={setNotifConsultasProximas} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Pacientes em atraso
                  </p>
                  <Switch checked={notifAtrasos} onCheckedChange={setNotifAtrasos} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Cancelamentos
                  </p>
                  <Switch checked={notifCancelamentos} onCheckedChange={setNotifCancelamentos} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Pagamentos
                  </p>
                  <Switch checked={notifPagamentos} onCheckedChange={setNotifPagamentos} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Confirmações Pendentes
                  </p>
                  <Switch checked={notifConfirmacoesPendentes} onCheckedChange={setNotifConfirmacoesPendentes} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Pacientes Aguardando
                  </p>
                  <Switch checked={notifPacientesAguardando} onCheckedChange={setNotifPacientesAguardando} />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[14px] leading-[20px] text-neutral-950 dark:text-white">
                    Retornos
                  </p>
                  <Switch checked={notifRetornos} onCheckedChange={setNotifRetornos} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'agenda' && (
        <Card className="border-[rgba(0,0,0,0.1)] dark:border-gray-700 rounded-[14px]">
          <CardHeader className="pt-6 px-6">
            <CardTitle className="flex items-center gap-2 text-[16px]">
              <Calendar className="w-5 h-5" />
              Preferências de Agenda
            </CardTitle>
            <CardDescription className="text-[16px] text-[#6c757d] dark:text-gray-400">
              Configure como deseja visualizar e gerenciar a agenda
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Visualização Padrão</Label>
              
              <div className="space-y-3">
                <Select value={visualizacaoPadrao} onValueChange={setVisualizacaoPadrao}>
                  <SelectTrigger className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#0f1b16]">
                    <SelectItem value="semana">Semana</SelectItem>
                    <SelectItem value="dia">Dia</SelectItem>
                    <SelectItem value="mes">Mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Horário de Início</Label>
              
              <div className="space-y-3">
                <Input
                  type="time"
                  value={horarioInicio}
                  onChange={(e) => setHorarioInicio(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Duração Padrão (min)</Label>
              
              <div className="space-y-3">
                <Input
                  type="number"
                  value={duracaoPadrao}
                  onChange={(e) => setDuracaoPadrao(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Intervalo entre Consultas (min)</Label>
              
              <div className="space-y-3">
                <Input
                  type="number"
                  value={intervaloConsultas}
                  onChange={(e) => setIntervaloConsultas(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Mostrar Consultas Canceladas</Label>
              
              <div className="space-y-3">
                <Switch checked={mostrarCanceladas} onCheckedChange={setMostrarCanceladas} />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Lembrete Antes (min)</Label>
              
              <div className="space-y-3">
                <Input
                  type="number"
                  value={lembreteAntes}
                  onChange={(e) => setLembreteAntes(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'seguranca' && (
        <Card className="border-[rgba(0,0,0,0.1)] dark:border-gray-700 rounded-[14px]">
          <CardHeader className="pt-6 px-6">
            <CardTitle className="flex items-center gap-2 text-[16px]">
              <Shield className="w-5 h-5" />
              Privacidade e Segurança
            </CardTitle>
            <CardDescription className="text-[16px] text-[#6c757d] dark:text-gray-400">
              Gerencie suas configurações de segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6">
            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Alterar Senha</Label>
              
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Senha atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
                <Input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
                <Input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0"
                />
              </div>

              <Button 
                onClick={handleAtualizarSenha}
                variant="outline"
                className="h-[36px] px-4 rounded-[8px] border-[rgba(0,0,0,0.1)] dark:border-gray-600"
              >
                Atualizar Senha
              </Button>
            </div>

            <div className="space-y-4">
              <Label className="text-[14px] leading-[14px]">Autenticação de Dois Fatores</Label>
              
              <div className="space-y-3">
                <Switch checked={autenticacaoDoisFatores} onCheckedChange={setAutenticacaoDoisFatores} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'atendimento' && (
        <Card className="border-[rgba(0,0,0,0.1)] dark:border-gray-700 rounded-[14px]">
          <CardHeader className="pt-6 px-6">
            <CardTitle className="flex items-center gap-2 text-[16px]">
              <MessageSquare className="w-5 h-5" />
              Preferências de Atendimento
            </CardTitle>
            <CardDescription className="text-[16px] text-[#6c757d] dark:text-gray-400">
              Configure como deseja gerenciar o atendimento
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  <Label className="text-[14px] leading-[14px]">Imprimir Automaticamente</Label>
                </div>
                <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                  Imprimir comprovantes e recibos automaticamente
                </p>
              </div>
              <Switch checked={imprimirAutomatico} onCheckedChange={setImprimirAutomatico} />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <Label className="text-[14px] leading-[14px]">Enviar SMS de Confirmação</Label>
                </div>
                <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                  Enviar mensagem SMS após agendar consultas
                </p>
              </div>
              <Switch checked={enviarSMSConfirmacao} onCheckedChange={setEnviarSMSConfirmacao} />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <Label className="text-[14px] leading-[14px]">Enviar Email de Lembrete</Label>
                </div>
                <p className="text-[14px] leading-[20px] text-[#6c757d] dark:text-gray-400">
                  Enviar email de lembrete antes das consultas
                </p>
              </div>
              <Switch checked={enviarEmailLembrete} onCheckedChange={setEnviarEmailLembrete} />
            </div>

            <div className="h-px bg-[rgba(0,0,0,0.1)] dark:bg-gray-700" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <Label className="text-[14px] leading-[14px]">Lembrete com Antecedência (horas)</Label>
              </div>
              <Select value={lembreteAntecedencia} onValueChange={setLembreteAntecedencia}>
                <SelectTrigger className="h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#0d1914] border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#0f1b16]">
                  <SelectItem value="1">1 hora antes</SelectItem>
                  <SelectItem value="2">2 horas antes</SelectItem>
                  <SelectItem value="6">6 horas antes</SelectItem>
                  <SelectItem value="12">12 horas antes</SelectItem>
                  <SelectItem value="24">24 horas antes</SelectItem>
                  <SelectItem value="48">48 horas antes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}