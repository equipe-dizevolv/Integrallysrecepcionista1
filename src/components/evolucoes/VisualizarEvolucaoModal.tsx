import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { FileText, Calendar, User, Activity, AlertTriangle } from 'lucide-react';

interface VisualizarEvolucaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evolucao: {
    id: number;
    paciente: string;
    data: string;
    tipo: string;
    status?: string;
    resumo: string;
    queixaPrincipal?: string;
    evolucao?: string;
    pressaoArterial?: string;
    frequenciaCardiaca?: string;
    temperatura?: string;
    peso?: string;
    sinaisVitais?: string;
    avaliacaoClinica?: string;
    condutaTerapeutica?: string;
    observacoes?: string;
    profissional?: string;
    erratas?: Array<{
      id: number;
      texto: string;
      data: string;
      profissional: string;
    }>;
  } | null;
}

export function VisualizarEvolucaoModal({ open, onOpenChange, evolucao }: VisualizarEvolucaoModalProps) {
  if (!evolucao) return null;

  const dadosCompletos = {
    ...evolucao,
    queixaPrincipal: evolucao.queixaPrincipal || 'Dor abdominal persistente',
    evolucao: evolucao.evolucao || 'Paciente apresenta melhora significativa após início do tratamento. Relata diminuição da dor e melhora no estado geral. Exame físico sem alterações significativas.',
    pressaoArterial: evolucao.pressaoArterial || '120/80 mmHg',
    frequenciaCardiaca: evolucao.frequenciaCardiaca || '72 bpm',
    temperatura: evolucao.temperatura || '36.5°C',
    peso: evolucao.peso || '70.5 kg',
    sinaisVitais: evolucao.sinaisVitais || 'Sinais vitais estáveis e dentro dos parâmetros normais',
    avaliacaoClinica: evolucao.avaliacaoClinica || 'Paciente em bom estado geral, orientado, corado, hidratado. Ausculta cardiopulmonar sem alterações.',
    condutaTerapeutica: evolucao.condutaTerapeutica || 'Manter medicação atual. Retorno em 15 dias para reavaliação. Orientado sobre sinais de alerta.',
    observacoes: evolucao.observacoes || 'Paciente aderente ao tratamento e seguindo orientações médicas.',
    profissional: evolucao.profissional || 'Dr. João Santos - CRM 12345'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738]" />
            Evolução Clínica
          </DialogTitle>
          <DialogDescription>
            Detalhes completos da evolução clínica
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Paciente</p>
                <p className="font-medium text-gray-900 dark:text-white">{dadosCompletos.paciente}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Data</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(dadosCompletos.data).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Tipo</p>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {dadosCompletos.tipo}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Profissional</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{dadosCompletos.profissional}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Queixa Principal */}
          {dadosCompletos.queixaPrincipal && (
            <>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#244738] dark:text-green-400" />
                  Queixa Principal
                </h3>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  {dadosCompletos.queixaPrincipal}
                </p>
              </div>
              <Separator />
            </>
          )}

          {/* Sinais Vitais */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 dark:text-white">Sinais Vitais</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400">Pressão Arterial</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  {dadosCompletos.pressaoArterial}
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-xs text-green-600 dark:text-green-400">FC</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  {dadosCompletos.frequenciaCardiaca}
                </p>
              </div>

              <div className="p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="text-xs text-orange-600 dark:text-orange-400">Temperatura</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  {dadosCompletos.temperatura}
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-xs text-purple-600 dark:text-purple-400">Peso</p>
                <p className="font-medium text-gray-900 dark:text-white mt-1">
                  {dadosCompletos.peso}
                </p>
              </div>
            </div>

            {dadosCompletos.sinaisVitais && (
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                {dadosCompletos.sinaisVitais}
              </p>
            )}
          </div>

          <Separator />

          {/* Evolução Clínica */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white">Descrição da Evolução</h3>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg whitespace-pre-line">
              {dadosCompletos.evolucao}
            </p>
          </div>

          {/* Avaliação Clínica */}
          {dadosCompletos.avaliacaoClinica && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Avaliação Clínica</h3>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg whitespace-pre-line">
                  {dadosCompletos.avaliacaoClinica}
                </p>
              </div>
            </>
          )}

          {/* Conduta Terapêutica */}
          {dadosCompletos.condutaTerapeutica && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Conduta Terapêutica</h3>
                <p className="text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-200 dark:border-green-800 whitespace-pre-line">
                  {dadosCompletos.condutaTerapeutica}
                </p>
              </div>
            </>
          )}

          {/* Observações */}
          {dadosCompletos.observacoes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-white">Observações Gerais</h3>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg whitespace-pre-line">
                  {dadosCompletos.observacoes}
                </p>
              </div>
            </>
          )}

          {/* Notas e Erratas */}
          {evolucao.erratas && evolucao.erratas.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Notas e Erratas ({evolucao.erratas.length})
                  </h3>
                </div>
                <div className="space-y-3">
                  {evolucao.erratas.map((errata) => (
                    <div 
                      key={errata.id}
                      className="p-4 bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 dark:border-orange-600 rounded-r-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                          ERRATA
                        </Badge>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {new Date(errata.data).toLocaleDateString('pt-BR')} às{' '}
                            {new Date(errata.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {errata.profissional}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                        {errata.texto}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-xs text-yellow-800 dark:text-yellow-400 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      As notas de errata fazem parte do histórico oficial do prontuário e são permanentes. 
                      Elas complementam o registro original sem alterá-lo, garantindo a rastreabilidade completa.
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Fechar
            </Button>
            <Button 
              type="button"
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
              onClick={() => {
                // Ação de imprimir ou exportar
                onOpenChange(false);
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}