import React, { useState } from 'react';
import { FAQ_DATA_BY_LANG } from '../data/content';
import { Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FaqSectionProps {
  onOpenContact?: (subject: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenContact }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language, t, isEn, isEs } = useLanguage();
  const faqData = FAQ_DATA_BY_LANG[language] || FAQ_DATA_BY_LANG['pt'];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-label="Perguntas Frequentes"
      className="py-20 md:py-28 bg-[#FAFAFC] border-t border-slate-200/80 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Top Header Centered */}
        <div className="text-center max-w-[720px] mx-auto mb-12 md:mb-16">
          <div className="eyebrow-label mb-3">{t('faq.eyebrow')}</div>
          <h2 className="section-h2 text-[#0B0F19] mb-4">
            {t('faq.title')}
          </h2>
          <p className="body-text text-[16.5px] leading-relaxed text-slate-600">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* 2-Column Grid: Uma ao lado da outra, depois abaixo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white border rounded-[18px] transition-all duration-200 shadow-xs ${
                  isOpen
                    ? 'border-[#A3192E]/40 shadow-sm ring-1 ring-[#A3192E]/10'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 focus:outline-none group cursor-pointer"
                >
                  <span
                    className={`text-[16px] sm:text-[17px] font-normal tracking-[-0.01em] transition-colors leading-snug ${
                      isOpen ? 'text-[#A3192E] font-medium' : 'text-slate-900 group-hover:text-[#A3192E]'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#A3192E] border-[#A3192E] text-white rotate-45 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-900'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`grid transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-5 sm:pb-6'
                      : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-2 border-t border-slate-100">
                      <p className="body-text text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Note / Contact Action */}
        {onOpenContact && (
          <div className="mt-12 text-center">
            <p className="text-[14.5px] text-slate-600">
              {isEn ? "Still have questions? " : (isEs ? "¿Todavía tiene dudas? " : "Ainda possui dúvidas? ")}
              <button
                onClick={() => onOpenContact('Dúvida Comercial / FAQ')}
                className="text-[#A3192E] font-medium hover:underline cursor-pointer ml-1 inline-flex items-center gap-1"
              >
                <span>{isEn ? "Talk to an specialist" : (isEs ? "Hable con un especialista" : "Fale com um especialista")}</span>
                <span>&rarr;</span>
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

