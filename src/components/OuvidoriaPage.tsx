import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, HelpCircle, AlertCircle } from 'lucide-react';

interface OuvidoriaPageProps {
  onBackToHome: () => void;
  onOpenContact: (subject?: string) => void;
}

export const OuvidoriaPage: React.FC<OuvidoriaPageProps> = ({ onBackToHome, onOpenContact }) => {
  const [submitted, setSubmitted] = useState(false);
  const [manifestType, setManifestType] = useState('reclamacao');
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    previousProtocol: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0B0F19] pt-28 pb-20 px-6">
      <div className="max-w-[1040px] mx-auto">
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
            CANAL DE 2ª INSTÂNCIA & ÉTICA
          </div>
          <h1 className="text-[34px] sm:text-[44px] font-normal text-[#0B0F19] tracking-[-0.035em] leading-[1.1] mb-4">
            Ouvidoria
          </h1>
          <p className="text-[16.5px] text-slate-600 max-w-[760px] leading-relaxed">
            A Ouvidoria da XD Capital é um canal independente e autônomo, destinado a avaliar manifestações de clientes que já recorreram aos canais convencionais de atendimento e necessitam de reavaliação imparcial.
          </p>
        </div>

        {/* Informative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border border-slate-200/90 rounded-[20px] p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <Clock className="w-5 h-5 text-[#A3192E]" />
            </div>
            <h3 className="text-[17px] font-normal text-slate-900 mb-1">
              Prazo de Resposta
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Até <strong>10 dias úteis</strong> para análise minuciosa e envio de parecer conclusivo formal.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[20px] p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <AlertCircle className="w-5 h-5 text-[#A3192E]" />
            </div>
            <h3 className="text-[17px] font-normal text-slate-900 mb-1">
              Quando Acionar?
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Caso sua demanda anterior no SAC ou Suporte não tenha sido atendida satisfatoriamente.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-[20px] p-6 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#A3192E]" />
            </div>
            <h3 className="text-[17px] font-normal text-slate-900 mb-1">
              Imparcialidade
            </h3>
            <p className="text-[13.5px] text-slate-600 leading-relaxed">
              Atuação independente com reporte direto à diretoria e comitê de governança.
            </p>
          </div>
        </div>

        {/* Main Section: Form & Direct Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Manifestation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-[24px] p-8 sm:p-10 shadow-sm">
            <h2 className="text-[22px] font-normal text-slate-900 mb-1">
              Registrar Manifestação na Ouvidoria
            </h2>
            <p className="text-[14px] text-slate-500 mb-6">
              Preencha os dados abaixo. Se possuir o número de protocolo anterior, informe para agilizar a análise.
            </p>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#A3192E]/10 border border-[#A3192E] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-[#A3192E]" />
                </div>
                <h3 className="text-[22px] font-normal text-slate-900 mb-2">
                  Manifestação Registrada com Sucesso
                </h3>
                <p className="text-[15px] text-slate-600 max-w-[440px] leading-relaxed mb-6">
                  Seu caso foi protocolado e encaminhado ao Ouvidor. A confirmação foi enviada para <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-[14px]"
                >
                  Novo Registro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4.5">
                <div>
                  <label className="block text-[13px] text-slate-700 mb-1">
                    Tipo de Manifestação
                  </label>
                  <select
                    value={manifestType}
                    onChange={(e) => setManifestType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14.5px] text-slate-900 focus:bg-white focus:outline-none focus:border-[#A3192E] transition-all"
                  >
                    <option value="reclamacao">Reclamação sobre atendimento ou produto</option>
                    <option value="reavaliacao">Reavaliação de operação / crédito</option>
                    <option value="denuncia">Denúncia de conduta ou ética</option>
                    <option value="sugestao">Sugestão de melhoria ou elogio</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-slate-700 mb-1">
                      Nome Completo / Razão Social
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome ou empresa"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14.5px] text-slate-900 focus:bg-white focus:outline-none focus:border-[#A3192E] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] text-slate-700 mb-1">
                      CPF ou CNPJ
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="000.000.000-00"
                      value={formData.document}
                      onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14.5px] text-slate-900 focus:bg-white focus:outline-none focus:border-[#A3192E] font-mono transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-slate-700 mb-1">
                      E-mail para Acompanhamento
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@dominio.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14.5px] text-slate-900 focus:bg-white focus:outline-none focus:border-[#A3192E] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] text-slate-700 mb-1">
                      Protocolo Anterior (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: SAC-2026-0000"
                      value={formData.previousProtocol}
                      onChange={(e) => setFormData({ ...formData, previousProtocol: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14.5px] text-slate-900 focus:bg-white focus:outline-none focus:border-[#A3192E] font-mono transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] text-slate-700 mb-1">
                    Relato Detalhado
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva detalhadamente o ocorrido, datas e canais contatados..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3.5 text-[14.5px] text-slate-900 focus:bg-white focus:outline-none focus:border-[#A3192E] transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 text-[15px] justify-center cursor-pointer"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    <span>Enviar para a Ouvidoria</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Contacts & Operating Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-slate-200/90 rounded-[22px] p-6 shadow-sm space-y-5">
              <h3 className="text-[17px] font-normal text-slate-900">
                Canais Diretos da Ouvidoria
              </h3>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Phone className="w-5 h-5 text-[#A3192E]" />
                </div>
                <div>
                  <div className="text-[11.5px] uppercase text-slate-400 font-mono">Telefone Direto</div>
                  <div className="text-[15px] font-normal text-slate-900">0800 000 0000 · Ramal Ouvidoria</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Mail className="w-5 h-5 text-[#A3192E]" />
                </div>
                <div>
                  <div className="text-[11.5px] uppercase text-slate-400 font-mono">E-mail Oficial</div>
                  <div className="text-[15px] font-normal text-slate-900">ouvidoria@xdcapital.com.br</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Clock className="w-5 h-5 text-[#A3192E]" />
                </div>
                <div>
                  <div className="text-[11.5px] uppercase text-slate-400 font-mono">Horário de Atendimento</div>
                  <div className="text-[14.5px] font-normal text-slate-900">Dias úteis · das 09h00 às 17h00</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[22px] bg-slate-900 text-white">
              <h4 className="text-[16px] font-normal text-white mb-2">Primeiro contato?</h4>
              <p className="text-[13px] text-slate-300 leading-relaxed mb-4">
                Se você ainda não possui um protocolo aberto em nosso suporte regular, nossa equipe de atendimento ao cliente pode solucionar sua dúvida com mais agilidade.
              </p>
              <button
                onClick={() => onOpenContact('Atendimento Geral SAC')}
                className="w-full btn-secondary text-[13.5px] justify-center bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Falar com a Central de Atendimento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
