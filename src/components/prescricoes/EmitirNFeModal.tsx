import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { FileText, Download, Printer, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmitirNFeModalProps {
  open: boolean;
  onClose: () => void;
  prescricao: {
    numero: string;
    paciente: string;
    valorTotal: number;
    itens: { nome: string; dosagem: string }[];
  } | null;
}

export function EmitirNFeModal({ open, onClose, prescricao }: EmitirNFeModalProps) {
  const [emitindo, setEmitindo] = useState(false);
  const [nfeEmitida, setNfeEmitida] = useState(false);

  if (!prescricao) return null;

  const handleEmitir = () => {
    setEmitindo(true);
    
    // Simular emissão de NF-e
    setTimeout(() => {
      setNfeEmitida(true);
      setEmitindo(false);
      toast.success('NF-e emitida com sucesso!', {
        description: 'Documento disponível para download'
      });
    }, 2000);
  };

  const handleBaixarPDF = () => {
    toast.success('NF-e baixada com sucesso!');
  };

  const handleImprimir = () => {
    toast.success('NF-e enviada para impressão');
  };

  const handleFechar = () => {
    setNfeEmitida(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleFechar}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Emitir Nota Fiscal Eletrônica (NF-e)
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Preencha as informações abaixo para emitir a NF-e.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações da Prescrição */}
          <div className="p-4 bg-gray-50 dark:bg-[#0f1b16] rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Prescrição:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{prescricao.numero}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Paciente:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{prescricao.paciente}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Itens:</div>
              <div className="space-y-1">
                {prescricao.itens.map((item, index) => (
                  <div key={index} className="text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#244738] dark:bg-[#10b981]"></span>
                    {item.nome} - {item.dosagem}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Valor Total:</span>
              <span className="text-sm font-bold text-[#244738] dark:text-[#10b981]">
                R$ {prescricao.valorTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {!nfeEmitida && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-1">
                    Informações Importantes
                  </p>
                  <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                    <li>• A NF-e será emitida no sistema da prefeitura</li>
                    <li>• O processo pode levar alguns minutos</li>
                    <li>• Uma cópia será enviada por e-mail automaticamente</li>
                    <li>• Certifique-se de que o pagamento foi confirmado</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {nfeEmitida && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 dark:text-green-400 mb-2">
                    NF-e Emitida com Sucesso!
                  </p>
                  <div className="text-xs text-green-800 dark:text-green-400 space-y-1 mb-3">
                    <div>Número: 000.123.456</div>
                    <div>Chave de Acesso: 35240512345678901234567890123456789012345678</div>
                    <div>Data de Emissão: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBaixarPDF}
                      className="flex-1 border-green-200 dark:border-green-800"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleImprimir}
                      className="flex-1 border-green-200 dark:border-green-800"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Imprimir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!nfeEmitida ? (
            <>
              <Button
                variant="outline"
                onClick={handleFechar}
                disabled={emitindo}
                className="border-gray-200 dark:border-gray-600"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEmitir}
                disabled={emitindo}
                className="bg-[#244738] hover:bg-[#356b52] text-white"
              >
                {emitindo ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Emitindo NF-e...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Emitir NF-e
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleFechar}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Fechar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}