import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { Camera, X, Upload } from 'lucide-react';

interface EditarPacienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: any;
}

export function EditarPacienteModal({ open, onOpenChange, paciente }: EditarPacienteModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    planoSaude: '',
    numeroCarteirinha: '',
    origemIndicacao: '',
    observacoes: '',
    status: 'ativo',
    statusCadastro: 'completo'
  });

  const [foto, setFoto] = useState<string | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const planosSaude = [
    'Bradesco Saúde',
    'Amil',
    'SulAmérica',
    'Unimed',
    'NotreDame Intermédica',
    'Hapvida',
    'Particular'
  ];
  
  const origensIndicacao = [
    'Google',
    'Redes Sociais',
    'Indicação de Paciente',
    'Indicação de Médico',
    'Plano de Saúde',
    'Outdoor/Panfleto',
    'Outro'
  ];
  
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  useEffect(() => {
    if (paciente && open) {
      setFormData({
        nome: paciente.nome || '',
        email: paciente.email || '',
        telefone: paciente.telefone || '',
        cpf: paciente.cpf || '',
        dataNascimento: paciente.dataNascimento || '',
        cep: paciente.cep || '',
        rua: paciente.rua || '',
        numero: paciente.numero || '',
        complemento: paciente.complemento || '',
        bairro: paciente.bairro || '',
        cidade: paciente.cidade || '',
        estado: paciente.estado || '',
        planoSaude: paciente.planoSaude || '',
        numeroCarteirinha: paciente.numeroCarteirinha || '',
        origemIndicacao: paciente.origemIndicacao || '',
        observacoes: paciente.observacoes || '',
        status: paciente.status || 'ativo',
        statusCadastro: paciente.statusCadastro || 'completo'
      });
      setFoto(paciente.foto || null);
    }
  }, [paciente, open]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setShowWebcam(true);
      
      setTimeout(() => {
        const video = document.getElementById('webcam-edit') as HTMLVideoElement;
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
    const video = document.getElementById('webcam-edit') as HTMLVideoElement;
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
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simular atualização
    toast.success('Paciente atualizado com sucesso!');
    onOpenChange(false);
  };

  if (!paciente) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-nested">
        <DialogHeader>
          <DialogTitle>Editar Paciente</DialogTitle>
          <DialogDescription>
            Atualize as informações do paciente
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Dados Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Nome completo do paciente"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planoSaude">Plano de Saúde</Label>
                <Select 
                  value={formData.planoSaude} 
                  onValueChange={(value) => setFormData({ ...formData, planoSaude: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {planosSaude.map((plano) => (
                      <SelectItem key={plano} value={plano}>
                        {plano}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.planoSaude && formData.planoSaude !== 'Particular' && (
              <div className="space-y-2">
                <Label htmlFor="numeroCarteirinha">Número da Carteirinha</Label>
                <Input
                  id="numeroCarteirinha"
                  placeholder="Número da carteirinha do plano"
                  value={formData.numeroCarteirinha}
                  onChange={(e) => setFormData({ ...formData, numeroCarteirinha: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="origemIndicacao">Origem da Indicação</Label>
              <Select 
                value={formData.origemIndicacao} 
                onValueChange={(value) => setFormData({ ...formData, origemIndicacao: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>
                <SelectContent>
                  {origensIndicacao.map((origem) => (
                    <SelectItem key={origem} value={origem}>
                      {origem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Input
                id="observacoes"
                placeholder="Observações adicionais"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              />
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Endereço</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rua">Rua</Label>
                <Input
                  id="rua"
                  placeholder="Nome da rua"
                  value={formData.rua}
                  onChange={(e) => setFormData({ ...formData, rua: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  placeholder="Número da residência"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                  id="complemento"
                  placeholder="Complemento do endereço"
                  value={formData.complemento}
                  onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  placeholder="Nome do bairro"
                  value={formData.bairro}
                  onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Nome da cidade"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select 
                  value={formData.estado} 
                  onValueChange={(value) => setFormData({ ...formData, estado: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="statusCadastro">Status do Cadastro</Label>
                <Select 
                  value={formData.statusCadastro} 
                  onValueChange={(value) => setFormData({ ...formData, statusCadastro: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completo">Completo</SelectItem>
                    <SelectItem value="incompleto">Incompleto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Foto */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Foto</h3>
            
            <div className="space-y-2">
              <Label>Foto do Paciente</Label>
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
                      id="webcam-edit"
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
                        className="flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        {foto ? 'Atualizar Foto' : 'Capturar Foto'}
                      </Button>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="uploadFotoEdit"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('uploadFotoEdit')?.click()}
                        className="flex items-center gap-2"
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
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}