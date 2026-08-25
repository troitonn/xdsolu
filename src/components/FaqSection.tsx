import React, { useState } from 'react';
import { FAQ_DATA_BY_LANG } from '../data/content';
import { Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FaqSectionProps {
  onOpenContact?: (subject: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language, t } = useLanguage();
  const faqData = FAQ_DATA_BY_LANG[language] || FAQ_DATA_BY_LANG['pt'];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-label="Perguntas Frequentes"
      className="py-24 md:py-36 bg-[#FAFAFC] border-t border-slate-200/80 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): Title & Overview */}
          <div className="lg:col-span-5">
            <div className="eyebrow-label mb-3">{t('faq.eyebrow')}</div>
            <h2 className="section-h2 text-[#0B0F19] mb-5">
              {t('faq.title')}
            </h2>
            <p className="body-text text-[16.5px] leading-relaxed text-slate-600">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Right Column (7 cols): Accordion */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqData.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-5 sm:py-6 transition-colors">
                    <button
                      id={`faq-btn-${idx}`}
                      onClick={() => toggleAccordion(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group cursor-pointer"
                    >
                      <span className={`text-[17px] sm:text-[18px] font-normal tracking-[-0.01em] transition-colors ${
                        isOpen ? 'text-[#A3192E]' : 'text-slate-900 group-hover:text-[#A3192E]'
                      }`}>
                        {item.question}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#A3192E] border-[#A3192E] text-white rotate-45 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-900 shadow-xs'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="body-text text-[15px] sm:text-[15.5px] leading-relaxed text-slate-600 pr-6">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

