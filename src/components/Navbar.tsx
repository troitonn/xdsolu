import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  Lock,
  ExternalLink,
  Globe,
  Check,
} from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { AppView } from '../App';
import xdLogo from '../assets/images/xd-logo.png';

interface NavbarProps {
  onOpenContact: (subject?: string) => void;
  onOpenOpenAccount: () => void;
  onNavigateHome: () => void;
  onNavigateView: (view: AppView) => void;
  onSelectSolution?: (solutionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenOpenAccount,
  onNavigateHome,
  onNavigateView,
  onSelectSolution,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t } = useLanguage();

  const INTERNET_BANKING_URL = 'https://ib.xdcapital.com.br/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const navItems = [
    {
      label: t('nav.contaDigital') || 'Conta Digital',
      solutionId: 'conta-pj',
      type: 'solution' as const,
    },
    {
      label: t('nav.credito') || 'Crédito',
      solutionId: 'credito-corporativo',
      type: 'solution' as const,
    },
    {
      label: t('nav.maquininha') || 'Maquininha',
      href: '#xd-pay',
      type: 'anchor' as const,
    },
    {
      label: t('nav.quemSomos') || 'Quem somos',
      view: 'sobre-a-xd' as AppView,
      type: 'view' as const,
    },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-sm shadow-slate-900/[0.04]'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between">

          {/* Logo XD Capital */}
          <button
            onClick={onNavigateHome}
            id="brand-logo"
            className="group flex items-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[#A3192E] rounded-md cursor-pointer"
            aria-label="XD Capital - Início"
          >
          <img
            src={xdLogo}
            alt="XD Capital"
            className="h-10 md:h-11 w-auto object-contain"
          />
          </button>

