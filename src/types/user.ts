export type UserRole = 
  | 'recepcionista' 
  | 'especialista' 
  | 'paciente' 
  | 'gestor-unidade' 
  | 'gestor-matriz' 
  | 'administrador';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
}

export const AVAILABLE_USERS: User[] = [
  {
    id: '1',
    name: 'Ana Maria',
    email: 'ana.maria@integrallys.com',
    role: 'recepcionista',
    roleLabel: 'Recepcionista',
    initials: 'AM'
  },
  {
    id: '2',
    name: 'Camila Santos',
    email: 'camila.santos@integrallys.com',
    role: 'especialista',
    roleLabel: 'Especialista Clínico',
    initials: 'CS'
  },
  {
    id: '3',
    name: 'Maria Silva',
    email: 'maria.silva@integrallys.com',
    role: 'paciente',
    roleLabel: 'Paciente',
    initials: 'MS'
  },
  {
    id: '4',
    name: 'João Pereira',
    email: 'joao.pereira@integrallys.com',
    role: 'gestor-unidade',
    roleLabel: 'Gestor da Unidade',
    initials: 'JP'
  },
  {
    id: '5',
    name: 'Ana Souza',
    email: 'ana.souza@integrallys.com',
    role: 'gestor-matriz',
    roleLabel: 'Gestora da Matriz',
    initials: 'AS'
  },
  {
    id: '6',
    name: 'Bruno Rocha',
    email: 'bruno.rocha@integrallys.com',
    role: 'administrador',
    roleLabel: 'Administrador do Sistema',
    initials: 'BR'
  }
];