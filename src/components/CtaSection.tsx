import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  onOpenContact: (subject: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <section
      id="contato"
      aria-label="Chamada para Ação"
      className="relative py-28 md:py-40 bg-white border-t border-slate-200/80 overflow-hidden bg-grid"
    >
      {/* Radial Brand Gradient in background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(163, 25, 46, 0.06), transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-[880px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="eyebrow-label mb-4 tracking-[0.18em]">
          {t('cta.eyebrow')}
        </div>

        {/* H2 Headline */}
        <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-normal text-[#0B0F19] tracking-[-0.035em] leading-[1.08] mb-6">
          {t('cta.title')}
        </h2>

        {/* Subtitle */}
        <p className="body-text text-[17px] md:text-[18.5px] max-w-[620px] mx-auto text-slate-600 leading-relaxed mb-10">
          {t('cta.subtitle')}
        </p>

        {/* Action Button - Centered */}
        <div className="flex items-center justify-center">
          <button
            id="cta-final-btn"
            onClick={() => onOpenContact('Solicitação de Estruturação - CTA Final')}
            className="btn-primary text-[15.5px] !py-4 !px-9 w-full sm:w-auto cursor-pointer"
          >
            <span>{t('cta.button')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Safety Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[12.5px] text-slate-500 font-normal">
          <ShieldCheck className="w-4 h-4 text-[#A3192E]" />
          <span>{isEn ? "Regulated and Secure Infrastructure" : (isEs ? "Infraestructura Regulada y Segura" : "Infraestrutura Segura e Regulada")}</span>
        </div>
      </div>
    </section>
  );
};

