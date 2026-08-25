import React, { useState } from 'react';
import { SOLUTIONS_DATA_BY_LANG } from '../data/content';
import { ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SolutionsTabsProps {
  activeTabId?: string;
  onOpenContact: (subject: string) => void;
}

export const SolutionsTabs: React.FC<SolutionsTabsProps> = ({
  activeTabId = 'setor-publico',
  onOpenContact
}) => {
  const { language, t } = useLanguage();
  const solutionsData = SOLUTIONS_DATA_BY_LANG[language] || SOLUTIONS_DATA_BY_LANG['pt'];
  const [selectedId, setSelectedId] = useState<string>(activeTabId);
  const currentTab = solutionsData.find((item) => item.id === selectedId) || solutionsData[0];

  // Spotlight mousemove handler for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      id="solucoes"
      aria-label="Soluções Financeiras Integradas"
      className="py-24 md:py-36 bg-[#FAFAFC] relative"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-[760px] mb-12 md:mb-16">
          <div className="eyebrow-label mb-3">{t('solutions.eyebrow')}</div>
          <h2 className="section-h2 text-[#0B0F19] mb-5">
            {t('solutions.title')}
          </h2>
          <p className="body-text text-[17px] max-w-[620px] text-slate-600">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* Horizontal Tabs Bar / Mobile Carousel */}
        <div
          id="solutions-tabs-bar"
          className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none snap-x snap-mandatory"
          role="tablist"
        >
          {solutionsData.map((tab) => {
            const isActive = tab.id === selectedId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setSelectedId(tab.id)}
                className={`snap-start shrink-0 text-left px-5 py-3.5 rounded-[14px] border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#A3192E] text-slate-900 shadow-md shadow-[#A3192E]/10 ring-1 ring-[#A3192E]/20'
                    : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="font-normal text-[15px] whitespace-nowrap text-slate-900">
                  {tab.tabLabel}
                </div>
                <div className="text-[12px] text-slate-500 whitespace-nowrap font-normal mt-0.5">
                  {tab.tabSub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div
          id={`panel-${currentTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentTab.id}`}
          key={currentTab.id}
          className="bg-white border border-slate-200/90 rounded-[22px] p-7 md:p-12 transition-all duration-500 shadow-xl relative overflow-hidden"
        >
          {/* Subtle background glow inside panel */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A3192E]/[0.03] rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Main Copy & Pills */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[12.5px] text-[#A3192E] font-medium mb-4">
                  <span>{currentTab.tabLabel}</span>
                </div>

                <h3 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal text-[#0B0F19] tracking-[-0.03em] leading-[1.15] mb-5">
                  {currentTab.title}
                </h3>

                <p className="body-text text-[16px] md:text-[17px] text-slate-600 leading-relaxed mb-8">
                  {currentTab.description}
                </p>

                {/* 3 Pills */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {currentTab.pills.map((pill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-normal bg-slate-50 border border-slate-200/90 text-slate-800 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A3192E]" />
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onOpenContact(`Solução: ${currentTab.tabLabel}`)}
                  className="btn-primary text-[14px] cursor-pointer"
                >
                  <span>{t('solutions.cta')} · {currentTab.tabLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Two Interactive Spotlight Subcards */}
            <div className="lg:col-span-6 flex flex-col gap-5 justify-center">
              {currentTab.subcards.map((subcard, idx) => (
                <div
                  key={idx}
                  onMouseMove={handleMouseMove}
                  onClick={() => onOpenContact(`${currentTab.tabLabel} - ${subcard.title}`)}
                  className="spotlight-card rounded-[18px] p-6 sm:p-7 group cursor-pointer bg-[#F8F9FB] border border-slate-200/80 hover:border-[#A3192E]/40 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3192E] font-normal bg-[#A3192E]/[0.08] border border-[#A3192E]/20 px-2.5 py-1 rounded">
                      {subcard.tag || 'Módulo'}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-[#A3192E] group-hover:bg-[#A3192E] transition-all shadow-xs">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h4 className="text-[19px] sm:text-[20px] font-normal text-[#0B0F19] tracking-[-0.02em] mb-2 group-hover:text-[#A3192E] transition-colors">
                    {subcard.title}
                  </h4>

                  <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
                    {subcard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

