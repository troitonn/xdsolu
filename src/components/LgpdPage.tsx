import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Send, FileText, Building2, UserCheck, AlertCircle } from 'lucide-react';

interface LgpdPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
}

export const LgpdPage: React.FC<LgpdPageProps> = ({ onBackToHome, onOpenContact }) => {
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState('confirmacao');
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    description: '',
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/lgpd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType,
        name: formData.name,
        document: formData.document,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.error || "Não foi possível enviar a solicitação."
      );
    }

    setSubmitted(true);

  } catch (error) {
    console.error("Erro ao enviar solicitação LGPD:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Não foi possível enviar a solicitação."
    );
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
              RESOLUÇÃO CONJUNTA BCB/CMN Nº 16 E Nº 17/2025 · LEI Nº 13.709/2018
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
            POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS PESSOAIS (LGPD)
          </h1>
          <p className="text-[16px] text-slate-600 font-normal leading-relaxed">
            Operando como Correspondente Bancário nos termos da Resolução Conjunta BCB/CMN nº 16 e nº 17/2025.
          </p>
          <div className="text-[12.5px] text-slate-400 font-mono mt-3">
            Vigência a partir de: 2026 · Versão 2.0 · Governança e Encarregado de Dados (DPO)
          </div>
        </div>

        {/* Main Document Box */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-[15px] sm:text-[15.5px] text-slate-700 mb-12">
          
          {/* 1. OBJETIVO E ABRANGÊNCIA */}
          <section className="space-y-3">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">1</span>
              <span>OBJETIVO E ABRANGÊNCIA</span>
            </h2>
            <p>
              <strong>1.1.</strong> A presente Política de Privacidade e Proteção de Dados Pessoais (&quot;Política&quot;) estabelece os princípios, diretrizes e procedimentos adotados pela <strong>XD CAPITAL SERVIÇO DE INTERMEDIAÇÃO FINANCEIRA LTDA.</strong>, inscrita no CNPJ sob nº <strong>55.038.166/0001-99</strong>, doravante denominada &quot;XD Capital&quot;, para o tratamento de dados pessoais de titulares com os quais mantém relação no exercício de suas atividades.
            </p>
            <p>
              <strong>1.2.</strong> A XD Capital atua como correspondente bancário e parceiro comercial de Instituição de Pagamento credenciada pelo Banco Central do Brasil (BCB), nos termos da Resolução Conjunta BCB/CMN nº 16/2025 e da Resolução Conjunta BCB/CMN nº 17/2025. Nessa condição, realiza coleta e tratamento de dados pessoais de usuários finais por instrução e nos limites definidos no Contrato de Correspondência firmado com a Instituição de Pagamento Liquidante parceira (&quot;Liquidante&quot;).
            </p>
            <p>
              <strong>1.3.</strong> Para fins desta Política, a XD Capital atua em dupla posição: (i) como operadora de dados na relação com usuários finais dos produtos financeiros intermediados, coletando e tratando dados pessoais por instrução do Liquidante; e (ii) como controladora de dados na relação com seus colaboradores, prestadores de serviço e parceiros comerciais.
            </p>
            <p className="pt-1">
              <strong>1.4.</strong> Esta Política aplica-se a:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> usuários finais dos produtos e serviços financeiros intermediados;</li>
              <li><strong>II –</strong> colaboradores e prestadores de serviço;</li>
              <li><strong>III –</strong> parceiros comerciais e contrapartes;</li>
              <li><strong>IV –</strong> visitantes dos canais digitais próprios.</li>
            </ul>
          </section>

          {/* 2. FUNDAMENTAÇÃO NORMATIVA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">2</span>
              <span>FUNDAMENTAÇÃO NORMATIVA</span>
            </h2>
            <p>
              <strong>2.1.</strong> Esta Política está alinhada aos seguintes diplomas normativos:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> Lei nº 13.709/2018 (Lei Geral de Proteção de Dados – LGPD);</li>
              <li><strong>II –</strong> Resolução CD/ANPD nº 2/2022 – Regulamento de fiscalização da ANPD;</li>
              <li><strong>III –</strong> Resolução Conjunta BCB/CMN nº 16/2025 – Regula o relacionamento entre Instituições de Pagamento e seus parceiros correspondentes;</li>
              <li><strong>IV –</strong> Resolução Conjunta BCB/CMN nº 17/2025 – Requisitos aplicáveis à distribuição de produtos financeiros em modelo BaaS;</li>
              <li><strong>V –</strong> Lei nº 9.613/1998 e regulamentação de PLD/FT que impõe retenção de dados por prazo mínimo de 5 (cinco) anos;</li>
              <li><strong>VI –</strong> Contrato de Correspondência firmado com o Liquidante parceiro, que define o escopo do tratamento de dados de usuários finais.</li>
            </ul>
          </section>

          {/* 3. DEFINIÇÕES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">3</span>
              <span>DEFINIÇÕES</span>
            </h2>
            <p>Para fins desta Política, aplicam-se as seguintes definições:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I – Dado pessoal:</strong> informação relacionada a pessoa natural identificada ou identificável;</li>
              <li><strong>II – Dado pessoal sensível:</strong> dado sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural;</li>
              <li><strong>III – Titular:</strong> pessoa natural a quem se referem os dados objeto de tratamento;</li>
              <li><strong>IV – Controlador:</strong> pessoa natural ou jurídica que toma as decisões referentes ao tratamento de dados pessoais;</li>
              <li><strong>V – Operador:</strong> pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do controlador;</li>
              <li><strong>VI – Tratamento:</strong> toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, armazenamento, eliminação, entre outras;</li>
              <li><strong>VII – Encarregado (DPO):</strong> pessoa indicada pelo controlador ou operador para atuar como canal de comunicação entre o controlador, os titulares e a ANPD;</li>
              <li><strong>VIII – Liquidante:</strong> Instituição de Pagamento parceira, credenciada pelo BCB, com a qual a XD Capital mantém Contrato de Correspondência.</li>
            </ul>
          </section>

          {/* 4. POSIÇÃO DA EMPRESA NO TRATAMENTO DE DADOS */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">4</span>
              <span>POSIÇÃO DA EMPRESA NO TRATAMENTO DE DADOS</span>
            </h2>

            <div className="space-y-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">4.1 Como Operadora – Dados de Usuários Finais</h3>
              <p>
                <strong>4.1.1.</strong> Na intermediação de produtos e serviços financeiros, a XD Capital coleta e trata dados pessoais de usuários finais por instrução do Liquidante, que atua como controlador dessa relação de tratamento.
              </p>
              <p>
                <strong>4.1.2.</strong> O escopo dos dados coletados, as finalidades de tratamento, os prazos de retenção e as condições de compartilhamento com o Liquidante são definidos no Contrato de Correspondência. A XD Capital não amplia esse escopo por iniciativa própria.
              </p>
              <p>
                <strong>4.1.3.</strong> Os direitos dos titulares de dados de usuários finais são exercidos perante o Liquidante, na qualidade de controlador. A XD Capital coopera com o atendimento dessas solicitações quando formalmente demandada pelo Liquidante.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">4.2 Como Controladora – Dados de Colaboradores e Parceiros</h3>
              <p>
                <strong>4.2.1.</strong> A XD Capital atua como controladora no tratamento de dados pessoais de seus colaboradores, prestadores de serviço e parceiros comerciais, definindo as finalidades e os meios de tratamento de forma autônoma, nos limites da legislação aplicável.
              </p>
            </div>
          </section>

          {/* 5. BASES LEGAIS E FINALIDADES DO TRATAMENTO */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">5</span>
              <span>BASES LEGAIS E FINALIDADES DO TRATAMENTO</span>
            </h2>
            <p>
              <strong>5.1.</strong> Todo tratamento de dados realizado pela XD Capital está fundamentado em ao menos uma das bases legais previstas no art. 7º da LGPD, conforme descrito abaixo:
            </p>

            <div className="space-y-2">
              <h3 className="text-[16px] font-medium text-slate-800">5.1 Dados de Usuários Finais (como Operadora)</h3>
              <ul className="space-y-2 list-none pl-2 text-slate-600">
                <li><strong>I – Execução de contrato (art. 7º, V LGPD):</strong> onboarding, abertura de conta, validação de identidade e operação dos produtos financeiros intermediados;</li>
                <li><strong>II – Obrigação legal ou regulatória (art. 7º, II LGPD):</strong> cumprimento das Res. Conjunta 16 e 17/2025, legislação de PLD/FT e demais normas do BCB e COAF;</li>
                <li><strong>III – Legítimo interesse do controlador (art. 7º, IX LGPD):</strong> prevenção a fraudes e segurança das transações, nos limites definidos pelo Liquidante.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">5.2 Dados de Colaboradores e Parceiros (como Controladora)</h3>
              <ul className="space-y-2 list-none pl-2 text-slate-600">
                <li><strong>I – Execução de contrato (art. 7º, V LGPD):</strong> gestão de vínculos trabalhistas, prestação de serviços e relações comerciais;</li>
                <li><strong>II – Obrigação legal (art. 7º, II LGPD):</strong> cumprimento de obrigações trabalhistas, previdenciárias e fiscais;</li>
                <li><strong>III – Legítimo interesse (art. 7º, IX LGPD):</strong> gestão operacional, segurança e compliance interno.</li>
              </ul>
            </div>
          </section>

          {/* 6. CATEGORIAS DE DADOS TRATADOS */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">6</span>
              <span>CATEGORIAS DE DADOS TRATADOS</span>
            </h2>

            <div className="space-y-2">
              <h3 className="text-[16px] font-medium text-slate-800">6.1 Usuários Finais</h3>
              <p>Os dados coletados no âmbito do Contrato de Correspondência incluem, conforme definido pelo Liquidante:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I – Dados de identificação:</strong> nome completo, CPF, RG, data de nascimento, filiação;</li>
                <li><strong>II – Dados de contato:</strong> endereço, telefone, e-mail;</li>
                <li><strong>III – Dados financeiros:</strong> renda declarada, origem de recursos, movimentações financeiras;</li>
                <li><strong>IV – Dados de autenticação:</strong> biometria facial, assinatura eletrônica, selfie para validação de identidade;</li>
                <li><strong>V – Dados de PLD/FT:</strong> informações exigidas para cumprimento das obrigações de prevenção à lavagem de dinheiro.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">6.2 Colaboradores e Parceiros</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> Dados de identificação e contato;</li>
                <li><strong>II –</strong> Dados trabalhistas e previdenciários;</li>
                <li><strong>III –</strong> Dados bancários para pagamento;</li>
                <li><strong>IV –</strong> Dados de acesso a sistemas internos.</li>
              </ul>
            </div>
          </section>

          {/* 7. COMPARTILHAMENTO DE DADOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">7</span>
              <span>COMPARTILHAMENTO DE DADOS</span>
            </h2>
            <p>
              <strong>7.1.</strong> A XD Capital compartilha dados pessoais de usuários finais com o Liquidante nos termos e limites do Contrato de Correspondência, com base nas obrigações legais e regulatórias decorrentes das Res. Conjunta BCB/CMN nº 16 e nº 17/2025.
            </p>
            <p>
              <strong>7.2.</strong> Quando o tratamento de dados for realizado por meio de sistema ou plataforma tecnológica de terceiro (&quot;Operador Tecnológico&quot;), a XD Capital assegurará que esse terceiro ofereça garantias suficientes de conformidade com a LGPD, formalizadas em instrumento contratual adequado.
            </p>
            <p><strong>7.3.</strong> Não haverá compartilhamento de dados pessoais com terceiros fora das hipóteses previstas nesta Política, salvo:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> por determinação legal ou regulatória;</li>
              <li><strong>II –</strong> por ordem judicial ou administrativa;</li>
              <li><strong>III –</strong> com consentimento expresso do titular, quando aplicável.</li>
            </ul>
            <p className="pt-1">
              <strong>7.4.</strong> É vedada a venda ou cessão onerosa de dados pessoais a terceiros para fins comerciais.
            </p>
          </section>

          {/* 8. RETENÇÃO E DESCARTE DE DADOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">8</span>
              <span>RETENÇÃO E DESCARTE DE DADOS</span>
            </h2>
            <p>
              <strong>8.1.</strong> Os dados pessoais tratados pela XD Capital serão retidos pelo tempo necessário ao cumprimento das finalidades que motivaram sua coleta, observados os seguintes prazos mínimos:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I – Dados de usuários finais relacionados a PLD/FT:</strong> mínimo de 5 (cinco) anos após o encerramento do relacionamento, nos termos da Lei nº 9.613/1998 e regulamentação do BCB;</li>
              <li><strong>II – Dados de usuários finais relacionados à execução do contrato de correspondência:</strong> conforme definido pelo Liquidante no Contrato de Correspondência;</li>
              <li><strong>III – Dados de colaboradores:</strong> conforme obrigações trabalhistas e previdenciárias aplicáveis;</li>
              <li><strong>IV – Dados de parceiros e prestadores:</strong> pelo prazo contratual acrescido do prazo prescricional aplicável.</li>
            </ul>
            <p className="pt-1">
              <strong>8.2.</strong> Decorridos os prazos de retenção e não havendo obrigação legal de manutenção, os dados serão eliminados de forma segura ou anonimizados, conforme os procedimentos internos da XD Capital.
            </p>
            <p>
              <strong>8.3.</strong> A eliminação de dados de usuários finais observará previamente a anuência do Liquidante, dado seu papel de controlador nessa relação de tratamento.
            </p>
          </section>

          {/* 9. DIREITOS DOS TITULARES */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">9</span>
              <span>DIREITOS DOS TITULARES</span>
            </h2>
            <p>
              <strong>9.1.</strong> São assegurados aos titulares de dados pessoais os direitos previstos no art. 18 da LGPD, incluindo:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14.5px] text-slate-600 pl-2">
              <li><strong>I –</strong> confirmação da existência de tratamento;</li>
              <li><strong>II –</strong> acesso aos dados;</li>
              <li><strong>III –</strong> correção de dados incompletos, inexatos ou desatualizados;</li>
              <li><strong>IV –</strong> anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li><strong>V –</strong> portabilidade dos dados;</li>
              <li><strong>VI –</strong> eliminação dos dados tratados com consentimento;</li>
              <li><strong>VII –</strong> informação sobre compartilhamento;</li>
              <li><strong>VIII –</strong> revogação do consentimento.</li>
            </ul>
            <p className="pt-2">
              <strong>9.2. Limitações regulatórias aplicáveis:</strong> o exercício dos direitos acima poderá ser limitado nas seguintes hipóteses:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> quando o dado for necessário ao cumprimento de obrigação legal ou regulatória incluindo PLD/FT e normas do BCB a eliminação não será possível durante o prazo de retenção obrigatório;</li>
              <li><strong>II –</strong> quando a eliminação comprometer a execução do Contrato de Correspondência ou a prestação do serviço financeiro ao próprio titular;</li>
              <li><strong>III –</strong> quando o dado estiver sob custódia do Liquidante na qualidade de controlador nesse caso, a solicitação deverá ser direcionada diretamente ao Liquidante.</li>
            </ul>
            <p className="pt-1">
              <strong>9.3.</strong> As solicitações de titulares devem ser encaminhadas ao Encarregado (DPO) pelo e-mail <a href="mailto:privacidade@xdcapital.com.br" className="text-[#A3192E] underline">privacidade@xdcapital.com.br</a>. O prazo de resposta é de até 15 (quinze) dias corridos, prorrogável por igual período mediante justificativa.
            </p>
          </section>

          {/* 10. SEGURANÇA DA INFORMAÇÃO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">10</span>
              <span>SEGURANÇA DA INFORMAÇÃO</span>
            </h2>
            <p>
              <strong>10.1.</strong> A XD Capital adota medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acesso não autorizado, destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado.
            </p>
            <p><strong>10.2.</strong> As medidas de segurança incluem, sem limitação:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> controle de acesso por perfil e credenciais individuais;</li>
              <li><strong>II –</strong> criptografia de dados em trânsito e em repouso, quando aplicável;</li>
              <li><strong>III –</strong> monitoramento de acessos e logs auditáveis;</li>
              <li><strong>IV –</strong> treinamento periódico de colaboradores;</li>
              <li><strong>V –</strong> gestão de terceiros operadores com exigências contratuais de segurança.</li>
            </ul>
            <p className="pt-1">
              <strong>10.3.</strong> As medidas de segurança são revisadas periodicamente e alinhadas às diretrizes de segurança da informação do Liquidante parceiro quando aplicável ao escopo do Contrato de Correspondência.
            </p>
          </section>

          {/* 11. INCIDENTES DE SEGURANÇA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">11</span>
              <span>INCIDENTES DE SEGURANÇA</span>
            </h2>
            <p>
              <strong>11.1.</strong> Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos titulares, a XD Capital adotará as seguintes providências:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> contenção imediata do incidente;</li>
              <li><strong>II –</strong> avaliação do impacto e dos titulares afetados;</li>
              <li><strong>III –</strong> comunicação ao Liquidante parceiro, dado seu papel de controlador na relação com usuários finais;</li>
              <li><strong>IV –</strong> comunicação à ANPD e aos titulares afetados, nos prazos legais, quando o incidente envolver dados tratados na qualidade de controladora;</li>
              <li><strong>V –</strong> registro documentado do incidente e das medidas adotadas.</li>
            </ul>
          </section>

          {/* 12. ENCARREGADO PELO TRATAMENTO DE DADOS (DPO) */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">12</span>
              <span>ENCARREGADO PELO TRATAMENTO DE DADOS (DPO)</span>
            </h2>
            <p>
              <strong>12.1.</strong> A XD Capital designará formalmente um Encarregado pelo Tratamento de Dados (DPO), responsável por:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> atuar como canal de comunicação entre a empresa, os titulares e a ANPD;</li>
              <li><strong>II –</strong> orientar colaboradores e prestadores de serviço sobre práticas de proteção de dados;</li>
              <li><strong>III –</strong> receber e dar tratamento às solicitações e reclamações de titulares;</li>
              <li><strong>IV –</strong> zelar pelo cumprimento desta Política e da LGPD.</li>
            </ul>
            <p className="pt-2">
              <strong>12.2.</strong> O Encarregado pode ser contactado pelo e-mail <a href="mailto:privacidade@xdcapital.com.br" className="text-[#A3192E] font-medium underline">privacidade@xdcapital.com.br</a> ou pelos demais canais de atendimento disponibilizados pela XD Capital.
            </p>
          </section>

          {/* 13. TRANSFERÊNCIA INTERNACIONAL DE DADOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">13</span>
              <span>TRANSFERÊNCIA INTERNACIONAL DE DADOS</span>
            </h2>
            <p>
              <strong>13.1.</strong> Caso a XD Capital ou seus operadores tecnológicos realizem transferência internacional de dados pessoais, tal transferência somente ocorrerá para países ou organismos internacionais que proporcionem grau de proteção de dados pessoais adequado ao previsto na LGPD, ou mediante as garantias previstas no art. 33 da LGPD.
            </p>
          </section>

          {/* 14. REVISÃO E VIGÊNCIA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">14</span>
              <span>REVISÃO E VIGÊNCIA</span>
            </h2>
            <p>
              <strong>14.1.</strong> Esta Política será revisada anualmente ou sempre que necessário, especialmente em razão de: alteração regulatória, mudança no modelo de negócio, atualização dos requisitos do Liquidante parceiro, ou resultado de auditorias e avaliações internas.
            </p>
            <p>
              <strong>14.2.</strong> Esta Política entra em vigor na data de sua aprovação formal pela Administração da XD Capital, substituindo quaisquer versões anteriores.
            </p>
          </section>
        </div>

        {/* Portal de Atendimento ao Titular de Dados (Formulário DPO) */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-12 shadow-sm mb-12">
          <div className="max-w-[700px] mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] text-[#A3192E] text-[12px] font-mono mb-3">
              CANAL DIRETO DPO
            </div>
            <h2 className="text-[24px] font-normal text-slate-900 tracking-[-0.02em] mb-2">
              Exercício de Direitos do Titular (Art. 18 LGPD)
            </h2>
            <p className="text-[14.5px] text-slate-600 leading-relaxed">
              Utilize o canal abaixo para solicitar confirmação, acesso, retificação ou esclarecimentos sobre seus dados pessoais diretamente com o Encarregado pelo Tratamento de Dados (DPO) da XD Capital.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-medium text-emerald-900">
                Solicitação enviada com sucesso ao DPO
              </h3>
              <p className="text-[14px] text-emerald-700 max-w-md mx-auto">
                Sua requisição foi registrada com protocolo auditável. Conforme o Art. 19 da LGPD, o Encarregado responderá em até 15 dias corridos no e-mail informado.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-[13.5px] text-emerald-800 underline font-medium cursor-pointer"
              >
                Enviar nova solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[13.5px] font-medium text-slate-700 mb-2">
                  Tipo de Solicitação *
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                >
                  <option value="confirmacao">Confirmação da existência de tratamento de dados</option>
                  <option value="acesso">Acesso aos meus dados pessoais cadastrados</option>
                  <option value="correcao">Correção de dados incompletos, inexatos ou desatualizados</option>
                  <option value="anonimizacao">Anonimização, bloqueio ou eliminação de dados</option>
                  <option value="compartilhamento">Informações sobre entidades públicas/privadas com quem houve compartilhamento</option>
                  <option value="revogacao">Revogação do consentimento</option>
                  <option value="duvidas">Outras dúvidas sobre a Política de Privacidade</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                    CPF ou CNPJ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={formData.document}
                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                    E-mail para resposta *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@empresa.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                    Telefone de Contato
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

              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                  Detalhamento da Solicitação *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Descreva detalhadamente a sua manifestação referente aos seus dados pessoais..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-[14.5px] text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A3192E]/20 focus:border-[#A3192E] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[12.5px] text-slate-500">
                  Canal institucional do Encarregado pelo Tratamento de Dados (DPO): <strong className="text-slate-700">privacidade@xdcapital.com.br</strong>
                </p>
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto text-[14.5px] px-7 py-3 cursor-pointer shrink-0"
                >
                  Enviar Requerimento
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Contact Card */}
        <div className="p-6 rounded-[20px] bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-normal text-slate-900">Encarregado pelo Tratamento de Dados (DPO)</div>
            <div className="text-[13.5px] text-slate-500 font-mono mt-0.5">privacidade@xdcapital.com.br · compliance@xdcapital.com.br</div>
          </div>
          <button
            onClick={() => onOpenContact('Dúvidas sobre LGPD e Dados Pessoais')}
            className="btn-secondary text-[14px] cursor-pointer"
          >
            Falar com Compliance
          </button>
        </div>
      </div>
    </div>
  );
};
