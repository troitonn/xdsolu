import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import heroBgImage4k from '../assets/images/hero_executive_4k.webp';
import { useLanguage } from '../context/LanguageContext';
import { StatsBar } from './StatsBar';

interface HeroProps {
  onOpenContact: (subject?: string) => void;
  onOpenOpenAccount: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onOpenOpenAccount,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-label="Apresentação Institucional"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-10 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16 flex flex-col justify-between bg-gradient-to-b from-[#FAFAFC] via-[#FDFDFE] to-[#F5F6FA] overflow-hidden"
    >
      {/* 4K Background Image Container - Balanced Vibrancy & High Fidelity */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Soft Ambient Wine/Crimson Glows */}
        <div
          className="absolute -top-[12%] right-[6%] w-[680px] h-[680px] rounded-full bg-gradient-to-br from-[#A3192E]/[0.06] via-[#C41E3A]/[0.03] to-transparent blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[10%] left-[25%] w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#7A0F28]/[0.04] to-transparent blur-[130px]"
          aria-hidden="true"
        />

        {/* Fine Architectural Grid Texture */}
        <div className="absolute inset-0 bg-grid opacity-20 mix-blend-multiply" />

        <picture>
          <source srcSet={heroBgImage4k} type="image/webp" />
          <img
            src="/hero-bg-4k.png"
            alt="Executiva XD Capital"
            className="w-full h-full object-cover object-[72%_center] sm:object-[78%_center] md:object-[82%_center] lg:object-[88%_center] filter contrast-[1.03] saturate-[1.08] brightness-[1.0] transition-all duration-700"
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Smooth, Broad Left Blend ensuring crystal-clear headline readability without washing out the subject */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFC] via-[#FAFAFC]/95 via-36% md:via-[#FAFAFC]/80 md:via-52% lg:via-[#FAFAFC]/35 lg:via-66% to-transparent pointer-events-none" />

        {/* Minimal top edge transition */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#FAFAFC]/50 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area - Left-Aligned to preserve 4K portrait visibility */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 w-full flex-1 flex flex-col justify-center my-auto py-6 sm:py-8">
        <div className="max-w-[640px] text-left flex flex-col items-start relative z-10">
          {/* H1 Headline */}
          <h1 className="hero-h1 text-[#0B0F19] tracking-[-0.035em] leading-[1.06] mb-6 text-left drop-shadow-xs font-medium">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="body-text text-left text-[16.5px] sm:text-[18px] md:text-[19px] leading-[1.65] text-slate-700 mb-8 max-w-[580px]">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
            {/* Abrir conta de pagamento */}
            <button
              id="hero-btn-open-account"
              onClick={onOpenOpenAccount}
              className="btn-primary text-[15px] !py-3.5 !px-7 cursor-pointer shadow-lg shadow-[#A3192E]/25 hover:shadow-xl hover:shadow-[#A3192E]/35 hover:scale-[1.02] transition-all"
            >
              <span>{t('hero.btnOpenAccount')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Fale com a gente */}
            <button
              id="hero-btn-contact"
              onClick={() => onOpenContact('Atendimento Geral - Início')}
              className="btn-secondary bg-white/95 backdrop-blur-md text-[15px] !py-3.5 !px-6 cursor-pointer border-slate-200/90 shadow-sm hover:border-[#A3192E]/35 hover:text-[#A3192E] hover:scale-[1.02] transition-all"
            >
              <span>{t('hero.btnContact')}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#A3192E]" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores Institucionais (StatsBar) - Imagem do Hero completa abaixo da barra */}
      <div className="relative z-20 w-full mt-6 sm:mt-8">
        <StatsBar />
      </div>
    </section>
  );
};
