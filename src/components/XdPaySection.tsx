import React from 'react';
import { ArrowUpRight, CheckCircle2, CreditCard, Zap, ShieldCheck, Smartphone, Cpu, BarChart3, Receipt, ArrowRight, Sparkles, Percent } from 'lucide-react';
import xdPayTerminalImg from '../assets/images/xd_pay_terminal_1786931629036.jpg';
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 md:mb-24">
          {/* Left Text / Positioning */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3192E]/[0.08] border border-[#A3192E]/20 text-[#A3192E] text-[12px] font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('xdpay.eyebrow')}</span>
            </div>

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

              <button
                onClick={() => onOpenContact('Simular Taxas e Condições XD Pay')}
                className="btn-secondary text-[15px] !py-3.5 !px-6 cursor-pointer"
              >
                <span>{isEn ? "Simulate Merchant Rates" : (isEs ? "Simular Tasas de mi Negocio" : "Simular Taxas da Minha Empresa")}</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Image with Smart Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
              <img
                src={xdPayTerminalImg}
                alt="Terminal Inteligente XD Pay Maquininha de Cartão"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Top Pill */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 text-white text-[12px] font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NFC · Pix · Débito · Crédito 18x</span>
              </div>

              {/* Bottom Floating Stats Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-slate-900">
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
                  <div className="hidden sm:flex items-center gap-1 text-[11.5px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isEn ? "D+0 Ready" : (isEs ? "D+0 Activo" : "D+0 Ativo")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Terminals / Solutions Cards */}
        <div className="mb-14">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <div className="text-[12px] font-mono text-[#A3192E] uppercase tracking-wider mb-2">{isEn ? "CHOOSE THE PERFECT FIT" : (isEs ? "ELIJA EL MODELO IDEAL" : "ESCOLHA O MODELO IDEAL")}</div>
            <h3 className="text-[26px] sm:text-[32px] font-normal text-slate-900 tracking-[-0.025em]">
              {isEn ? "High-performance POS hardware for every transaction profile" : (isEs ? "Equipos de alto rendimiento para cada perfil comercial" : "Equipamentos de alta performance para cada perfil de venda")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Model 1: XD Smart Pro */}
            <div className="bg-[#FAFAFC] border border-slate-200/90 rounded-[24px] p-7 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-5">
                  <Receipt className="w-6 h-6" />
                </div>
                <div className="text-[12px] font-mono text-[#A3192E] mb-1 uppercase">{isEn ? "BEST SELLER" : (isEs ? "MÁS VENDIDA" : "MAIS VENDIDA")}</div>
                <h4 className="text-[20px] font-medium text-slate-900 mb-2">{isEn ? "XD Smart Pro (Thermal Printer)" : (isEs ? "XD Smart Pro (Con Impresora)" : "XD Smart Pro (Com Bobina)")}</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed mb-6">
                  {isEn 
                    ? "Complete POS terminal with fast thermal receipt printing, 5.5-inch HD touch screen, Android OS, and all-day battery life."
                    : (isEs 
                      ? "Terminal completo con impresión térmica rápida, pantalla táctil HD de 5.5 pulgadas, Android y batería de larga duración."
                      : "Terminal completo com impressão térmica rápida de comprovantes, tela touch HD de 5.5 polegadas, sistema Android e bateria para o dia inteiro.")}
                </p>

                <ul className="space-y-2.5 text-[13.5px] text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Instant thermal receipt printing" : (isEs ? "Impresión instantánea de comprobantes" : "Impressão instantânea de comprovante")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Wi-Fi + 4G cellular data included" : (isEs ? "Conexión Wi-Fi + 4G con chip incluido" : "Conexão Wi-Fi + 4G com chip incluso")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Contactless NFC & QR instant payments" : (isEs ? "Pagos sin contacto NFC y código QR" : "Pagamento por aproximação (NFC) e Pix")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Camera for QR code and barcode scanning" : (isEs ? "Cámara integrada para lectura de códigos QR" : "Câmera para leitura de QR Code e código de barras")}</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenContact('Solicitar Modelo XD Smart Pro (Com Bobina)')}
                className="btn-primary text-[14px] !py-3 w-full justify-center cursor-pointer"
              >
                <span>{isEn ? "Request XD Smart Pro" : (isEs ? "Pedir XD Smart Pro" : "Pedir XD Smart Pro")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Model 2: XD Smart Mini */}
            <div className="bg-[#FAFAFC] border border-slate-200/90 rounded-[24px] p-7 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-5">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="text-[12px] font-mono text-slate-500 mb-1 uppercase">{isEn ? "COMPACT & MOBILE" : (isEs ? "COMPACTA Y MÓVIL" : "COMPACTA & MÓVEL")}</div>
                <h4 className="text-[20px] font-medium text-slate-900 mb-2">XD Smart Mini</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed mb-6">
                  {isEn 
                    ? "Lightweight, swift, and paperless. Dispatches digital receipts via SMS and email. Built for delivery, consultants, and mobility."
                    : (isEs 
                      ? "Ligera, rápida y sin papel. Envía comprobantes digitales por SMS y correo. Diseñada para movilidad y entregas."
                      : "Leve, rápida e sem papel. Envia comprovantes por SMS e e-mail. Ideal para entregas, profissionais liberais, consultórios e mobilidade.")}
                </p>

                <ul className="space-y-2.5 text-[13.5px] text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Digital receipt via SMS and email" : (isEs ? "Comprobante digital por SMS y correo" : "Comprovante digital via SMS e e-mail")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Pocket sized with extended battery capacity" : (isEs ? "Tamaño de bolsillo con alta autonomía" : "Tamanho de bolso com alta autonomia de bateria")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "NFC contactless, chip, and instant QR" : (isEs ? "Aproximación NFC, chip y pagos QR" : "Aproximação NFC, chip e Pix na tela")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Complimentary 4G SIM card + Wi-Fi" : (isEs ? "Chip 4G incluido + Wi-Fi" : "Chip 4G grátis + Wi-Fi")}</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenContact('Solicitar Modelo XD Smart Mini')}
                className="btn-secondary text-[14px] !py-3 w-full justify-center cursor-pointer bg-white"
              >
                <span>{isEn ? "Request XD Smart Mini" : (isEs ? "Pedir XD Smart Mini" : "Pedir XD Smart Mini")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Model 3: XD TEF & E-commerce Gateway */}
            <div className="bg-[#FAFAFC] border border-slate-200/90 rounded-[24px] p-7 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-5">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div className="text-[12px] font-mono text-slate-500 mb-1 uppercase">{isEn ? "HIGH VOLUME ENTERPRISE" : (isEs ? "ALTO VOLUMEN CORPORATIVO" : "ALTO VOLUME CORPORATIVO")}</div>
                <h4 className="text-[20px] font-medium text-slate-900 mb-2">{isEn ? "XD Integrated POS & Gateway" : (isEs ? "XD TEF y Pasarela Web" : "XD TEF & Gateway Web")}</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed mb-6">
                  {isEn 
                    ? "Direct integration with POS/ERP checkouts for supermarket chains, multi-store retailers, and online e-commerce with automated reconciliation."
                    : (isEs 
                      ? "Integración directa con el software de caja (POS/ERP) de su negocio o pasarela de comercio electrónico con conciliación contable automática."
                      : "Integração direta com o sistema de caixa (PDV/ERP) do seu supermercado, rede de lojas ou checkout de e-commerce com conciliação contábil automatizada.")}
                </p>

                <ul className="space-y-2.5 text-[13.5px] text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "ERP & point-of-sale connectors" : (isEs ? "Integración con los principales ERPs" : "Integração com os maiores ERPs do mercado")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Real-time multi-branch reconciliation" : (isEs ? "Conciliación financiera multi-sucursal en tiempo real" : "Conciliação financeira multiloja em tempo real")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Native split payments for marketplaces & partners" : (isEs ? "Split de pago nativo para socios y franquicias" : "Split de pagamento nativo para parceiros")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#A3192E] shrink-0" />
                    <span>{isEn ? "Transparent checkout API & payment links" : (isEs ? "API de checkout transparente y links de pago" : "API de checkout transparente e link de pagamento")}</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenContact('Solicitar Solução XD TEF & Gateway Web')}
                className="btn-secondary text-[14px] !py-3 w-full justify-center cursor-pointer bg-white"
              >
                <span>{isEn ? "Discuss Gateway & POS" : (isEs ? "Consultar TEF y Gateway" : "Falar sobre TEF & Gateway")}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Integração com Conta Digital */}
        <div className="bg-[#0B0F19] text-white rounded-[26px] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A3192E]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-[720px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#A3192E] text-[12px] font-mono mb-4">
                {isEn ? "INTEGRATED FINANCIAL ECOSYSTEM" : (isEs ? "ECOSISTEMA INTEGRADO XD CAPITAL" : "ECOSSISTEMA INTEGRADO XD CAPITAL")}
              </div>
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

