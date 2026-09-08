import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, Lock, Building2, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

interface PldFtPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
}

export const PldFtPage: React.FC<PldFtPageProps> = ({ onBackToHome, onOpenContact }) => {
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
              LEI Nº 9.613/1998 · RESOLUÇÃO CONJUNTA BCB/CMN Nº 16 E Nº 17/2025
            </div>
            <img
              src="/xd-logo.png"
              alt="XD Capital"
              className="h-8 w-auto object-contain opacity-95"
              width={140}
              height={32}
            />
          </div>
          <h1 className="text-[28px] sm:text-[38px] font-normal text-[#0B0F19] tracking-[-0.03em] leading-[1.15] mb-3">
            POLÍTICA DE PREVENÇÃO À LAVAGEM DE DINHEIRO E AO FINANCIAMENTO DO TERRORISMO (PLD/FT)
          </h1>
          <p className="text-[16px] text-slate-600 font-normal leading-relaxed">
            Operando como Correspondente Bancário nos termos da Resolução Conjunta BCB/CMN nº 16 e nº 17/2025.
          </p>
          <div className="text-[12.5px] text-slate-400 font-mono mt-3">
            Vigência a partir de: 2026 · Versão 2.0 · Governança e Compliance XD Capital
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
              <strong>1.1.</strong> A presente Política estabelece os princípios, diretrizes, responsabilidades e procedimentos internos de Prevenção à Lavagem de Dinheiro e ao Financiamento do Terrorismo (PLD/FT) adotados pela <strong>XD CAPITAL SERVIÇO DE INTERMEDIAÇÃO FINANCEIRA LTDA.</strong>, inscrita no CNPJ sob nº <strong>55.038.166/0001-99</strong>, doravante denominada &quot;XD Capital&quot;.
            </p>
            <p>
              <strong>1.2.</strong> A XD Capital atua como correspondente bancário e parceiro comercial de instituição de pagamento credenciada pelo Banco Central do Brasil (BCB), nos termos da Resolução Conjunta BCB/CMN nº 16/2025 e da Resolução Conjunta BCB/CMN nº 17/2025. Nessa condição, não detém autorização própria do BCB para funcionamento como Instituição de Pagamento, e o cumprimento das obrigações regulatórias de PLD/FT perante o BCB e o COAF é de responsabilidade da Instituição de Pagamento Liquidante parceira (&quot;Liquidante&quot;).
            </p>
            <p>
              <strong>1.3.</strong> Sem prejuízo do item anterior, a XD Capital reconhece que, na qualidade de elo da cadeia de distribuição de produtos e serviços financeiros, assume responsabilidade contratual e ética pela adoção de controles internos compatíveis com o porte e a complexidade de suas operações, em alinhamento ao programa de PLD/FT do Liquidante.
            </p>
            <p>
              <strong>1.4.</strong> O Programa de PLD/FT tem por finalidade:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> prevenir a utilização da XD Capital como vetor de ocultação ou dissimulação de bens, direitos e valores;</li>
              <li><strong>II –</strong> identificar, avaliar e mitigar riscos de lavagem de dinheiro e financiamento do terrorismo no âmbito das operações realizadas;</li>
              <li><strong>III –</strong> implementar controles internos alinhados ao programa de PLD/FT do Liquidante parceiro;</li>
              <li><strong>IV –</strong> cooperar com o Liquidante nas atividades de monitoramento, comunicação de suspeitos e cumprimento das obrigações regulatórias aplicáveis;</li>
              <li><strong>V –</strong> proteger a integridade, reputação e sustentabilidade institucional da XD Capital.</li>
            </ul>
            <p className="pt-1">
              <strong>1.5.</strong> Esta Política aplica-se a:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> administradores e membros de órgãos estatutários;</li>
              <li><strong>II –</strong> diretores e gestores;</li>
              <li><strong>III –</strong> colaboradores e prestadores de serviço;</li>
              <li><strong>IV –</strong> clientes, usuários finais e contrapartes atendidos por meio dos produtos e serviços intermediados.</li>
            </ul>
          </section>

          {/* 2. ENQUADRAMENTO REGULATÓRIO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">2</span>
              <span>ENQUADRAMENTO REGULATÓRIO</span>
            </h2>
            <p>
              <strong>2.1.</strong> A XD Capital, na condição de correspondente bancário e parceiro comercial de Instituição de Pagamento autorizada pelo BCB, orienta seu programa interno de PLD/FT pelos seguintes diplomas normativos, no que couber à sua posição na cadeia de prestação de serviços:
            </p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> Lei nº 9.613/1998 – Lei de Prevenção à Lavagem de Dinheiro;</li>
              <li><strong>II –</strong> Resolução Conjunta BCB/CMN nº 16/2025 – Regula o relacionamento entre Instituições de Pagamento e seus parceiros correspondentes;</li>
              <li><strong>III –</strong> Resolução Conjunta BCB/CMN nº 17/2025 – Requisitos aplicáveis à distribuição de produtos financeiros em modelo BaaS;</li>
              <li><strong>IV –</strong> Lei nº 13.709/2018 (LGPD) – Lei Geral de Proteção de Dados;</li>
              <li><strong>V –</strong> Normativos e comunicações do COAF aplicáveis à cadeia de correspondência;</li>
              <li><strong>VI –</strong> Contrato de Correspondência firmado com o Liquidante parceiro, que estabelece as obrigações específicas de PLD/FT assumidas contratualmente pela XD Capital;</li>
              <li><strong>VII –</strong> Programa de PLD/FT do Liquidante parceiro, ao qual a XD Capital declara adesão no que tange à sua atuação operacional.</li>
            </ul>
            <p className="pt-2">
              <strong>2.2.</strong> As obrigações de comunicação direta ao COAF, bem como o cumprimento formal das normas de KYC impostas às Instituições de Pagamento pela Circular BCB nº 3.978/2020 e pela Resolução BCB nº 277/2022, são de responsabilidade exclusiva do Liquidante. A XD Capital coopera com essas obrigações mediante os procedimentos definidos nesta Política e no Contrato de Correspondência.
            </p>
          </section>

          {/* 3. PRINCÍPIOS DO PROGRAMA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">3</span>
              <span>PRINCÍPIOS DO PROGRAMA</span>
            </h2>
            <p>O Programa de PLD/FT da XD Capital fundamenta-se nos seguintes pilares:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I – Abordagem Baseada em Risco:</strong> os controles são proporcionais ao perfil de risco dos clientes, produtos, canais e geografias;</li>
              <li><strong>II – Responsabilidade Compartilhada:</strong> a XD Capital reconhece seu papel na cadeia de correspondência e atua em cooperação com o Liquidante;</li>
              <li><strong>III – Governança e Responsabilização:</strong> há designação formal de responsável pela condução do programa interno;</li>
              <li><strong>IV – Monitoramento Contínuo:</strong> as operações são acompanhadas de forma permanente, com regras revisadas periodicamente;</li>
              <li><strong>V – Rastreabilidade e Documentação:</strong> todas as decisões relevantes são registradas e mantidas pelo prazo legal mínimo;</li>
              <li><strong>VI – Confidencialidade e Proteção de Dados:</strong> as informações são tratadas em conformidade com a LGPD e com as políticas de segurança da informação adotadas.</li>
            </ul>
          </section>

          {/* 4. GOVERNANÇA E RESPONSABILIDADES */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">4</span>
              <span>GOVERNANÇA E RESPONSABILIDADES</span>
            </h2>
            
            <div className="space-y-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">4.1 Administração</h3>
              <p>Compete aos sócios e administradores:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> aprovar esta Política e suas revisões;</li>
                <li><strong>II –</strong> assegurar recursos humanos e tecnológicos adequados ao programa;</li>
                <li><strong>III –</strong> supervisionar a efetividade dos controles internos adotados.</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">4.2 Responsável Interno por PLD/FT</h3>
              <p>
                A XD Capital designará formalmente um responsável interno pelo acompanhamento do programa de PLD/FT (&quot;Responsável PLD/FT&quot;), que atuará como interlocutor com o Liquidante parceiro e com as áreas internas.
              </p>
              <p>São atribuições do Responsável PLD/FT:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> implementar, monitorar e atualizar o programa interno;</li>
                <li><strong>II –</strong> realizar ou supervisionar a classificação de risco de clientes;</li>
                <li><strong>III –</strong> analisar alertas internos e decidir sobre encaminhamento ao Liquidante;</li>
                <li><strong>IV –</strong> manter os registros exigidos por esta Política;</li>
                <li><strong>V –</strong> reportar à Administração e ao Liquidante as ocorrências relevantes.</li>
              </ul>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[14px] text-slate-600">
                <strong>Nota:</strong> diferentemente das Instituições de Pagamento, a XD Capital não possui obrigação regulatória autônoma de designar Diretor Estatutário de PLD/FT perante o BCB. A responsabilidade regulatória de nível diretorial é do Liquidante parceiro.
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[16.5px] font-medium text-slate-800">4.3 Área Operacional</h3>
              <p>Compete às áreas operacionais:</p>
              <ul className="space-y-1.5 list-none pl-2 text-slate-600">
                <li><strong>I –</strong> executar os procedimentos de identificação e verificação de clientes conforme esta Política;</li>
                <li><strong>II –</strong> registrar e reportar ao Responsável PLD/FT qualquer operação ou situação atípica identificada;</li>
                <li><strong>III –</strong> participar dos treinamentos periódicos.</li>
              </ul>
            </div>
          </section>

          {/* 5. AVALIAÇÃO INTERNA DE RISCOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">5</span>
              <span>AVALIAÇÃO INTERNA DE RISCOS</span>
            </h2>
            <p>
              <strong>5.1.</strong> A XD Capital manterá Avaliação Interna de Riscos de PLD/FT formalmente documentada, revisada ao menos anualmente ou sempre que houver alteração relevante no modelo de negócio, nos produtos ofertados ou na regulação aplicável.
            </p>
            <p><strong>5.2.</strong> A avaliação considerará:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> perfil dos clientes e usuários finais atendidos;</li>
              <li><strong>II –</strong> produtos e serviços intermediados por meio do Liquidante;</li>
              <li><strong>III –</strong> canais de distribuição e onboarding utilizados;</li>
              <li><strong>IV –</strong> áreas geográficas de atuação;</li>
              <li><strong>V –</strong> volume, valor e complexidade transacional;</li>
              <li><strong>VI –</strong> riscos específicos do modelo de correspondente bancário em ambiente BaaS.</li>
            </ul>
            <p className="pt-1">
              <strong>5.3.</strong> Os resultados da Avaliação Interna de Riscos serão compartilhados com o Liquidante quando requerido contratualmente.
            </p>
          </section>

          {/* 6. DILIGÊNCIA E IDENTIFICAÇÃO DE CLIENTES (KYC) */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">6</span>
              <span>DILIGÊNCIA E IDENTIFICAÇÃO DE CLIENTES (KYC)</span>
            </h2>
            <p>
              <strong>6.1.</strong> A XD Capital adotará procedimentos de identificação e verificação de clientes e usuários finais antes do início do relacionamento, em alinhamento com os requisitos estabelecidos pelo Liquidante parceiro e com as boas práticas de KYC.
            </p>
            <p><strong>6.2.</strong> Os procedimentos mínimos incluem:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> identificação formal do cliente (pessoa física ou jurídica);</li>
              <li><strong>II –</strong> verificação documental, por meios físicos ou eletrônicos;</li>
              <li><strong>III –</strong> identificação do beneficiário final, quando aplicável para pessoas jurídicas, mapeamento da cadeia societária até os sócios pessoas físicas com participação igual ou superior a 25% (vinte e cinco por cento), consultando fontes como Receita Federal e demais bases públicas disponíveis;</li>
              <li><strong>IV –</strong> consulta a listas restritivas, sanções e restrições aplicáveis (OFAC, ONU, listas internas do Liquidante);</li>
              <li><strong>V –</strong> análise de Pessoa Exposta Politicamente (PEP), considerando a condição de PEP como vigente por até 5 (cinco) anos após a cessação do cargo ou função pública;</li>
              <li><strong>VI –</strong> avaliação da origem dos recursos, quando o perfil de risco do cliente assim recomendar.</li>
            </ul>
            <p className="pt-2">
              <strong>6.3.</strong> Os dados e documentos coletados serão armazenados de forma segura e compartilhados com o Liquidante nos termos do Contrato de Correspondência e da política de proteção de dados adotada.
            </p>
            <p>
              <strong>6.4.</strong> Atualizações cadastrais ocorrerão periodicamente, observando os seguintes intervalos mínimos por nível de risco:
            </p>
            <ul className="space-y-1.5 list-disc pl-6 text-slate-600">
              <li><strong>Alto Risco e Risco Crítico:</strong> até 12 (doze) meses;</li>
              <li><strong>Médio Risco:</strong> até 24 (vinte e quatro) meses;</li>
              <li><strong>Baixo Risco:</strong> até 36 (trinta e seis) meses.</li>
            </ul>
            <p className="pt-1">
              <strong>6.5.</strong> Clientes classificados como Alto Risco ou Risco Crítico estarão sujeitos a diligência reforçada, com coleta de informações adicionais e aprovação pelo Responsável PLD/FT antes do início ou da continuidade do relacionamento.
            </p>
          </section>

          {/* 7. CLASSIFICAÇÃO DE RISCO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">7</span>
              <span>CLASSIFICAÇÃO DE RISCO</span>
            </h2>
            <p>
              <strong>7.1.</strong> Clientes e operações serão classificados nas seguintes categorias, com base nos fatores de risco identificados na Avaliação Interna:
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-center">
              <li className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-[13.5px]">Baixo Risco</li>
              <li className="p-2.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-[13.5px]">Médio Risco</li>
              <li className="p-2.5 bg-orange-50 text-orange-800 rounded-xl border border-orange-200 text-[13.5px]">Alto Risco</li>
              <li className="p-2.5 bg-rose-50 text-rose-800 rounded-xl border border-rose-200 text-[13.5px]">Risco Crítico</li>
            </ul>
            <p className="pt-2">
              <strong>7.2.</strong> A classificação será documentada, revisada periodicamente e considerará, entre outros fatores: perfil do cliente, natureza e volume das transações, canal de relacionamento, localização geográfica e condição de PEP.
            </p>
            <p>
              <strong>7.3.</strong> Clientes classificados como Risco Crítico somente poderão ser aceitos ou mantidos mediante aprovação expressa do Responsável PLD/FT e, quando exigido pelo Liquidante, com anuência deste.
            </p>
          </section>

          {/* 8. MONITORAMENTO DE OPERAÇÕES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">8</span>
              <span>MONITORAMENTO DE OPERAÇÕES</span>
            </h2>
            <p>
              <strong>8.1.</strong> A XD Capital manterá mecanismos de monitoramento das operações realizadas, compatíveis com o volume e a complexidade de sua atuação, podendo ser automatizados, manuais ou combinados.
            </p>
            <p><strong>8.2.</strong> Alertas identificados gerarão:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> registro formal pelo Responsável PLD/FT;</li>
              <li><strong>II –</strong> análise técnica com base nos fatores de risco conhecidos;</li>
              <li><strong>III –</strong> decisão fundamentada e documentada;</li>
              <li><strong>IV –</strong> arquivamento interno ou, quando aplicável, comunicação ao Liquidante para que este adote as providências regulatórias cabíveis, incluindo eventual comunicação ao COAF.</li>
            </ul>
            <p className="pt-2">
              <strong>8.3.</strong> A XD Capital não realizará comunicação direta ao COAF de forma autônoma, salvo se e quando vier a ser enquadrada como sujeito obrigado nos termos da Lei nº 9.613/1998 e regulamentação aplicável. As comunicações de operações suspeitas são realizadas pelo Liquidante parceiro, que detém essa obrigação regulatória.
            </p>
            <p>
              <strong>8.4.</strong> As regras de monitoramento serão revisadas anualmente e sempre que houver alteração relevante no perfil de risco ou nas orientações do Liquidante.
            </p>
          </section>

          {/* 9. COOPERAÇÃO COM O LIQUIDANTE */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">9</span>
              <span>COOPERAÇÃO COM O LIQUIDANTE</span>
            </h2>
            <p><strong>9.1.</strong> A XD Capital cooperará plenamente com o programa de PLD/FT do Liquidante parceiro, incluindo:</p>
            <ul className="space-y-2 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> fornecimento de informações e documentos sobre clientes e operações, quando formalmente solicitado;</li>
              <li><strong>II –</strong> participação em auditorias, revisões e due diligences conduzidas pelo Liquidante;</li>
              <li><strong>III –</strong> adoção das diretrizes e atualizações do programa de PLD/FT do Liquidante, comunicadas formal ou contratualmente;</li>
              <li><strong>IV –</strong> reporte imediato de operações atípicas ou suspeitas identificadas internamente, para que o Liquidante tome as providências regulatórias cabíveis.</li>
            </ul>
            <p className="pt-2">
              <strong>9.2.</strong> É vedada a prática de <em>tipping-off</em>, entendida como a comunicação ao cliente ou a terceiros de que uma investigação interna ou do Liquidante está em curso.
            </p>
          </section>

          {/* 10. SIGILO E PROTEÇÃO DE DADOS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">10</span>
              <span>SIGILO E PROTEÇÃO DE DADOS</span>
            </h2>
            <p>
              <strong>10.1.</strong> Todas as informações relacionadas ao Programa de PLD/FT são tratadas como confidenciais e acessíveis apenas às pessoas com necessidade legítima de conhecê-las.
            </p>
            <p>
              <strong>10.2.</strong> Os registros de identificação, verificação e monitoramento serão mantidos pelo prazo mínimo de 5 (cinco) anos após o encerramento do relacionamento com o cliente, ou por prazo superior quando exigido pela regulação aplicável ou pelo Contrato de Correspondência.
            </p>
            <p>
              <strong>10.3.</strong> Registros relacionados a operações comunicadas ao Liquidante para fins de reporte ao COAF serão mantidos pelo prazo exigido pela legislação de PLD/FT, independentemente do prazo geral de retenção.
            </p>
            <p>
              <strong>10.4.</strong> O tratamento de dados pessoais observará a Lei nº 13.709/2018 (LGPD), as orientações da Autoridade Nacional de Proteção de Dados (ANPD) nos termos do instrumento de compartilhamento de dados celebrado com o Liquidante.
            </p>
          </section>

          {/* 11. TREINAMENTO */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">11</span>
              <span>TREINAMENTO</span>
            </h2>
            <p>
              <strong>11.1.</strong> A XD Capital manterá programa anual de treinamento em PLD/FT para todos os colaboradores e prestadores de serviço envolvidos nas atividades de onboarding, atendimento e monitoramento de clientes.
            </p>
            <p>
              <strong>11.2.</strong> O conteúdo dos treinamentos abordará, no mínimo: conceitos de lavagem de dinheiro e financiamento do terrorismo, identificação de operações atípicas, procedimentos de reporte interno e as obrigações decorrentes desta Política.
            </p>
            <p>
              <strong>11.3.</strong> A participação nos treinamentos será registrada e o Responsável PLD/FT manterá comprovação auditável.
            </p>
          </section>

          {/* 12. CANAL DE DENÚNCIAS */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">12</span>
              <span>CANAL DE DENÚNCIAS</span>
            </h2>
            <p>
              <strong>12.1.</strong> A XD Capital manterá canal independente e confidencial para reporte interno de irregularidades, suspeitas de operações atípicas ou violações desta Política.
            </p>
            <p>
              <strong>12.2.</strong> É vedada qualquer forma de retaliação ao colaborador que, de boa-fé, reporte suspeitas ou irregularidades por meio do canal.
            </p>
          </section>

          {/* 13. PENALIDADES */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">13</span>
              <span>PENALIDADES</span>
            </h2>
            <p>O descumprimento desta Política poderá resultar em:</p>
            <ul className="space-y-1.5 list-none pl-2 text-slate-600">
              <li><strong>I –</strong> advertência formal;</li>
              <li><strong>II –</strong> suspensão;</li>
              <li><strong>III –</strong> desligamento ou rescisão contratual;</li>
              <li><strong>IV –</strong> comunicação ao Liquidante parceiro;</li>
              <li><strong>V –</strong> responsabilização civil e, quando aplicável, criminal.</li>
            </ul>
          </section>

          {/* 14. REVISÃO E VIGÊNCIA */}
          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-[19px] font-normal text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#A3192E]/10 text-[#A3192E] font-mono text-[13px] flex items-center justify-center shrink-0">14</span>
              <span>REVISÃO E VIGÊNCIA</span>
            </h2>
            <p>
              <strong>14.1.</strong> Esta Política será revisada anualmente ou sempre que necessário, especialmente em razão de: alteração regulatória, mudança no modelo de negócio, atualização do programa de PLD/FT do Liquidante parceiro, ou resultado de auditorias e avaliações internas.
            </p>
            <p>
              <strong>14.2.</strong> Esta Política entra em vigor na data de sua aprovação formal pela Administração da XD Capital, substituindo quaisquer versões anteriores.
            </p>
          </section>
        </div>

        {/* Footer Contact Card */}
        <div className="p-6 rounded-[20px] bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[15px] font-normal text-slate-900">Área de Compliance & PLD/FT</div>
            <div className="text-[13.5px] text-slate-500 font-mono mt-0.5">compliance@xdcapital.com.br · pld@xdcapital.com.br</div>
          </div>
          <button
            onClick={() => onOpenContact('Dúvidas sobre a Política de PLD/FT')}
            className="btn-secondary text-[14px] cursor-pointer"
          >
            Falar com Compliance
          </button>
        </div>
      </div>
    </div>
  );
};
