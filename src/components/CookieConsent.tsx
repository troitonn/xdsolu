import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CookieConsentProps {
  onOpenPrivacy?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  const [isVisible, setIsVisible] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // always true
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('xd_cookies_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('xd_cookies_consent', JSON.stringify({ status: 'accepted', ...preferences }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('xd_cookies_consent', JSON.stringify({ status: 'custom', ...preferences }));
    setShowAdvancedModal(false);
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem('xd_cookies_consent', 'closed');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        id="cookie-consent-banner"
        role="region"
        aria-label={isEn ? 'Cookie Notice' : (isEs ? 'Aviso de Cookies' : 'Aviso de Cookies')}
        className="fixed bottom-0 left-0 right-0 w-full z-50 animate-fade-in bg-white border-t border-slate-200/90 shadow-2xl py-6 px-6 sm:px-12 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12 pr-8 lg:pr-12">
          {/* Main descriptive text */}
          <div className="flex-1">
            <p className="text-[14px] sm:text-[14.5px] text-slate-900 leading-[1.6] max-w-[1020px] font-normal">
              {isEn ? (
                <>
                  We use cookies to enable the proper functioning and security of our websites and to offer the best experience possible. By clicking &quot;Accept&quot;, you agree to the use of cookies for analytics and advertising. You can change your cookie settings at any time. For more information, read our{' '}
                </>
              ) : isEs ? (
                <>
                  Utilizamos cookies para permitir el correcto funcionamiento y la seguridad de nuestros sitios y ofrecer la mejor experiencia posible. Al hacer clic en &quot;Aceptar&quot;, acepta el uso de estas cookies para publicidad y análisis. Puede cambiar su configuración en cualquier momento. Para más información, lea nuestra{' '}
                </>
              ) : (
                <>
                  Usamos cookies para permitir o bom funcionamento e a segurança dos nossos sites e para oferecer a melhor experiência possível. Ao clicar em &quot;Aceitar&quot;, você concorda com o uso desses cookies para publicidade e análises. Você pode alterar suas configurações de cookies a qualquer momento. Para mais informações, leia a nossa{' '}
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  if (onOpenPrivacy) {
                    onOpenPrivacy();
                  } else {
                    setShowAdvancedModal(true);
                  }
                }}
                className="underline hover:text-[#A3192E] transition-colors cursor-pointer text-slate-900 font-normal inline"
              >
                {isEn ? 'Cookie Policy' : (isEs ? 'Política de Cookies' : 'Política de Cookies')}
              </button>
              .
            </p>
          </div>

          {/* Action buttons: Avançado > and Aceitar */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
            <button
              id="cookie-btn-advanced"
              type="button"
              onClick={() => setShowAdvancedModal(true)}
              className="inline-flex items-center gap-1 text-[14.5px] text-slate-900 hover:text-[#A3192E] font-normal transition-colors cursor-pointer group"
            >
              <span className="underline group-hover:no-underline">
                {isEn ? 'Preferences' : (isEs ? 'Avanzado' : 'Avançado')}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-800 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="cookie-btn-accept"
              type="button"
              onClick={handleAccept}
              className="px-8 py-2.5 rounded-full border border-slate-900 bg-white hover:bg-slate-900 text-slate-900 hover:text-white text-[14.5px] font-normal transition-all duration-200 cursor-pointer shadow-xs"
            >
              {isEn ? 'Accept' : (isEs ? 'Aceptar' : 'Aceitar')}
            </button>
          </div>

          {/* Top-right close X button */}
          <button
            id="cookie-btn-close"
            type="button"
            onClick={handleClose}
            className="absolute top-0 right-0 sm:-top-1 sm:right-0 p-1.5 text-slate-800 hover:text-slate-950 transition-colors cursor-pointer"
            aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Advanced Settings Modal */}
      {showAdvancedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAdvancedModal(false)}
        >
          <div
            className="relative w-full max-w-[620px] bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAdvancedModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-[22px] font-normal text-slate-900 mb-2">
              {isEn ? 'Cookie & Privacy Settings' : (isEs ? 'Configuración de Cookies y Privacidad' : 'Configurações de Cookies & Privacidade')}
            </h3>
            <p className="text-[13.5px] text-slate-600 mb-6 leading-relaxed">
              {isEn 
                ? 'Customize which cookie categories you authorize during your navigation on XD Capital.'
                : (isEs 
                  ? 'Personalice qué categorías de cookies autoriza para su navegación en XD Capital.'
                  : 'Personalize quais categorias de cookies você autoriza para a sua navegação na XD Capital.')}
            </p>

            <div className="space-y-4 mb-8">
              {/* Essenciais */}
              <div className="p-4 rounded-[16px] bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[14.5px] font-normal text-slate-900 flex items-center gap-2">
                    <span>{isEn ? 'Necessary / Security Cookies' : (isEs ? 'Cookies Necesarios / Seguridad' : 'Cookies Necessários / Segurança')}</span>
                    <span className="text-[11px] font-mono text-[#A3192E] bg-[#A3192E]/10 px-2 py-0.5 rounded-full">
                      {isEn ? 'Always Active' : (isEs ? 'Siempre Activo' : 'Sempre Ativo')}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                    {isEn 
                      ? 'Essential for session integrity, secure authentication, and Internet Banking access.'
                      : (isEs 
                        ? 'Esenciales para la integridad de sesión, autenticación segura y acceso al portal.'
                        : 'Essenciais para a integridade da sessão, autenticação segura e navegação no Internet Banking.')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 rounded text-slate-400 mt-1 cursor-not-allowed"
                />
              </div>

              {/* Analíticos */}
              <div className="p-4 rounded-[16px] bg-white border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[14.5px] font-normal text-slate-900">
                    {isEn ? 'Performance & Analytics Cookies' : (isEs ? 'Cookies de Rendimiento y Análisis' : 'Cookies de Desempenho e Análise')}
                  </div>
                  <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                    {isEn 
                      ? 'Help us measure traffic and improve page performance and user experience.'
                      : (isEs 
                        ? 'Nos ayudan a medir el tráfico y mejorar la velocidad de las páginas.'
                        : 'Nos ajudam a medir o tráfego e melhorar a usabilidade e velocidade das páginas.')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 rounded text-[#A3192E] border-slate-300 focus:ring-[#A3192E] mt-1 cursor-pointer"
                />
              </div>

              {/* Publicidade */}
              <div className="p-4 rounded-[16px] bg-white border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[14.5px] font-normal text-slate-900">
                    {isEn ? 'Advertising & Partner Cookies' : (isEs ? 'Cookies de Publicidad y Socios' : 'Cookies de Publicidade & Parcerias')}
                  </div>
                  <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                    {isEn 
                      ? 'Used to present relevant communications and personalized financial services offers.'
                      : (isEs 
                        ? 'Utilizados para presentar comunicaciones relevantes y ofertas de productos.'
                        : 'Utilizados para apresentar comunicações relevantes e ofertas de produtos financeiros.')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 rounded text-[#A3192E] border-slate-300 focus:ring-[#A3192E] mt-1 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAdvancedModal(false)}
                className="px-5 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 text-[13.5px] font-normal transition-colors cursor-pointer"
              >
                {isEn ? 'Cancel' : (isEs ? 'Cancelar' : 'Cancelar')}
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-[#A3192E] text-white text-[13.5px] font-normal transition-colors cursor-pointer shadow-sm"
              >
                {isEn ? 'Save Preferences' : (isEs ? 'Guardar Preferencias' : 'Salvar Preferências')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
