import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import svgPaths from '../../imports/svg-aljdcenn2';

interface LoginPageProps {
  onLoginSuccess: (user: { email: string; nome: string; perfil: string }) => void;
  onEsqueciSenha: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function LoginPage({ onLoginSuccess, onEsqueciSenha, darkMode, onToggleDarkMode }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Credenciais mockadas para demonstração
  const usuariosValidos = [
    {
      email: 'admin',
      senha: '1234',
      nome: 'Ana Recepcionista',
      perfil: 'recepcionista'
    },
    {
      email: 'admin@clinica.com',
      senha: '1234',
      nome: 'Ana Recepcionista',
      perfil: 'recepcionista'
    },
    {
      email: 'especialista@clinica.com',
      senha: '1234',
      nome: 'Dr. Carlos Mendes',
      perfil: 'especialista'
    },
    {
      email: 'paciente@email.com',
      senha: '1234',
      nome: 'Maria Silva',
      perfil: 'paciente'
    },
    {
      email: 'gestor@clinica.com',
      senha: '1234',
      nome: 'Roberto Almeida',
      perfil: 'gestor-unidade'
    },
    {
      email: 'gestora@clinica.com',
      senha: '1234',
      nome: 'Patricia Santos',
      perfil: 'gestor-matriz'
    },
    {
      email: 'sysadmin@clinica.com',
      senha: '1234',
      nome: 'Tech Admin',
      perfil: 'administrador'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.email || !formData.senha) {
      toast.error('Preencha todos os campos');
      return;
    }

    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      // Verificar credenciais
      const usuarioEncontrado = usuariosValidos.find(
        user => user.email === formData.email && user.senha === formData.senha
      );

      if (usuarioEncontrado) {
        toast.success(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
        onLoginSuccess({
          email: usuarioEncontrado.email,
          nome: usuarioEncontrado.nome,
          perfil: usuarioEncontrado.perfil
        });
      } else {
        toast.error('Email ou senha incorretos');
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#d4f1e8] via-[#d4ebe8] to-[#c8e6e6] dark:from-[#0a1612] dark:via-[#0d1915] dark:to-[#0f1e1a] flex items-center justify-center transition-colors">
      {/* Botão Dark Mode - Canto superior direito */}
      <button
        onClick={onToggleDarkMode}
        className="absolute top-6 right-6 bg-white dark:bg-[#1a2e27] border border-gray-200 dark:border-gray-600 rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-[46px] h-[46px] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#12211c] transition-colors"
      >
        {darkMode ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.67" className="text-gray-900 dark:text-white" />
            <path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.93 3.93l1.41 1.41m9.32 9.32l1.41 1.41M16.07 3.93l-1.41 1.41M5.34 14.66l-1.41 1.41" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" className="text-gray-900 dark:text-white" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
            <path d="M17 10.5A7 7 0 1 1 9.5 3a5.5 5.5 0 0 0 7.5 7.5z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white" />
          </svg>
        )}
      </button>

      {/* Container do Form */}
      <div className="bg-white dark:bg-[#1a2e27] rounded-[14px] border border-gray-100 dark:border-gray-700 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[420px] px-[33px] pt-[33px] pb-[34px] transition-colors">
        {/* Logo + Heading */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-[#244738] rounded-[10px] w-8 h-8 flex items-center justify-center">
              <span className="text-white text-lg font-bold font-['Arial']">I</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-950 dark:text-white font-['Arial'] transition-colors">
              Integrallys
            </h1>
          </div>
          <p className="text-sm text-[#6a7282] dark:text-gray-400 text-center font-['Arial'] transition-colors">
            Faça login para acessar sua conta
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-0 relative">
          {/* Campo E-mail */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm text-[#364153] dark:text-gray-300 font-['Arial'] transition-colors">
              E-mail
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
                className="w-full h-[44px] bg-white dark:bg-[#12211c] border border-[#d1d5dc] dark:border-gray-600 rounded-[10px] pl-[44px] pr-4 text-sm text-gray-900 dark:text-white placeholder:text-[#717182] dark:placeholder:text-gray-500 font-['Arial'] focus:outline-none focus:ring-2 focus:ring-[#244738] focus:border-transparent transition-colors disabled:opacity-50"
                required
              />
              {/* Ícone de Email */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p24d83580} stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.pd919a80} stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-sm text-[#364153] dark:text-gray-300 font-['Arial'] transition-colors">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                disabled={isLoading}
                className="w-full h-[44px] bg-white dark:bg-[#12211c] border border-[#d1d5dc] dark:border-gray-600 rounded-[10px] px-[44px] text-sm text-gray-900 dark:text-white placeholder:text-[#717182] dark:placeholder:text-gray-500 font-['Arial'] focus:outline-none focus:ring-2 focus:ring-[#244738] focus:border-transparent transition-colors disabled:opacity-50"
                required
              />
              {/* Ícone de Cadeado */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p2566d000} stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  <path d={svgPaths.p1bf79e00} stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
              {/* Botão de Mostrar/Ocultar Senha */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 hover:opacity-70 transition-opacity disabled:opacity-50"
              >
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                  {showPassword ? (
                    /* Olho Aberto - Eye */
                    <>
                      <path d="M1.66666 10C1.66666 10 4.16666 4.16669 10 4.16669C15.8333 4.16669 18.3333 10 18.3333 10C18.3333 10 15.8333 15.8334 10 15.8334C4.16666 15.8334 1.66666 10 1.66666 10Z" stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <circle cx="10" cy="10" r="2.5" stroke="#717182" strokeWidth="1.66667" />
                    </>
                  ) : (
                    /* Olho Fechado - Eye Off */
                    <>
                      <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.6373 10 16.6667C4.16666 16.6667 1.66666 10.8334 1.66666 10.8334C2.51094 9.19072 3.65628 7.72953 5.04999 6.53335M8.25 5.13335C8.82379 4.98844 9.41094 4.91537 10 4.91669C15.8333 4.91669 18.3333 10.75 18.3333 10.75C17.9286 11.5524 17.4488 12.3136 16.9 13.0234M11.7667 11.7667C11.5378 12.0123 11.2617 12.2093 10.9548 12.3459C10.6478 12.4826 10.3164 12.556 9.98045 12.562C9.64451 12.5679 9.31058 12.5062 8.99918 12.3803C8.68778 12.2545 8.40504 12.0671 8.16785 11.8299C7.93066 11.5927 7.74331 11.31 7.61744 10.9986C7.49157 10.6872 7.42989 10.3532 7.43585 10.0173C7.4418 9.68134 7.51526 9.34996 7.65192 9.04301C7.78859 8.73605 7.9856 8.45996 8.23124 8.23102" stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d="M1.66666 1.66669L18.3333 18.3334" stroke="#717182" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Link Esqueci minha senha */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={onEsqueciSenha}
              disabled={isLoading}
              className="text-sm text-[#244738] dark:text-[#10b981] font-['Arial'] hover:underline transition-colors disabled:opacity-50"
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] bg-[#244738] hover:bg-[#356b52] dark:bg-[#244738] dark:hover:bg-[#356b52] rounded-[10px] text-white text-base font-['Arial'] flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}