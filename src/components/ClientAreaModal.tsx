import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, ArrowUpRight, KeyRound, Building2, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ClientAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientAreaModal: React.FC<ClientAreaModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  const [authType, setAuthType] = useState<'portal' | 'conta' | 'certificado'>('portal');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setAuthSuccess(false);
    onClose();
  };

  return (
    <div
      id="client-area-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="client-area-card"
        className="relative w-full max-w-[500px] bg-white border border-slate-200 rounded-[24px] p-7 sm:p-9 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
        >
          <X className="w-5 h-5" />
        </button>

        {authSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#A3192E]/10 border border-[#A3192E] flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-[#A3192E]" />
            </div>
            <h3 className="text-[22px] font-normal text-slate-900 mb-2">
              {isEn ? 'Authentication Completed' : (isEs ? 'Autenticación Completada' : 'Autenticação Concluída')}
            </h3>
            <p className="text-[14.5px] text-slate-600 mb-6 max-w-[340px]">
              {isEn 
                ? 'Securely redirecting to the authenticated Fidúcia SCM transactional portal (Bacen 382)...'
                : (isEs 
                  ? 'Redirigiendo de forma segura al entorno transaccional autenticado Fidúcia SCM (Bacen 382)...'
                  : 'Redirecionando com segurança para o ambiente transacional autenticado Fidúcia SCM (Bacen 382)...')}
            </p>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-6">
              <div className="bg-[#A3192E] h-full animate-pulse w-full" />
            </div>
            <button onClick={handleReset} className="btn-secondary text-[14px]">
              {isEn ? 'Complete Access' : (isEs ? 'Completar Acceso' : 'Concluir Acesso')}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#A3192E] font-mono text-[11px] font-normal mb-2">
              <Lock className="w-3.5 h-3.5" />
              {isEn ? 'ENCRYPTED CORPORATE ENVIRONMENT' : (isEs ? 'ENTORNO CORPORATIVO CIFRADO' : 'AMBIENTE CORPORATIVO CRIPTOGRAFADO')}
            </div>
            <h3 className="text-[22px] sm:text-[24px] font-normal text-slate-900 tracking-[-0.02em] mb-1">
              {isEn ? 'XD Client Portal' : (isEs ? 'Área del Cliente XD' : 'Área do Cliente XD')}
            </h3>
            <p className="text-[13.5px] text-slate-600 mb-6">
              {isEn 
                ? 'Access contracts pipeline, receivables advance status, and statements.'
                : (isEs 
                  ? 'Acceda a contratos, posiciones de anticipación y extractos.'
                  : 'Acesse a esteira de contratos, posições de antecipação e extrato.')}
            </p>

            {/* Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-[14px] mb-6">
              <button
                type="button"
                onClick={() => setAuthType('portal')}
                className={`py-2 text-[12px] font-normal rounded-[10px] transition-all cursor-pointer ${
                  authType === 'portal'
                    ? 'bg-white text-[#0B0F19] shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isEn ? 'Receivables' : (isEs ? 'Cobranzas' : 'Recebíveis')}
              </button>
              <button
                type="button"
                onClick={() => setAuthType('conta')}
                className={`py-2 text-[12px] font-normal rounded-[10px] transition-all cursor-pointer ${
                  authType === 'conta'
                    ? 'bg-white text-[#0B0F19] shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isEn ? 'Corp Account' : (isEs ? 'Cuenta PJ' : 'Conta PJ')}
              </button>
              <button
                type="button"
                onClick={() => setAuthType('certificado')}
                className={`py-2 text-[12px] font-normal rounded-[10px] transition-all cursor-pointer ${
                  authType === 'certificado'
                    ? 'bg-white text-[#0B0F19] shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                e-CNPJ
              </button>
            </div>

            {authType === 'certificado' ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-6 h-6 text-[#A3192E]" />
                </div>
                <h4 className="text-[16px] font-normal text-slate-900 mb-2">
                  {isEn ? 'Digital Certificate Authentication' : (isEs ? 'Autenticación mediante Certificado Digital' : 'Autenticação via Certificado Digital')}
                </h4>
                <p className="text-[13px] text-slate-600 mb-6">
                  {isEn 
                    ? 'Connect your A3 token or select your A1 certificate installed in the browser.'
                    : (isEs 
                      ? 'Conecte su token A3 o seleccione su certificado A1 instalado en el navegador.'
                      : 'Conecte seu token A3 ou selecione seu certificado A1 instalado no navegador.')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthenticating(true);
                    setTimeout(() => {
                      setIsAuthenticating(false);
                      setAuthSuccess(true);
                    }, 1000);
                  }}
                  className="w-full btn-primary justify-center text-[14px]"
                >
                  {isAuthenticating 
                    ? (isEn ? 'Reading Certificate...' : (isEs ? 'Leyendo Certificado...' : 'Lendo Certificado...')) 
                    : (isEn ? 'Select Digital Certificate' : (isEs ? 'Seleccionar Certificado Digital' : 'Selecionar Certificado Digital'))}
                </button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-normal text-slate-700 mb-1">
                    {isEn ? 'Company Tax ID / CNPJ' : (isEs ? 'CNPJ de la Empresa' : 'CNPJ da Empresa')}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="00.000.000/0001-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white font-mono transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[12px] font-normal text-slate-700">
                      {isEn ? 'Access Password' : (isEs ? 'Contraseña de Acceso' : 'Senha de Acesso')}
                    </label>
                    <a href="#contato" onClick={onClose} className="text-[11px] text-[#A3192E] hover:underline font-normal">
                      {isEn ? 'Forgot password' : (isEs ? 'Olvidé mi contraseña' : 'Esqueci a senha')}
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full btn-primary justify-center text-[14.5px] !py-3 cursor-pointer"
                  >
                    {isAuthenticating ? (
                      <span>{isEn ? 'Validating credentials...' : (isEs ? 'Validando credenciales...' : 'Validando credenciais...')}</span>
                    ) : (
                      <>
                        <span>{isEn ? 'Access Portal' : (isEs ? 'Acceder al Panel' : 'Acessar Painel')}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-500">
              <span>{isEn ? 'First access?' : (isEs ? '¿Primer acceso?' : 'Primeiro acesso?')}</span>
              <a
                href="#contato"
                onClick={onClose}
                className="text-[#A3192E] font-normal hover:underline"
              >
                {isEn ? 'Request credentials' : (isEs ? 'Solicitar credenciales' : 'Solicitar credenciais')}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
