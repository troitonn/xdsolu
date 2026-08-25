import React from 'react';
import { SEGMENTS_DATA_BY_LANG } from '../data/content';
import { Building2, Store, Wheat, Factory, Briefcase, Landmark, ArrowUpRight, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SegmentsBentoProps {
  onOpenContact: (segment: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-[#A3192E]" />,
  Store: <Store className="w-6 h-6 text-[#A3192E]" />,
  Wheat: <Wheat className="w-6 h-6 text-[#A3192E]" />,
  Factory: <Factory className="w-6 h-6 text-[#A3192E]" />,
  Briefcase: <Briefcase className="w-6 h-6 text-[#A3192E]" />,
  Landmark: <Landmark className="w-6 h-6 text-[#A3192E]" />
};

export const SegmentsBento: React.FC<SegmentsBentoProps> = ({ onOpenContact }) => {
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {segmentsData.map((item) => {
            const isFeatured = item.featured;
            return (
              <div
                key={item.id}
                onMouseMove={handleMouseMove}
                onClick={() => onOpenContact(`Segmento: ${item.title}`)}
                className={`spotlight-card rounded-[22px] p-7 md:p-8 flex flex-col justify-between group cursor-pointer transition-all duration-300 bg-white border border-slate-200/90 shadow-md hover:border-[#A3192E]/40 hover:shadow-xl ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 ring-1 ring-[#A3192E]/20'
                    : ''
                }`}
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-[14px] bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-[#A3192E]/40 group-hover:bg-[#A3192E]/[0.08] transition-colors shadow-xs">
                      {iconMap[item.iconName] || <Shield className="w-6 h-6 text-[#A3192E]" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3192E] font-normal bg-[#A3192E]/[0.08] border border-[#A3192E]/20 px-2.5 py-1 rounded">
                        {item.tag}
                      </span>
                      {item.metrics && (
                        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-normal">
                          {item.metrics}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`font-normal text-[#0B0F19] tracking-[-0.02em] mb-3 group-hover:text-[#A3192E] transition-colors ${
                    isFeatured ? 'text-[24px] sm:text-[28px]' : 'text-[20px] sm:text-[22px]'
                  }`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="body-text text-[15px] sm:text-[16px] leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                {/* Bottom link indicator */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[13.5px] font-normal text-slate-600 group-hover:text-[#A3192E] transition-colors">
                  <span>{t('segments.cta')}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#A3192E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

