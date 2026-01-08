import { DashboardSection } from './dashboard/DashboardSection';
import { AgendaSection } from './agenda/AgendaSection';
import { PacientesSection } from './pacientes/PacientesSection';
import { PagamentosSection } from './pagamentos/PagamentosSection';
import { PrescricoesSection } from './prescricoes/PrescricoesSection';
import { RelatoriosSection } from './relatorios/RelatoriosSection';
import { ConfiguracoesSection } from './configuracoes/ConfiguracoesSection';
import { ListaEsperaSection } from './lista-espera/ListaEsperaSection';
import { ProntuarioSection } from './especialista/ProntuarioSection';
import { EvolucoesSection } from './especialista/EvolucoesSection';
import { EstoqueSection } from './especialista/EstoqueSection';
import { EquipeSection } from './gestor-unidade/EquipeSection';
import { VendasSection } from './gestor-unidade/VendasSection';
import { FinanceiroSection } from './gestor-unidade/FinanceiroSection';
import { UnidadesSection } from './gestor-matriz/UnidadesSection';
import { EquipesSection } from './gestor-matriz/EquipesSection';
import { ProdutosSection } from './gestor-matriz/ProdutosSection';
import { UsuariosSection } from './administrador/UsuariosSection';
import { PermissoesSection } from './administrador/PermissoesSection';
import { CaixaSection } from './caixa/CaixaSection';
import { UserRole } from '../types/user';

interface DashboardProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  notifications?: any[];
  onNotificationsChange?: (notifications: any[]) => void;
  userRole: UserRole;
}

export function Dashboard({ currentSection, onNavigate, notifications = [], onNotificationsChange, userRole }: DashboardProps) {
  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardSection onNavigate={onNavigate} userRole={userRole} />;
      case 'agenda':
        return <AgendaSection notifications={notifications} onNotificationsChange={onNotificationsChange} />;
      case 'pacientes':
        return <PacientesSection />;
      case 'recebimentos':
      case 'pagamentos':
        return <PagamentosSection />;
      case 'lista-espera':
        return <ListaEsperaSection />;
      case 'prescricoes':
        return <PrescricoesSection userRole={userRole} />;
      case 'prontuario':
        return <ProntuarioSection userRole={userRole} />;
      case 'evolucoes':
        return <EvolucoesSection />;
      case 'estoque':
        return <EstoqueSection />;
      case 'equipe':
        return <EquipeSection />;
      case 'vendas':
        return <VendasSection />;
      case 'financeiro':
        return <FinanceiroSection />;
      case 'unidades':
        return <UnidadesSection />;
      case 'equipes':
        return <EquipesSection />;
      case 'produtos':
        return <ProdutosSection />;
      case 'usuarios':
        return <UsuariosSection />;
      case 'permissoes':
        return <PermissoesSection />;
      case 'relatorios':
        return <RelatoriosSection userRole={userRole} />;
      case 'configuracoes':
        return <ConfiguracoesSection />;
      case 'caixa':
        return <CaixaSection />;
      default:
        return <DashboardSection onNavigate={onNavigate} userRole={userRole} />;
    }
  };

  return (
    <div className="p-6 overflow-hidden" key={currentSection}>
      {renderSection()}
    </div>
  );
}