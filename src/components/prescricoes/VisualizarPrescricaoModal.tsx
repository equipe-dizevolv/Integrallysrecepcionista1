import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Eye, FileText, Calendar, DollarSign, User, Clock, Package } from 'lucide-react';

interface VisualizarPrescricaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescricao: any;
}

export function VisualizarPrescricaoModal({ open, onOpenChange, prescricao }: VisualizarPrescricaoModalProps) {
  if (!prescricao) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'vencida':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'Ativa';
      case 'vencida':
        return 'Vencida';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Eye className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Detalhes da Prescrição
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Visualizar informações completas da prescrição
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header com número e status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a2e27] rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-[#244738] dark:text-[#10b981]" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{prescricao.numero}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{prescricao.tipo}</p>
              </div>
            </div>
            <Badge className={getStatusColor(prescricao.status)}>
              {getStatusText(prescricao.status)}
            </Badge>
          </div>

          {/* Informações do Paciente e Especialista */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-sm">Paciente</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {prescricao.paciente}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-sm">Especialista</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {prescricao.especialista}
              </p>
            </div>
          </div>

          {/* Informações Financeiras e Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Valor Total</span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white">
                R$ {prescricao.valorTotal.toFixed(2).replace('.', ',')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Data de Criação</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(prescricao.dataCriacao).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Validade</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {prescricao.validade} dias
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Fato Gerador</span>
              </div>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {prescricao.fatoGerador}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Tipo</span>
              </div>
              <Badge variant="outline">{prescricao.tipo}</Badge>
            </div>
          </div>

          {/* Itens da Prescrição */}
          {prescricao.itens && prescricao.itens.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4" />
                Itens da Prescrição
              </h4>
              
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-[#1a2e27]">
                      <TableHead className="text-gray-900 dark:text-white">Item</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Dosagem</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Frequência</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Estoque</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescricao.itens.map((item: any, index: number) => {
                      // Mock de dados de estoque - em produção virá do backend
                      const estoqueAguaBoa = Math.floor(Math.random() * 100) + 20;
                      const estoqueQuerencia = Math.floor(Math.random() * 100) + 20;
                      const estoqueTotal = estoqueAguaBoa + estoqueQuerencia;
                      const statusEstoque = estoqueTotal > 50 ? 'Disponível' : 'Baixo';
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-gray-900 dark:text-white">
                            {item.nome}
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">
                            {item.dosagem}
                          </TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-400">
                            {item.frequencia}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Água Boa:</span> {estoqueAguaBoa}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Querência:</span> {estoqueQuerencia}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Total: {estoqueTotal} unidades
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                estoqueTotal > 50
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }
                            >
                              {statusEstoque}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}