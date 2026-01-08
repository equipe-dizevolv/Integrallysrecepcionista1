import { LogOut, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User } from '../types/user';

interface UserSwitcherProps {
  currentUser: User;
  onUserChange: (user: User) => void;
  onLogout?: () => void;
}

export function UserSwitcher({ currentUser, onLogout }: UserSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-3 hover:bg-gray-100 dark:hover:bg-[#1a2e27]">
          <div className="w-8 h-8 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-[#244738] dark:text-[#10b981]">
              {currentUser.initials}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentUser.roleLabel}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-white dark:bg-[#1a2e27] border-gray-200 dark:border-gray-600"
      >
        <DropdownMenuLabel className="text-gray-900 dark:text-white">
          Minha Conta
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
        
        {/* Informações do usuário atual */}
        <div className="px-2 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#244738]/10 dark:bg-[#10b981]/10 rounded-full flex items-center justify-center">
              <span className="text-base font-medium text-[#244738] dark:text-[#10b981]">
                {currentUser.initials}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentUser.roleLabel}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
        
        {/* Opção de Sair */}
        {onLogout && (
          <DropdownMenuItem
            onClick={onLogout}
            className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
          >
            <div className="flex items-center gap-2 w-full">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sair</span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
