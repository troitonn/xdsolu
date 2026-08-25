import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome, onOpenContact }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0B0F19] pt-28 pb-20 px-6">
      <div className="max-w-[960px] mx-auto">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] border border-[#A3192E]/20 text-[#A3192E] text-[12px] font-mono mb-4">
            GOVERNANÇA & SEGURANÇA DA INFORMAÇÃO
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-normal text-[#0B0F19] tracking-[-0.035em] leading-[1.1] mb-4">
            Política de Privacidade
          </h1>
          <p className="text-[16.5px] text-slate-600 max-w-[760px] leading-relaxed">
            A XD Capital preza pela transparência, privacidade e proteção dos dados pessoais de seus clientes, parceiros e usuários, em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>
          <div className="text-[12.5px] text-slate-400 font-mono mt-3">
            Última atualização: Fevereiro de 2026 · Versão 2.4
          </div>
        </div>

        {/* Document Content Box */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-[15.5px] text-slate-700">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center">01</span>
              <span>Identificação do Controlador</span>
            </h2>
            <p>
              O presente documento rege o tratamento de dados pessoais realizado pela <strong>XD CAPITAL SERVIÇO DE INTERMEDIAÇÃO FINANCEIRA LTDA.</strong>, inscrita no CNPJ/MF sob o nº <strong>55.038.166/0001-99</strong>, com sede no Brasil, doravante denominada simplesmente como “XD Capital”.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center">02</span>
              <span>Dados Coletados e Finalidades</span>
            </h2>
            <p>
              Coletamos apenas os dados estritamente necessários para a execução dos serviços contratados, cumprimento de obrigações legais e regulatórias do Sistema Financeiro Nacional, e aprimoramento da experiência do usuário:
            </p>
            <ul className="space-y-2.5 list-disc pl-5 text-slate-600">
              <li><strong>Dados de Identificação e Contato:</strong> Nome completo, CPF, RG, Razão Social, CNPJ, e-mail corporativo, telefone e comprovante de endereço.</li>
              <li><strong>Dados Financeiros e Cadastrais:</strong> Dados bancários para liquidação, faturamento médio mensal, volume de transações e informações de empenhos ou contratos públicos para estruturação de crédito.</li>
              <li><strong>Dados de Conexão e Navegação:</strong> Endereço IP, data e hora de acesso, tipo de dispositivo e navegador, para fins de prevenção a fraudes e atendimento ao Marco Civil da Internet (Lei nº 12.965/2014).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center">03</span>
              <span>Bases Legais para o Tratamento</span>
            </h2>
            <p>
              Todo tratamento de dados realizado pela XD Capital encontra respaldo em uma das hipóteses legais previstas no art. 7º e art. 11 da LGPD, prioritariamente:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-[14px] bg-slate-50 border border-slate-200">
                <div className="text-[14.5px] font-normal text-slate-900 mb-1">Execução de Contrato</div>
                <div className="text-[13px] text-slate-500">Abertura de conta, análise de crédito e processamento de pagamentos.</div>
              </div>
              <div className="p-4 rounded-[14px] bg-slate-50 border border-slate-200">
                <div className="text-[14.5px] font-normal text-slate-900 mb-1">Cumprimento Legal e Regulatório</div>
                <div className="text-[13px] text-slate-500">Normas do Banco Central, COAF e Receita Federal (PLD/CFT).</div>
              </div>
              <div className="p-4 rounded-[14px] bg-slate-50 border border-slate-200">
                <div className="text-[14.5px] font-normal text-slate-900 mb-1">Prevenção a Fraudes e Segurança</div>
                <div className="text-[13px] text-slate-500">Garantia da segurança do titular e do Sistema Financeiro Nacional.</div>
              </div>
              <div className="p-4 rounded-[14px] bg-slate-50 border border-slate-200">
                <div className="text-[14.5px] font-normal text-slate-900 mb-1">Legítimo Interesse e Consentimento</div>
                <div className="text-[13px] text-slate-500">Comunicações sobre melhorias de produtos e atendimento personalizado.</div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center">04</span>
              <span>Compartilhamento com Terceiros</span>
            </h2>
            <p>
              A XD Capital não comercializa dados pessoais sob nenhuma hipótese. O compartilhamento ocorre estritamente com:
            </p>
            <ul className="space-y-2 list-disc pl-5 text-slate-600">
              <li>Instituições parceiras reguladas responsáveis pela liquidação financeira das contas de pagamento;</li>
              <li>Bureaus de crédito e plataformas de validação biométrica e antifraude;</li>
              <li>Órgãos públicos, autoridades regulatórias e judiciais, mediante determinação legal ou ordem judicial.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center">05</span>
              <span>Segurança da Informação e Retenção</span>
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração ou comunicação. Os dados são retidos durante a vigência da relação contratual e pelos prazos prescricionais legais aplicáveis (BACEN e Código Civil).
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-[20px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center">06</span>
              <span>Canal do Encarregado de Proteção de Dados (DPO)</span>
            </h2>
            <p>
              Para exercer seus direitos de confirmação de existência, acesso, correção ou eliminação de dados pessoais, o titular poderá entrar em contato com o nosso Encarregado:
            </p>
            <div className="p-5 rounded-[16px] bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[15px] font-normal text-slate-900">Encarregado de Dados (DPO) — XD Capital</div>
                <div className="text-[13.5px] text-slate-500 font-mono">dpo@xdcapital.com.br</div>
              </div>
              <button
                onClick={() => onOpenContact('Exercício de Direitos LGPD')}
                className="btn-primary text-[13.5px] !py-2 !px-4 cursor-pointer"
              >
                <span>Fazer Requisição</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
