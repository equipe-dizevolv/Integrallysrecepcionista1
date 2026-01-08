import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';
import { FileText, Plus, X, GripVertical } from 'lucide-react';

interface NovoModeloModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CampoModelo {
  id: string;
  tipo: string;
  label: string;
  obrigatorio: boolean;
  placeholder?: string;
  opcoes?: string[];
}

export function NovoModeloModal({ open, onOpenChange }: NovoModeloModalProps) {
  const [formData, setFormData] = useState({
    nome: '',
    finalidade: '',
    categoria: '',
    especialidade: '',
    observacoes: ''
  });

  const [campos, setCampos] = useState<CampoModelo[]>([]);
  const [showAddCampo, setShowAddCampo] = useState(false);
  const [novoCampo, setNovoCampo] = useState({
    tipo: 'texto_curto',
    label: '',
    obrigatorio: false,
    placeholder: '',
    opcoes: ''
  });

  const categorias = [
    'Consulta Inicial',
    'Consulta de Retorno',
    'Avaliação Pré-Operatória',
    'Retorno Pós-Operatório',
    'Avaliação Funcional',
    'Exame Clínico',
    'Outros'
  ];

  const especialidades = [
    'Cardiologia',
    'Ortopedia',
    'Neurologia',
    'Pediatria',
    'Ginecologia',
    'Dermatologia',
    'Psiquiatria',
    'Clínica Geral',
    'Outras'
  ];

  const tiposCampo = [
    { value: 'texto_extenso', label: 'Texto Livre Extenso', descricao: 'Para Diagnose, Queixa Principal e Observações' },
    { value: 'texto_curto', label: 'Texto Curto (Input)', descricao: 'Para dados objetivos como Pressão Arterial, Peso, Altura' },
    { value: 'numerico', label: 'Numérico (Medida)', descricao: 'Para dados quantitativos (Bioimpedância, medidas)' },
    { value: 'sim_nao', label: 'Sim/Não (Binário)', descricao: 'Para Históricos (Tabagismo, Atividade Física, Estresse)' },
    { value: 'data', label: 'Data (Calendário)', descricao: 'Para registrar datas de sintomas ou exames' },
    { value: 'select', label: 'Seleção (Dropdown)', descricao: 'Para escolher uma opção de uma lista' },
    { value: 'multipla_escolha', label: 'Múltipla Escolha', descricao: 'Para selecionar várias opções simultaneamente' }
  ];

  const handleAdicionarCampo = () => {
    if (!novoCampo.label.trim()) {
      toast.error('Digite o nome do campo');
      return;
    }

    if ((novoCampo.tipo === 'select' || novoCampo.tipo === 'multipla_escolha') && !novoCampo.opcoes.trim()) {
      toast.error('Digite as opções separadas por vírgula');
      return;
    }

    const campo: CampoModelo = {
      id: `campo_${Date.now()}`,
      tipo: novoCampo.tipo,
      label: novoCampo.label,
      obrigatorio: novoCampo.obrigatorio,
      placeholder: novoCampo.placeholder,
      opcoes: (novoCampo.tipo === 'select' || novoCampo.tipo === 'multipla_escolha') 
        ? novoCampo.opcoes.split(',').map(o => o.trim()).filter(Boolean)
        : undefined
    };

    setCampos([...campos, campo]);
    setNovoCampo({
      tipo: 'texto_curto',
      label: '',
      obrigatorio: false,
      placeholder: '',
      opcoes: ''
    });
    setShowAddCampo(false);
    toast.success('Campo adicionado');
  };

  const handleRemoverCampo = (id: string) => {
    setCampos(campos.filter(c => c.id !== id));
    toast.info('Campo removido');
  };

  const getTipoLabel = (tipo: string) => {
    return tiposCampo.find(t => t.value === tipo)?.label || tipo;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim()) {
      toast.error('Digite o nome do modelo');
      return;
    }

    if (!formData.categoria) {
      toast.error('Selecione a categoria');
      return;
    }

    if (!formData.especialidade) {
      toast.error('Selecione a especialidade');
      return;
    }

    if (campos.length === 0) {
      toast.error('Adicione pelo menos um campo ao modelo');
      return;
    }

    toast.success('Modelo de prontuário criado com sucesso!', {
      description: `${campos.length} campo(s) adicionado(s)`
    });

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      finalidade: '',
      categoria: '',
      especialidade: '',
      observacoes: ''
    });
    setCampos([]);
    setShowAddCampo(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#244738]" />
            Novo Modelo de Prontuário
          </DialogTitle>
          <DialogDescription>
            Crie um modelo reutilizável para agilizar o preenchimento de prontuários
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Modelo *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Consulta Inicial - Cardiologia"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <Select 
                  value={formData.categoria} 
                  onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="especialidade">Especialidade *</Label>
                <Select 
                  value={formData.especialidade} 
                  onValueChange={(value) => setFormData({ ...formData, especialidade: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {especialidades.map((esp) => (
                      <SelectItem key={esp} value={esp}>
                        {esp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finalidade">Finalidade</Label>
                <Input
                  id="finalidade"
                  placeholder="Ex: Primeira consulta cardiológica"
                  value={formData.finalidade}
                  onChange={(e) => setFormData({ ...formData, finalidade: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Observações sobre o uso deste modelo..."
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <Separator />

          {/* Campos do Modelo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Campos do Modelo
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {campos.length} campo(s) adicionado(s)
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => setShowAddCampo(true)}
                className="bg-[#244738] hover:bg-[#356b52] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Campo
              </Button>
            </div>

            {/* Lista de Campos */}
            {campos.length > 0 && (
              <div className="space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                {campos.map((campo, index) => (
                  <div
                    key={campo.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg group"
                  >
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {index + 1}. {campo.label}
                        </span>
                        {campo.obrigatorio && (
                          <Badge variant="secondary" className="text-xs">
                            Obrigatório
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Tipo: {getTipoLabel(campo.tipo)}
                        </span>
                        {campo.opcoes && (
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            Opções: {campo.opcoes.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoverCampo(campo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 dark:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Adicionar Novo Campo */}
            {showAddCampo && (
              <div className="border-2 border-dashed border-[#244738] dark:border-green-600 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Novo Campo</h4>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowAddCampo(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Campo *</Label>
                    <Input
                      placeholder="Ex: Pressão Arterial"
                      value={novoCampo.label}
                      onChange={(e) => setNovoCampo({ ...novoCampo, label: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Campo *</Label>
                    <Select 
                      value={novoCampo.tipo} 
                      onValueChange={(value) => setNovoCampo({ ...novoCampo, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposCampo.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(novoCampo.tipo === 'texto_curto' || novoCampo.tipo === 'numerico') && (
                  <div className="space-y-2">
                    <Label>Texto de Ajuda (Placeholder)</Label>
                    <Input
                      placeholder="Ex: Digite a pressão arterial"
                      value={novoCampo.placeholder}
                      onChange={(e) => setNovoCampo({ ...novoCampo, placeholder: e.target.value })}
                    />
                  </div>
                )}

                {(novoCampo.tipo === 'select' || novoCampo.tipo === 'multipla_escolha') && (
                  <div className="space-y-2">
                    <Label>Opções (separadas por vírgula) *</Label>
                    <Input
                      placeholder="Ex: Normal, Elevado, Muito Alto"
                      value={novoCampo.opcoes}
                      onChange={(e) => setNovoCampo({ ...novoCampo, opcoes: e.target.value })}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="obrigatorio"
                    checked={novoCampo.obrigatorio}
                    onChange={(e) => setNovoCampo({ ...novoCampo, obrigatorio: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="obrigatorio" className="cursor-pointer">
                    Campo obrigatório
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleAdicionarCampo}
                    className="bg-[#244738] hover:bg-[#356b52] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddCampo(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-[#244738] hover:bg-[#356b52] text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Criar Modelo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}