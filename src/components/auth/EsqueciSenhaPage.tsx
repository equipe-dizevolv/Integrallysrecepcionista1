import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Mail, Send, CheckCircle2 } from 'lucide-react';

interface EsqueciSenhaPageProps {
  onVoltar: () => void;
}

export function EsqueciSenhaPage({ onVoltar }: EsqueciSenhaPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de email
    if (!email) {
      toast.error('Digite seu e-mail');
      return;
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Digite um e-mail válido');
      return;
    }

    setIsLoading(true);

    // Simular envio de email
    setTimeout(() => {
      setEmailEnviado(true);
      toast.success('E-mail de recuperação enviado com sucesso!');
      setIsLoading(false);
    }, 1500);
  };

  const handleReenviar = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success('E-mail reenviado com sucesso!');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d4f1e8] via-[#d4ebe8] to-[#c8e6e6] dark:from-[#0a1612] dark:via-[#0d1915] dark:to-[#0f1e1a] px-4 transition-colors">
      <div className="w-full max-w-md">
        {/* Botão Voltar */}
        <Button
          variant="ghost"
          onClick={onVoltar}
          className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o login
        </Button>

        {!emailEnviado ? (
          /* Formulário de recuperação */
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#244738] rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Esqueci minha senha
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Digite seu e-mail cadastrado para receber as instruções de recuperação de senha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-white">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2e27] text-gray-900 dark:text-white"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#244738] hover:bg-[#356b52] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar instruções
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Confirmação de envio */
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-600 dark:bg-green-700 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-green-900 dark:text-green-400">
                    E-mail enviado!
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="text-green-800 dark:text-green-300">
                Enviamos as instruções de recuperação para:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white dark:bg-[#1a2e27] border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white break-all">
                  {email}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-green-800 dark:text-green-300">
                  📧 Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </p>
                <p className="text-xs text-green-700 dark:text-green-400">
                  Não se esqueça de verificar a pasta de spam ou lixo eletrônico.
                </p>
              </div>

              <div className="pt-4 border-t border-green-200 dark:border-green-800 space-y-2">
                <p className="text-xs text-green-700 dark:text-green-400">
                  Não recebeu o e-mail?
                </p>
                <Button
                  variant="outline"
                  onClick={handleReenviar}
                  className="w-full border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-green-700 dark:border-green-400 border-t-transparent rounded-full animate-spin mr-2" />
                      Reenviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Reenviar e-mail
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={onVoltar}
                className="w-full border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a2e27]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para o login
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Informações adicionais */}
        {!emailEnviado && (
          <Card className="mt-4 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
            <CardContent className="pt-4">
              <p className="text-sm text-amber-900 dark:text-amber-400 mb-2">
                ℹ️ Sobre a recuperação de senha:
              </p>
              <ul className="space-y-1 text-xs text-amber-800 dark:text-amber-300">
                <li>• O link de recuperação é válido por 24 horas</li>
                <li>• Você receberá um e-mail com instruções detalhadas</li>
                <li>• Se não receber em alguns minutos, verifique o spam</li>
                <li>• Em caso de problemas, contate o suporte técnico</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}