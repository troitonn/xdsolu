import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronRight, X, SlidersHorizontal, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CookieConsentProps {
  onOpenPrivacy?: () => void;
  onOpenLgpd?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy, onOpenLgpd }) => {
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
    // Check consent preference key
    const consent = localStorage.getItem('xd_cookies_consent_v2');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      status: 'accepted',
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('xd_cookies_consent_v2', JSON.stringify(consentData));
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const consentData = {
      status: 'rejected',
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('xd_cookies_consent_v2', JSON.stringify(consentData));
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const consentData = {
      status: 'custom',
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('xd_cookies_consent_v2', JSON.stringify(consentData));
    setShowAdvancedModal(false);
    setIsVisible(false);
  };

  const handleClose = () => {
    handleRejectNonEssential();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Full-width Horizontal Cookie & LGPD Bar */}
      <div
        id="cookie-consent-banner"
        role="region"
        aria-label={isEn ? 'Cookie & LGPD Consent Banner' : (isEs ? 'Aviso de Cookies y LGPD' : 'Aviso de Cookies e LGPD')}
        className="fixed bottom-0 inset-x-0 w-full z-50 animate-fade-in bg-white/98 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] py-4 sm:py-4.5 px-4 sm:px-8 lg:px-12"
      >
        <div className="w-full max-w-[1520px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
          {/* Left / Center content: Badge & LGPD description */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4.5">
            {/* LGPD Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A3192E]/[0.08] border border-[#A3192E]/20 text-[#A3192E] text-[11px] font-mono shrink-0 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A3192E]" />
              <span className="font-medium tracking-wide">LGPD • COOKIES</span>
            </div>

            {/* Explanatory text with direct policy links */}
            <p className="text-[13px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">
              {isEn ? (
                <>
                  We use cookies and similar technologies to ensure platform security and optimize your experience in accordance with the Brazilian General Data Protection Law (LGPD). You can choose to accept all cookies, refuse non-essential ones, or customize your preferences. Learn more in our{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="underline text-slate-900 font-medium hover:text-[#A3192E] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={onOpenLgpd}
                    className="underline text-slate-900 font-medium hover:text-[#A3192E] transition-colors cursor-pointer"
                  >
                    LGPD Portal
                  </button>
                  .
                </>
              ) : isEs ? (
                <>
                  Utilizamos cookies y tecnologías similares para garantizar la seguridad de la plataforma y mejorar su experiencia según la LGPD (Ley General de Protección de Datos). Puede aceptar todas las cookies, rechazar las no esenciales o personalizar sus preferencias. Conozca más en nuestra{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="underline text-slate-900 font-medium hover:text-[#A3192E] transition-colors cursor-pointer"
                  >
                    Política de Privacidad
                  </button>{' '}
                  y el{' '}
                  <button
                    type="button"
                    onClick={onOpenLgpd}
                    className="underline text-slate-900 font-medium hover:text-[#A3192E] transition-colors cursor-pointer"
                  >
                    Portal LGPD
                  </button>
                  .
                </>
              ) : (
                <>
                  Utilizamos cookies e tecnologias semelhantes para assegurar o funcionamento seguro da plataforma e aprimorar a sua experiência, em conformidade com a LGPD (Lei Geral de Proteção de Dados). Você pode aceitar todos os cookies, recusar os não essenciais ou gerenciar suas preferências. Saiba mais em nossa{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="underline text-slate-900 font-medium hover:text-[#A3192E] transition-colors cursor-pointer"
                  >
                    Política de Privacidade
                  </button>{' '}
                  e no{' '}
                  <button
                    type="button"
                    onClick={onOpenLgpd}
                    className="underline text-slate-900 font-medium hover:text-[#A3192E] transition-colors cursor-pointer"
                  >
                    Portal LGPD
                  </button>
                  .
                </>
              )}
            </p>
          </div>

          {/* Right side: Action buttons (Preferências, Recusar, Aceitar) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto justify-end flex-wrap sm:flex-nowrap">
            {/* Preferences trigger */}
            <button
              id="cookie-btn-preferences"
              type="button"
              onClick={() => setShowAdvancedModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-normal transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isEn ? 'Preferences' : (isEs ? 'Preferencias' : 'Preferências')}</span>
            </button>

            {/* Recusar / Refuse Non-Essential Button */}
            <button
              id="cookie-btn-reject"
              type="button"
              onClick={handleRejectNonEssential}
              className="px-4.5 sm:px-5 py-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-[13px] font-medium transition-all cursor-pointer shadow-2xs"
            >
              {isEn ? 'Refuse Non-Essential' : (isEs ? 'Rechazar' : 'Recusar')}
            </button>

            {/* Aceitar / Accept All Button */}
            <button
              id="cookie-btn-accept"
              type="button"
              onClick={handleAcceptAll}
              className="px-5 sm:px-6 py-2 rounded-full bg-[#A3192E] hover:bg-[#8A1224] text-white text-[13px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              {isEn ? 'Accept All' : (isEs ? 'Aceptar Todo' : 'Aceitar Todos')}
            </button>

            {/* Quick close button */}
            <button
              id="cookie-btn-close"
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-1"
              aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
              title={isEn ? 'Close notice' : (isEs ? 'Cerrar aviso' : 'Fechar aviso')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Settings Modal */}
      {showAdvancedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAdvancedModal(false)}
        >
          <div
            className="relative w-full max-w-[620px] bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fade-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAdvancedModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-[20px] sm:text-[22px] font-normal text-slate-900">
                {isEn ? 'Cookie & Privacy Preferences' : (isEs ? 'Preferencias de Cookies y LGPD' : 'Preferências de Cookies & LGPD')}
              </h3>
            </div>
            
            <p className="text-[13.5px] text-slate-600 mb-6 leading-relaxed">
              {isEn 
                ? 'Customize which cookie categories you authorize during your navigation on XD Capital, as provided by the LGPD.'
                : (isEs 
                  ? 'Personalice qué categorías de cookies autoriza para su navegación en XD Capital, en cumplimiento de la LGPD.'
                  : 'Personalize quais categorias de cookies você autoriza durante a sua navegação na XD Capital, em conformidade com a LGPD.')}
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

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 flex-wrap">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-normal transition-colors cursor-pointer"
              >
                {isEn ? 'Reject All Non-Essential' : (isEs ? 'Rechazar No Esenciales' : 'Recusar Não Essenciais')}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-5 py-2 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-[13px] font-medium transition-colors cursor-pointer"
                >
                  {isEn ? 'Save Preferences' : (isEs ? 'Guardar Preferencias' : 'Salvar Preferências')}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2 rounded-full bg-[#A3192E] hover:bg-[#8A1224] text-white text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
                >
                  {isEn ? 'Accept All' : (isEs ? 'Aceptar Todo' : 'Aceitar Todos')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
