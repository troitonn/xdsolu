import React from 'react';
import { ArrowUpRight, CheckCircle2, CreditCard, Zap, ShieldCheck, Cpu, Percent } from 'lucide-react';
import xdPayTerminalImg from '../assets/images/xd_pay_terminal_new.png';
import { useLanguage } from '../context/LanguageContext';

interface XdPaySectionProps {
  onOpenContact: (subject: string) => void;
}

export const XdPaySection: React.FC<XdPaySectionProps> = ({ onOpenContact }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  return (
    <section
      id="xd-pay"
      aria-label="XD Pay - Maquininha e Meios de Pagamento"
      className="py-24 md:py-36 bg-white border-t border-slate-200/80 relative overflow-hidden"
    >
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#A3192E]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#0B0F19]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Header and Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 md:mb-20">
          {/* Left Text / Positioning */}
          <div className="lg:col-span-7">
            <h2 className="section-h2 text-[#0B0F19] mb-5">
              {t('xdpay.title')}
            </h2>

            <p className="body-text text-[17px] sm:text-[18px] text-slate-600 leading-relaxed mb-8 max-w-[640px]">
              {t('xdpay.subtitle')}
            </p>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <Zap className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[14.5px] font-medium text-slate-900">{isEn ? "Fast Settlement D+0 & D+1" : (isEs ? "Liquidación Rápida D+0 y D+1" : "Liquidação Rápida D+0 e D+1")}</div>
                  <div className="text-[12.5px] text-slate-500">{isEn ? "Receive funds on the same day in your account." : (isEs ? "Reciba el mismo día en su cuenta corporativa." : "Receba no mesmo dia diretamente na sua conta.")}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <Percent className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[14.5px] font-medium text-slate-900">{isEn ? "Custom Processing Rates" : (isEs ? "Tasas Personalizadas" : "Taxas Customizadas")}</div>
                  <div className="text-[12.5px] text-slate-500">{isEn ? "Volume-adjusted pricing built for your enterprise." : (isEs ? "Condiciones especiales según su volumen de ventas." : "Condições especiais conforme o seu volume de vendas.")}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <Cpu className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[14.5px] font-medium text-slate-900">{isEn ? "Touchscreen Android System" : (isEs ? "Sistema Android Touch" : "Sistema Android Touch")}</div>
                  <div className="text-[12.5px] text-slate-500">{isEn ? "Accepts contactless (NFC), chip, stripe and QR Pix." : (isEs ? "Acepta tarjetas sin contacto (NFC), chip y códigos QR." : "Aceita cartões por aproximação (NFC), chip, tarja e Pix.")}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <ShieldCheck className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[14.5px] font-medium text-slate-900">{isEn ? "Dedicated Support & Swift Swap" : (isEs ? "Soporte Dedicado y Reemplazo Ágil" : "Suporte Dedicado & Troca Expressa")}</div>
                  <div className="text-[12.5px] text-slate-500">{isEn ? "Active human desk without bot loops." : (isEs ? "Atención ágil sin esperas automatizadas." : "Mesa de atendimento ativa sem filas eletrônicas.")}</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onOpenContact('Quero solicitar Maquininha XD Pay')}
                className="btn-primary text-[15px] !py-3.5 !px-6 cursor-pointer"
              >
                <span>{isEn ? "Order XD Pay Terminal" : (isEs ? "Pedir Terminal XD Pay" : "Pedir Maquininha XD Pay")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Showcase Image with Complete Uncropped Terminal & Tech Badges */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[430px] relative rounded-[28px] overflow-hidden border border-[#A3192E]/25 shadow-2xl bg-[#7B011B] group">
              <div className="relative w-full flex items-center justify-center p-2 sm:p-3">
                {/* Complete image of the terminal with 100% visible height and width */}
                <img
                  src={xdPayTerminalImg}
                  alt="Terminal Inteligente XD Pay Maquininha de Cartão"
                  className="w-full h-auto max-h-[640px] object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.015]"
                  referrerPolicy="no-referrer"
                />

                {/* Top Subtle Pill */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11.5px] font-mono flex items-center gap-2 pointer-events-none shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NFC · Pix · Débito · Crédito 18x</span>
                </div>
              </div>
            </div>

            {/* Spec Strip positioned beneath the card so the complete machine remains 100% unobstructed */}
            <div className="w-full max-w-[430px] mt-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md text-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] shrink-0 font-medium">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-slate-900 leading-tight">
                      XD Smart Pro Terminal
                    </div>
                    <div className="text-[12px] text-slate-500 font-mono mt-0.5">
                      {isEn ? "4G Dual SIM + Unlimited Wi-Fi" : (isEs ? "Conexión 4G Dual Chip + Wi-Fi Ilimitado" : "Conexão 4G Dual Chip + Wi-Fi Ilimitado")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11.5px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isEn ? "D+0 Ready" : (isEs ? "D+0 Activo" : "D+0 Ativo")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Integração com Conta Digital */}
        <div className="bg-[#0B0F19] text-white rounded-[26px] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A3192E]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-[720px]">
              <h4 className="text-[24px] sm:text-[28px] font-normal tracking-tight text-white mb-3">
                {isEn 
                  ? "Your POS sales instantly unlock liquidity and working capital."
                  : (isEs 
                    ? "Sus ventas con tarjeta se transforman en liquidez y capital de trabajo inmediato."
                    : "Suas vendas na maquininha viram crédito e capital de giro imediato.")}
              </h4>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                {isEn 
                  ? "By centralizing your merchant transactions with XD Pay, you gain streamlined access to corporate credit facilities, instant receivable factoring, and exclusive terms on your Business Account."
                  : (isEs 
                    ? "Al concentrar las ventas de su empresa con XD Pay, accede con facilidad a financiamiento corporativo, anticipación de cobros y condiciones especiales en su Cuenta Digital."
                    : "Ao concentrar os recebíveis do seu negócio na XD Pay, você ganha acesso facilitado a linhas de crédito PJ, antecipação sob demanda e condições exclusivas na Conta Corrente Corporativa.")}
              </p>
            </div>

            <button
              onClick={() => onOpenContact('Quero proposta comercial completa XD Pay')}
              className="btn-primary text-[15px] !py-3.5 !px-8 shrink-0 cursor-pointer"
            >
              <span>{isEn ? "Request Custom Commercial Proposal" : (isEs ? "Solicitar Propuesta Comercial" : "Solicitar Proposta Comercial")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

