import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp, TrendingDown, Printer, Clock, Repeat, UserCheck, Activity } from 'lucide-react';
import { UserRole } from '../../types/user';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RelatoriosSectionProps {
  userRole?: UserRole;
}

export function RelatoriosSection({ userRole = 'recepcionista' }: RelatoriosSectionProps) {
  const [activeTab, setActiveTab] = useState('financeiro');
  const [periodoFinanceiro, setPeriodoFinanceiro] = useState('30d');
  const [periodoPerformance, setPeriodoPerformance] = useState('30d');
  const [periodoConsultas, setPeriodoConsultas] = useState('30d');
  const [statusFiltro, setStatusFiltro] = useState('todas');
  const [subTabFinanceiro, setSubTabFinanceiro] = useState<'caixa' | 'periodo'>('periodo');
  const [dataRelatorio] = useState(new Date().toLocaleDateString('pt-BR'));

  // Dados mock para Consultas
  const dadosConsultas = {
    total: 187,
    realizadas: 156,
    agendadas: 31,
    canceladas: 8,
    lista: [
      {
        id: 1,
        data: '08/12/2024',
        horario: '14:00',
        paciente: 'Maria Silva Santos',
        profissional: 'Dr. Carlos Silva',
        tipo: 'Consulta Geral',
        status: 'realizada',
        valor: 250.00,
        pagamento: 'Cartão Crédito'
      },
      {
        id: 2,
        data: '08/12/2024',
        horario: '15:00',
        paciente: 'João Pedro Costa',
        profissional: 'Dra. Maria Santos',
        tipo: 'Retorno',
        status: 'realizada',
        valor: 150.00,
        pagamento: 'PIX'
      },
      {
        id: 3,
        data: '08/12/2024',
        horario: '16:00',
        paciente: 'Ana Paula Oliveira',
        profissional: 'Dr. João Costa',
        tipo: 'Consulta Geral',
        status: 'realizada',
        valor: 250.00,
        pagamento: 'Dinheiro'
      },
      {
        id: 4,
        data: '09/12/2024',
        horario: '09:00',
        paciente: 'Carlos Eduardo Lima',
        profissional: 'Dr. Carlos Silva',
        tipo: 'Exame',
        status: 'agendada',
        valor: 180.00,
        pagamento: '-'
      },
      {
        id: 5,
        data: '09/12/2024',
        horario: '10:30',
        paciente: 'Fernanda Alves',
        profissional: 'Dra. Maria Santos',
        tipo: 'Consulta Geral',
        status: 'agendada',
        valor: 250.00,
        pagamento: '-'
      },
      {
        id: 6,
        data: '07/12/2024',
        horario: '14:00',
        paciente: 'Roberto Mendes',
        profissional: 'Dr. João Costa',
        tipo: 'Consulta Geral',
        status: 'cancelada',
        valor: 250.00,
        pagamento: '-'
      },
      {
        id: 7,
        data: '08/12/2024',
        horario: '11:00',
        paciente: 'Patricia Rodrigues',
        profissional: 'Dr. Carlos Silva',
        tipo: 'Retorno',
        status: 'realizada',
        valor: 150.00,
        pagamento: 'Cartão Débito'
      },
      {
        id: 8,
        data: '08/12/2024',
        horario: '17:00',
        paciente: 'Lucas Martins',
        profissional: 'Dra. Maria Santos',
        tipo: 'Consulta Geral',
        status: 'realizada',
        valor: 250.00,
        pagamento: 'PIX'
      }
    ]
  };

  // Dados mock para Pacientes
  const dadosPacientes = {
    total: 142,
    ativos: 128,
    inativos: 14,
    novosUltimos30Dias: 38,
    lista: [
      {
        id: 1,
        nome: 'Maria Silva Santos',
        cpf: '123.456.789-00',
        telefone: '(11) 98765-4321',
        email: 'maria.silva@email.com',
        dataNascimento: '15/03/1985',
        idade: 39,
        ultimaConsulta: '08/12/2024',
        totalConsultas: 12,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 2,
        nome: 'João Pedro Costa',
        cpf: '234.567.890-11',
        telefone: '(11) 97654-3210',
        email: 'joao.costa@email.com',
        dataNascimento: '22/07/1990',
        idade: 34,
        ultimaConsulta: '08/12/2024',
        totalConsultas: 8,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 3,
        nome: 'Ana Paula Oliveira',
        cpf: '345.678.901-22',
        telefone: '(11) 96543-2109',
        email: 'ana.oliveira@email.com',
        dataNascimento: '10/11/1978',
        idade: 46,
        ultimaConsulta: '08/12/2024',
        totalConsultas: 25,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 4,
        nome: 'Carlos Eduardo Lima',
        cpf: '456.789.012-33',
        telefone: '(11) 95432-1098',
        email: 'carlos.lima@email.com',
        dataNascimento: '05/09/1995',
        idade: 29,
        ultimaConsulta: '02/12/2024',
        totalConsultas: 5,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 5,
        nome: 'Fernanda Alves',
        cpf: '567.890.123-44',
        telefone: '(11) 94321-0987',
        email: 'fernanda.alves@email.com',
        dataNascimento: '18/04/1988',
        idade: 36,
        ultimaConsulta: '01/12/2024',
        totalConsultas: 15,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 6,
        nome: 'Roberto Mendes',
        cpf: '678.901.234-55',
        telefone: '(11) 93210-9876',
        email: 'roberto.mendes@email.com',
        dataNascimento: '28/12/1982',
        idade: 41,
        ultimaConsulta: '15/08/2024',
        totalConsultas: 3,
        status: 'Inativo',
        cadastroCompleto: false
      },
      {
        id: 7,
        nome: 'Patricia Rodrigues',
        cpf: '789.012.345-66',
        telefone: '(11) 92109-8765',
        email: 'patricia.rodrigues@email.com',
        dataNascimento: '07/06/1992',
        idade: 32,
        ultimaConsulta: '08/12/2024',
        totalConsultas: 18,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 8,
        nome: 'Lucas Martins',
        cpf: '890.123.456-77',
        telefone: '(11) 91098-7654',
        email: 'lucas.martins@email.com',
        dataNascimento: '14/01/1987',
        idade: 37,
        ultimaConsulta: '08/12/2024',
        totalConsultas: 7,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 9,
        nome: 'Juliana Santos',
        cpf: '901.234.567-88',
        telefone: '(11) 90987-6543',
        email: 'juliana.santos@email.com',
        dataNascimento: '25/05/2000',
        idade: 24,
        ultimaConsulta: '05/12/2024',
        totalConsultas: 2,
        status: 'Ativo',
        cadastroCompleto: true
      },
      {
        id: 10,
        nome: 'Rafael Oliveira',
        cpf: '012.345.678-99',
        telefone: '(11) 89876-5432',
        email: 'rafael.oliveira@email.com',
        dataNascimento: '30/08/1975',
        idade: 49,
        ultimaConsulta: '03/12/2024',
        totalConsultas: 32,
        status: 'Ativo',
        cadastroCompleto: true
      }
    ]
  };

  // Dados mock Financeiro - Caixa
  const dadosCaixa = {
    abertura: {
      hora: '08:00',
      responsavel: 'Ana Recepcionista',
      valorInicial: 200.00
    },
    movimentacoes: {
      dinheiro: 1250.00,
      debito: 3400.00,
      credito: 5600.00,
      pix: 2890.00
    },
    saidas: {
      despesas: 450.00,
      sangrias: 500.00
    },
    fechamento: {
      hora: '18:00',
      valorEsperado: 12390.00,
      valorContado: 12390.00,
      diferenca: 0
    }
  };

  // Dados mock Financeiro - Período
  const dadosPeriodo = {
    receitas: {
      total: 68450.00,
      dinheiro: 12300.00,
      debito: 18900.00,
      credito: 25600.00,
      pix: 11650.00
    },
    despesas: {
      total: 15780.00,
      categorias: [
        { nome: 'Materiais', valor: 5600.00 },
        { nome: 'Salários', valor: 8000.00 },
        { nome: 'Infraestrutura', valor: 1200.00 },
        { nome: 'Outros', valor: 980.00 }
      ]
    },
    consultas: {
      pagas: 156,
      pendentes: 23,
      canceladas: 8
    },
    comparativo: {
      receitasAnterior: 62300.00,
      crescimento: 9.87
    }
  };

  // Dados mock Performance
  const dadosPerformance = {
    consultas: {
      total: 187,
      realizadas: 156,
      canceladas: 8,
      faltas: 23,
      taxaComparecimento: 83.4
    },
    pacientes: {
      total: 142,
      novos: 38,
      recorrentes: 104,
      percentualRecorrentes: 73.2,
      retornaram: 87,
      taxaRetorno: 61.3
    },
    tempo: {
      medioDuracao: 32,
      mediaEspera: 8
    },
    eficiencia: {
      ocupacaoAgenda: 78.5,
      mediaDia: 18.7
    },
    profissionais: [
      { nome: 'Dr. Carlos Silva', consultas: 67, percentual: 42.9 },
      { nome: 'Dra. Maria Santos', consultas: 52, percentual: 33.3 },
      { nome: 'Dr. João Costa', consultas: 37, percentual: 23.8 }
    ],
    tiposConsulta: [
      { tipo: 'Consulta Geral', quantidade: 78, percentual: 50.0 },
      { tipo: 'Retorno', quantidade: 45, percentual: 28.8 },
      { tipo: 'Exames', quantidade: 21, percentual: 13.5 },
      { tipo: 'Outros', quantidade: 12, percentual: 7.7 }
    ]
  };

  // Dados para gráficos
  const dadosGraficoProfissionais = dadosPerformance.profissionais.map(p => ({
    name: p.nome.split(' ')[1],
    consultas: p.consultas
  }));

  const dadosGraficoTipos = dadosPerformance.tiposConsulta.map(t => ({
    name: t.tipo,
    value: t.quantidade
  }));

  const COLORS = ['#244738', '#10b981', '#3b82f6', '#f59e0b'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleDownloadPDF = () => {
    toast.success('Relatório baixado com sucesso!');
  };

  const handleImprimir = () => {
    toast.success('Relatório enviado para impressão');
  };

  const tabs = [
    { id: 'consultas', label: 'Consultas', icon: Calendar },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Relatórios
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize métricas e indicadores da clínica
        </p>
      </div>

      {/* Tabs principais */}
      <div className="bg-gray-100 dark:bg-[#0f1b16] p-1 rounded-lg flex gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#244738] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo das Tabs */}
      <div className="mt-6">
        {/* Tab Consultas */}
        {activeTab === 'consultas' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Relatório de Consultas
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleImprimir}>
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                    <Button size="sm" className="bg-[#244738] hover:bg-[#356b52]" onClick={handleDownloadPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Seletor de Período */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: 'Últimos 7 dias', value: '7d' },
                    { label: 'Últimos 30 dias', value: '30d' },
                    { label: 'Últimos 3 meses', value: '3m' },
                    { label: 'Este ano', value: 'year' }
                  ].map((p) => (
                    <Button
                      key={p.value}
                      variant={periodoConsultas === p.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPeriodoConsultas(p.value)}
                      className={periodoConsultas === p.value ? 'bg-[#244738] hover:bg-[#356b52]' : ''}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>

                {/* Filtro de Status */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: 'Todas', value: 'todas' },
                    { label: 'Realizadas', value: 'realizadas' },
                    { label: 'Agendadas', value: 'agendadas' },
                    { label: 'Canceladas', value: 'canceladas' }
                  ].map((s) => (
                    <Button
                      key={s.value}
                      variant={statusFiltro === s.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFiltro(s.value)}
                      className={statusFiltro === s.value ? 'bg-[#244738] hover:bg-[#356b52]' : ''}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>

                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total de Consultas</p>
                          <p className="text-2xl font-bold text-[#244738] dark:text-[#10b981]">
                            {dadosConsultas.total}
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Consultas Realizadas</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {dadosConsultas.realizadas}
                          </p>
                        </div>
                        <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Consultas Agendadas</p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {dadosConsultas.agendadas}
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela de Consultas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Lista de Consultas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                          <tr className="text-left">
                            <th className="pb-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Data/Hora</th>
                            <th className="pb-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Paciente</th>
                            <th className="pb-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Profissional</th>
                            <th className="pb-3 pr-4 text-gray-600 dark:text-gray-400 font-medium">Tipo</th>
                            <th className="pb-3 pr-6 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                            <th className="pb-3 pr-8 text-gray-600 dark:text-gray-400 font-medium text-right">Valor</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Pagamento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dadosConsultas.lista.map((consulta) => (
                            <tr key={consulta.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                              <td className="py-3 pr-4 text-gray-900 dark:text-white">{consulta.data} {consulta.horario}</td>
                              <td className="py-3 pr-4 text-gray-900 dark:text-white">{consulta.paciente}</td>
                              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{consulta.profissional}</td>
                              <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{consulta.tipo}</td>
                              <td className="py-3 pr-6">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  consulta.status === 'realizada' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                  consulta.status === 'agendada' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                  'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                }`}>
                                  {consulta.status.charAt(0).toUpperCase() + consulta.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-3 pr-8 text-gray-900 dark:text-white text-right font-medium">{formatCurrency(consulta.valor)}</td>
                              <td className="py-3 text-gray-600 dark:text-gray-400">{consulta.pagamento}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Pacientes */}
        {activeTab === 'pacientes' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Relatório de Pacientes
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleImprimir}>
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                    <Button size="sm" className="bg-[#244738] hover:bg-[#356b52]" onClick={handleDownloadPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total de Pacientes</p>
                          <p className="text-2xl font-bold text-[#244738] dark:text-[#10b981]">
                            {dadosPacientes.total}
                          </p>
                        </div>
                        <Users className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pacientes Ativos</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {dadosPacientes.ativos}
                          </p>
                        </div>
                        <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pacientes Inativos</p>
                          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {dadosPacientes.inativos}
                          </p>
                        </div>
                        <Repeat className="w-8 h-8 text-red-600 dark:text-red-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tabela de Pacientes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Lista de Pacientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-gray-200 dark:border-gray-700">
                          <tr className="text-left">
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Nome</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">CPF</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Telefone</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Idade</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Última Consulta</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium text-center">Total</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Status</th>
                            <th className="pb-3 text-gray-600 dark:text-gray-400 font-medium">Cadastro</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dadosPacientes.lista.map((paciente) => (
                            <tr key={paciente.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                              <td className="py-3 text-gray-900 dark:text-white font-medium">{paciente.nome}</td>
                              <td className="py-3 text-gray-600 dark:text-gray-400">{paciente.cpf}</td>
                              <td className="py-3 text-gray-600 dark:text-gray-400">{paciente.telefone}</td>
                              <td className="py-3 text-gray-600 dark:text-gray-400">{paciente.idade} anos</td>
                              <td className="py-3 text-gray-600 dark:text-gray-400">{paciente.ultimaConsulta}</td>
                              <td className="py-3 text-gray-900 dark:text-white text-center font-medium">{paciente.totalConsultas}</td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  paciente.status === 'Ativo' 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                    : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                                }`}>
                                  {paciente.status}
                                </span>
                              </td>
                              <td className="py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  paciente.cadastroCompleto 
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                }`}>
                                  {paciente.cadastroCompleto ? 'Completo' : 'Incompleto'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Financeiro */}
        {activeTab === 'financeiro' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Relatório Financeiro
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleImprimir}>
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                    <Button size="sm" className="bg-[#244738] hover:bg-[#356b52]" onClick={handleDownloadPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sub-tabs Financeiro */}
                <div className="flex gap-2 bg-gray-100 dark:bg-[#0f1b16] p-1 rounded-lg">
                  <button
                    onClick={() => setSubTabFinanceiro('caixa')}
                    className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                      subTabFinanceiro === 'caixa'
                        ? 'bg-white dark:bg-[#244738] text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Caixa Diário
                  </button>
                  <button
                    onClick={() => setSubTabFinanceiro('periodo')}
                    className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                      subTabFinanceiro === 'periodo'
                        ? 'bg-white dark:bg-[#244738] text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    Por Período
                  </button>
                </div>

                {/* Caixa Diário */}
                {subTabFinanceiro === 'caixa' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      Movimentação do Caixa - {dataRelatorio}
                    </div>

                    {/* Abertura */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Abertura de Caixa</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Hora:</span>
                          <p className="font-medium text-gray-900 dark:text-white">{dadosCaixa.abertura.hora}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Responsável:</span>
                          <p className="font-medium text-gray-900 dark:text-white">{dadosCaixa.abertura.responsavel}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Valor Inicial:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.abertura.valorInicial)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Entradas */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Entradas por Forma de Pagamento</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Dinheiro</span>
                            <span className="text-xl font-medium text-gray-900 dark:text-white mt-1">
                              {formatCurrency(dadosCaixa.movimentacoes.dinheiro)}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Cartão Débito</span>
                            <span className="text-xl font-medium text-gray-900 dark:text-white mt-1">
                              {formatCurrency(dadosCaixa.movimentacoes.debito)}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Cartão Crédito</span>
                            <span className="text-xl font-medium text-gray-900 dark:text-white mt-1">
                              {formatCurrency(dadosCaixa.movimentacoes.credito)}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">PIX</span>
                            <span className="text-xl font-medium text-gray-900 dark:text-white mt-1">
                              {formatCurrency(dadosCaixa.movimentacoes.pix)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Saídas */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Saídas</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Despesas</span>
                            <span className="text-xl font-medium text-red-600 dark:text-red-400 mt-1">
                              -{formatCurrency(dadosCaixa.saidas.despesas)}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Sangrias</span>
                            <span className="text-xl font-medium text-red-600 dark:text-red-400 mt-1">
                              -{formatCurrency(dadosCaixa.saidas.sangrias)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fechamento */}
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Fechamento de Caixa</h4>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Hora:</span>
                          <p className="font-medium text-gray-900 dark:text-white">{dadosCaixa.fechamento.hora}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Valor Esperado:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.fechamento.valorEsperado)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Valor Contado:</span>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(dadosCaixa.fechamento.valorContado)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Diferença:</span>
                          <p className={`font-medium ${dadosCaixa.fechamento.diferenca === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {dadosCaixa.fechamento.diferenca === 0 ? 'OK' : formatCurrency(Math.abs(dadosCaixa.fechamento.diferenca))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Por Período */}
                {subTabFinanceiro === 'periodo' && (
                  <div className="space-y-4">
                    {/* Seletor de Período */}
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { label: 'Hoje', value: 'hoje' },
                        { label: 'Ontem', value: 'ontem' },
                        { label: 'Últimos 7 dias', value: '7d' },
                        { label: 'Últimos 30 dias', value: '30d' },
                        { label: 'Últimos 3 meses', value: '3m' },
                        { label: 'Este ano', value: 'year' }
                      ].map((p) => (
                        <Button
                          key={p.value}
                          variant={periodoFinanceiro === p.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPeriodoFinanceiro(p.value)}
                          className={periodoFinanceiro === p.value ? 'bg-[#244738] hover:bg-[#356b52]' : ''}
                        >
                          {p.label}
                        </Button>
                      ))}
                    </div>

                    {/* Cards de Resumo */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Receitas</p>
                              <p className="text-2xl font-bold text-[#244738] dark:text-[#10b981]">
                                {formatCurrency(dadosPeriodo.receitas.total)}
                              </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 dark:text-green-400">+{dadosPeriodo.comparativo.crescimento}%</span>
                            <span className="text-gray-500 dark:text-gray-400">vs período anterior</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Despesas</p>
                              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatCurrency(dadosPeriodo.despesas.total)}
                              </p>
                            </div>
                            <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Saldo Líquido</p>
                              <p className="text-2xl font-bold text-[#244738] dark:text-[#10b981]">
                                {formatCurrency(dadosPeriodo.receitas.total - dadosPeriodo.despesas.total)}
                              </p>
                            </div>
                            <DollarSign className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Detalhamento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Receitas */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Receitas por Forma de Pagamento</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Cartão de Crédito</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(dadosPeriodo.receitas.credito)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Cartão de Débito</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(dadosPeriodo.receitas.debito)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Dinheiro</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(dadosPeriodo.receitas.dinheiro)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">PIX</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(dadosPeriodo.receitas.pix)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Despesas */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Despesas por Categoria</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {dadosPeriodo.despesas.categorias.map((cat, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600 dark:text-gray-400">{cat.nome}</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formatCurrency(cat.valor)}
                              </span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Status Consultas */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Status de Consultas no Período</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {dadosPeriodo.consultas.pagas}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pagas</p>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                              {dadosPeriodo.consultas.pendentes}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pendentes</p>
                          </div>
                          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                              {dadosPeriodo.consultas.canceladas}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Canceladas</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Performance */}
        {activeTab === 'performance' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Relatório de Performance
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleImprimir}>
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                    <Button size="sm" className="bg-[#244738] hover:bg-[#356b52]" onClick={handleDownloadPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Seletor de Período */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: 'Últimos 7 dias', value: '7d' },
                    { label: 'Últimos 30 dias', value: '30d' },
                    { label: 'Últimos 3 meses', value: '3m' },
                    { label: 'Este ano', value: 'year' }
                  ].map((p) => (
                    <Button
                      key={p.value}
                      variant={periodoPerformance === p.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPeriodoPerformance(p.value)}
                      className={periodoPerformance === p.value ? 'bg-[#244738] hover:bg-[#356b52]' : ''}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>

                {/* Métricas Principais */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total de Consultas</p>
                          <p className="text-3xl font-bold text-[#244738] dark:text-[#10b981]">
                            {dadosPerformance.consultas.total}
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Comparecimento</p>
                          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {dadosPerformance.consultas.taxaComparecimento}%
                          </p>
                        </div>
                        <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Ocupação da Agenda</p>
                          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {dadosPerformance.eficiencia.ocupacaoAgenda}%
                          </p>
                        </div>
                        <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Média por Dia</p>
                          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {dadosPerformance.eficiencia.mediaDia}
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Análise de Pacientes */}
                <Card className="border-2 border-[#244738] dark:border-[#10b981]">
                  <CardHeader className="bg-[#244738]/5 dark:bg-[#10b981]/10">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                      Análise de Pacientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                        <p className="text-3xl font-bold text-[#244738] dark:text-[#10b981]">
                          {dadosPerformance.pacientes.total}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total de Pacientes</p>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {dadosPerformance.pacientes.novos}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Novos Pacientes</p>
                      </div>

                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {dadosPerformance.pacientes.recorrentes}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pacientes Recorrentes</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                          ({dadosPerformance.pacientes.percentualRecorrentes}% do total)
                        </p>
                      </div>

                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-300 dark:border-purple-700">
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                          {dadosPerformance.pacientes.retornaram}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Retornaram</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">
                          Taxa: {dadosPerformance.pacientes.taxaRetorno}%
                        </p>
                      </div>

                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Repeat className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Retorno</p>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                          {dadosPerformance.pacientes.taxaRetorno}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        <strong>Interpretação:</strong> {dadosPerformance.pacientes.percentualRecorrentes}% dos seus pacientes já realizaram consultas anteriormente (mínimo 2 consultas nos últimos 6 meses), e {dadosPerformance.pacientes.taxaRetorno}% dos pacientes que já foram atendidos retornaram no período analisado.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Status de Consultas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status das Consultas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                          {dadosPerformance.consultas.realizadas}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Realizadas</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                          {dadosPerformance.consultas.canceladas}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Canceladas</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                          {dadosPerformance.consultas.faltas}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Faltas</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-[#0f1b16] rounded-lg">
                        <Clock className="w-8 h-8 mx-auto text-gray-600 dark:text-gray-400 mb-2" />
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {dadosPerformance.tempo.medioDuracao} min
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Duração Média</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gráficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Consultas por Profissional */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Consultas por Profissional</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={dadosGraficoProfissionais}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="consultas" fill="#244738" />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="mt-4 space-y-2">
                        {dadosPerformance.profissionais.map((prof, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{prof.nome}</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {prof.consultas} ({prof.percentual}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tipos de Consulta */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Distribuição por Tipo de Consulta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={dadosGraficoTipos}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {dadosGraficoTipos.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="mt-4 space-y-2">
                        {dadosPerformance.tiposConsulta.map((tipo, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                              />
                              <span className="text-gray-600 dark:text-gray-400">{tipo.tipo}</span>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {tipo.quantidade} ({tipo.percentual}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Métricas de Tempo */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Métricas de Tempo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tempo Médio de Consulta</p>
                        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                          {dadosPerformance.tempo.medioDuracao}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">minutos</p>
                      </div>
                      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tempo Médio de Espera</p>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                          {dadosPerformance.tempo.mediaEspera}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">minutos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}