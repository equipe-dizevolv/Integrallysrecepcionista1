import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { FileText, AlertCircle } from 'lucide-react';

interface AdicionarNotaErrataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evolucao: any;
}

export function AdicionarNotaErrataModal({ open, onOpenChange, evolucao }: AdicionarNotaErrataModalProps) {
  const [nota, setNota] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nota.trim()) {
      toast.error('A nota/errata não pode estar vazia');
      return;
    }

    // Simular salvamento da nota
    toast.success('Nota/Errata adicionada com sucesso!', {
      description: 'A nota foi anexada à evolução clínica'
    });

    // Limpar e fechar
    setNota('');
    onOpenChange(false);
  };

  if (!evolucao) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Adicionar Nota/Errata
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Adicione uma nota de esclarecimento ou errata à evolução finalizada
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Alerta informativo */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Evolução Finalizada - Edição Restrita
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Esta evolução está finalizada e não pode mais ser editada. Você pode adicionar notas de errata que serão anexadas ao registro original, mantendo a rastreabilidade e integridade do prontuário.
                </p>
              </div>
            </div>
          </div>

          {/* Informações da Evolução */}
          <div className="p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg border border-gray-200 dark:border-gray-600 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Paciente:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{evolucao.paciente}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Data da Evolução:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(evolucao.data).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{evolucao.tipo}</span>
            </div>
          </div>

          {/* Campo de Nota/Errata */}
          <div className="space-y-2">
            <Label htmlFor="nota" className="text-gray-900 dark:text-white">
              Nota/Errata *
            </Label>
            <Textarea
              id="nota"
              placeholder="Digite a nota de esclarecimento ou errata que deseja adicionar à evolução..."
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              rows={6}
              className="resize-none border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Esta nota será adicionada com data e hora atual, identificando o profissional responsável.
            </p>
          </div>

          {/* Informação adicional */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-400">
              <span className="font-semibold">Importante:</span> As notas de errata são permanentes e não podem ser removidas após adicionadas. Elas fazem parte do histórico oficial do prontuário do paciente.
            </p>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Adicionar Nota/Errata
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
