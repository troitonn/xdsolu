import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SolutionsTabs } from './components/SolutionsTabs';
import { SegmentsBento } from './components/SegmentsBento';
import { ProcessSection } from './components/ProcessSection';
import { PayrollConsignedSection } from './components/PayrollConsignedSection';
import { XdPaySection } from './components/XdPaySection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { OpenAccountPage } from './components/OpenAccountPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfUsePage } from './components/TermsOfUsePage';
import { LgpdPage } from './components/LgpdPage';
import { CodeOfEthicsPage } from './components/CodeOfEthicsPage';
import { PldFtPage } from './components/PldFtPage';
import { AboutPage } from './components/AboutPage';
import { CookieConsent } from './components/CookieConsent';
import { PartnersPage } from './components/PartnersPage';

export type AppView =
  | 'home'
  | 'politica-de-privacidade'
  | 'termos-de-uso'
  | 'lgpd'
  | 'codigo-de-etica'
  | 'ouvidoria'
  | 'pld-ft'
  | 'sobre-a-xd'
  | 'parceiros'
  | 'abrir-conta';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedContactSubject, setSelectedContactSubject] = useState('Atendimento Geral');
  const [activeSolutionId, setActiveSolutionId] = useState('setor-publico');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (
        hash === '#abrir-conta' ||
        hash === '#abrir-conta-de-pagamento' ||
        hash === '#abra-sua-conta' ||
        hash === '#cadastro' ||
        hash === '#abertura-de-conta'
      ) {
        setCurrentView('abrir-conta');
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
      } else if (hash === '#codigo-de-etica' || hash === '#codigo-etica' || hash === '#ouvidoria') {
        setCurrentView('codigo-de-etica');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#pld-ft' || hash === '#politica-de-pld-ft') {
        setCurrentView('pld-ft');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#sobre-a-xd' || hash === '#sobre' || hash === '#historia') {
        setCurrentView('sobre-a-xd');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#parceiros' || hash === '#seja-um-parceiro') {
        setCurrentView('parceiros');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#xd-pay' || hash === '#maquininha') {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById('xd-pay');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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

  const handleNavigateOpenAccount = () => {
    handleNavigateView('abrir-conta');
  };

  const handleNavigateHome = () => {
    handleNavigateView('home');
  };

  const handleSelectSolution = (solutionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    if (solutionId === 'folha-consignado' || solutionId === 'consignado' || solutionId === 'antecipacao') {
      setTimeout(() => {
        const element = document.getElementById('folha-consignado');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
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
      {/* NAVBAR (Hidden in full-screen onboarding view) */}
      {currentView !== 'abrir-conta' && (
        <Navbar
          onOpenContact={handleOpenContact}
          onOpenOpenAccount={handleNavigateOpenAccount}
          onNavigateHome={handleNavigateHome}
          onNavigateView={handleNavigateView}
          onSelectSolution={handleSelectSolution}
        />
      )}

      <main className="flex-grow">
        {currentView === 'abrir-conta' && (
          <OpenAccountPage
            onBackToHome={handleNavigateHome}
            onNavigateContact={handleOpenContact}
            onNavigateTerms={() => handleNavigateView('termos-de-uso')}
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
            onOpenOpenAccount={handleNavigateOpenAccount}
          />
        )}

        {currentView === 'lgpd' && (
          <LgpdPage
            onBackToHome={handleNavigateHome}
            onOpenContact={handleOpenContact}
          />
        )}

        {(currentView === 'codigo-de-etica' || currentView === 'ouvidoria') && (
          <CodeOfEthicsPage
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
            onOpenOpenAccount={handleNavigateOpenAccount}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* HERO COM INDICADORES INSTITUCIONAIS EMBUTIDOS */}
            <Hero
              onOpenContact={handleOpenContact}
              onOpenOpenAccount={handleNavigateOpenAccount}
            />

            {/* SOLUÇÕES: SEÇÃO COM ABAS */}
            <SolutionsTabs
              activeTabId={activeSolutionId}
              onOpenContact={handleOpenContact}
            />

            {/* SEGMENTOS: BENTO GRID */}
            <SegmentsBento
              onOpenContact={handleOpenContact}
            />

            {/* COMO FUNCIONA */}
            <ProcessSection />

            {/* FOLHA DE PAGAMENTO E CRÉDITO CONSIGNADO (PÚBLICO E PRIVADO) */}
            <PayrollConsignedSection
              onOpenContact={handleOpenContact}
            />

            {/* XD PAY: MAQUININHAS & MEIOS DE PAGAMENTO */}
            <XdPaySection
              onOpenContact={handleOpenContact}
            />

            {/* FAQ */}
            <FaqSection
              onOpenContact={handleOpenContact}
            />

            {/* CTA FINAL */}
            <CtaSection
              onOpenContact={handleOpenContact}
            />
          </>
        )}
      </main>

      {/* FOOTER (Hidden in full-screen onboarding view) */}
      {currentView !== 'abrir-conta' && (
        <Footer
          onSelectSolution={handleSelectSolution}
          onOpenContact={handleOpenContact}
          onNavigateView={handleNavigateView}
        />
      )}

      {/* MODAL RÁPIDO DE MENSAGEM / CONTATO */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialSubject={selectedContactSubject}
      />

      {/* BANNER HORIZONTAL DE POLÍTICA DE COOKIES & LGPD */}
      <CookieConsent
        onOpenPrivacy={() => handleNavigateView('politica-de-privacidade')}
        onOpenLgpd={() => handleNavigateView('lgpd')}
      />
    </div>
  );
}
