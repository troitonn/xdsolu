import React from 'react';
import { Shield, ShieldCheck, Lock, Activity, CheckCircle2, FileCheck2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ComplianceSection: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <section
      id="seguranca"
      aria-label={isEn ? 'Security and Compliance' : (isEs ? 'Seguridad y Cumplimiento' : 'Segurança e Compliance')}
      className="py-24 md:py-36 bg-[#F1F3F7] border-y border-slate-200/80 relative overflow-hidden bg-grid"
    >
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-[760px] mb-14 md:mb-20">
          <div className="eyebrow-label mb-3">
            {isEn ? 'TRUST' : (isEs ? 'CONFIANZA' : 'CONFIANÇA')}
          </div>
          <h2 className="section-h2 text-[#0B0F19] mb-5">
            {isEn 
              ? 'Built for those who cannot afford to fail.'
              : (isEs 
                ? 'Construida para quienes no pueden fallar.'
                : 'Construída para quem não pode errar.')}
          </h2>
          <p className="body-text text-[17px] max-w-[620px] text-slate-600">
            {isEn 
              ? 'Rigorous governance architecture, continuous audit, and backing by a Central Bank of Brazil regulated institution.'
              : (isEs 
                ? 'Arquitectura de gobernanza rigurosa, auditoría continua y respaldo de institución regulada por el Banco Central.'
                : 'Arquitetura de governança rigorosa, auditoria contínua e respaldo de instituição regulada pelo Banco Central do Brasil.')}
          </p>
        </div>

        {/* 3 Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Block 01 */}
          <div className="bg-white border border-slate-200/90 rounded-[22px] p-7 md:p-8 flex flex-col justify-between hover:border-[#A3192E]/40 transition-colors shadow-md">
            <div>
              <div className="text-[12px] font-mono text-[#A3192E] font-normal mb-3">
                01 · COMPLIANCE BY DESIGN
              </div>
              <h3 className="text-[20px] font-normal text-[#0B0F19] tracking-[-0.02em] mb-4">
                {isEn 
                  ? 'KYC & Anti-Money Laundering'
                  : (isEs 
                    ? 'KYC y Prevención de Lavado de Dinero'
                    : 'KYC e Prevenção à Lavagem de Dinheiro')}
              </h3>
              <p className="body-text text-[15px] leading-relaxed text-slate-600">
                {isEn 
                  ? 'Integrated Know Your Customer (KYC), Anti-Money Laundering (AML/CFT) frameworks and real-time transactional monitoring from day one.'
                  : (isEs 
                    ? 'Procesos integrados de Know Your Customer (KYC), Prevención de Lavado de Dinero (PLD/FT) y monitoreo transaccional en tiempo real.'
                    : 'Processos integrados de Know Your Customer (KYC), Prevenção à Lavagem de Dinheiro e Financiamento ao Terrorismo (PLD/FT) e monitoramento transacional em tempo real desde o primeiro cliente.')}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[12.5px] text-slate-600 font-normal">
              <FileCheck2 className="w-4 h-4 text-[#A3192E]" />
              <span>{isEn ? 'Full Regulatory Compliance' : (isEs ? 'Conformidad Regulatoria Total' : 'Conformidade Regulatória Total')}</span>
            </div>
          </div>

          {/* Block 02 */}
          <div className="bg-white border-2 border-[#A3192E]/30 rounded-[22px] p-7 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#A3192E]/[0.06] rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="text-[12px] font-mono text-[#A3192E] font-normal mb-3">
                {isEn ? '02 · AUTHORIZED INFRASTRUCTURE' : (isEs ? '02 · INFRAESTRUCTURA AUTORIZADA' : '02 · INFRAESTRUTURA AUTORIZADA')}
              </div>
              <h3 className="text-[20px] font-normal text-[#0B0F19] tracking-[-0.02em] mb-4">
                Fidúcia SCM (Bacen 382)
              </h3>
              <p className="body-text text-[15px] leading-relaxed text-slate-600">
                {isEn 
                  ? 'Payment accounts and financial settlements are operated by Fidúcia SCM, an institution authorized by the Central Bank under code 382. XD Capital acts with technical exclusivity as a banking correspondent.'
                  : (isEs 
                    ? 'Las cuentas de pago y la liquidación financiera son operadas por Fidúcia SCM, institución autorizada por el Banco Central bajo código 382. XD Capital actúa como corresponsal bancario.'
                    : 'As contas de pagamento e a liquidação financeira são operadas pela Fidúcia SCM, instituição autorizada pelo Banco Central sob o código 382. A XD Capital atua com exclusividade técnica como correspondente bancário.')}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[12.5px] text-slate-900 font-normal">
              <ShieldCheck className="w-4 h-4 text-[#A3192E]" />
              <span>{isEn ? 'Official Central Bank Settlement Rails' : (isEs ? 'Liquidación en Vía Oficial Bacen' : 'Liquidação em Trilha Oficial Bacen')}</span>
            </div>
          </div>

          {/* Block 03 */}
          <div className="bg-white border border-slate-200/90 rounded-[22px] p-7 md:p-8 flex flex-col justify-between hover:border-[#A3192E]/40 transition-colors shadow-md">
            <div>
              <div className="text-[12px] font-mono text-[#A3192E] font-normal mb-3">
                {isEn ? '03 · PROTECTED DATA' : (isEs ? '03 · DATOS PROTEGIDOS' : '03 · DADOS PROTEGIDOS')}
              </div>
              <h3 className="text-[20px] font-normal text-[#0B0F19] tracking-[-0.02em] mb-4">
                {isEn 
                  ? 'Cryptographic Security & LGPD / GDPR'
                  : (isEs 
                    ? 'Seguridad Criptográfica y LGPD'
                    : 'Segurança Criptográfica & LGPD')}
              </h3>
              <p className="body-text text-[15px] leading-relaxed text-slate-600">
                {isEn 
                  ? 'End-to-end encryption in transit (TLS 1.3) and at rest (AES-256), immutable audit logs, and strict compliance with General Data Protection Regulations (LGPD/GDPR).'
                  : (isEs 
                    ? 'Cifrado de extremo a extremo en tránsito (TLS 1.3) y en reposo (AES-256), registro de auditoría inmutable y estricta conformidad con la LGPD.'
                    : 'Criptografia de ponta a ponta em trânsito (TLS 1.3) e em repouso (AES-256), trilha de auditoria imutável e tratamento integral de dados em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD).')}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[12.5px] text-slate-600 font-normal">
              <Lock className="w-4 h-4 text-[#A3192E]" />
              <span>{isEn ? 'Privacy and Banking Secrecy' : (isEs ? 'Privacidad y Secreto Bancario' : 'Privacidade e Sigilo Bancário')}</span>
            </div>
          </div>
        </div>

        {/* Badges Row */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[13px] text-slate-800 font-medium shadow-xs">
            <Shield className="w-4 h-4 text-[#A3192E]" />
            <span>{isEn ? 'Central Bank of Brazil' : (isEs ? 'Banco Central do Brasil' : 'Banco Central do Brasil')}</span>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[13px] text-slate-800 font-medium shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#A3192E]" />
            <span>{isEn ? 'LGPD & GDPR Compliant' : (isEs ? 'Conforme LGPD' : 'Conforme LGPD')}</span>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[13px] text-slate-800 font-medium shadow-xs">
            <Lock className="w-4 h-4 text-[#A3192E]" />
            <span>SSL 256 bits</span>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[13px] text-slate-800 font-medium shadow-xs">
            <Activity className="w-4 h-4 text-[#A3192E]" />
            <span>{isEn ? '24/7 Monitoring' : (isEs ? 'Monitoreo 24/7' : 'Monitoramento 24/7')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
