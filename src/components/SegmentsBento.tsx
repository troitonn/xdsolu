import React from 'react';
import { SEGMENTS_DATA_BY_LANG } from '../data/content';
import { Building2, Store, Wheat, Factory, Briefcase, Landmark, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SegmentsBentoProps {
  onOpenContact?: (segment: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-[#A3192E]" />,
  Store: <Store className="w-6 h-6 text-[#A3192E]" />,
  Wheat: <Wheat className="w-6 h-6 text-[#A3192E]" />,
  Factory: <Factory className="w-6 h-6 text-[#A3192E]" />,
  Briefcase: <Briefcase className="w-6 h-6 text-[#A3192E]" />,
  Landmark: <Landmark className="w-6 h-6 text-[#A3192E]" />
};

export const SegmentsBento: React.FC<SegmentsBentoProps> = () => {
  const { language, t } = useLanguage();
  const segmentsData = SEGMENTS_DATA_BY_LANG[language] || SEGMENTS_DATA_BY_LANG['pt'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      id="segmentos"
      aria-label="Segmentos de Mercado"
      className="py-24 md:py-36 bg-[#FAFAFC] border-t border-slate-200/80 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-[760px] mb-12 md:mb-16">
          <div className="eyebrow-label mb-3">{t('segments.eyebrow')}</div>
          <h2 className="section-h2 text-[#0B0F19] mb-5">
            {t('segments.title')}
          </h2>
          <p className="body-text text-[17px] max-w-[620px] text-slate-600">
            {t('segments.subtitle')}
          </p>
        </div>

        {/* Uniform 6-Card Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segmentsData.map((item) => {
            return (
              <div
                key={item.id}
                onMouseMove={handleMouseMove}
                className="spotlight-card rounded-[20px] p-7 md:p-8 flex flex-col justify-start group select-none cursor-default transition-all duration-300 bg-white border border-slate-200/90 shadow-xs hover:border-[#A3192E]/40 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-[14px] bg-slate-50 border border-slate-200/90 flex items-center justify-center text-[#A3192E] group-hover:bg-[#A3192E] group-hover:text-white group-hover:border-[#A3192E] group-hover:shadow-md group-hover:shadow-[#A3192E]/15 transition-all duration-300 shadow-2xs">
                    {iconMap[item.iconName] ? (
                      <div className="[&>svg]:text-current [&>svg]:w-5 [&>svg]:h-5">
                        {iconMap[item.iconName]}
                      </div>
                    ) : (
                      <Shield className="w-5 h-5" />
                    )}
                  </div>

                  <span className="text-[11.5px] font-mono uppercase tracking-wider text-[#A3192E] font-normal bg-[#A3192E]/[0.07] border border-[#A3192E]/20 px-2.5 py-1 rounded">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] font-normal text-[#0B0F19] tracking-[-0.02em] leading-snug mb-3 group-hover:text-[#A3192E] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-slate-600 font-normal group-hover:text-slate-700 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


