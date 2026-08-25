import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Easing function: easeOutQuart
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

interface StatItemProps {
  targetNumber: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subLabel?: string;
  decimals?: number;
}

const StatCounter: React.FC<StatItemProps> = ({
  targetNumber,
  prefix = '',
  suffix = '',
  label,
  subLabel,
  decimals = 0
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const duration = 2200; // ms

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentVal = easedProgress * targetNumber;

            setDisplayValue(currentVal);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber]);

  const formattedNumber = decimals > 0 
    ? displayValue.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.floor(displayValue).toLocaleString('pt-BR');

  return (
    <div
      ref={containerRef}
      className="flex flex-col p-6 md:p-8 lg:p-10 transition-colors hover:bg-white/60"
    >
      <div className="flex items-baseline gap-1 font-normal text-[36px] sm:text-[44px] md:text-[50px] text-[#0B0F19] tracking-[-0.03em] font-tabular leading-none mb-3">
        {prefix && <span className="text-slate-700 mr-1 text-[30px] sm:text-[36px] font-normal">{prefix}</span>}
        <span>{formattedNumber}</span>
        {suffix && <span className="text-[#A3192E] ml-1">{suffix}</span>}
      </div>
      <p className="text-[14.5px] sm:text-[15.5px] leading-snug text-slate-800 font-normal">
        {label}
      </p>
      {subLabel && (
        <span className="text-[12.5px] text-slate-500 mt-1">
          {subLabel}
        </span>
      )}
    </div>
  );
};

export const StatsBar: React.FC = () => {
  const { language } = useLanguage();

  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <section
      id="stats-bar"
      aria-label="Indicadores Institucionais"
      className="relative z-10 border-y border-slate-200/80 bg-[#F1F3F7]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Stat 01 */}
          <StatCounter
            targetNumber={1.2}
            decimals={1}
            prefix={isEn ? "+ $" : "+ R$"}
            suffix={isEn ? "B" : (isEs ? "MM" : "bi")}
            label={isEn ? "in analyzed contracts and receivables" : (isEs ? "en contratos y cuentas por cobrar analizados" : "em recebíveis e contratos analisados")}
            subLabel={isEn ? "National public and corporate sector" : (isEs ? "Sector público y corporativo nacional" : "Setor público e privado nacional")}
          />

          {/* Stat 02 */}
          <StatCounter
            targetNumber={72}
            suffix="h"
            label={isEn ? "average contract analysis turnaround" : (isEs ? "plazo promedio de análisis de contratos" : "prazo médio de análise de empenho")}
            subLabel={isEn ? "Agility with regulatory compliance" : (isEs ? "Rapidez con respaldo documental" : "Agilidade com segurança documental")}
          />

          {/* Stat 03 */}
          <StatCounter
            targetNumber={100}
            suffix="%"
            label={isEn ? "of operations settled through Central Bank" : (isEs ? "de operaciones liquidadas vía Banco Central" : "das operações liquidadas via Bacen")}
            subLabel={isEn ? "Operated via Fidúcia SCM (Bacen 382)" : (isEs ? "Operado por Fidúcia SCM (código 382)" : "Operado pela Fidúcia SCM (código 382)")}
          />
        </div>
      </div>
    </section>
  );
};

