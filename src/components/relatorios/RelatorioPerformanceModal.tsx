import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Download, Printer, TrendingUp, Users, Calendar, Clock, Repeat, UserCheck, Activity } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RelatorioPerformanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RelatorioPerformanceModal({ open, onOpenChange }: RelatorioPerformanceModalProps) {
  const [periodo, setPeriodo] = useState('30d');

  // Dados mock de Performance
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

  const handleDownloadPDF = () => {
    toast.success('Relatório de Performance baixado com sucesso!');
  };

  const handleImprimir = () => {
    toast.success('Relatório de Performance enviado para impressão');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Relatório de Performance
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Métricas e indicadores de desempenho da clínica
          </DialogDescription>
        </DialogHeader>

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
              variant={periodo === p.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriodo(p.value)}
              className={periodo === p.value ? 'bg-[#244738] hover:bg-[#356b52]' : ''}
            >
              {p.label}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
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

          {/* Métricas de Pacientes - DESTAQUE */}
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
                  <strong>Interpretação:</strong> {dadosPerformance.pacientes.percentualRecorrentes}% dos seus pacientes já realizaram consultas anteriormente, e {dadosPerformance.pacientes.taxaRetorno}% dos pacientes que já foram atendidos retornaram no período analisado.
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

          {/* Tempo Médio de Espera */}
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
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button
            variant="outline"
            onClick={handleImprimir}
            className="flex-1"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}