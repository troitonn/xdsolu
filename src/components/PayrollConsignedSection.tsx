import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Building, Landmark, CreditCard, ShieldCheck, Wallet, ArrowRight, BadgePercent } from 'lucide-react';
import consignadoPublicoImg from '../assets/images/consignado_publico.png';
import consignadoPrivadoImg from '../assets/images/consignado_privado.png';
import { useLanguage } from '../context/LanguageContext';

interface PayrollConsignedSectionProps {
  onOpenContact: (subject: string) => void;
}

export const PayrollConsignedSection: React.FC<PayrollConsignedSectionProps> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'publico' | 'privado'>('publico');
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <section
      id="folha-consignado"
      aria-label="Folha de Pagamento e Crédito Consignado"
      className="py-24 md:py-36 bg-[#F6F7FA] border-y border-slate-200/80 relative overflow-hidden scroll-mt-20"
    >
      <div id="credito" className="absolute -top-24 left-0" />
      <div id="consignado" className="absolute -top-24 left-0" />
      <div id="antecipacao" className="absolute -top-24 left-0" />
      <div id="antecipacao-salario" className="absolute -top-24 left-0" />
      {/* Background Image Container with Dynamic Positioning */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Ambient Wine/Crimson Glow Accent placed behind photo */}
        <div
          className="absolute -top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#A3192E] opacity-[0.04] blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[10%] left-[25%] w-[420px] h-[420px] rounded-full bg-[#7A0F28] opacity-[0.03] blur-[100px]"
          aria-hidden="true"
        />

        {/* Fine architectural grid texture placed behind photo */}
        <div className="absolute inset-0 bg-grid opacity-20 mix-blend-multiply" />

        {/* Dynamic Image Container: Crisp, vivid, and lively */}
        <div className="absolute right-0 top-0 w-full sm:w-[92%] md:w-[66%] lg:w-[56%] xl:w-[52%] h-[370px] sm:h-[450px] md:h-[510px] lg:h-[550px] overflow-hidden">
          {/* Setor Público Background Image - Balanced Clarity & Natural Tone */}
          <img
            src={consignadoPublicoImg}
            alt="Crédito Consignado Setor Público XD Capital"
            className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center scale-100 transition-all duration-700 ease-in-out filter contrast-[1.04] saturate-[1.07] brightness-[1.0] ${
              activeTab === 'publico' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Setor Privado Background Image - Balanced Clarity & Natural Tone */}
          <img
            src={consignadoPrivadoImg}
            alt="Crédito Consignado Setor Privado XD Capital"
            className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center scale-100 transition-all duration-700 ease-in-out filter contrast-[1.04] saturate-[1.07] brightness-[1.0] ${
              activeTab === 'privado' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Clean edge transitions only at borders - preserves full clarity on people and faces */}
          <div className="absolute left-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-r from-[#F6F7FA] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#F6F7FA] to-transparent pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#F6F7FA] to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Top Showcase: Title & CTAs */}
        <div className="max-w-[680px] mb-16 md:mb-20 text-left">
          <h2 className="section-h2 text-[#0B0F19] mb-5 tracking-[-0.03em] leading-[1.08]">
            {t('payroll.title')}
          </h2>

          <p className="body-text text-[17px] sm:text-[18.5px] text-slate-600 leading-relaxed mb-8 max-w-[620px]">
            {t('payroll.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onOpenContact('Quero conveniar minha empresa ou órgão público')}
              className="btn-primary text-[15px] !py-3.5 !px-6 cursor-pointer"
            >
              <span>{t('payroll.btnPartnership')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selector: Público vs Privado */}
        <div className="flex items-center gap-3 p-1.5 bg-white border border-slate-200/90 rounded-2xl w-fit mb-10 shadow-sm">
          <button
            onClick={() => setActiveTab('publico')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-[14.5px] font-normal transition-all cursor-pointer ${
              activeTab === 'publico'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Landmark className="w-4 h-4 text-[#A3192E]" />
            <span>{isEn ? "Public Sector (Civil Servants)" : (isEs ? "Sector Público (Servidores)" : "Setor Público (Servidores)")}</span>
          </button>

          <button
            onClick={() => setActiveTab('privado')}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-[14.5px] font-normal transition-all cursor-pointer ${
              activeTab === 'privado'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Building className="w-4 h-4 text-[#A3192E]" />
            <span>{isEn ? "Private Sector (Corporations)" : (isEs ? "Sector Privado (Empresas)" : "Setor Privado (Empresas CLT)")}</span>
          </button>
        </div>

        {/* Tab 1: Setor Público */}
        {activeTab === 'publico' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Core Offering */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[26px] p-8 sm:p-12 shadow-md flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] border border-[#A3192E]/20 text-[#A3192E] text-[12px] font-mono mb-6">
                  {isEn ? "MUNICIPAL, STATE & FEDERAL AGREEMENTS" : (isEs ? "CONVENIOS PÚBLICOS MUNICIPALES Y ESTATALES" : "CONVÊNIOS PÚBLICOS MUNICIPAIS, ESTADUAIS E FEDERAIS")}
                </div>
                <h3 className="text-[24px] sm:text-[30px] font-normal text-slate-900 tracking-[-0.025em] leading-[1.2] mb-4">
                  {isEn ? "Consigned credit with preferential terms for civil servants." : (isEs ? "Crédito de nómina con tasas preferenciales para funcionarios públicos." : "Crédito consignado com as menores taxas para o funcionalismo público.")}
                </h3>
                <p className="text-[15.5px] text-slate-600 leading-relaxed mb-8">
                  {isEn 
                    ? "Structured credit operations for civil servants, stable appointees, retirees, and pensioners of public agencies across all levels, with direct payroll deduction and swift disbursement."
                    : (isEs 
                      ? "Operaciones estructuradas para funcionarios públicos, jubilados y pensionados de organismos públicos, con descuento en nómina y desembolso ágil."
                      : "Operações estruturadas para servidores estatutários, comissionados estáveis, aposentados e pensionistas de órgãos públicos em âmbito municipal, estadual e federal, com desconto em folha averbado e liquidação rápida.")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "COMPETITIVE RATES" : (isEs ? "TASAS REDUCIDAS" : "TAXAS REDUZIDAS")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Differentiated conditions compared to conventional personal loans." : (isEs ? "Condiciones preferenciales frente a créditos personales ordinarios." : "Condições diferenciadas em relação ao crédito pessoal tradicional.")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "EXTENDED TERMS" : (isEs ? "PLAZOS EXTENDIDOS" : "PRAZOS ESTENDIDOS")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Flexible repayment terms spanning from 96 to 120 months." : (isEs ? "Financiamiento flexible de hasta 96 a 120 cuotas mensuales." : "Parcelamento flexível de até 96 a 120 parcelas mensais.")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "LOAN PORTABILITY" : (isEs ? "PORTABILIDAD" : "PORTABILIDADE")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Contract refinancing and debt consolidation at reduced rates." : (isEs ? "Refinanciamiento de contratos y consolidación de deudas con menor interés." : "Refinanciamento de contratos e compra de dívidas com redução de juros.")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "NO GUARANTOR" : (isEs ? "SIN AVALISTA" : "SEM AVALISTA")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Direct deduction from public authority payroll with electronic validation." : (isEs ? "Descuento directo en la nómina del organismo con registro electrónico." : "Desconto direto na folha de pagamento do órgão com averbação eletrônica.")}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-end gap-4">
                <button
                  onClick={() => onOpenContact('Convênio de Consignado - Setor Público')}
                  className="btn-primary text-[14.5px] !py-3 !px-6 cursor-pointer"
                >
                  <span>{isEn ? "Request Public Agreement" : (isEs ? "Solicitar Convenio Público" : "Solicitar Convênio Público")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Card: Folha de Pagamento para Órgãos e Autarquias */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-[26px] p-8 sm:p-10 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-6">
                  <Wallet className="w-6 h-6" />
                </div>
                <h4 className="text-[20px] sm:text-[22px] font-normal text-slate-900 tracking-[-0.02em] mb-3">
                  {isEn ? "Public Entity Payroll Processing" : (isEs ? "Gestión y Procesamiento de Nómina Pública" : "Gestão & Processamento de Folha Pública")}
                </h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6">
                  {isEn 
                    ? "Technological infrastructure for municipal and state agencies to disburse payroll with punctuality, direct reconciliation, and dedicated channels."
                    : (isEs 
                      ? "Infraestructura para que las alcaldías y organismos públicos procesen nóminas con puntualidad, conciliación directa y canales dedicados."
                      : "Infraestrutura tecnológica para prefeituras e órgãos públicos processarem suas folhas com pontualidade, conciliação direta e canais dedicados para os servidores.")}
                </p>

                <ul className="space-y-3 mb-8 text-[14px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Batch processing via instant Pix and wire transfer with full trace" : (isEs ? "Procesamiento masivo con trazabilidad completa" : "Processamento em lote via Pix e TED com rastreabilidade")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Payment and salary accounts with transparent conditions" : (isEs ? "Cuentas de nómina y pago sin tarifas abusivas" : "Contas de pagamento e contas salário sem tarifas abusivas")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Consultative support desk for human resource officers" : (isEs ? "Mesa de soporte consultivo para el departamento de RRHH" : "Mesa de suporte consultivo para a equipe de Recursos Humanos")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Direct integration with public administration software" : (isEs ? "Integración con los principales sistemas de gestión pública" : "Integração com os principais sistemas de gestão pública")}</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenContact('Processamento de Folha de Pagamento - Órgão Público')}
                className="btn-secondary text-[14px] !py-3 w-full justify-center cursor-pointer"
              >
                <span>{isEn ? "Discuss Public Payroll" : (isEs ? "Consultar Nómina Pública" : "Falar sobre Folha Pública")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Setor Privado */}
        {activeTab === 'privado' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Consignado Privado CLT */}
            <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[26px] p-8 sm:p-12 shadow-md flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] border border-[#A3192E]/20 text-[#A3192E] text-[12px] font-mono mb-6">
                  {isEn ? "CORPORATE BENEFIT · PRIVATE ENTERPRISE" : (isEs ? "BENEFICIO CORPORATIVO · EMPRESAS CONVENIADAS" : "BENEFÍCIO CORPORATIVO · EMPRESAS CONVENIADAS CLT")}
                </div>
                <h3 className="text-[24px] sm:text-[30px] font-normal text-slate-900 tracking-[-0.025em] leading-[1.2] mb-4">
                  {isEn 
                    ? "Private Payroll Loans: Peace of mind for your team, zero liability for your enterprise."
                    : (isEs 
                      ? "Consignado Privado: Mayor tranquilidad financiera para su equipo, cero costo para su empresa."
                      : "Consignado Privado: Mais tranquilidade financeira para sua equipe, zero custo para sua empresa.")}
                </h3>
                <p className="text-[15.5px] text-slate-600 leading-relaxed mb-8">
                  {isEn 
                    ? "Offer your employees a structured credit line, replacing high credit card interest rates with manageable payroll deductions, with zero financial risk for your company."
                    : (isEs 
                      ? "Ofrezca a sus colaboradores una línea de crédito estructurada, reemplazando tasas altas de tarjetas de crédito por cuotas deducibles de nómina sin riesgo para su empresa."
                      : "Ofereça aos seus colaboradores uma linha de crédito justa e estruturada, substituindo juros altos de cheque especial e cartão rotativo por parcelas suaves descontadas em folha, sem coobrigação financeira para a sua empresa.")}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "ZERO COST OR RISK" : (isEs ? "CERO COSTO O RIESGO" : "ZERO CUSTO OU RISCO")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "The enterprise assumes no debt liability and pays zero fees to enroll." : (isEs ? "La empresa no asume la deuda ni tiene costo alguno por afiliarse al convenio." : "A empresa não assume a dívida e não tem custo algum para aderir ao convênio.")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "TALENT RETENTION" : (isEs ? "RETENCIÓN DE TALENTO" : "RETENÇÃO DE TALENTOS")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Lower employee financial stress, lower absenteeism, and boost productivity." : (isEs ? "Disminución del estrés financiero, reducción del ausentismo y mayor productividad." : "Redução do estresse financeiro, queda de absenteísmo e aumento da produtividade.")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "100% DIGITAL" : (isEs ? "100% DIGITAL" : "100% DIGITAL")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Simplified self-service onboarding for employees without burdening HR." : (isEs ? "Contratación simplificada por el empleado sin sobrecargar al equipo de RRHH." : "Contratação simplificada pelo colaborador sem sobrecarregar a rotina do RH.")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[13px] font-mono text-[#A3192E] mb-1">{isEn ? "ATTRACTIVE RATES" : (isEs ? "TASAS COMPETITIVAS" : "TAXAS IMBATÍVEIS")}</div>
                    <div className="text-[14.5px] text-slate-800 font-normal">{isEn ? "Rates substantially lower than open market personal loans." : (isEs ? "Intereses notablemente inferiores a los préstamos personales ordinarios." : "Juros substancialmente inferiores aos empréstimos pessoais de mercado.")}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[13px] text-slate-500 font-mono">
                  <BadgePercent className="w-4 h-4 text-[#A3192E]" />
                  <span>{isEn ? "Quick onboarding for businesses from 10 employees" : (isEs ? "Convenio ágil para empresas a partir de 10 empleados" : "Convênio Rápido para Empresas a partir de 10 Colaboradores")}</span>
                </div>
                <button
                  onClick={() => onOpenContact('Convênio de Consignado Privado CLT')}
                  className="btn-primary text-[14.5px] !py-3 !px-6 cursor-pointer"
                >
                  <span>{isEn ? "Enroll My Enterprise" : (isEs ? "Afiliar mi Empresa" : "Conveniar Minha Empresa")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Card: Folha Corporativa Privada */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-[26px] p-8 sm:p-10 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-6">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="text-[20px] sm:text-[22px] font-normal text-slate-900 tracking-[-0.02em] mb-3">
                  {isEn ? "Corporate Payroll Accounts" : (isEs ? "Nómina Corporativa Empresarial" : "Folha de Pagamento Corporativa PJ")}
                </h4>
                <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6">
                  {isEn 
                    ? "Automate salary, partner compensation, and supplier payouts with seamless integration to standard banking files (CNAB) and ERPs."
                    : (isEs 
                      ? "Automatice el pago de sueldos, honorarios y proveedores con integración total a sus archivos bancarios y ERP."
                      : "Automatize os pagamentos de salários, pró-labore, fornecedores e benefícios com total integração aos seus arquivos de remessa bancária (CNAB) e ERP.")}
                </p>

                <ul className="space-y-3 mb-8 text-[14px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Frictionless CNAB 240 / 400 bank file processing" : (isEs ? "Envío de archivos bancarios estándar sin fricciones" : "Envio de remessas CNAB 240 / 400 sem atrito")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Instant batch transfers with automated receipts" : (isEs ? "Transferencias masivas instantáneas con comprobantes automáticos" : "Disparos instantâneos via Pix em lote com comprovantes")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Approval thresholds for directors and HR leaders" : (isEs ? "Niveles de aprobación para directores y gerentes de RRHH" : "Alçadas de aprovação para diretores e gestores de RH")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0 mt-0.5" />
                    <span>{isEn ? "Corporate account opening without abusive banking charges" : (isEs ? "Apertura de cuenta empresarial sin cobros abusivos" : "Abertura de conta PJ sem burocracia ou cobranças abusivas")}</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenContact('Processamento de Folha Corporativa Privada PJ')}
                className="btn-secondary text-[14px] !py-3 w-full justify-center cursor-pointer"
              >
                <span>{isEn ? "Discuss Corporate Payroll" : (isEs ? "Consultar Nómina Corporativa" : "Falar sobre Folha PJ")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

