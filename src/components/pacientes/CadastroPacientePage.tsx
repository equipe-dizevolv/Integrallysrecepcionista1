import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { toast } from 'sonner@2.0.3';
import { Camera, X, Upload, UserPlus, ChevronDown, ChevronUp, AlertCircle, ArrowLeft, ChevronRight } from 'lucide-react';

interface CadastroPacientePageProps {
  onVoltar: () => void;
  dadosIniciais?: {
    nome?: string;
    cpf?: string;
    telefone?: string;
  };
}

export function CadastroPacientePage({ onVoltar, dadosIniciais }: CadastroPacientePageProps) {
  const [formData, setFormData] = useState({
    // Dados Pessoais Primários
    nome: '',
    cpf: '',
    dataNascimento: '',
    idade: '',
    sexo: '',
    
    // Contato e Identificação
    telefone: '',
    email: '',
    origemIndicacao: '',
    
    // Endereço
    endereco: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Dados do Responsável (quando menor)
    grauParentesco: '',
    outroParentesco: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    dataNascimentoResponsavel: '',
    idadeResponsavel: '',
    sexoResponsavel: '',
    enderecoResponsavel: '',
    cidadeResponsavel: '',
    estadoResponsavel: ''
  });
  
  const [foto, setFoto] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isMenor, setIsMenor] = useState(false);
  const [showResponsavel, setShowResponsavel] = useState(false);
  
  // Preencher dados iniciais se fornecidos
  useEffect(() => {
    if (dadosIniciais) {
      setFormData(prev => ({
        ...prev,
        nome: dadosIniciais.nome || '',
        cpf: dadosIniciais.cpf || '',
        telefone: dadosIniciais.telefone || ''
      }));
    }
  }, [dadosIniciais]);

  const origensIndicacao = [
    'Rede Social',
    'Rádio',
    'Amigo',
    'Familiar',
    'Plano de Saúde',
    'Google/Internet',
    'Outdoor/Panfleto',
    'Outro'
  ];
  
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Calcular idade automaticamente
  const calcularIdade = (dataNascimento: string): number => {
    if (!dataNascimento) return 0;
    
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

  // Atualizar idade quando data de nascimento mudar
  useEffect(() => {
    if (formData.dataNascimento) {
      const idade = calcularIdade(formData.dataNascimento);
      setFormData(prev => ({ ...prev, idade: idade.toString() }));
      setIsMenor(idade < 18);
      
      // Se virou maior de idade, limpar dados do responsável
      if (idade >= 18) {
        setShowResponsavel(false);
      }
    }
  }, [formData.dataNascimento]);

  // Atualizar idade do responsável quando data de nascimento mudar
  useEffect(() => {
    if (formData.dataNascimentoResponsavel) {
      const idade = calcularIdade(formData.dataNascimentoResponsavel);
      setFormData(prev => ({ ...prev, idadeResponsavel: idade.toString() }));
    }
  }, [formData.dataNascimentoResponsavel]);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
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
    return value;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData({ ...formData, cpf: formatted });
  };

  const handleCPFResponsavelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData({ ...formData, cpfResponsavel: formatted });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTelefone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setShowWebcam(true);
      
      setTimeout(() => {
        const video = document.getElementById('webcam') as HTMLVideoElement;
        if (video) {
          video.srcObject = stream;
        }
      }, 100);
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        toast.error('Permissão negada. Por favor, permita o acesso à câmera ou faça upload de uma foto.');
      } else if (err.name === 'NotFoundError') {
        toast.error('Nenhuma câmera encontrada. Por favor, faça upload de uma foto.');
      } else {
        toast.error('Erro ao acessar a webcam. Use o upload de arquivo como alternativa.');
      }
      console.error(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione um arquivo de imagem válido.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFoto(event.target?.result as string);
        toast.success('Foto carregada com sucesso!');
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    const video = document.getElementById('webcam') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const photoData = canvas.toDataURL('image/png');
      setFoto(photoData);
      stopWebcam();
      toast.success('Foto capturada com sucesso!');
    }
  };

  const stopWebcam = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setShowWebcam(false);
  };

  const removePhoto = () => {
    setFoto(null);
    toast.success('Foto removida');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação dos campos obrigatórios principais
    if (!formData.nome || !formData.cpf || !formData.dataNascimento || !formData.sexo || 
        !formData.telefone || !formData.origemIndicacao || !formData.endereco || !formData.bairro || 
        !formData.cidade || !formData.estado) {
      toast.error('Preencha todos os campos obrigatórios marcados com *');
      return;
    }
    
    // Validação específica para "Como conheceu a clínica"
    if (!formData.origemIndicacao || formData.origemIndicacao === '') {
      toast.error('O campo "Como conheceu a clínica" é obrigatório');
      return;
    }

    // Validar CPF
    const cpfNumeros = formData.cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
      toast.error('CPF inválido. Digite 11 dígitos.');
      return;
    }

    // Validar Telefone
    const telefoneNumeros = formData.telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      toast.error('Telefone inválido. Digite 10 ou 11 dígitos.');
      return;
    }

    // Se menor de 18, validar dados do responsável
    if (isMenor) {
      if (!formData.grauParentesco || !formData.nomeResponsavel || !formData.cpfResponsavel || 
          !formData.dataNascimentoResponsavel || !formData.sexoResponsavel) {
        toast.error('Preencha todos os campos obrigatórios do responsável');
        return;
      }

      // Validar CPF do responsável
      const cpfResponsavelNumeros = formData.cpfResponsavel.replace(/\D/g, '');
      if (cpfResponsavelNumeros.length !== 11) {
        toast.error('CPF do responsável inválido. Digite 11 dígitos.');
        return;
      }

      // Validar se grau de parentesco "Outro" foi especificado
      if (formData.grauParentesco === 'outro' && !formData.outroParentesco) {
        toast.error('Especifique o grau de parentesco');
        return;
      }
    }

    // Simular cadastro completo
    toast.success('Cadastro completo realizado com sucesso!');
    onVoltar();
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <button 
          onClick={onVoltar}
          className="hover:text-[#244738] dark:hover:text-[#10b981] transition-colors"
        >
          Pacientes
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">Novo Cadastro</span>
      </div>

      {/* Header com botão voltar */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onVoltar}
          className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ficha de Cadastro Completo (CRM)
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Complete todos os campos obrigatórios para finalizar o cadastro
          </p>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. DADOS PESSOAIS (CAMPOS PRIMÁRIOS) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Dados Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-gray-900 dark:text-white">
                  Nome Completo *
                </Label>
                <Input
                  id="nome"
                  placeholder="Nome completo do paciente"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-gray-900 dark:text-white">
                  CPF *
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataNascimento" className="text-gray-900 dark:text-white">
                  Data de Nascimento *
                </Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idade" className="text-gray-900 dark:text-white">
                  Idade
                </Label>
                <Input
                  id="idade"
                  value={formData.idade ? `${formData.idade} anos` : ''}
                  className="border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-[#0f1b16] text-gray-900 dark:text-white"
                  readOnly
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">
                  Sexo *
                </Label>
                <RadioGroup 
                  value={formData.sexo} 
                  onValueChange={(value) => setFormData({ ...formData, sexo: value })}
                  className="flex gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino" className="cursor-pointer text-gray-900 dark:text-white">
                      Feminino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino" className="cursor-pointer text-gray-900 dark:text-white">
                      Masculino
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Aviso se menor de 18 */}
            {isMenor && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  <strong>Paciente menor de idade.</strong> É obrigatório preencher os dados do responsável legal.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 2. INFORMAÇÕES DE CONTATO E IDENTIFICAÇÃO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Informações de Contato e Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-gray-900 dark:text-white">
                  Telefone *
                </Label>
                <Input
                  id="telefone"
                  placeholder="(00) 0 0000-0000"
                  value={formData.telefone}
                  onChange={handleTelefoneChange}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-white">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Foto de Perfil - Webcam */}
            <div className="space-y-2">
              <Label className="text-gray-900 dark:text-white">
                Foto de Perfil
              </Label>
              <div className="flex flex-col gap-2">
                {!foto && !showWebcam && (
                  <div className="w-full max-w-xs h-40 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2">
                    <Camera className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nenhuma foto capturada</p>
                  </div>
                )}
                
                {foto && !showWebcam && (
                  <div className="relative w-full max-w-xs">
                    <img
                      src={foto}
                      alt="Foto do paciente"
                      className="w-full h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removePhoto}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {showWebcam && (
                  <div className="relative w-full max-w-xs">
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center z-0">
                      <Camera className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                    <video
                      id="webcam"
                      className="relative z-10 w-full h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      autoPlay
                      playsInline
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 z-20"
                      onClick={stopWebcam}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  {!showWebcam && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={startWebcam}
                        className="flex items-center gap-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
                      >
                        <Camera className="w-4 h-4" />
                        {foto ? 'Atualizar Foto' : 'Capturar Foto'}
                      </Button>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="uploadFoto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('uploadFoto')?.click()}
                        className="flex items-center gap-2 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </Button>
                    </>
                  )}
                  
                  {showWebcam && (
                    <Button
                      type="button"
                      onClick={capturePhoto}
                      className="flex items-center gap-2 bg-[#244738] hover:bg-[#356b52] text-white"
                    >
                      <Camera className="w-4 h-4" />
                      Capturar
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="origemIndicacao" className="text-gray-900 dark:text-white">
                Indicação (Origem) *
              </Label>
              <Select 
                value={formData.origemIndicacao} 
                onValueChange={(value) => setFormData({ ...formData, origemIndicacao: value })}
              >
                <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                  <SelectValue placeholder="Como nos conheceu?" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                  {origensIndicacao.map((origem) => (
                    <SelectItem key={origem} value={origem}>
                      {origem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 3. ENDEREÇO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. Endereço</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="endereco" className="text-gray-900 dark:text-white">
                  Endereço (Rua e Número) *
                </Label>
                <Input
                  id="endereco"
                  placeholder="Rua, Avenida, número"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complemento" className="text-gray-900 dark:text-white">
                  Complemento
                </Label>
                <Input
                  id="complemento"
                  placeholder="Apto, Bloco, etc."
                  value={formData.complemento}
                  onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bairro" className="text-gray-900 dark:text-white">
                  Bairro *
                </Label>
                <Input
                  id="bairro"
                  placeholder="Nome do bairro"
                  value={formData.bairro}
                  onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade" className="text-gray-900 dark:text-white">
                  Cidade *
                </Label>
                <Input
                  id="cidade"
                  placeholder="Nome da cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado" className="text-gray-900 dark:text-white">
                  UF *
                </Label>
                <Select 
                  value={formData.estado} 
                  onValueChange={(value) => setFormData({ ...formData, estado: value })}
                >
                  <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. SEÇÃO CONDICIONAL: DADOS DO RESPONSÁVEL (QUANDO MENOR) */}
        {isMenor && (
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10">
            <Collapsible open={showResponsavel} onOpenChange={setShowResponsavel}>
              <CardHeader>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between cursor-pointer">
                    <CardTitle className="text-lg text-blue-900 dark:text-blue-400 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      4. Dados do Responsável Legal *
                    </CardTitle>
                    {showResponsavel ? (
                      <ChevronUp className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-blue-900 dark:text-blue-400" />
                    )}
                  </div>
                </CollapsibleTrigger>
              </CardHeader>

              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">
                      Grau de Parentesco *
                    </Label>
                    <RadioGroup 
                      value={formData.grauParentesco} 
                      onValueChange={(value) => setFormData({ ...formData, grauParentesco: value })}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pai" id="pai" />
                        <Label htmlFor="pai" className="cursor-pointer text-gray-900 dark:text-white">
                          Pai
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mae" id="mae" />
                        <Label htmlFor="mae" className="cursor-pointer text-gray-900 dark:text-white">
                          Mãe
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outro" id="outro" />
                        <Label htmlFor="outro" className="cursor-pointer text-gray-900 dark:text-white">
                          Outro - Qual?
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.grauParentesco === 'outro' && (
                    <div className="space-y-2">
                      <Label htmlFor="outroParentesco" className="text-gray-900 dark:text-white">
                        Especifique o Parentesco *
                      </Label>
                      <Input
                        id="outroParentesco"
                        placeholder="Ex: Avô, Tio, Tutor"
                        value={formData.outroParentesco}
                        onChange={(e) => setFormData({ ...formData, outroParentesco: e.target.value })}
                        className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeResponsavel" className="text-gray-900 dark:text-white">
                        Nome Completo do Responsável *
                      </Label>
                      <Input
                        id="nomeResponsavel"
                        placeholder="Nome completo"
                        value={formData.nomeResponsavel}
                        onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })}
                        className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpfResponsavel" className="text-gray-900 dark:text-white">
                        CPF do Responsável *
                      </Label>
                      <Input
                        id="cpfResponsavel"
                        placeholder="000.000.000-00"
                        value={formData.cpfResponsavel}
                        onChange={handleCPFResponsavelChange}
                        className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataNascimentoResponsavel" className="text-gray-900 dark:text-white">
                        Data de Nascimento *
                      </Label>
                      <Input
                        id="dataNascimentoResponsavel"
                        type="date"
                        value={formData.dataNascimentoResponsavel}
                        onChange={(e) => setFormData({ ...formData, dataNascimentoResponsavel: e.target.value })}
                        className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idadeResponsavel" className="text-gray-900 dark:text-white">
                        Idade
                      </Label>
                      <Input
                        id="idadeResponsavel"
                        value={formData.idadeResponsavel ? `${formData.idadeResponsavel} anos` : ''}
                        className="border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-[#0f1b16] text-gray-900 dark:text-white"
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900 dark:text-white">
                        Sexo *
                      </Label>
                      <RadioGroup 
                        value={formData.sexoResponsavel} 
                        onValueChange={(value) => setFormData({ ...formData, sexoResponsavel: value })}
                        className="flex gap-4 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="feminino" id="feminino-resp" />
                          <Label htmlFor="feminino-resp" className="cursor-pointer text-gray-900 dark:text-white">
                            Feminino
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="masculino" id="masculino-resp" />
                          <Label htmlFor="masculino-resp" className="cursor-pointer text-gray-900 dark:text-white">
                            Masculino
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enderecoResponsavel" className="text-gray-900 dark:text-white">
                      Endereço do Responsável (Opcional)
                    </Label>
                    <Input
                      id="enderecoResponsavel"
                      placeholder="Se vazio, assume o endereço do paciente"
                      value={formData.enderecoResponsavel}
                      onChange={(e) => setFormData({ ...formData, enderecoResponsavel: e.target.value })}
                      className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidadeResponsavel" className="text-gray-900 dark:text-white">
                        Cidade (Opcional)
                      </Label>
                      <Input
                        id="cidadeResponsavel"
                        placeholder="Nome da cidade"
                        value={formData.cidadeResponsavel}
                        onChange={(e) => setFormData({ ...formData, cidadeResponsavel: e.target.value })}
                        className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estadoResponsavel" className="text-gray-900 dark:text-white">
                        UF (Opcional)
                      </Label>
                      <Select 
                        value={formData.estadoResponsavel} 
                        onValueChange={(value) => setFormData({ ...formData, estadoResponsavel: value })}
                      >
                        <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600">
                          {estados.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Botões de ação fixos no rodapé */}
        <Card className="sticky bottom-0 z-10 shadow-lg">
          <CardContent className="py-4">
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onVoltar}
                className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-[#244738] hover:bg-[#356b52] text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Finalizar Cadastro Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}