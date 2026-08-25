import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { SolutionsTabs } from './components/SolutionsTabs';
import { SegmentsBento } from './components/SegmentsBento';
import { ProcessSection } from './components/ProcessSection';
import { PayrollConsignedSection } from './components/PayrollConsignedSection';
import { XdPaySection } from './components/XdPaySection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { OpenAccountModal } from './components/OpenAccountModal';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfUsePage } from './components/TermsOfUsePage';
import { LgpdPage } from './components/LgpdPage';
import { OuvidoriaPage } from './components/OuvidoriaPage';
import { PldFtPage } from './components/PldFtPage';
import { AboutPage } from './components/AboutPage';
import { CookieConsent } from './components/CookieConsent';

export type AppView = 'home' | 'fale-com-a-gente' | 'politica-de-privacidade' | 'termos-de-uso' | 'lgpd' | 'ouvidoria' | 'pld-ft' | 'sobre-a-xd';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [openAccountModalOpen, setOpenAccountModalOpen] = useState(false);
  const [selectedContactSubject, setSelectedContactSubject] = useState('Atendimento Geral');
  const [activeSolutionId, setActiveSolutionId] = useState('setor-publico');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#fale-com-a-gente' || hash === '#fale-conosco') {
        setCurrentView('fale-com-a-gente');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#politica-de-privacidade') {
        setCurrentView('politica-de-privacidade');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#termos-de-uso') {
        setCurrentView('termos-de-uso');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#lgpd') {
        setCurrentView('lgpd');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#ouvidoria') {
        setCurrentView('ouvidoria');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#pld-ft' || hash === '#politica-de-pld-ft') {
        setCurrentView('pld-ft');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#sobre-a-xd' || hash === '#sobre' || hash === '#historia') {
        setCurrentView('sobre-a-xd');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#xd-pay' || hash === '#maquininha') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById('xd-pay');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (hash === '#abra-sua-conta') {
        setOpenAccountModalOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenContact = (subject = 'Atendimento Geral') => {
    setSelectedContactSubject(subject);
    setContactModalOpen(true);
  };

  const handleNavigateView = (view: AppView) => {
    setCurrentView(view);
    if (view === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `#${view}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    handleNavigateView('fale-com-a-gente');
  };

  const handleNavigateHome = () => {
    handleNavigateView('home');
  };

  const handleSelectSolution = (solutionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setActiveSolutionId(solutionId);
    setTimeout(() => {
      const element = document.getElementById('solucoes');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0B0F19] selection:bg-[#A3192E] selection:text-white flex flex-col justify-between">
      {/* NAVBAR */}
      <Navbar
        onOpenContact={handleNavigateContact}
        onOpenOpenAccount={() => setOpenAccountModalOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateView={handleNavigateView}
      />

      <main className="flex-grow">
        {currentView === 'fale-com-a-gente' && (
          <ContactPage
            onBackToHome={handleNavigateHome}
            onOpenAccount={() => setOpenAccountModalOpen(true)}
            onNavigatePrivacy={() => handleNavigateView('politica-de-privacidade')}
            onNavigateView={handleNavigateView}
          />
        )}

        {currentView === 'politica-de-privacidade' && (
          <PrivacyPolicyPage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'termos-de-uso' && (
          <TermsOfUsePage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
            onOpenOpenAccount={() => setOpenAccountModalOpen(true)}
          />
        )}

        {currentView === 'lgpd' && (
          <LgpdPage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'ouvidoria' && (
          <OuvidoriaPage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'pld-ft' && (
          <PldFtPage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'sobre-a-xd' && (
          <AboutPage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
            onOpenOpenAccount={() => setOpenAccountModalOpen(true)}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* HERO */}
            <Hero
              onOpenContact={handleOpenContact}
              onOpenOpenAccount={() => setOpenAccountModalOpen(true)}
              onNavigateContact={handleNavigateContact}
            />

            {/* BARRA DE NÚMEROS */}
            <StatsBar />

            {/* SOLUÇÕES: SEÇÃO COM ABAS */}
            <SolutionsTabs
              activeTabId={activeSolutionId}
              onOpenContact={handleNavigateContact}
            />

            {/* SEGMENTOS: BENTO GRID */}
            <SegmentsBento
              onOpenContact={handleNavigateContact}
            />

            {/* COMO FUNCIONA */}
            <ProcessSection />

            {/* FOLHA DE PAGAMENTO E CRÉDITO CONSIGNADO (PÚBLICO E PRIVADO) */}
            <PayrollConsignedSection
              onOpenContact={handleNavigateContact}
            />

            {/* XD PAY: MAQUININHAS & MEIOS DE PAGAMENTO */}
            <XdPaySection
              onOpenContact={handleNavigateContact}
            />

            {/* FAQ */}
            <FaqSection
              onOpenContact={handleNavigateContact}
            />

            {/* CTA FINAL */}
            <CtaSection
              onOpenContact={handleNavigateContact}
            />
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onSelectSolution={handleSelectSolution}
        onOpenContact={handleNavigateContact}
        onNavigateView={handleNavigateView}
      />

      {/* MODAL DE ABERTURA DE CONTA MULTI-STEP (WIZARD) */}
      <OpenAccountModal
        isOpen={openAccountModalOpen}
        onClose={() => setOpenAccountModalOpen(false)}
      />

      {/* MODAL RÁPIDO DE MENSAGEM / CONTATO */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialSubject={selectedContactSubject}
      />

      {/* BANNER FLUTUANTE DE POLÍTICA DE COOKIES & LGPD */}
      <CookieConsent
        onOpenPrivacy={() => handleNavigateView('politica-de-privacidade')}
      />
    </div>
  );
}
