import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, Building2, Lock, ArrowRight, ExternalLink } from 'lucide-react';

interface TermsOfUsePageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
  onOpenOpenAccount?: () => void;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({
  onBackToHome,
  onOpenContact,
  onOpenOpenAccount,
}) => {
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
              RESOLUÇÃO CONJUNTA BCB/CMN Nº 16 E Nº 17/2025
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
            TERMOS E CONDIÇÕES DE USO
          </h1>
          <p className="text-[16px] text-slate-600 font-normal leading-relaxed">
            Plataforma de Serviços Financeiros Digitais · Operando como Correspondente Bancário nos termos da Resolução Conjunta BCB/CMN nº 16 e nº 17/2025.
          </p>
          <div className="text-[12.5px] text-slate-400 font-mono mt-3">
            Vigência a partir de: 2026 · Versão 2.0 · Governança e Compliance XD Capital
          </div>
        </div>

        {/* Document Content Box */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-12 shadow-sm space-y-10 leading-relaxed text-[15px] sm:text-[15.5px] text-slate-700 mb-12">
          
          {/* 1. PARTES E ACEITAÇÃO */}
          <section className="space-y-3">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">1</span>
              <span>PARTES E ACEITAÇÃO</span>
            </h2>
            <p>
              <strong>1.1.</strong> Os presentes Termos e Condições de Uso (&quot;Termos&quot;) regulam a relação entre <strong>XD CAPITAL SERVIÇO DE INTERMEDIAÇÃO FINANCEIRA LTDA.</strong>, inscrita no CNPJ sob nº <strong>55.038.166/0001-99</strong>, doravante denominada &quot;XD Capital&quot;, e o usuário que acessa ou utiliza a plataforma de serviços financeiros digitais disponibilizada por meio dos canais digitais da XD Capital (&quot;Plataforma&quot;).
            </p>
            <p>
              <strong>1.2.</strong> A XD Capital atua como correspondente bancário de Instituição de Pagamento devidamente autorizada pelo Banco Central do Brasil (BCB), nos termos da Resolução Conjunta BCB/CMN nº 16/2025 e da Resolução Conjunta BCB/CMN nº 17/2025. Os produtos e serviços financeiros disponibilizados na Plataforma são emitidos e operados pela Instituição de Pagamento Liquidante parceira (&quot;Liquidante&quot;), sendo a XD Capital responsável pela intermediação, distribuição e atendimento ao usuário.
            </p>
            <p>
              <strong>1.3.</strong> O acesso à Plataforma e a utilização de quaisquer serviços implica a leitura, compreensão e aceitação integral destes Termos. Caso o usuário não concorde com qualquer disposição, deverá abster-se de utilizar os serviços.
            </p>
            <p>
              <strong>1.4.</strong> O usuário declara ter capacidade civil plena para contratar. Para pessoas jurídicas, o representante que realiza o cadastro declara ter poderes suficientes para vincular a empresa.
            </p>
          </section>

          {/* 2. DEFINIÇÕES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">2</span>
              <span>DEFINIÇÕES</span>
            </h2>
            <p>Para fins destes Termos, aplicam-se as seguintes definições:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I — XD Capital:</strong> correspondente bancário responsável pela intermediação e distribuição dos serviços financeiros descritos nestes Termos;</li>
              <li><strong>II — Liquidante:</strong> Instituição de Pagamento autorizada pelo BCB, parceira da XD Capital, responsável pela emissão, operação e liquidação dos produtos financeiros;</li>
              <li><strong>III — Usuário:</strong> pessoa física ou jurídica que realiza cadastro na Plataforma e utiliza os serviços disponíveis;</li>
              <li><strong>IV — Conta de Pagamento:</strong> conta mantida pelo Liquidante em nome do usuário, por meio da qual são realizadas as transações financeiras;</li>
              <li><strong>V — Plataforma:</strong> conjunto de aplicativos, sites, sistemas e demais canais digitais por meio dos quais os serviços são acessados;</li>
              <li><strong>VI — Serviços:</strong> todos os produtos e funcionalidades financeiras disponibilizadas ao usuário, conforme descritos na Cláusula 4.</li>
            </ul>
          </section>

          {/* 3. CADASTRO E ONBOARDING DIGITAL */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">3</span>
              <span>CADASTRO E ONBOARDING DIGITAL</span>
            </h2>
            <p>
              <strong>3.1.</strong> O acesso aos serviços requer cadastro prévio na Plataforma, realizado exclusivamente por meio digital, sem necessidade de assinatura física ou presença em agência.
            </p>
            <p><strong>3.2.</strong> O processo de cadastro inclui:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> fornecimento de dados pessoais e documentais para identificação e verificação de identidade (KYC), conforme exigido pela legislação de PLD/FT e pelas normas do BCB;</li>
              <li><strong>II –</strong> validação de identidade por biometria facial ou tecnologia equivalente;</li>
              <li><strong>III –</strong> aceite eletrônico dos presentes Termos e da Política de Privacidade;</li>
              <li><strong>IV –</strong> análise e aprovação cadastral pelo Liquidante, que detém a decisão final sobre abertura da Conta de Pagamento.</li>
            </ul>
            <p className="pt-2">
              <strong>3.3.</strong> O usuário é responsável pela veracidade, exatidão e atualização das informações fornecidas no cadastro. O fornecimento de informações falsas ou incompletas poderá resultar no bloqueio ou encerramento da conta.
            </p>
            <p>
              <strong>3.4.</strong> A XD Capital e o Liquidante reservam-se o direito de recusar, suspender ou encerrar cadastros que não atendam aos requisitos regulatórios ou que apresentem inconsistências nas informações fornecidas, sem obrigação de justificativa ao usuário, observada a legislação aplicável.
            </p>
            <p>
              <strong>3.5.</strong> O usuário é responsável pela guarda e confidencialidade de suas credenciais de acesso (login, senha, PIN, biometria). Qualquer acesso realizado com suas credenciais será presumido como realizado pelo próprio usuário.
            </p>
          </section>

          {/* 4. SERVIÇOS DISPONÍVEIS */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">4</span>
              <span>SERVIÇOS DISPONÍVEIS</span>
            </h2>
            <p>
              <strong>4.1.</strong> A Plataforma da XD Capital, em parceria com o Liquidante, disponibiliza os seguintes serviços ao usuário:
            </p>

            <div className="space-y-2 pl-2">
              <h3 className="text-[16px] font-medium text-slate-800">4.1 Conta de Pagamento</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> abertura e manutenção de conta de pagamento pós-paga ou pré-paga, conforme modalidade contratada;</li>
                <li><strong>II –</strong> visualização de saldo, extrato e movimentações;</li>
                <li><strong>III –</strong> recebimento de créditos por depósito ou transferência.</li>
              </ul>
            </div>

            <div className="space-y-2 pl-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">4.2 Pix</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> envio e recebimento de transferências instantâneas por meio do Pix, conforme regulamentação do BCB;</li>
                <li><strong>II –</strong> cadastro e gestão de chaves Pix;</li>
                <li><strong>III –</strong> Pix Agendado, quando disponível.</li>
              </ul>
            </div>

            <div className="space-y-2 pl-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">4.3 TED e Boleto</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> realização de transferências via TED para contas em outras instituições financeiras;</li>
                <li><strong>II –</strong> emissão e pagamento de boletos bancários.</li>
              </ul>
            </div>

            <div className="space-y-2 pl-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">4.4 Pagamento de Contas</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> pagamento de contas de consumo, tributos, guias e demais cobranças com código de barras ou QR Code;</li>
                <li><strong>II –</strong> agendamento de pagamentos.</li>
              </ul>
            </div>

            <div className="space-y-2 pl-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">4.5 Transações entre Contas</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> transferência imediata entre contas da mesma Plataforma, sem custo adicional.</li>
              </ul>
            </div>

            <div className="space-y-2 pl-2 pt-2">
              <h3 className="text-[16px] font-medium text-slate-800">4.6 Cartão</h3>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> emissão de cartão de débito e/ou pré-pago, físico ou virtual, vinculado à Conta de Pagamento, sujeito à aprovação e disponibilidade;</li>
                <li><strong>II –</strong> utilização do cartão para compras nacionais e internacionais nas redes de credenciamento habilitadas pelo Liquidante;</li>
                <li><strong>III –</strong> bloqueio, desbloqueio e cancelamento do cartão por meio da Plataforma.</li>
              </ul>
            </div>

            <p className="pt-2 text-slate-600">
              <strong>4.7.</strong> A disponibilidade de cada serviço poderá variar conforme o perfil do usuário, a modalidade de conta contratada e a política operacional do Liquidante. A XD Capital comunicará previamente alterações relevantes nos serviços disponíveis.
            </p>
          </section>

          {/* 5. TARIFAS E ENCARGOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">5</span>
              <span>TARIFAS E ENCARGOS</span>
            </h2>
            <p>
              <strong>5.1.</strong> As tarifas aplicáveis aos serviços estão descritas na Tabela de Tarifas disponível dentro da Plataforma, na área de tarifas e encargos, atualizadas periodicamente.
            </p>
            <p>
              <strong>5.2.</strong> A contratação de qualquer serviço sujeito a tarifa implica a concordância do usuário com os valores vigentes no momento da transação.
            </p>
            <p>
              <strong>5.3.</strong> Alterações nas tarifas serão comunicadas ao usuário com antecedência mínima de 30 (trinta) dias, por meio dos canais de comunicação da XD Capital. O uso continuado da Plataforma após o prazo de comunicação implica aceitação dos novos valores.
            </p>
            <p>
              <strong>5.4.</strong> Tarifas do Liquidante relativas à operação da Conta de Pagamento seguem o contrato celebrado entre o usuário e o Liquidante, disponível nos canais do Liquidante.
            </p>
          </section>

          {/* 6. RESPONSABILIDADES */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">6</span>
              <span>RESPONSABILIDADES</span>
            </h2>

            <div className="space-y-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">6.1 Responsabilidades da XD Capital</h3>
              <p><strong>6.1.1.</strong> A XD Capital é responsável por:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> intermediação e distribuição dos serviços financeiros do Liquidante;</li>
                <li><strong>II –</strong> atendimento ao usuário nos canais disponibilizados;</li>
                <li><strong>III –</strong> coleta e transmissão segura dos dados do usuário ao Liquidante, conforme a Política de Privacidade;</li>
                <li><strong>IV –</strong> manutenção e disponibilidade da Plataforma, ressalvadas hipóteses de caso fortuito, força maior ou manutenção programada.</li>
              </ul>
              <p className="pt-2"><strong>6.1.2.</strong> A XD Capital não é responsável por:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> decisões de crédito, aprovação de conta ou bloqueio realizados pelo Liquidante;</li>
                <li><strong>II –</strong> falhas nos sistemas do Liquidante, das bandeiras de cartão ou da infraestrutura do Pix/SPB;</li>
                <li><strong>III –</strong> perdas decorrentes de uso indevido das credenciais pelo próprio usuário ou por terceiros com acesso autorizado pelo usuário.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">6.2 Responsabilidades do Usuário</h3>
              <p><strong>6.2.1.</strong> O usuário é responsável por:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> fornecer informações verdadeiras e mantê-las atualizadas;</li>
                <li><strong>II –</strong> utilizar os serviços em conformidade com a legislação aplicável e com estes Termos;</li>
                <li><strong>III –</strong> guardar sigilo de suas credenciais de acesso;</li>
                <li><strong>IV –</strong> comunicar imediatamente qualquer suspeita de acesso não autorizado à sua conta;</li>
                <li><strong>V –</strong> não utilizar a Plataforma para atividades ilícitas, incluindo lavagem de dinheiro, financiamento do terrorismo ou qualquer atividade vedada pela legislação brasileira.</li>
              </ul>
            </div>
          </section>

          {/* 7. SUSPENSÃO E ENCERRAMENTO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">7</span>
              <span>SUSPENSÃO E ENCERRAMENTO</span>
            </h2>
            <p>
              <strong>7.1.</strong> A XD Capital ou o Liquidante poderão suspender ou encerrar o acesso do usuário à Plataforma nas seguintes hipóteses:
            </p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> descumprimento de qualquer disposição destes Termos;</li>
              <li><strong>II –</strong> suspeita de fraude, lavagem de dinheiro ou financiamento do terrorismo;</li>
              <li><strong>III –</strong> determinação de autoridade regulatória ou judicial;</li>
              <li><strong>IV –</strong> fornecimento de informações falsas no cadastro;</li>
              <li><strong>V –</strong> inatividade prolongada, conforme política operacional vigente.</li>
            </ul>
            <p className="pt-2">
              <strong>7.2.</strong> O encerramento voluntário da conta pelo usuário pode ser solicitado a qualquer momento pelos canais de atendimento, observadas as obrigações financeiras pendentes.
            </p>
            <p>
              <strong>7.3.</strong> O encerramento da conta não extingue obrigações financeiras já assumidas pelo usuário.
            </p>
          </section>

          {/* 8. PRIVACIDADE E PROTEÇÃO DE DADOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">8</span>
              <span>PRIVACIDADE E PROTEÇÃO DE DADOS</span>
            </h2>
            <p>
              <strong>8.1.</strong> O tratamento de dados pessoais do usuário é realizado nos termos da Política de Privacidade da XD Capital, disponível em <a href="#lgpd" className="text-[#A3192E] underline">www.xdcapital.com.br/privacidade</a>, em conformidade com a Lei nº 13.709/2018 (LGPD).
            </p>
            <p>
              <strong>8.2.</strong> Ao utilizar a Plataforma, o usuário consente com o compartilhamento de seus dados com o Liquidante, na medida necessária para a prestação dos serviços e cumprimento das obrigações regulatórias.
            </p>
          </section>

          {/* 9. CANAIS DE ATENDIMENTO E OUVIDORIA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">9</span>
              <span>CANAIS DE ATENDIMENTO E OUVIDORIA</span>
            </h2>
            <p><strong>9.1.</strong> O usuário poderá contatar a XD Capital pelos seguintes canais:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I – E-mail:</strong> <a href="mailto:atendimento@xdcapital.com.br" className="text-[#A3192E] underline">atendimento@xdcapital.com.br</a></li>
              <li><strong>II – WhatsApp/Chat:</strong> (11) 99999-9999 (horário comercial, dias úteis)</li>
            </ul>
            <p className="pt-2">
              <strong>9.2.</strong> Reclamações não solucionadas nos canais de atendimento poderão ser direcionadas ao Liquidante ou ao Banco Central do Brasil, por meio do portal <a href="https://www.bcb.gov.br" target="_blank" rel="noopener noreferrer" className="text-[#A3192E] underline inline-flex items-center gap-1">www.bcb.gov.br <ExternalLink className="w-3.5 h-3.5" /></a>.
            </p>
            <p>
              <strong>9.3.</strong> O prazo de resposta para solicitações e reclamações é de até 5 (cinco) dias úteis, podendo ser prorrogado para casos de maior complexidade.
            </p>
          </section>

          {/* 10. PROPRIEDADE INTELECTUAL */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">10</span>
              <span>PROPRIEDADE INTELECTUAL</span>
            </h2>
            <p>
              <strong>10.1.</strong> Todos os elementos da Plataforma, incluindo marca, logotipo, design, textos, imagens e software, são de titularidade da XD Capital ou licenciados por terceiros, sendo vedada a sua reprodução, distribuição ou uso sem autorização expressa.
            </p>
            <p>
              <strong>10.2.</strong> O acesso à Plataforma não transfere ao usuário qualquer direito de propriedade intelectual sobre seus elementos.
            </p>
          </section>

          {/* 11. DISPOSIÇÕES GERAIS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">11</span>
              <span>DISPOSIÇÕES GERAIS</span>
            </h2>
            <p>
              <strong>11.1.</strong> Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca do domicílio do usuário para resolução de conflitos decorrentes destes Termos, nos termos do art. 101, I do CDC, quando aplicável.
            </p>
            <p>
              <strong>11.2.</strong> A XD Capital poderá atualizar estes Termos a qualquer momento, comunicando o usuário com antecedência mínima de 30 (trinta) dias por meio dos canais de comunicação da Plataforma. O uso continuado após o prazo de comunicação implica aceitação das alterações.
            </p>
            <p>
              <strong>11.3.</strong> A tolerância quanto ao descumprimento de qualquer disposição destes Termos não implica novação ou renúncia ao direito de exigir seu cumprimento.
            </p>
            <p>
              <strong>11.4.</strong> Caso qualquer cláusula destes Termos seja considerada nula ou ineficaz, as demais permanecerão em pleno vigor.
            </p>
            <p>
              <strong>11.5.</strong> Estes Termos entram em vigor na data de sua publicação na Plataforma, substituindo versões anteriores.
            </p>
          </section>
        </div>

        {/* CTA Open Account or Contact */}
        <div className="p-6 rounded-[20px] bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-normal text-slate-900">Dúvidas sobre os Termos de Uso?</div>
            <div className="text-[13.5px] text-slate-500 font-mono mt-0.5">atendimento@xdcapital.com.br · compliance@xdcapital.com.br</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenContact('Dúvidas sobre os Termos de Uso')}
              className="btn-secondary text-[14px] cursor-pointer"
            >
              Falar com Suporte
            </button>
            {onOpenOpenAccount && (
              <button
                onClick={onOpenOpenAccount}
                className="btn-primary text-[14px] cursor-pointer"
              >
                Abrir Conta PJ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
