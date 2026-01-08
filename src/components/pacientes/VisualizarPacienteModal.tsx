import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User, Mail, Phone, Calendar, MapPin, CreditCard, FileText, Navigation } from 'lucide-react';

interface VisualizarPacienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
}

export function VisualizarPacienteModal({ open, onOpenChange, paciente }: VisualizarPacienteModalProps) {
  if (!paciente) return null;

  const calcularIdade = (dataNascimento: string) => {
    if (!dataNascimento) return paciente.idade;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  const getStatusColor = (status: string) => {
    return status === 'ativo'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-nested">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Ficha do Paciente
          </DialogTitle>
          <DialogDescription>
            Visualize as informações completas do paciente
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header do paciente */}
          <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#12211c]/10 dark:bg-green-400/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-[#12211c] dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {paciente.nome}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {calcularIdade(paciente.dataNascimento)} anos • CPF: {paciente.cpf}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(paciente.status)}>
              {paciente.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>

          {/* Informações de contato */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Informações de Contato</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">E-mail</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {paciente.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {paciente.telefone}
                  </p>
                </div>
              </div>
            </div>

            {(paciente.rua || paciente.cidade || paciente.estado) && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Endereço</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {paciente.rua && `${paciente.rua}${paciente.numero ? `, ${paciente.numero}` : ''}`}
                    {paciente.complemento && ` - ${paciente.complemento}`}
                  </p>
                  {(paciente.bairro || paciente.cidade || paciente.estado) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {paciente.bairro && `${paciente.bairro}, `}
                      {paciente.cidade && `${paciente.cidade}`}
                      {paciente.estado && `/${paciente.estado}`}
                      {paciente.cep && ` - CEP: ${paciente.cep}`}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {paciente.origemIndicacao && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Origem da Indicação</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {paciente.origemIndicacao}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Plano de saúde */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Plano de Saúde</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Convênio</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {paciente.planoSaude}
                </p>
                {paciente.numeroCarteirinha && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Carteirinha: {paciente.numeroCarteirinha}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Histórico recente */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Informações Adicionais</h4>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Última Consulta</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {paciente.observacoes && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Observações</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {paciente.observacoes}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Fechar
            </Button>
            <Button 
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Editar Paciente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}