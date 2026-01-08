import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { FileText, Calendar, User, Tag, List } from 'lucide-react';

interface VisualizarModeloModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelo: {
    id: number;
    nome: string;
    finalidade: string;
    categoria?: string;
    especialidade?: string;
    ultimaAtualizacao: string;
    criador?: string;
    campos?: Array<{
      id: string;
      tipo: string;
      label: string;
      obrigatorio: boolean;
      opcoes?: string[];
    }>;
  } | null;
}

export function VisualizarModeloModal({ open, onOpenChange, modelo }: VisualizarModeloModalProps) {
  if (!modelo) return null;

  const camposExemplo = modelo.campos || [
    { id: '1', tipo: 'texto', label: 'Queixa Principal', obrigatorio: true },
    { id: '2', tipo: 'textarea', label: 'História da Doença Atual', obrigatorio: true },
    { id: '3', tipo: 'select', label: 'Pressão Arterial', obrigatorio: false, opcoes: ['Normal', 'Elevado', 'Muito Alto'] },
    { id: '4', tipo: 'numero', label: 'Frequência Cardíaca', obrigatorio: false },
    { id: '5', tipo: 'checkbox', label: 'Paciente já fez exames?', obrigatorio: false },
    { id: '6', tipo: 'textarea', label: 'Exame Físico', obrigatorio: true },
    { id: '7', tipo: 'textarea', label: 'Hipótese Diagnóstica', obrigatorio: true },
    { id: '8', tipo: 'textarea', label: 'Conduta / Plano Terapêutico', obrigatorio: true }
  ];

  const getTipoLabel = (tipo: string) => {
    const tipos: Record<string, string> = {
      'texto': 'Texto Curto',
      'textarea': 'Texto Longo',
      'numero': 'Número',
      'data': 'Data',
      'select': 'Seleção',
      'checkbox': 'Checkbox',
      'radio': 'Escolha Única'
    };
    return tipos[tipo] || tipo;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738]" />
            Visualizar Modelo de Prontuário
          </DialogTitle>
          <DialogDescription>
            Detalhes completos do modelo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações Principais */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {modelo.nome}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {modelo.finalidade}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modelo.categoria && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Categoria</p>
                    <p className="font-medium text-gray-900 dark:text-white">{modelo.categoria}</p>
                  </div>
                </div>
              )}

              {modelo.especialidade && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Especialidade</p>
                    <p className="font-medium text-gray-900 dark:text-white">{modelo.especialidade}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Última Atualização</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(modelo.ultimaAtualizacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {modelo.criador && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Criado por</p>
                    <p className="font-medium text-gray-900 dark:text-white">{modelo.criador}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Estrutura do Modelo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <List className="w-5 h-5 text-[#244738] dark:text-green-400" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                Estrutura do Modelo
              </h3>
              <Badge variant="secondary">
                {camposExemplo.length} campos
              </Badge>
            </div>

            <div className="space-y-2">
              {camposExemplo.map((campo, index) => (
                <div
                  key={campo.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          {index + 1}.
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {campo.label}
                        </span>
                        {campo.obrigatorio && (
                          <Badge variant="secondary" className="text-xs">
                            Obrigatório
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 ml-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Tipo: {getTipoLabel(campo.tipo)}
                        </span>
                        {campo.opcoes && (
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            • Opções: {campo.opcoes.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview de como seria o preenchimento */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              <strong>💡 Dica:</strong> Este modelo pode ser usado durante consultas para agilizar o preenchimento do prontuário. 
              Os campos obrigatórios devem ser preenchidos antes de finalizar.
            </p>
          </div>

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
                // Aqui seria a ação de usar o modelo
                onOpenChange(false);
              }}
            >
              Usar este Modelo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
