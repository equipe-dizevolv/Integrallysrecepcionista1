import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, Users, XCircle, Clock, Bell, User, Building, DollarSign } from 'lucide-react';
import { UserRole } from '../../types/user';

interface DashboardSectionProps {
  onNavigate: (section: string) => void;
  userRole?: UserRole;
}

export function DashboardSection({ onNavigate, userRole = 'recepcionista' }: DashboardSectionProps) {
  // Stats dinâmicos baseados no perfil
  const getStatsByRole = () => {
    switch (userRole) {
      case 'gestor-unidade':
        return [
          { title: 'Consultas Hoje', value: '24', icon: Calendar, color: 'text-blue-600 dark:text-blue-400' },
          { title: 'Taxa de Comparecimento', value: '87%', icon: Users, color: 'text-green-600 dark:text-green-400' },
          { title: 'Receita da Unidade', value: 'R$ 5.200', icon: DollarSign, color: 'text-green-600 dark:text-green-400' }
        ];
      case 'gestor-matriz':
        return [
          { title: 'Unidades Ativas', value: '12', icon: Building, color: 'text-blue-600 dark:text-blue-400' },
          { title: 'Consultas Hoje', value: '156', icon: Calendar, color: 'text-green-600 dark:text-green-400' },
          { title: 'Receita Consolidada', value: 'R$ 42.300', icon: DollarSign, color: 'text-green-600 dark:text-green-400' }
        ];
      case 'administrador':
        return [
          { title: 'Total de Unidades', value: '12', icon: Building, color: 'text-blue-600 dark:text-blue-400' },
          { title: 'Especialistas', value: '84', icon: Users, color: 'text-green-600 dark:text-green-400' },
          { title: 'Receita Mensal', value: 'R$ 680.500', icon: DollarSign, color: 'text-green-600 dark:text-green-400' }
        ];
      case 'especialista':
        return [
          { title: 'Consultas Hoje', value: '8', icon: Calendar, color: 'text-blue-600 dark:text-blue-400' },
          { title: 'Pacientes Ativos', value: '145', icon: Users, color: 'text-green-600 dark:text-green-400' },
          { title: 'Próximas Consultas', value: '12', icon: Clock, color: 'text-blue-600 dark:text-blue-400' }
        ];
      case 'paciente':
        return [
          { title: 'Próximas Consultas', value: '2', icon: Calendar, color: 'text-blue-600 dark:text-blue-400' },
          { title: 'Prescrições Ativas', value: '3', icon: Users, color: 'text-green-600 dark:text-green-400' },
          { title: 'Pagamentos Pendentes', value: 'R$ 450', icon: DollarSign, color: 'text-yellow-600 dark:text-yellow-400' }
        ];
      default: // recepcionista
        return [
          { title: 'Consultas Hoje', value: '24', icon: Calendar, color: 'text-blue-600 dark:text-blue-400' },
          { title: 'Pacientes Aguardando', value: '7', icon: Users, color: 'text-green-600 dark:text-green-400' },
          { title: 'Cancelamentos', value: '3', icon: XCircle, color: 'text-red-600 dark:text-red-400' }
        ];
    }
  };

  const stats = getStatsByRole();

  const proximosAtendimentos = [
    {
      id: 1,
      paciente: 'Maria Silva',
      especialista: 'Dr. João Santos',
      horario: '14:30',
      tipo: 'Consulta',
      status: 'confirmado'
    },
    {
      id: 2,
      paciente: 'Pedro Costa',
      especialista: 'Dra. Ana Lima',
      horario: '15:00',
      tipo: 'Retorno',
      status: 'aguardando'
    },
    {
      id: 3,
      paciente: 'Laura Oliveira',
      especialista: 'Dr. Carlos Rocha',
      horario: '15:30',
      tipo: 'Exame',
      status: 'confirmado'
    },
    {
      id: 4,
      paciente: 'Roberto Ferreira',
      especialista: 'Dra. Lucia Mendes',
      horario: '16:00',
      tipo: 'Consulta',
      status: 'aguardando'
    },
    {
      id: 5,
      paciente: 'Fernanda Torres',
      especialista: 'Dr. Paulo Silva',
      horario: '16:30',
      tipo: 'Retorno',
      status: 'confirmado'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'aguardando':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lista de próximos atendimentos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Próximos Atendimentos
          </CardTitle>
          <Button 
            size="sm" 
            onClick={() => onNavigate('agenda')}
            className="bg-[#244738] hover:bg-[#356b52] text-white"
          >
            Ver Agenda Completa
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proximosAtendimentos.map((atendimento) => (
              <div 
                key={atendimento.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {atendimento.paciente}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {atendimento.especialista} • {atendimento.tipo}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(atendimento.status)}>
                    {atendimento.status === 'confirmado' ? 'Confirmado' : 'Aguardando'}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {atendimento.horario}
                  </span>
                  <Button size="sm" variant="ghost" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}