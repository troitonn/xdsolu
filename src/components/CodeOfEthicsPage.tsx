import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2, AlertTriangle, Send, Lock, Scale, EyeOff, User, Phone, Mail } from 'lucide-react';

interface CodeOfEthicsPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
}

export const CodeOfEthicsPage: React.FC<CodeOfEthicsPageProps> = ({ onBackToHome, onOpenContact }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [protocol, setProtocol] = useState('');
  const [reportType, setReportType] = useState('codigo_conduta');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    involvement: '',
    description: '',
  });

const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSubmitError('');
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/ethics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportType,
        isAnonymous,
        name: isAnonymous ? '' : formData.name,
        email: isAnonymous ? '' : formData.email,
        phone: isAnonymous ? '' : formData.phone,
        involvement: formData.involvement,
        description: formData.description,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || 'Não foi possível registrar a manifestação.'
      );
    }

    setProtocol(result.protocol);
    setSubmitted(true);

  } catch (error) {
    setSubmitError(
      error instanceof Error
        ? error.message
        : 'Não foi possível registrar a manifestação.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0B0F19] pt-28 pb-20 px-6">
      <div className="max-w-[1020px] mx-auto">
        {/* Navigation back */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-[14.5px] text-slate-600 hover:text-[#A3192E] mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para a página inicial</span>
        </button>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] border border-[#A3192E]/20 text-[#A3192E] text-[12px] font-mono w-fit">
              RESOLUÇÃO CONJUNTA BCB/CMN Nº 16 E Nº 17/2025 · LEI Nº 12.846/2013
            </div>
            <img
              src="/xd-logo.png"
              alt="XD Capital"
              className="h-8 w-auto object-contain opacity-95"
              width={140}
              height={32}
            />
          </div>
          <h1 className="text-[30px] sm:text-[40px] font-normal text-[#0B0F19] tracking-[-0.03em] leading-[1.15] mb-3">
            CÓDIGO DE CONDUTA E ÉTICA
          </h1>
          <p className="text-[16px] text-slate-600 font-normal leading-relaxed">
            Operando como Correspondente Bancário nos termos da Resolução Conjunta BCB/CMN nº 16 e nº 17/2025.
          </p>
          <div className="text-[12.5px] text-slate-400 font-mono mt-3">
            Vigência a partir de: 2026 · Versão 2.0 · Comitê de Ética, Integridade e Compliance
          </div>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-slate-200/90 rounded-[20px] p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#A3192E]" />
            </div>
            <h3 className="text-[17px] font-normal text-slate-900 mb-1">
              Tolerância Zero
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Incompatibilidade irrestrita com corrupção, suborno, propina ou favorecimento indevido.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[20px] p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <EyeOff className="w-5 h-5 text-[#A3192E]" />
            </div>
            <h3 className="text-[17px] font-normal text-slate-900 mb-1">
              Canal de Denúncias
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Garantia de anonimato, sigilo absoluto e vedação irrestrita a atos de retaliação.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[20px] p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <Scale className="w-5 h-5 text-[#A3192E]" />
            </div>
            <h3 className="text-[17px] font-normal text-slate-900 mb-1">
              Conformidade Regulatória
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Alinhamento integral com normas do Banco Central, COAF, ANPD e regras do Liquidante.
            </p>
          </div>
        </div>

        {/* Document Content Box */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-[15px] sm:text-[15.5px] text-slate-700 mb-12">
          
          {/* 1. OBJETIVO E ABRANGÊNCIA */}
          <section className="space-y-3">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">1</span>
              <span>OBJETIVO E ABRANGÊNCIA</span>
            </h2>
            <p>
              <strong>1.1.</strong> O presente Código de Conduta e Ética (&quot;Código&quot;) estabelece os princípios éticos, valores e padrões de conduta que orientam as atividades da <strong>XD CAPITAL SERVIÇO DE INTERMEDIAÇÃO FINANCEIRA LTDA.</strong>, inscrita no CNPJ sob nº <strong>55.038.166/0001-99</strong>, doravante denominada &quot;XD Capital&quot;, e devem ser observados por todos os seus integrantes.
            </p>
            <p>
              <strong>1.2.</strong> A XD Capital atua como correspondente bancário e parceiro comercial de Instituição de Pagamento credenciada pelo Banco Central do Brasil (BCB), nos termos da Resolução Conjunta BCB/CMN nº 16/2025 e da Resolução Conjunta BCB/CMN nº 17/2025. Nessa condição, adota padrões éticos alinhados à regulamentação do Sistema Financeiro Nacional e aos compromissos assumidos perante a Instituição de Pagamento Liquidante parceira (&quot;Liquidante&quot;).
            </p>
            <p className="pt-1">
              <strong>1.3.</strong> Este Código aplica-se a:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> sócios e administradores;</li>
              <li><strong>II –</strong> diretores e gestores;</li>
              <li><strong>III –</strong> colaboradores sob qualquer regime de contratação;</li>
              <li><strong>IV –</strong> prestadores de serviço e terceiros que atuem em nome da XD Capital.</li>
            </ul>
            <p className="pt-1">
              <strong>1.4.</strong> O cumprimento deste Código é obrigatório e constitui condição para a manutenção de qualquer vínculo com a XD Capital.
            </p>
          </section>

          {/* 2. VALORES E PRINCÍPIOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">2</span>
              <span>VALORES E PRINCÍPIOS</span>
            </h2>
            <p>A atuação da XD Capital é norteada pelos seguintes valores e princípios:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I – Integridade:</strong> agir com honestidade, retidão e transparência em todas as relações;</li>
              <li><strong>II – Conformidade:</strong> cumprir rigorosamente as leis, regulamentos e normas aplicáveis ao negócio, inclusive as Res. Conjunta 16 e 17/2025;</li>
              <li><strong>III – Transparência:</strong> comunicar-se de forma clara, precisa e tempestiva com clientes, parceiros e órgãos reguladores;</li>
              <li><strong>IV – Respeito e Inclusão:</strong> promover ambiente de trabalho seguro, diverso, livre de discriminação, assédio ou qualquer forma de violência;</li>
              <li><strong>V – Confidencialidade:</strong> proteger dados e informações sigilosas de clientes, parceiros e da própria empresa;</li>
              <li><strong>VI – Sustentabilidade:</strong> buscar o crescimento sustentável com responsabilidade social e governança sólida.</li>
            </ul>
          </section>

          {/* 3. CONFLITO DE INTERESSES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">3</span>
              <span>CONFLITO DE INTERESSES</span>
            </h2>
            <p>
              <strong>3.1.</strong> Configura-se conflito de interesses qualquer situação em que interesses pessoais, financeiros ou profissionais de um colaborador ou administrador possam influenciar indevidamente suas decisões em prejuízo da XD Capital, de seus clientes ou do Liquidante parceiro.
            </p>
            <p><strong>3.2.</strong> É dever de todos:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> identificar e declarar imediatamente situações de potencial ou real conflito de interesses à Administração;</li>
              <li><strong>II –</strong> abster-se de participar de decisões em que haja conflito de interesses;</li>
              <li><strong>III –</strong> não utilizar recursos, informações ou posição na XD Capital para obtenção de vantagem pessoal ou para terceiros;</li>
              <li><strong>IV –</strong> não exercer atividades profissionais concorrentes com as da XD Capital sem prévia autorização formal da Administração.</li>
            </ul>
            <p className="pt-2">
              <strong>3.3. Presentes e hospitalidades:</strong> é vedado aceitar ou oferecer presentes, vantagens, convites ou hospitalidades de clientes, fornecedores ou parceiros que possam influenciar ou aparentar influenciar decisões de negócios. Brindes de valor simbólico ou institucional são admitidos nos limites definidos pela Administração.
            </p>
          </section>

          {/* 4. RELAÇÃO COM CLIENTES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">4</span>
              <span>RELAÇÃO COM CLIENTES</span>
            </h2>
            <p>
              <strong>4.1.</strong> Na condição de correspondente bancário, a XD Capital atua na linha de frente do relacionamento com clientes e usuários finais dos produtos financeiros. É dever de todos os integrantes:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> prestar informações claras, completas e precisas sobre os produtos intermediados, incluindo tarifas, condições e limitações;</li>
              <li><strong>II –</strong> não realizar promessas de aprovação de crédito, limite ou produtos que dependam de análise exclusiva do Liquidante;</li>
              <li><strong>III –</strong> tratar todos os clientes com respeito, cortesia e sem discriminação de qualquer natureza;</li>
              <li><strong>IV –</strong> zelar pelo sigilo bancário e pela proteção dos dados pessoais dos clientes, nos termos da LGPD e desta Política;</li>
              <li><strong>V –</strong> orientar os clientes sobre os canais adequados de atendimento, suporte e ouvidoria;</li>
              <li><strong>VI –</strong> não induzir o cliente a erro sobre a natureza da atuação da XD Capital, esclarecendo expressamente sua condição de correspondente bancário e a identidade do Liquidante responsável pelos produtos financeiros.</li>
            </ul>
          </section>

          {/* 5. RELAÇÃO COM PARCEIROS E LIQUIDANTE */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">5</span>
              <span>RELAÇÃO COM PARCEIROS E LIQUIDANTE</span>
            </h2>
            <p>
              <strong>5.1.</strong> A relação com a Instituição de Pagamento Liquidante parceira rege-se pelos princípios da lealdade, boa-fé e transparência, observando:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> cumprimento integral das obrigações assumidas no Contrato de Correspondência;</li>
              <li><strong>II –</strong> cooperação plena nos procedimentos de due diligence, auditoria e fiscalização conduzidos pelo Liquidante;</li>
              <li><strong>III –</strong> fornecimento tempestivo e fidedigno de informações e documentos solicitados pelo Liquidante;</li>
              <li><strong>IV –</strong> reporte imediato ao Liquidante de qualquer situação atípica, incidente de segurança ou irregularidade identificada na operação;</li>
              <li><strong>V –</strong> observância das diretrizes operacionais e regulatórias comunicadas pelo Liquidante.</li>
            </ul>
            <p className="pt-2">
              <strong>5.2.</strong> É vedado praticar qualquer ato que possa comprometer a conformidade regulatória do Liquidante perante o Banco Central do Brasil ou demais autoridades.
            </p>
          </section>

          {/* 6. PREVENÇÃO À CORRUPÇÃO E PROPINA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">6</span>
              <span>PREVENÇÃO À CORRUPÇÃO E PROPINA</span>
            </h2>
            <p>
              <strong>6.1.</strong> A XD Capital adota tolerância zero com qualquer forma de corrupção, suborno, propina ou vantagem indevida, em conformidade com a Lei nº 12.846/2013 (Lei Anticorrupção) e a Lei nº 8.429/1992 (Lei de Improbidade Administrativa).
            </p>
            <p><strong>6.2.</strong> É expressamente vedado a qualquer colaborador, administrador ou terceiro que atue pela XD Capital:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> oferecer, prometer, dar, autorizar ou aceitar, direta ou indiretamente, qualquer vantagem indevida a agente público ou a pessoa a ele equiparada;</li>
              <li><strong>II –</strong> oferecer ou aceitar suborno ou propina no âmbito de relações comerciais privadas;</li>
              <li><strong>III –</strong> financiar, custear ou de qualquer forma patrocinar a prática de atos ilícitos;</li>
              <li><strong>IV –</strong> utilizar intermediários para ocultar ou dissimular o pagamento de vantagens indevidas.</li>
            </ul>
            <p className="pt-2">
              <strong>6.3.</strong> Qualquer tentativa ou proposta de recebimento ou pagamento de vantagem indevida deve ser comunicada imediatamente ao Canal de Denúncias da empresa.
            </p>
          </section>

          {/* 7. PREVENÇÃO À LAVAGEM DE DINHEIRO E FINANCIAMENTO DO TERRORISMO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">7</span>
              <span>PREVENÇÃO À LAVAGEM DE DINHEIRO E FINANCIAMENTO DO TERRORISMO</span>
            </h2>
            <p>
              <strong>7.1.</strong> Todos os colaboradores devem conhecer e aplicar a Política de PLD/FT da XD Capital, observando as seguintes condutas:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> executar rigorosamente os procedimentos de identificação de clientes (KYC) aplicáveis à sua função;</li>
              <li><strong>II –</strong> comunicar imediatamente ao Responsável PLD/FT qualquer operação, comportamento ou situação atípica identificada;</li>
              <li><strong>III –</strong> manter sigilo absoluto sobre comunicações de operações atípicas, sendo vedado alertar o cliente ou terceiros (vedação ao <em>tipping-off</em>);</li>
              <li><strong>IV –</strong> participar obrigatoriamente dos treinamentos periódicos de PLD/FT disponibilizados pela empresa.</li>
            </ul>
          </section>

          {/* 8. USO DE INFORMAÇÕES E SIGILO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">8</span>
              <span>USO DE INFORMAÇÕES E SIGILO</span>
            </h2>
            <p>
              <strong>8.1.</strong> Todas as informações de clientes, do Liquidante, de parceiros comerciais e da própria XD Capital às quais os colaboradores tenham acesso em razão de suas funções são estritamente confidenciais.
            </p>
            <p><strong>8.2.</strong> É dever de todos:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> utilizar informações confidenciais exclusivamente para os fins legítimos de sua atividade profissional;</li>
              <li><strong>II –</strong> não divulgar, reproduzir ou compartilhar informações confidenciais com pessoas não autorizadas, inclusive familiares e colegas sem necessidade de conhecimento;</li>
              <li><strong>III –</strong> observar as normas de segurança da informação e proteção de dados (LGPD);</li>
              <li><strong>IV –</strong> manter o dever de sigilo mesmo após o término do vínculo com a XD Capital.</li>
            </ul>
          </section>

          {/* 9. USO DOS ATIVOS E SISTEMAS DA EMPRESA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">9</span>
              <span>USO DOS ATIVOS E SISTEMAS DA EMPRESA</span>
            </h2>
            <p>
              <strong>9.1.</strong> Os bens, equipamentos, sistemas, canais de comunicação e recursos tecnológicos disponibilizados pela XD Capital destinam-se exclusivamente ao exercício das atividades profissionais.
            </p>
            <p><strong>9.2.</strong> É vedado:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> utilizar sistemas ou equipamentos da empresa para fins ilegais, imorais ou que violem este Código;</li>
              <li><strong>II –</strong> compartilhar credenciais individuais de acesso a sistemas internos ou do Liquidante;</li>
              <li><strong>III –</strong> instalar softwares não autorizados ou conectar dispositivos não homologados à rede da empresa;</li>
              <li><strong>IV –</strong> acessar, armazenar ou transmitir conteúdos discriminatórios, ofensivos ou pornográficos.</li>
            </ul>
            <p className="pt-2">
              <strong>9.3.</strong> A XD Capital reserva-se o direito de monitorar e auditar o uso de seus sistemas, e-mails e equipamentos corporativos, respeitada a legislação aplicável.
            </p>
          </section>

          {/* 10. RELAÇÕES COM ÓRGÃOS REGULADORES E AUTORIDADES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">10</span>
              <span>RELAÇÕES COM ÓRGÃOS REGULADORES E AUTORIDADES</span>
            </h2>
            <p>
              <strong>10.1.</strong> A XD Capital colabora com o Banco Central do Brasil, o COAF, a ANPD e demais autoridades públicas competentes, fornecendo informações verídicas, completas e tempestivas quando formalmente solicitadas, respeitados os fluxos contratuais e regulatórios definidos com o Liquidante parceiro.
            </p>
            <p>
              <strong>10.2.</strong> Nenhuma informação fornecida a autoridades regulatórias poderá ser omitida, alterada ou falsificada.
            </p>
          </section>

          {/* 11. CANAL DE DENÚNCIAS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">11</span>
              <span>CANAL DE DENÚNCIAS</span>
            </h2>
            <p>
              <strong>11.1.</strong> A XD Capital disponibiliza Canal de Denúncias confidencial, independente e acessível a colaboradores, parceiros e terceiros para reporte de qualquer conduta contrária a este Código, à legislação vigente ou às normas do Liquidante parceiro.
            </p>
            <p><strong>11.2.</strong> As denúncias podem ser realizadas de forma anônima ou identificada pelos seguintes canais:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I – E-mail:</strong> <a href="mailto:compliance@xdcapital.com.br" className="text-[#A3192E] underline">compliance@xdcapital.com.br</a></li>
              <li><strong>II – Formulário online confidencial</strong> disponível na Plataforma (abaixo).</li>
            </ul>
            <p className="pt-2"><strong>11.3.</strong> A XD Capital garante:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> confidencialidade absoluta da identidade do denunciante;</li>
              <li><strong>II –</strong> apuração imparcial e independente de todos os fatos reportados;</li>
              <li><strong>III –</strong> proibição expressa de qualquer ato de retaliação contra quem, de boa-fé, utilizar o Canal de Denúncias.</li>
            </ul>
          </section>

          {/* 12. PENALIDADES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">12</span>
              <span>PENALIDADES</span>
            </h2>
            <p>
              <strong>12.1.</strong> A violação deste Código constitui falta grave e sujeitará o infrator a sanções disciplinares, aplicadas de forma proporcional à gravidade da infração, sem prejuízo de responsabilização civil e criminal:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> advertência verbal ou formal;</li>
              <li><strong>II –</strong> suspensão;</li>
              <li><strong>III –</strong> demissão por justa causa (colaboradores celetistas);</li>
              <li><strong>IV –</strong> rescisão contratual imediata (prestadores de serviço, parceiros e terceiros);</li>
              <li><strong>V –</strong> comunicação às autoridades competentes e ao Liquidante parceiro, quando cabível.</li>
            </ul>
          </section>

          {/* 13. REVISÃO E VIGÊNCIA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">13</span>
              <span>REVISÃO E VIGÊNCIA</span>
            </h2>
            <p>
              <strong>13.1.</strong> Este Código será revisado anualmente ou sempre que necessário, para refletir alterações regulatórias, mudanças no modelo de negócio ou diretrizes do Liquidante parceiro.
            </p>
            <p>
              <strong>13.2.</strong> Este Código entra em vigor na data de sua aprovação formal pela Administração da XD Capital, aplicando-se a todos os integrantes a partir dessa data.
            </p>
          </section>
        </div>

        {/* Interactive Canal de Denúncias Form */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-12 shadow-sm mb-12">
          <div className="max-w-[700px] mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] text-[#A3192E] text-[12px] font-mono mb-3">
              CANAL DE DENÚNCIAS & ÉTICA
            </div>
            <h2 className="text-[24px] font-normal text-slate-900 tracking-[-0.02em] mb-2">
              Manifestação Confidencial
            </h2>
            <p className="text-[14.5px] text-slate-600 leading-relaxed">
              Reporte de desvios de conduta, suspeitas de fraude, violação das políticas internas ou da legislação. Você pode optar por manter seu anonimato absoluto.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-medium text-emerald-900">
                Relato registrado com sucesso
              </h3>
              <p className="text-[14px] text-emerald-700 max-w-md mx-auto">
                Seu relato foi encaminhado com sigilo integral ao Comitê de Ética e Compliance. Guarde o protocolo gerado para acompanhamento:
              </p>
              <div className="inline-block px-4 py-2 bg-white rounded-lg border border-emerald-300 font-mono text-[16px] text-emerald-800 font-bold tracking-wider">
                {protocol}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', involvement: '', description: '' });
                  }}
                  className="mt-4 text-[13.5px] text-emerald-800 underline font-medium cursor-pointer"
                >
                  Registrar outro relato
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[14px] font-medium text-slate-700">Forma de Identificação:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(true)}
                    className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      isAnonymous
                        ? 'bg-[#A3192E] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Anônimo (Sigilo Total)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(false)}
                    className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                      !isAnonymous
                        ? 'bg-[#A3192E] text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Identificado
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13.5px] font-medium text-slate-700 mb-2">
                  Tipo de Desvio ou Conduta *
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                >
                  <option value="codigo_conduta">Violação do Código de Conduta e Ética</option>
                  <option value="conflito_interesses">Conflito de Interesses</option>
                  <option value="corrupcao">Corrupção, Propina ou Vantagem Indevida</option>
                  <option value="pld_ft">Suspeita de Fraude, Lavagem de Dinheiro ou Financiamento ao Terrorismo</option>
                  <option value="sigilo_lgpd">Vazamento de Informações, Quebra de Sigilo ou LGPD</option>
                  <option value="assedio">Assédio Moral, Sexual ou Discriminação</option>
                  <option value="outros">Outras irregularidades operacionais</option>
                </select>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Nome opcional"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                      E-mail de Contato
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                  Quem está envolvido? (Nomes, áreas ou entidades)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Área comercial, terceiro prestador, etc."
                  value={formData.involvement}
                  onChange={(e) => setFormData({ ...formData, involvement: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                  Descrição dos Fatos *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Descreva com o máximo de detalhes possível as circunstâncias, datas aproximadas, evidências e comportamentos observados..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[12.5px] text-slate-500">
                  Canal institucional do Comitê de Ética: <strong className="text-slate-700">compliance@xdcapital.com.br</strong>
                </p>
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto text-[14.5px] px-7 py-3 cursor-pointer shrink-0"
                >
                  Registrar Denúncia
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Contact Card */}
        <div className="p-6 rounded-[20px] bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-normal text-slate-900">Comitê de Ética, Integridade e Compliance</div>
            <div className="text-[13.5px] text-slate-500 font-mono mt-0.5">compliance@xdcapital.com.br · ouvidoria@xdcapital.com.br</div>
          </div>
          <button
            onClick={() => onOpenContact('Contato com Comitê de Ética')}
            className="btn-secondary text-[14px] cursor-pointer"
          >
            Falar com Compliance
          </button>
        </div>
      </div>
    </div>
  );
};
