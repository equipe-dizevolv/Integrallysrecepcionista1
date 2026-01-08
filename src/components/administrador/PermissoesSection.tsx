import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function PermissoesSection() {
  const perfis = [
    {
      id: 1,
      nome: 'Administrador',
      descricao: 'Acesso total ao sistema',
      permissoes: ['usuarios', 'configuracoes', 'relatorios', 'financeiro']
    },
    {
      id: 2,
      nome: 'Gestor da Matriz',
      descricao: 'Gestão de todas as unidades',
      permissoes: ['unidades', 'equipes', 'relatorios', 'financeiro']
    },
    {
      id: 3,
      nome: 'Gestor da Unidade',
      descricao: 'Gestão de uma unidade específica',
      permissoes: ['equipe', 'agenda', 'financeiro', 'estoque']
    },
    {
      id: 4,
      nome: 'Especialista',
      descricao: 'Profissional clínico',
      permissoes: ['agenda', 'pacientes', 'prontuario', 'prescricoes']
    },
    {
      id: 5,
      nome: 'Recepcionista',
      descricao: 'Atendimento e agendamento',
      permissoes: ['agenda', 'pacientes', 'recebimentos']
    },
    {
      id: 6,
      nome: 'Paciente',
      descricao: 'Acesso do paciente',
      permissoes: ['agenda', 'prescricoes', 'pagamentos']
    }
  ];

  const handleToggle = (perfil: string, permissao: string, enabled: boolean) => {
    toast.success(`Permissão ${enabled ? 'ativada' : 'desativada'} em tempo real`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Permissões</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gerencie permissões por perfil</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {perfis.map((perfil) => (
          <Card key={perfil.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#244738] dark:text-[#10b981]" />
                </div>
                <div>
                  <CardTitle className="text-base">{perfil.nome}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{perfil.descricao}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {perfil.permissoes.map((perm) => (
                  <div key={perm} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900 dark:text-white capitalize">{perm}</span>
                    <Switch
                      defaultChecked
                      onCheckedChange={(checked) => handleToggle(perfil.nome, perm, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
