import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Briefcase, Clock, TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react';

interface StatsBarProps {
  className?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({ className }) => {
  const { language } = useLanguage();

  const isEn = language === 'en';
  const isEs = language === 'es';

  const productSolutions = [
    {
      title: isEn ? 'PUBLIC PAYROLL LOANS' : (isEs ? 'CRÉDITO CONSIGNADO PÚBLICO' : 'CRÉDITO CONSIGNADO PÚBLICO'),
      icon: Landmark,
      subtitle: isEn ? 'Civil Servants & Municipalities' : (isEs ? 'Servidores Públicos y Organismos' : 'Servidores Públicos e Autarquias'),
      badge: isEn ? 'Payroll Deducted' : (isEs ? 'Descuento en Nómina' : 'Desconto em Folha'),
      targetId: 'folha-consignado',
    },
    {
      title: isEn ? 'PRIVATE PAYROLL LOANS' : (isEs ? 'CRÉDITO CONSIGNADO PRIVADO' : 'CRÉDITO CONSIGNADO PRIVADO'),
      icon: Briefcase,
      subtitle: isEn ? 'CLT Partner Companies & Staff' : (isEs ? 'Empresas Privadas y Empleados' : 'Empresas Conveniadas CLT'),
      badge: isEn ? 'Zero Corporate Cost' : (isEs ? 'Beneficio Corporativo' : 'Convênio sem Custo'),
      targetId: 'folha-consignado',
    },
    {
      title: isEn ? 'SALARY ADVANCE' : (isEs ? 'ADELANTO DE SUELDO' : 'ANTECIPAÇÃO DE SALÁRIO'),
      icon: Clock,
      subtitle: isEn ? 'Instant Working Days Liquidity' : (isEs ? 'Liquidez de Días Trabajados' : 'Liquidez Imediata na Folha'),
      badge: isEn ? 'Zero Debt Risk' : (isEs ? 'Sin Endeudamiento' : 'Dias Trabalhados'),
      targetId: 'antecipacao-salario',
    },
    {
      title: isEn ? 'RECEIVABLES ADVANCE' : (isEs ? 'ANTICIPO DE COBROS' : 'ANTECIPAÇÃO DE RECEBÍVEIS'),
      icon: TrendingUp,
      subtitle: isEn ? 'Invoices, Contracts & Duplicatas' : (isEs ? 'Facturas, Pagarés y Contratos' : 'Duplicatas, Notas Fiscais e Contratos'),
      badge: isEn ? 'Same-Day Cash D+0' : (isEs ? 'Capital Inmediato D+0' : 'Capital de Giro D+0'),
      targetId: 'recebiveis',
    },
    {
      title: isEn ? 'DIGITAL ACCOUNT' : (isEs ? 'CUENTA DIGITAL' : 'CONTA DIGITAL'),
      icon: CreditCard,
      subtitle: isEn ? 'Integrated PJ & PF Banking' : (isEs ? 'Soluciones PJ y PF Integradas' : 'Soluções Integradas PJ e PF'),
      badge: isEn ? 'Unlimited Pix & CNAB' : (isEs ? 'Pix Ilimitado' : 'Pix Ilimitado e CNAB'),
      targetId: 'conta-digital',
    },
  ];

  // Quadruple array for seamless continuous horizontal rotation on all screens
  const marqueeItems = [...productSolutions, ...productSolutions];

  const handleScrollTo = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="stats-bar"
      aria-label="Soluções Financeiras XD Capital"
      className={className || "relative z-20 w-full max-w-[1260px] mx-auto px-4 sm:px-6 select-none"}
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/[0.05] overflow-hidden py-3.5 sm:py-4 relative">
        {/* Left and right elegant gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Horizontal Rotating Track */}
        <div className="flex w-max animate-marquee gap-8 sm:gap-12 items-center will-change-transform hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {marqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleScrollTo(item.targetId)}
                className="flex items-center gap-3.5 sm:gap-4 shrink-0 group py-1 text-left cursor-pointer transition-transform hover:scale-[1.02]"
              >
                {/* Icon Container with Crimson Accent */}
                <div className="w-9 h-9 rounded-lg bg-[#A3192E]/[0.08] border border-[#A3192E]/15 flex items-center justify-center shrink-0 group-hover:bg-[#A3192E] transition-colors">
                  <Icon className="w-4 h-4 text-[#A3192E] group-hover:text-white transition-colors" />
                </div>

                {/* Title and Details */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide text-[#0B0F19] group-hover:text-[#A3192E] uppercase whitespace-nowrap transition-colors">
                      {item.title}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-[#A3192E] transition-all -translate-x-1 group-hover:translate-x-0" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap">
                    <span className="text-[11px] sm:text-[12px] text-slate-600 font-normal">
                      {item.subtitle}
                    </span>
                    <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#A3192E] bg-[#A3192E]/[0.08] px-1.5 py-0.5 rounded font-medium">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Subtle Divider */}
                <div className="h-8 w-[1px] bg-slate-200/80 ml-4 sm:ml-6 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
