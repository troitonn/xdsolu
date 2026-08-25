import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import heroBgImage from '../assets/images/hero_executive_bg_1786929423273.jpg';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenContact: (subject?: string) => void;
  onOpenOpenAccount: () => void;
  onNavigateContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenOpenAccount,
  onNavigateContact,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-label="Apresentação Institucional"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 flex items-center bg-[#FAFAFC] overflow-hidden"
    >
      {/* Background Image Container with Dynamic Positioning */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src={heroBgImage}
          alt="Executiva XD Capital"
          className="w-full h-full object-cover object-[72%_35%] sm:object-[78%_center] lg:object-[82%_center] scale-[1.02] transform transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />

        {/* Sophisticated Harmonic Gradient Overlays */}
        {/* Horizontal blend: Solid soft background on left transitioning gracefully before the face */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFC] via-[#FAFAFC]/95 via-35% md:via-50% to-[#FAFAFC]/30 lg:to-transparent" />

        {/* Subtle vertical blend for navbar and bottom transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFC]/80 via-transparent to-[#FAFAFC]" />

        {/* Ambient Wine/Crimson Glow Accent */}
        <div
          className="absolute -top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#A3192E] opacity-[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[10%] left-[25%] w-[420px] h-[420px] rounded-full bg-[#7A0F28] opacity-[0.04] blur-[100px]"
          aria-hidden="true"
        />

        {/* Fine architectural grid texture */}
        <div className="absolute inset-0 bg-grid opacity-40 mix-blend-multiply" />
      </div>

      {/* Main Content Area - Left-Aligned to preserve portrait visibility */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 w-full">
        <div className="max-w-[650px] text-left flex flex-col items-start">
          {/* H1 Headline */}
          <h1 className="hero-h1 text-[#0B0F19] tracking-[-0.035em] leading-[1.05] mb-6 text-left drop-shadow-sm">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="body-text text-left text-[16.5px] sm:text-[18px] md:text-[19px] leading-[1.65] text-slate-700 mb-8 max-w-[580px]">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
            {/* Abrir conta de pagamento */}
            <button
              id="hero-btn-open-account"
              onClick={onOpenOpenAccount}
              className="btn-primary text-[15px] !py-3.5 !px-7 cursor-pointer shadow-md"
            >
              <span>{t('hero.btnOpenAccount')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Fale com a gente */}
            <button
              id="hero-btn-contact"
              onClick={onNavigateContact}
              className="btn-secondary bg-white/90 backdrop-blur-md text-[15px] !py-3.5 !px-6 cursor-pointer"
            >
              <span>{t('hero.btnContact')}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Trust Micro-Row with Glass Backdrop */}
          <div className="pt-6 border-t border-slate-200/90 w-full flex flex-wrap items-center gap-y-2.5 gap-x-6 sm:gap-x-8 text-[13.5px] text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
              <span className="font-normal text-slate-800">{t('hero.trust72h')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A3192E] shrink-0" />
              <span className="font-normal text-slate-800">{t('hero.trustSecurity')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
              <span className="font-normal text-slate-800">{t('hero.trustService')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
