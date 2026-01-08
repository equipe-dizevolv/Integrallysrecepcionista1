import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/auth/LoginPage';
import { EsqueciSenhaPage } from './components/auth/EsqueciSenhaPage';
import { Moon, Sun, Bell } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { NotificacoesDrawer } from './components/NotificacoesDrawer';
import { UserSwitcher } from './components/UserSwitcher';
import { User, AVAILABLE_USERS } from './types/user';
import { MENU_BY_ROLE } from './config/menus';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showEsqueciSenha, setShowEsqueciSenha] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotificacoesDrawer, setShowNotificacoesDrawer] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check if user is already logged in (persisted session)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLoginSuccess = (userData: { email: string; nome: string; perfil: string }) => {
    // Mapear perfil para o usuário correspondente
    const user = AVAILABLE_USERS.find(u => u.role === userData.perfil) || AVAILABLE_USERS[0];
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Salvar sessão
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleUserChange = (user: User) => {
    setCurrentUser(user);
    setCurrentSection('dashboard');
    
    // Atualizar sessão
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    toast.success(`Visualizando como ${user.name} (${user.roleLabel})`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentSection('dashboard');
    
    // Limpar sessão
    localStorage.removeItem('currentUser');
    
    toast.success('Logout realizado com sucesso!');
  };

  // Se não estiver autenticado, mostrar tela de login ou recuperação de senha
  if (!isAuthenticated) {
    if (showEsqueciSenha) {
      return (
        <EsqueciSenhaPage 
          onVoltar={() => setShowEsqueciSenha(false)}
        />
      );
    }
    
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onEsqueciSenha={() => setShowEsqueciSenha(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  // Se não houver usuário (não deveria acontecer), fazer logout
  if (!currentUser) {
    handleLogout();
    return null;
  }

  // Menu dinâmico baseado no papel do usuário
  const menuItems = MENU_BY_ROLE[currentUser.role];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white dark:bg-[#12211c] border-r border-gray-200 dark:border-gray-600 flex flex-col">
        {/* Logo - BrandBar com altura fixa de 64px */}
        <div className="h-16 flex items-center px-4 py-3 border-b border-gray-200 dark:border-[#1F2D27]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#244738] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">I</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Integrallys</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentSection(item.id)}
                    className={`w-full h-10 flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                      isActive 
                        ? 'bg-[#244738] text-white font-semibold' 
                        : 'text-[#273029] dark:text-[#EAF1ED] hover:bg-[#F2F4F5] dark:hover:bg-[#2A2F2C]'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - TopBar com altura fixa de 64px */}
        <header className="h-16 bg-white dark:bg-[#12211c] border-b border-[#E6E6E6] dark:border-[#1F2D27] px-4 py-3 flex items-center flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {menuItems.find(item => item.id === currentSection)?.label || 'Início'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Botão de Notificações */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotificacoesDrawer(true)}
                className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-[#1a2e27] relative"
              >
                <Bell size={16} className="stroke-[1.5]" />
                {notifications.length > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 bg-red-500 hover:bg-red-500 text-white text-xs flex items-center justify-center"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>

              {/* Toggle Dark Mode */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-9 h-9 p-0 hover:bg-gray-100 dark:hover:bg-[#1a2e27]"
              >
                {darkMode ? <Sun size={16} className="stroke-[1.5]" /> : <Moon size={16} className="stroke-[1.5]" />}
              </Button>
              
              {/* User Switcher */}
              <UserSwitcher 
                currentUser={currentUser} 
                onUserChange={handleUserChange}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Dashboard 
            currentSection={currentSection} 
            onNavigate={setCurrentSection}
            notifications={notifications}
            onNotificationsChange={setNotifications}
            userRole={currentUser.role}
          />
        </main>
      </div>

      {/* Drawer de Notificações */}
      <NotificacoesDrawer
        open={showNotificacoesDrawer}
        onOpenChange={setShowNotificacoesDrawer}
        notifications={notifications}
        onReenviar={(notificationId) => {
          // Atualizar status para 'enviado' novamente
          setNotifications(prev => 
            prev.map(n => 
              n.id === notificationId 
                ? { ...n, timestamp: new Date().toISOString(), status: 'enviado' }
                : n
            )
          );
        }}
        onCancelar={(notificationId) => {
          // Remover notificação
          setNotifications(prev => prev.filter(n => n.id !== notificationId));
        }}
      />
    </div>
  );
}