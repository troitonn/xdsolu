import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STEPS_BY_LANG } from '../data/content';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { language, t } = useLanguage();
  const processSteps = PROCESS_STEPS_BY_LANG[language] || PROCESS_STEPS_BY_LANG['pt'];
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Auto-progress through all 4 steps when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Execute smooth automatic progression to step 4 (100%)
  useEffect(() => {
    if (!hasStarted) return;

    // Initial state: Step 0
    setActiveStep(0);
    setProgress(0);

    const timer1 = setTimeout(() => {
      setProgress(0.33);
      setActiveStep(1);
    }, 700);

    const timer2 = setTimeout(() => {
      setProgress(0.66);
      setActiveStep(2);
    }, 1600);

    const timer3 = setTimeout(() => {
      setProgress(1.0);
      setActiveStep(3);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [hasStarted]);

  return (
    <section
      ref={sectionRef}
      id="processo"
      aria-label="Processo de Operação"
      className="py-24 md:py-36 bg-[#FAFAFC] border-t border-slate-200/80 relative"
    >
      <div className="max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-[760px] mb-14 md:mb-20">
          <div className="eyebrow-label mb-3">{t('process.eyebrow')}</div>
          <h2 className="section-h2 text-[#0B0F19] mb-5">
            {t('process.title')}
          </h2>
          <p className="body-text text-[17px] max-w-[620px] text-slate-600">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Desktop Process with Horizontal Dynamic Line */}
        <div className="relative hidden lg:block">
          {/* Background Connecting Line (connecting centers of 4 nodes) */}
          <div className="absolute top-[38px] left-[12.5%] right-[12.5%] h-[2px] bg-slate-200 z-0" />
          
          {/* Active Red Progress Line - Smoothly animates to 100% */}
          <div
            className="absolute top-[38px] left-[12.5%] h-[2px] bg-gradient-to-r from-[#A3192E] via-[#8B1424] to-[#7A0F28] transition-all duration-700 ease-out z-0"
            style={{ width: `${progress * 75}%` }}
          />

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {processSteps.map((step, idx) => {
              const isPastOrCurrent = idx <= activeStep;
              return (
                <div
                  key={step.number}
                  onClick={() => {
                    setActiveStep(idx);
                    setProgress(idx / (processSteps.length - 1));
                  }}
                  className="flex flex-col group cursor-pointer"
                >
                  {/* Step Node Icon */}
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-[76px] h-[76px] rounded-[18px] border flex items-center justify-center transition-all duration-500 ${
                        isPastOrCurrent
                          ? 'bg-white border-[#A3192E] text-slate-900 shadow-md shadow-[#A3192E]/10 ring-2 ring-[#A3192E]/20 scale-100'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span className={`font-mono text-[18px] transition-colors duration-300 ${
                        isPastOrCurrent ? 'font-semibold text-slate-900' : 'font-normal text-slate-400'
                      }`}>
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-[19px] font-normal tracking-[-0.01em] mb-2 transition-colors duration-300 ${
                    isPastOrCurrent ? 'text-slate-900 font-medium' : 'text-slate-700'
                  }`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14.5px] leading-relaxed text-slate-600 mb-4">
                    {step.description}
                  </p>

                  {/* Deliverable Badge */}
                  <div className="mt-auto">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-mono px-2.5 py-1 rounded-[8px] transition-all duration-300 ${
                      isPastOrCurrent 
                        ? 'text-slate-900 bg-white border border-[#A3192E]/30 shadow-xs' 
                        : 'text-slate-600 bg-slate-50 border border-slate-200'
                    }`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isPastOrCurrent ? 'text-[#A3192E]' : 'text-slate-400'}`} />
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Process Vertical Timeline */}
        <div className="lg:hidden relative pl-6 border-l-2 border-slate-200 space-y-10">
          {processSteps.map((step, idx) => {
            const isPastOrCurrent = idx <= activeStep;
            return (
              <div key={step.number} className="relative group">
                {/* Vertical node marker */}
                <div className={`absolute -left-[33px] top-0 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-[12px] font-mono transition-all duration-500 shadow-sm ${
                  isPastOrCurrent ? 'border-[#A3192E] text-slate-900 ring-2 ring-[#A3192E]/20' : 'border-slate-300 text-slate-400'
                }`}>
                  {step.number}
                </div>

                <div className={`bg-white border rounded-[18px] p-5 shadow-sm transition-all duration-300 ${
                  isPastOrCurrent ? 'border-[#A3192E]/30' : 'border-slate-200'
                }`}>
                  <h3 className="text-[18px] font-normal text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11.5px] font-mono text-[#A3192E] bg-[#A3192E]/[0.08] border border-[#A3192E]/20 px-2 py-0.5 rounded font-normal">
                    {step.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

