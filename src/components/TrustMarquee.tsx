import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const TrustMarquee: React.FC = () => {
  const { language } = useLanguage();

  const badgesMap = {
    pt: [
      { text: 'CORRESPONDENTE BANCÁRIO FIDÚCIA SCM', code: 'BACEN 382' },
      { text: 'ANTECIPAÇÃO DE EMPENHOS FEDERAIS & ESTADUAIS', code: '72H' },
      { text: 'ESTRUTURAÇÃO DE CPR FINANCEIRA', code: 'AGRO' },
      { text: 'CONTA DIGITAL PJ & PIX ILIMITADO', code: 'ERP READY' },
      { text: 'CRIPTOGRAFIA BANCÁRIA TLS 1.3 & AES-256', code: 'LGPD' },
      { text: 'INTEGRAÇÃO CNAB 240 / 400 & RESTful APIs', code: 'FINTECH' }
    ],
    en: [
      { text: 'BANKING CORRESPONDENT FIDÚCIA SCM', code: 'BACEN 382' },
      { text: 'FEDERAL & STATE CONTRACT ADVANCES', code: '72H' },
      { text: 'STRUCTURED FINANCIAL NOTES', code: 'AGRIBUSINESS' },
      { text: 'CORPORATE DIGITAL ACCOUNT & INSTANT RAILS', code: 'ERP READY' },
      { text: 'BANKING GRADE ENCRYPTION TLS 1.3 & AES-256', code: 'DATA PRIVACY' },
      { text: 'DIRECT BANK FILE & RESTful API INTEGRATION', code: 'FINTECH' }
    ],
    es: [
      { text: 'CORRESPONSAL BANCARIO FIDÚCIA SCM', code: 'BACEN 382' },
      { text: 'ANTICIPO DE CONTRATOS PÚBLICOS Y PRIVADOS', code: '72H' },
      { text: 'ESTRUCTURACIÓN DE NOTAS FINANCIERAS', code: 'AGRO' },
      { text: 'CUENTA DIGITAL EMPRESARIAL Y PAGOS', code: 'ERP READY' },
      { text: 'ENCRIPTACIÓN BANCARIA TLS 1.3 Y AES-256', code: 'SEGURIDAD' },
      { text: 'INTEGRACIÓN BANCARIA Y APIs RESTful', code: 'FINTECH' }
    ]
  };

  const badges = badgesMap[language] || badgesMap.pt;

  return (
    <div className="w-full bg-white border-b border-slate-200/80 py-4 overflow-hidden relative select-none shadow-xs">
      {/* Lateral gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee gap-8 md:gap-12 items-center">
        {/* Double array for seamless loop */}
        {[...badges, ...badges].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-[12px] font-mono tracking-wider text-slate-500"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A3192E]" />
            <span className="text-slate-800 font-normal">{item.text}</span>
            <span className="text-[10.5px] px-2 py-0.5 rounded bg-[#A3192E]/[0.07] border border-[#A3192E]/20 text-[#A3192E] font-normal">
              [{item.code}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