          {/* Center Links */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-8"
            aria-label="Navegação Principal"
          >
            {navItems.map((item) => {
              if (item.type === 'view') {
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigateView(item.view)}
                    className="nav-link text-[14.5px] font-normal py-1 text-slate-700 hover:text-[#0B0F19] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              }

              if (item.type === 'solution') {
                return (
                  <a
                    key={item.label}
                    href="#solucoes"
                    onClick={(e) => {
                      e.preventDefault();

                      onNavigateHome();
                      onSelectSolution?.(item.solutionId);

                      const el = document.getElementById('solucoes');

                      if (el) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="nav-link text-[14.5px] font-normal py-1 text-slate-700 hover:text-[#0B0F19] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onNavigateHome}
                  className="nav-link text-[14.5px] font-normal py-1 text-slate-700 hover:text-[#0B0F19] transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Language Selector */}
            <div
              className="relative"
              ref={langDropdownRef}
            >
              <button
                id="btn-language-selector"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  langMenuOpen
                    ? 'border-slate-800 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-300/80 bg-white/80 text-slate-700 hover:border-slate-400 hover:bg-white hover:text-slate-900'
                }`}
                aria-label="Selecionar idioma"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-4 h-4" />
              </button>

              {langMenuOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <button
                    onClick={() => handleSelectLanguage('pt')}
                    className={`w-full text-left px-4 py-2.5 text-[14.5px] flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer ${
                      language === 'pt'
                        ? 'font-semibold text-slate-900'
                        : 'font-normal text-slate-600'
                    }`}
                  >
                    <span>Português</span>
                    {language === 'pt' && (
                      <Check className="w-4 h-4 text-[#A3192E]" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSelectLanguage('en')}
                    className={`w-full text-left px-4 py-2.5 text-[14.5px] flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer ${
                      language === 'en'
                        ? 'font-semibold text-slate-900'
                        : 'font-normal text-slate-600'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && (
                      <Check className="w-4 h-4 text-[#A3192E]" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSelectLanguage('es')}
                    className={`w-full text-left px-4 py-2.5 text-[14.5px] flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer ${
                      language === 'es'
                        ? 'font-semibold text-slate-900'
                        : 'font-normal text-slate-600'
                    }`}
                  >
                    <span>Español</span>
                    {language === 'es' && (
                      <Check className="w-4 h-4 text-[#A3192E]" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Internet Banking */}
            <a
              id="btn-access-account-nav"
              href={INTERNET_BANKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13.5px] font-normal text-slate-700 hover:text-[#0B0F19] px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />

              <span>
                {t('nav.accessAccount') || 'Acesse sua Conta'}
              </span>

              <ExternalLink className="w-3 h-3 text-slate-400 ml-0.5" />
            </a>

            {/* Abrir minha Conta */}
            <button
              id="btn-open-account-nav"
              onClick={onOpenOpenAccount}
              className="btn-primary text-[13.5px] !py-2.5 !px-5.5 cursor-pointer"
            >
              <span>
                {t('nav.openAccount') || 'Abrir minha Conta'}
              </span>

              <ArrowUpRight className="w-4 h-4 text-white/90" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">

            {/* Mobile Language */}
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="w-9 h-9 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700"
              aria-label="Idioma"
            >
              <Globe className="w-4 h-4" />
            </button>

            {langMenuOpen && (
              <div className="absolute top-16 right-16 w-40 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50">
                <button
                  onClick={() => handleSelectLanguage('pt')}
                  className={`w-full text-left px-4 py-2 text-[14px] ${
                    language === 'pt'
                      ? 'font-bold text-slate-900'
                      : 'text-slate-600'
                  }`}
                >
                  Português
                </button>

                <button
                  onClick={() => handleSelectLanguage('en')}
                  className={`w-full text-left px-4 py-2 text-[14px] ${
                    language === 'en'
                      ? 'font-bold text-slate-900'
                      : 'text-slate-600'
                  }`}
                >
                  English
                </button>

                <button
                  onClick={() => handleSelectLanguage('es')}
                  className={`w-full text-left px-4 py-2 text-[14px] ${
                    language === 'es'
                      ? 'font-bold text-slate-900'
                      : 'text-slate-600'
                  }`}
                >
                  Español
                </button>
              </div>
            )}

            {/* Mobile - Abrir Conta */}
            <button
              onClick={onOpenOpenAccount}
              className="btn-primary text-[12px] !py-2 !px-3"
              aria-label="Abrir conta de pagamento"
            >
              {t('nav.openAccount') || 'Abra sua Conta'}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0B0F19] rounded-lg border border-slate-200 bg-white focus:outline-none"
              aria-label={
                mobileMenuOpen
                  ? 'Fechar menu'
                  : 'Abrir menu'
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in"
        >
          <div className="flex flex-col space-y-6">

            <div className="text-[11px] uppercase tracking-[0.2em] text-[#A3192E] mb-2">
              {language === 'en'
                ? 'NAVIGATION'
                : language === 'es'
                  ? 'NAVEGACIÓN'
                  : 'NAVEGAÇÃO'}
            </div>

            {navItems.map((item) => {
              if (item.type === 'view') {
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateView(item.view);
                    }}
                    className="text-[22px] tracking-[-0.02em] text-left text-slate-900 hover:text-[#A3192E] transition-colors"
                  >
                    {item.label}
                  </button>
                );
              }

              if (item.type === 'solution') {
                return (
                  <a
                    key={item.label}
                    href="#solucoes"
                    onClick={(e) => {
                      e.preventDefault();

                      setMobileMenuOpen(false);
                      onNavigateHome();
                      onSelectSolution?.(item.solutionId);

                      const el =
                        document.getElementById('solucoes');

                      if (el) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="text-[22px] tracking-[-0.02em] text-slate-900 hover:text-[#A3192E] transition-colors"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateHome();
                  }}
                  className="text-[22px] tracking-[-0.02em] text-slate-900 hover:text-[#A3192E] transition-colors"
                >
                  {item.label}
                </a>
              );
            })}

            {/* Fale com a gente */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact('Fale com a gente - Mobile');
              }}
              className="text-[22px] tracking-[-0.02em] text-left text-slate-900 hover:text-[#A3192E] transition-colors"
            >
              {t('nav.contact') || 'Fale com a gente'}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-3 pt-8 border-t border-slate-200">

            {/* Internet Banking Mobile */}
            <a
              href={INTERNET_BANKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-secondary justify-center py-3.5 text-[15px]"
            >
              <Lock className="w-4 h-4 mr-1 text-slate-500" />

              <span>
                {t('nav.accessAccount') || 'Acesse sua Conta'}
              </span>

              <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400" />
            </a>

            {/* Abrir Conta Mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOpenAccount();
              }}
              className="w-full btn-primary justify-center py-3.5 text-[15px]"
            >
              <span>
                {t('nav.openAccount') || 'Abrir minha Conta'}
              </span>

              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
