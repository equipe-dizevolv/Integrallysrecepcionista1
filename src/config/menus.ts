import { 
  Home, 
  Calendar, 
  Users, 
  CreditCard, 
  FileText, 
  Building, 
  Settings,
  ClipboardList,
  Stethoscope,
  FileSpreadsheet,
  ShoppingCart,
  Package,
  DollarSign,
  Shield,
  BarChart3,
  UserCog,
  Lock,
  Wallet
} from 'lucide-react';
import { UserRole } from '../types/user';

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

export const MENU_BY_ROLE: Record<UserRole, MenuItem[]> = {
  recepcionista: [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'caixa', label: 'Caixa', icon: Wallet },
    { id: 'recebimentos', label: 'Recebimentos', icon: CreditCard },
    { id: 'prescricoes', label: 'Prescrições', icon: FileText },
    { id: 'estoque', label: 'Estoque', icon: Package },
    { id: 'lista-espera', label: 'Lista de Espera', icon: ClipboardList },
    { id: 'relatorios', label: 'Relatórios', icon: Building },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ],
  especialista: [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'prontuario', label: 'Prontuário', icon: FileText },
    { id: 'prescricoes', label: 'Prescrições', icon: Stethoscope },
    { id: 'evolucoes', label: 'Evoluções Clínicas', icon: FileSpreadsheet },
    { id: 'estoque', label: 'Estoque & Suprimentos', icon: Package },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ],
  paciente: [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'agenda', label: 'Minha Agenda', icon: Calendar },
    { id: 'prescricoes', label: 'Prescrições', icon: FileText },
    { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ],
  'gestor-unidade': [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'equipe', label: 'Equipe', icon: Users },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'vendas', label: 'Vendas', icon: ShoppingCart },
    { id: 'estoque', label: 'Estoque Local', icon: Package },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ],
  'gestor-matriz': [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'unidades', label: 'Unidades', icon: Building },
    { id: 'equipes', label: 'Equipes', icon: Users },
    { id: 'agenda', label: 'Agenda Global', icon: Calendar },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'produtos', label: 'Produtos & Estoque', icon: Package },
    { id: 'vendas', label: 'Vendas', icon: ShoppingCart },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'relatorios', label: 'Relatórios Corporativos', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ],
  administrador: [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'usuarios', label: 'Usuários', icon: UserCog },
    { id: 'permissoes', label: 'Permissões', icon: Lock },
    { id: 'unidades', label: 'Unidades', icon: Building },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ],
};