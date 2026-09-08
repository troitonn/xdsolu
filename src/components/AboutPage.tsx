import React from 'react';
import { ArrowLeft, ArrowUpRight, Building2, ShieldCheck, Target, TrendingUp, CheckCircle2, Clock, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
  onOpenOpenAccount: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onOpenContact,
  onOpenOpenAccount,
}) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0B0F19] pt-28 pb-20 px-6">
      <div className="max-w-[1080px] mx-auto">
        {/* Navigation back */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-[14.5px] text-slate-600 hover:text-[#A3192E] mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{isEn ? "Back to home" : (isEs ? "Volver al inicio" : "Voltar para a página inicial")}</span>
        </button>

        {/* Hero Header */}
        <div className="mb-14">
          <div className="flex items-center justify-between gap-6 mb-6">
            <img
              src="/xd-logo.png"
              alt="XD Capital"
              className="h-8 sm:h-9 w-auto object-contain opacity-95"
              width={157}
              height={36}
            />
          </div>
          <h1 className="text-[32px] sm:text-[46px] font-normal text-[#0B0F19] tracking-[-0.035em] leading-[1.12] mb-6 max-w-[880px]">
            {isEn 
              ? "Our story: bridging the gap between enterprises and reliable liquidity."
              : (isEs 
                ? "Nuestra historia: construyendo puentes entre empresas y liquidez real."
                : "Nossa história: construindo pontes entre empresas e liquidez real.")}
          </h1>
          <p className="text-[17px] sm:text-[19px] text-slate-600 font-normal leading-relaxed max-w-[780px]">
            {isEn
              ? "XD Capital was founded with a clear mission: eliminate working capital bottlenecks and convert complex receivables into predictable cash flow for companies driving economic progress."
              : (isEs
                ? "XD Capital nació con un propósito claro: eliminar los obstáculos de capital de trabajo y transformar cuentas por cobrar en liquidez predecible para empresas."
                : "A XD Capital nasceu com um propósito claro: eliminar os gargalos de capital de giro e transformar recebíveis complexos em liquidez previsível para empresas que impulsionam a economia brasileira.")}
          </p>
        </div>

        {/* Timeline / Story Section */}
        <div className="bg-white border border-slate-200/90 rounded-[28px] p-8 sm:p-14 shadow-sm mb-12 space-y-12">
          {/* A Origem */}
          <div>
            <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
              {isEn ? "HOW IT ALL BEGAN" : (isEs ? "CÓMO COMENZÓ TODO" : "COMO TUDO COMEÇOU")}
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-normal text-slate-900 tracking-[-0.02em] mb-4">
              {isEn ? "The market necessity that shaped our journey" : (isEs ? "La necesidad del mercado que moldeó nuestra trayectoria" : "A necessidade que moldou nossa trajetória")}
            </h2>
            <div className="space-y-4 text-[15.5px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                {isEn 
                  ? "Over years in the financial and corporate credit markets, our leadership observed a recurring bottleneck: solid, reputable, and productive enterprises facing liquidity strain due to the sluggishness of traditional banking."
                  : (isEs
                    ? "Durante años en el mercado financiero y corporativo, nuestros fundadores observaron un patrón recurrente: empresas sólidas, idóneas y altamente productivas enfrentando dificultades de liquidez debido a la lentitud de los bancos tradicionales."
                    : "Durante anos no mercado financeiro e corporativo, nossos fundadores testemunharam um padrão recorrente: empresas sólidas, idóneas e altamente produtivas enfrentando severas crises de liquidez não por falta de faturamento, mas pela morosidade e rigidez dos grandes bancos tradicionais.")}
              </p>
              <p>
                {isEn
                  ? "Particularly in supplying governmental bodies and large industrial supply chains, payment certification cycles extend 60 to 180 days. While contract revenues were locked in process, operational overhead, payroll, and material costs could not wait."
                  : (isEs
                    ? "Especialmente en el suministro a entidades públicas y grandes cadenas industriales, los plazos de liquidación alcanzan 60, 90 o 180 días. Mientras los cobros demoraban, la nómina y los costos operativos no podían esperar."
                    : "Especialmente no fornecimento para órgãos públicos (prefeituras, governos estaduais, autarquias federais) e grandes cadeias industriais, os prazos de medição e liquidação chegam a 60, 90 ou 180 dias. Enquanto o faturamento formal demorava a se converter em caixa, despesas operacionais, folha de pagamento e insumos não podiam esperar.")}
              </p>
              <p>
                {isEn
                  ? "From this reality, XD Capital Financial Intermediation was structured: an agile credit organization specialized in structured financing and receivable factoring, tailored to disburse capital in record time."
                  : (isEs
                    ? "A partir de esta realidad nació XD Capital: una estructura ágil, especializada en crédito estructurado y anticipación de cuentas por cobrar para liberar liquidez en tiempo récord."
                    : "Foi a partir dessa realidade que a XD Capital Serviço de Intermediação Financeira foi concebida: uma estrutura ágil, especializada em crédito estruturado e antecipação de recebíveis, desenhada para entender a particularidade jurídica de cada operação e liberar recursos em tempo recorde.")}
              </p>
            </div>
          </div>

          {/* Pillars Bento Grid */}
          <div className="pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-normal text-slate-900 mb-2">{isEn ? "Our Mission" : (isEs ? "Nuestra Misión" : "Nossa Missão")}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {isEn 
                    ? "Guarantee predictable cash flow and financial safety for medium and large companies through bespoke credit structures, technology, and rapid response."
                    : (isEs 
                      ? "Garantizar flujo de caja y seguridad financiera para medianas y grandes empresas a través de crédito a medida, tecnología y velocidad de respuesta."
                      : "Garantir fluxo de caixa e segurança financeira para médias e grandes empresas através de crédito sob medida, tecnologia e velocidade de resposta.")}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-normal text-slate-900 mb-2">{isEn ? "Our Vision" : (isEs ? "Nuestra Visión" : "Nossa Visão")}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {isEn
                    ? "To stand as the preferred financial partner for government contractors, industry, and corporate leaders across nationwide operations."
                    : (isEs
                      ? "Ser el socio financiero preferido para proveedores del sector público, industria y comercio en todo el territorio."
                      : "Ser o parceiro financeiro de primeira escolha para fornecedores do setor público, indústria e comércio em todo o território nacional.")}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-normal text-slate-900 mb-2">{isEn ? "Our Values" : (isEs ? "Nuestros Valores" : "Nossos Valores")}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {isEn
                    ? "Uncompromising transparency, regulatory compliance, client-first delivery, banking privacy, and dedication to long-term partnerships."
                    : (isEs
                      ? "Transparencia irrestricta, rigor regulatorio, compromiso con los resultados del cliente, confidencialidad y relaciones a largo plazo."
                      : "Transparência irrestrita, rigor regulatório, compromisso com o resultado do cliente, sigilo bancário e foco em relacionamentos de longo prazo.")}
                </p>
              </div>
            </div>
          </div>

          {/* Especialização e Atuação */}
          <div className="pt-8 border-t border-slate-100">
            <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
              {isEn ? "OPERATIONAL DNA" : (isEs ? "ADN OPERATIVO" : "DNA OPERACIONAL")}
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-normal text-slate-900 tracking-[-0.02em] mb-4">
              {isEn ? "What sets XD Capital apart?" : (isEs ? "¿Por qué XD Capital es diferente?" : "Por que a XD Capital é diferente?")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-200/60">
                <CheckCircle2 className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-normal text-slate-900 mb-1">{isEn ? "Public Sector Specialists" : (isEs ? "Especialistas en Sector Público" : "Especialistas em Setor Público")}</h4>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    {isEn 
                      ? "Deep mastery of procurement legalities, municipal, state and federal orders, and ongoing government supply contracts."
                      : (isEs 
                        ? "Dominio experto de leyes de licitaciones públicas, compromisos presupuestarios y contratos de suministro continuo."
                        : "Profundo domínio das leis de licitações, recebíveis municipais, estaduais e federais, medições de obras e contratos de fornecimento contínuo.")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-200/60">
                <Clock className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-normal text-slate-900 mb-1">{isEn ? "Receivables Analysis within 72h" : (isEs ? "Evaluación de Cuentas por Cobrar en 72h" : "Análise de Recebíveis em 72h")}</h4>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    {isEn
                      ? "Dedicated credit committee and modern verification tools to deliver swift, decisive approvals to your leadership."
                      : (isEs
                        ? "Comité de crédito ágil y herramientas de validación para brindar respuestas rápidas y objetivas."
                        : "Comitê de crédito dedicado e ferramentas modernas de checagem para dar retornos objetivos e céleres à sua diretoria.")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-200/60">
                <Building2 className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-normal text-slate-900 mb-1">{isEn ? "Regulated Correspondent" : (isEs ? "Corresponsal Bancario Regulado" : "Correspondente Regulamentado")}</h4>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    {isEn
                      ? "Operating in strict adherence to Central Bank regulations, backed by authorized financial infrastructure (Fidúcia SCM BACEN 382)."
                      : (isEs
                        ? "Operación en total conformidad con las normas bancarias, integrando socios autorizados por el Banco Central de Brasil."
                        : "Atuação em total conformidade com as Resoluções Conjuntas BCB/CMN nº 16 e 17/2025, integrando parceiros autorizados pelo Banco Central.")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50/60 border border-slate-200/60">
                <Users className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[15px] font-normal text-slate-900 mb-1">{isEn ? "Exclusive Corporate Desk" : (isEs ? "Mesa de Atención Exclusiva" : "Mesa de Atendimento Exclusiva")}</h4>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    {isEn
                      ? "Direct communication with seasoned account executives who understand your balance sheet, without generic call-center queues."
                      : (isEs
                        ? "Atención directa con ejecutivos de cuenta expertos que entienden su balance financiero, sin esperas ni chatbots."
                        : "Sua empresa fala diretamente com executivos de conta que entendem seu balanço, sem robôs ou intermediários genéricos.")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Governança e Solidez */}
          <div className="pt-8 border-t border-slate-100">
            <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
              {isEn ? "STRENGTH & GOVERNANCE" : (isEs ? "SOLIDEZ Y GOBERNANZA" : "SOLIDEZ & GOVERNANÇA")}
            </div>
            <h2 className="text-[24px] sm:text-[28px] font-normal text-slate-900 tracking-[-0.02em] mb-4">
              {isEn ? "Institutional commitment and compliance" : (isEs ? "Compromiso institucional y cumplimiento" : "Compromisso institucional e conformidade")}
            </h2>
            <p className="text-[15.5px] text-slate-600 leading-relaxed mb-6">
              {isEn 
                ? "XD Capital adopts rigorous corporate governance standards, including institutional Anti-Money Laundering (AML/CFT) screening, continuous data privacy protection compliance (LGPD), and a formal corporate Code of Conduct and Ethics to ensure security for all stakeholders."
                : (isEs 
                  ? "XD Capital adopta rigurosas prácticas de gobernanza corporativa, incluyendo prevención de lavado de dinero (PLD/FT), cumplimiento continuo de protección de datos (LGPD) y Código de Conducta y Ética corporativo."
                  : "A XD Capital adota as mais rigorosas práticas de governança corporativa, incluindo programas consolidados de Prevenção à Lavagem de Dinheiro e ao Financiamento do Terrorismo (PLD/FT), conformidade contínua com a Lei Geral de Proteção de Dados (LGPD) e Código de Conduta e Ética corporativo para assegurar total tranquilidade a nossos clientes e parceiros.")}
            </p>
            <div className="p-5 rounded-xl bg-[#A3192E]/[0.03] border border-[#A3192E]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[14.5px] font-normal text-slate-900">
                  XD Capital Serviço de Intermediação Financeira Ltda.
                </div>
                <div className="text-[13px] text-slate-500 font-mono mt-0.5">
                  CNPJ: 55.038.166/0001-99 · {isEn ? "Headquarters: São Paulo/SP · Nationwide Service" : (isEs ? "Sede Corporativa: São Paulo/SP · Cobertura Nacional" : "Sede Corporativa: São Paulo/SP · Atendimento Brasil")}
                </div>
              </div>
              <button
                onClick={() => onOpenContact('Contato Institucional / Diretoria')}
                className="btn-secondary text-[13.5px] shrink-0 cursor-pointer"
              >
                {isEn ? "Speak with Leadership" : (isEs ? "Hablar con la Dirección" : "Falar com a Diretoria")}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-[28px] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[560px]">
            <h3 className="text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] mb-2 text-white">
              {isEn ? "Ready to accelerate your company's growth?" : (isEs ? "¿Listo para acelerar el crecimiento de su empresa?" : "Pronto para acelerar o crescimento da sua empresa?")}
            </h3>
            <p className="text-[15px] text-slate-300 leading-relaxed font-normal">
              {isEn 
                ? "Talk to one of our corporate credit specialists and discover the optimal liquidity structure for your operation."
                : (isEs 
                  ? "Hable con uno de nuestros especialistas y descubra la estructura de crédito ideal para su empresa."
                  : "Converse com um de nossos especialistas e descubra a estrutura de crédito ideal para o seu momento operacional.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenOpenAccount}
              className="btn-primary text-[15px] !py-3.5 !px-6 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>{isEn ? "Open Corporate Account" : (isEs ? "Abrir Cuenta Digital PJ" : "Abra sua Conta PJ")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenContact('Solicitação de Análise de Crédito via Sobre a XD')}
              className="px-6 py-3.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-[15px] transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              {isEn ? "Contact Us" : (isEs ? "Contáctenos" : "Fale Conosco")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

