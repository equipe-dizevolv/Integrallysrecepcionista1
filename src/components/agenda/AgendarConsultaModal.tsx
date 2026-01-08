import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X, Plus, Search, UserPlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AgendarConsultaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgendarConsultaModal({ open, onOpenChange }: AgendarConsultaModalProps) {
  const [formData, setFormData] = useState({
    paciente: '',
    cpf: '',
    telefone: '',
    especialista: '',
    data: '',
    horario: '',
    tipo: '',
    observacoes: ''
  });
  const [searchPaciente, setSearchPaciente] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Lista de pacientes cadastrados (mock)
  const pacientesCadastrados = [
    { id: 1, nome: 'Maria Silva', cpf: '123.456.789-00', telefone: '(11) 9 9999-9999' },
    { id: 2, nome: 'Pedro Costa', cpf: '987.654.321-00', telefone: '(11) 9 8888-8888' },
    { id: 3, nome: 'Laura Oliveira', cpf: '456.789.123-00', telefone: '(11) 9 7777-7777' },
    { id: 4, nome: 'Roberto Ferreira', cpf: '321.654.987-00', telefone: '(11) 9 6666-6666' },
    { id: 5, nome: 'Fernanda Torres', cpf: '789.123.456-00', telefone: '(11) 9 5555-5555' },
  ];

  const especialistas = [
    'Dr. João Santos - Cardiologia',
    'Dra. Ana Lima - Pediatria',
    'Dr. Carlos Rocha - Neurologia',
    'Dra. Lucia Mendes - Ginecologia',
    'Dr. Paulo Silva - Ortopedia',
    'Dra. Sofia Castro - Dermatologia'
  ];

  const tiposConsulta = [
    'Consulta',
    'Retorno',
    'Exame',
    'Procedimento'
  ];

  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return formData.cpf;
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      }
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return formData.telefone;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: formatted });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const handleCriarPacienteIncompleto = () => {
    if (!searchPaciente.trim()) {
      toast.error('Digite um nome para o paciente');
      return;
    }
    
    // Criar paciente incompleto
    setFormData({
      ...formData,
      paciente: searchPaciente,
      cpf: '',
      telefone: ''
    });
    
    toast.success(`Paciente "${searchPaciente}" será criado com cadastro incompleto`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.paciente || !formData.cpf || !formData.telefone || !formData.especialista || !formData.data || !formData.horario || !formData.tipo) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Validar CPF (deve ter 11 dígitos)
    const cpfNumeros = formData.cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
      toast.error('CPF inválido. Digite 11 dígitos.');
      return;
    }

    // Validar Telefone (deve ter 10 ou 11 dígitos)
    const telefoneNumeros = formData.telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      toast.error('Telefone inválido. Digite 10 ou 11 dígitos.');
      return;
    }

    // Simular agendamento
    toast.success('Consulta agendada com sucesso!');
    onOpenChange(false);
    setFormData({
      paciente: '',
      cpf: '',
      telefone: '',
      especialista: '',
      data: '',
      horario: '',
      tipo: '',
      observacoes: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-[#12211c] border border-gray-200 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Plus className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
            Marcar Consulta
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Agende uma nova consulta para o paciente
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 relative">
            <Label htmlFor="paciente" className="text-gray-900 dark:text-white">Paciente *</Label>
            <div className="relative">
              <Input
                id="paciente"
                placeholder="Pesquise por nome, CPF ou telefone..."
                value={searchPaciente}
                onChange={(e) => {
                  setSearchPaciente(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              
              {showResults && searchPaciente && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-[#1a2e27] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {pacientesCadastrados
                    .filter(paciente => 
                      paciente.nome.toLowerCase().includes(searchPaciente.toLowerCase()) ||
                      paciente.cpf.includes(searchPaciente) ||
                      paciente.telefone.includes(searchPaciente)
                    ).length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                        Pacientes cadastrados
                      </div>
                      {pacientesCadastrados
                        .filter(paciente => 
                          paciente.nome.toLowerCase().includes(searchPaciente.toLowerCase()) ||
                          paciente.cpf.includes(searchPaciente) ||
                          paciente.telefone.includes(searchPaciente)
                        )
                        .map(paciente => (
                          <div
                            key={paciente.id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                paciente: paciente.nome,
                                cpf: paciente.cpf,
                                telefone: paciente.telefone
                              });
                              setSearchPaciente(paciente.nome);
                              setShowResults(false);
                            }}
                            className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#244738]/30 text-gray-900 dark:text-white"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{paciente.nome}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {paciente.cpf} • {paciente.telefone}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-600">
                    <div
                      onClick={() => {
                        handleCriarPacienteIncompleto();
                        setShowResults(false);
                      }}
                      className="cursor-pointer flex items-center gap-2 bg-[#244738]/5 dark:bg-[#244738]/20 hover:bg-[#244738]/10 dark:hover:bg-[#244738]/30 text-[#244738] dark:text-[#10b981] px-3 py-2.5"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="font-medium">Criar paciente incompleto</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-gray-900 dark:text-white">CPF *</Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleCPFChange}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-gray-900 dark:text-white">Telefone *</Label>
              <Input
                id="telefone"
                placeholder="(00) 0 0000-0000"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="especialista" className="text-gray-900 dark:text-white">Especialista *</Label>
            <Select 
              value={formData.especialista} 
              onValueChange={(value) => setFormData({ ...formData, especialista: value })}
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                <SelectValue placeholder="Selecione o especialista" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                {especialistas.map((especialista) => (
                  <SelectItem key={especialista} value={especialista}>
                    {especialista}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data" className="text-gray-900 dark:text-white">Data *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario" className="text-gray-900 dark:text-white">Horário *</Label>
              <Select 
                value={formData.horario} 
                onValueChange={(value) => setFormData({ ...formData, horario: value })}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue placeholder="Horário" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {horarios.map((horario) => (
                    <SelectItem key={horario} value={horario}>
                      {horario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-gray-900 dark:text-white">Tipo de Consulta *</Label>
            <Select 
              value={formData.tipo} 
              onValueChange={(value) => setFormData({ ...formData, tipo: value })}
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                {tiposConsulta.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-gray-900 dark:text-white">Observações</Label>
            <Input
              id="observacoes"
              placeholder="Observações adicionais"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Agendar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}