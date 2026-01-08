import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { FileText, Download, Printer, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmitirNotaFiscalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consulta: {
    paciente: string;
    tipo: string;
    valor: string;
    especialista: string;
  } | null;
}

export function EmitirNotaFiscalModal({ open, onOpenChange, consulta }: EmitirNotaFiscalModalProps) {
  const [tipoDocumento, setTipoDocumento] = useState<'nf' | 'recibo'>('recibo');
  const [emitindo, setEmitindo] = useState(false);
  const [documentoEmitido, setDocumentoEmitido] = useState(false);

  const handleEmitir = () => {
    setEmitindo(true);
    
    // Simular emissão
    setTimeout(() => {
      const docNome = tipoDocumento === 'nf' ? 'Nota Fiscal de Serviço' : 'Recibo';
      toast.success(`${docNome} emitido com sucesso!`, {
        description: 'Agora você pode baixar o PDF ou imprimir'
      });
      setEmitindo(false);
      setDocumentoEmitido(true);
    }, 1500);
  };

  const handleBaixarPDF = () => {
    const docNome = tipoDocumento === 'nf' ? 'NotaFiscal' : 'Recibo';
    toast.success(`${docNome} baixado com sucesso!`);
  };

  const handleImprimir = () => {
    const docNome = tipoDocumento === 'nf' ? 'Nota Fiscal' : 'Recibo';
    toast.success(`${docNome} enviado para impressão`);
  };

  const handleFechar = () => {
    setDocumentoEmitido(false);
    onOpenChange(false);
  };

  if (!consulta) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Emitir Documento Fiscal
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Selecione o tipo de documento que deseja emitir para a consulta.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações da Consulta */}
          <div className="p-4 bg-gray-50 dark:bg-[#0f1b16] rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Paciente:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{consulta.paciente}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Serviço:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{consulta.tipo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Profissional:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{consulta.especialista}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Valor Total:</span>
              <span className="text-sm font-bold text-[#244738] dark:text-[#10b981]">R$ {consulta.valor}</span>
            </div>
          </div>

          {/* Tipo de Documento */}
          <div className="space-y-3">
            <Label className="text-gray-900 dark:text-white">Tipo de Documento</Label>
            <RadioGroup value={tipoDocumento} onValueChange={(value: any) => setTipoDocumento(value)}>
              <div 
                onClick={() => setTipoDocumento('recibo')}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  tipoDocumento === 'recibo' 
                    ? 'border-[#244738] bg-[#244738]/5 dark:border-[#10b981] dark:bg-[#10b981]/10' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#0f1b16]'
                }`}
              >
                <RadioGroupItem value="recibo" id="recibo" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="recibo" className="cursor-pointer text-gray-900 dark:text-white">
                    Recibo
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Comprovante simples de pagamento (mais rápido)
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setTipoDocumento('nf')}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  tipoDocumento === 'nf' 
                    ? 'border-[#244738] bg-[#244738]/5 dark:border-[#10b981] dark:bg-[#10b981]/10' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#0f1b16]'
                }`}
              >
                <RadioGroupItem value="nf" id="nf" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="nf" className="cursor-pointer text-gray-900 dark:text-white">
                    Nota Fiscal de Serviço (NFS-e)
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Documento fiscal oficial para prestação de serviços
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Aviso NF */}
          {tipoDocumento === 'nf' && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-400">
                <strong>Nota:</strong> A NFS-e será emitida automaticamente no sistema da prefeitura e pode levar alguns minutos para ser processada.
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 dark:border-gray-600"
              disabled={emitindo}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEmitir}
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
              disabled={emitindo}
            >
              {emitindo ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Emitindo...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Emitir {tipoDocumento === 'nf' ? 'NFS-e' : 'Recibo'}
                </>
              )}
            </Button>
          </div>

          {/* Ações Adicionais */}
          {documentoEmitido && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Após emitir, você poderá:</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBaixarPDF}
                  className="flex-1 border-gray-200 dark:border-gray-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImprimir}
                  className="flex-1 border-gray-200 dark:border-gray-600"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFechar}
                  className="flex-1 border-gray-200 dark:border-gray-600"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}