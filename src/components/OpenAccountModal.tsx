import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Building2,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  TrendingUp,
  Landmark,
  Layers,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OpenAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpenAccountModal: React.FC<OpenAccountModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'PF' | 'PJ'>('PJ');
  const [formData, setFormData] = useState({
    name: '',
    document: '',
    email: '',
    phone: '',
    monthlyVolume: '50k-200k',
    services: ['conta-pj', 'recebiveis'] as string[],
    acceptTerms: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && step < 6 && !isSubmitted) {
        // Only trigger enter if not in textarea
        if ((e.target as HTMLElement).tagName !== 'TEXTAREA') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, isSubmitted, accountType, formData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 6) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  const toggleService = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== serviceId)
          : [...prev.services, serviceId],
      };
    });
  };

  const volumeOptions = [
    {
      id: 'ate-50k',
      label: isEn ? 'Up to $ 10k / mo' : (isEs ? 'Hasta R$ 50 mil / mes' : 'Até R$ 50 mil / mês'),
      sub: isEn ? 'Small operations or starting' : (isEs ? 'Pequeños volúmenes o inicio' : 'Pequenos volumes ou início')
    },
    {
      id: '50k-200k',
      label: isEn ? '$ 10k to $ 50k / mo' : (isEs ? 'R$ 50 mil a R$ 200 mil / mes' : 'R$ 50 mil a R$ 200 mil / mês'),
      sub: isEn ? 'Average operation' : (isEs ? 'Operación media' : 'Média de operação')
    },
    {
      id: '200k-1m',
      label: isEn ? '$ 50k to $ 200k / mo' : (isEs ? 'R$ 200 mil a R$ 1 millón / mes' : 'R$ 200 mil a R$ 1 milhão / mês'),
      sub: isEn ? 'Growing companies' : (isEs ? 'Empresas en expansión' : 'Empresas em expansão')
    },
    {
      id: 'acima-1m',
      label: isEn ? 'Above $ 200k / mo' : (isEs ? 'Más de R$ 1 millón / mes' : 'Acima de R$ 1 milhão / mês'),
      sub: isEn ? 'Large accounts & enterprise' : (isEs ? 'Grandes cuentas y corporativo' : 'Grandes contas e corporativo')
    },
  ];

  const serviceOptions = [
    {
      id: 'conta-pj',
      icon: Landmark,
      title: isEn ? 'Digital Account & 24/7 Pix' : (isEs ? 'Cuenta Digital y Pix 24/7' : 'Conta Digital & Pix 24/7'),
      desc: isEn ? 'Complete financial management & reconciliation' : (isEs ? 'Gestión completa y conciliación' : 'Gestão completa e conciliação')
    },
    {
      id: 'recebiveis',
      icon: CreditCard,
      title: isEn ? 'Receivables & Invoices Advance' : (isEs ? 'Anticipación de Facturas y Cobranzas' : 'Antecipação de Empenhos & Recebíveis'),
      desc: isEn ? 'Fast liquidity without bureaucracy' : (isEs ? 'Liquidez ágil sin burocracia' : 'Liquidez ágil sem burocracia')
    },
    {
      id: 'maquininhas',
      icon: Layers,
      title: isEn ? 'POS Terminals & Payment Gateway' : (isEs ? 'Terminales POS y Medios de Pago' : 'Maquininhas & Meios de Pagamento'),
      desc: isEn ? 'Competitive rates and daily settlements' : (isEs ? 'Tarifas competitivas y liquidación diaria' : 'Taxas competitivas e repasse diário')
    },
    {
      id: 'investimentos',
      icon: TrendingUp,
      title: isEn ? 'Corporate Treasury Investments' : (isEs ? 'Inversiones Corporativas' : 'Investimentos Corporativos'),
      desc: isEn ? 'High yield and daily liquidity' : (isEs ? 'Rentabilidad y liquidez diaria' : 'Rentabilidade e liquidez diária')
    },
  ];

  return (
    <div
      id="open-account-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="open-account-wizard-card"
        className="relative w-full max-w-[840px] bg-white rounded-[28px] p-8 sm:p-14 shadow-2xl overflow-hidden border border-slate-100 min-h-[520px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer z-10"
          aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 my-auto text-center flex flex-col items-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#A3192E]/10 border border-[#A3192E] flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-[#A3192E]" />
            </div>
            <span className="text-[12px] font-mono text-[#A3192E] tracking-widest uppercase mb-2">
              {isEn ? 'PROPOSAL GENERATED SUCCESSFULLY' : (isEs ? 'PROPUESTA GENERADA CON ÉXITO' : 'PROPOSTA GERADA COM SUCESSO')}
            </span>
            <h3 className="text-[28px] sm:text-[32px] font-normal text-slate-900 tracking-[-0.03em] mb-3">
              {isEn ? 'Welcome to XD Capital' : (isEs ? 'Bienvenido a XD Capital' : 'Bem-vindo à XD Capital')}
            </h3>
            <p className="text-[16px] text-slate-600 max-w-[500px] leading-relaxed mb-8">
              {isEn
                ? `Your account opening request has been forwarded to our operational desk. Validation credentials sent to ${formData.email || 'your email'}.`
                : (isEs 
                  ? `Su solicitud de apertura de cuenta ha sido enviada a la mesa operativa. Enviamos las credenciales a ${formData.email || 'su correo'}.`
                  : `Sua solicitação de abertura de conta foi encaminhada para a mesa operacional. Enviamos as credenciais de validação para ${formData.email || 'seu e-mail'}.`)}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.ib.xdcapital.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-[15px]"
              >
                <span>{isEn ? 'Access Internet Banking' : (isEs ? 'Acceder a Internet Banking' : 'Acessar Internet Banking')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleReset}
                className="btn-secondary text-[15px]"
              >
                {isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow justify-between">
            {/* Step Counter */}
            <div className="text-[14px] text-slate-500 mb-6 font-normal">
              {isEn ? `Step ${step} of 6` : (isEs ? `Paso ${step} de 6` : `${step} de 6`)}
            </div>

            {/* Step Content */}
            <div className="my-auto py-2">
              {/* STEP 1: Tipo de Conta */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-[28px] sm:text-[38px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-2">
                    {isEn ? 'What type of account would you like to open?' : (isEs ? '¿Qué tipo de cuenta le gustaría abrir?' : 'Qual tipo de conta você gostaria de abrir?')}
                  </h2>
                  <p className="text-[16px] sm:text-[18px] text-slate-500 mb-10">
                    {isEn ? 'Select the account type' : (isEs ? 'Seleccione el tipo de cuenta' : 'Selecione o tipo de conta')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[680px]">
                    {/* Pessoa Física Card */}
                    <div
                      onClick={() => setAccountType('PF')}
                      className={`p-6 sm:p-7 rounded-[20px] border-2 cursor-pointer transition-all duration-200 flex items-center gap-5 ${
                        accountType === 'PF'
                          ? 'border-slate-900 bg-white shadow-md'
                          : 'border-slate-200/90 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[18px] sm:text-[19px] font-normal text-slate-900 leading-snug">
                          {isEn ? 'Individual' : (isEs ? 'Persona Física' : 'Pessoa Física')}
                        </div>
                        <div className="text-[14px] text-slate-500">
                          {isEn ? 'Personal account' : (isEs ? 'Cuenta personal' : 'Conta pessoal')}
                        </div>
                      </div>
                    </div>

                    {/* Pessoa Jurídica Card */}
                    <div
                      onClick={() => setAccountType('PJ')}
                      className={`p-6 sm:p-7 rounded-[20px] border-2 cursor-pointer transition-all duration-200 flex items-center gap-5 ${
                        accountType === 'PJ'
                          ? 'border-slate-900 bg-white shadow-md'
                          : 'border-slate-200/90 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[18px] sm:text-[19px] font-normal text-slate-900 leading-snug">
                          {isEn ? 'Business / Corporate' : (isEs ? 'Persona Jurídica' : 'Pessoa Jurídica')}
                        </div>
                        <div className="text-[14px] text-slate-500">
                          {isEn ? 'Business account' : (isEs ? 'Cuenta corporativa' : 'Conta empresarial')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Identificação */}
              {step === 2 && (
                <div className="animate-fade-in max-w-[640px]">
                  <h2 className="text-[28px] sm:text-[36px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-2">
                    {accountType === 'PJ' 
                      ? (isEn ? 'What is your company name?' : (isEs ? '¿Cuál es la identificación de su empresa?' : 'Qual é a identificação da sua empresa?'))
                      : (isEn ? 'What is your full name?' : (isEs ? '¿Cuál es su identificación?' : 'Qual é a sua identificação?'))}
                  </h2>
                  <p className="text-[16px] text-slate-500 mb-8">
                    {accountType === 'PJ' 
                      ? (isEn ? 'Provide Legal Company Name and Tax ID' : (isEs ? 'Ingrese la Razón Social y el CNPJ/RUT' : 'Informe a Razão Social e o CNPJ'))
                      : (isEn ? 'Provide your Full Name and Tax ID' : (isEs ? 'Ingrese su Nombre Completo y Documento' : 'Informe seu Nome Completo e CPF'))}
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[14px] text-slate-700 mb-2">
                        {accountType === 'PJ' 
                          ? (isEn ? 'Legal Company Name' : (isEs ? 'Razón Social o Nombre Fantasía' : 'Razão Social ou Nome Fantasia'))
                          : (isEn ? 'Full Name' : (isEs ? 'Nombre Completo' : 'Nome Completo'))}
                      </label>
                      <input
                        type="text"
                        autoFocus
                        placeholder={accountType === 'PJ' ? (isEn ? 'e.g. Acme Tech Solutions LLC' : 'Ex: Tech Solutions Ltda') : (isEn ? 'e.g. John Doe' : 'Ex: Carlos Eduardo Silva')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-5 py-3.5 text-[16px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] text-slate-700 mb-2">
                        {accountType === 'PJ' 
                          ? (isEn ? 'Company Tax ID / CNPJ' : (isEs ? 'Documento / CNPJ' : 'CNPJ'))
                          : (isEn ? 'Personal Tax ID / CPF' : (isEs ? 'Documento / CPF' : 'CPF'))}
                      </label>
                      <input
                        type="text"
                        placeholder={accountType === 'PJ' ? '00.000.000/0001-00' : '000.000.000-00'}
                        value={formData.document}
                        onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-5 py-3.5 text-[16px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white font-mono transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Contato */}
              {step === 3 && (
                <div className="animate-fade-in max-w-[640px]">
                  <h2 className="text-[28px] sm:text-[36px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-2">
                    {isEn ? 'How can we contact you?' : (isEs ? '¿Cómo podemos contactarlo?' : 'Como podemos entrar em contato?')}
                  </h2>
                  <p className="text-[16px] text-slate-500 mb-8">
                    {isEn 
                      ? 'We will send the digital validation link and account updates'
                      : (isEs ? 'Enviaremos el enlace de validación digital y notificaciones' : 'Enviaremos o link de validação digital e notificações de conta')}
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[14px] text-slate-700 mb-2">
                        {accountType === 'PJ' 
                          ? (isEn ? 'Corporate Email' : (isEs ? 'Correo Corporativo' : 'E-mail Corporativo'))
                          : (isEn ? 'Primary Email' : (isEs ? 'Correo Electrónico Principal' : 'E-mail Principal'))}
                      </label>
                      <input
                        type="email"
                        autoFocus
                        placeholder="contato@suaempresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-5 py-3.5 text-[16px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[14px] text-slate-700 mb-2">
                        {isEn ? 'Mobile / WhatsApp' : (isEs ? 'Celular / WhatsApp' : 'Celular / WhatsApp')}
                      </label>
                      <input
                        type="tel"
                        placeholder="+55 (11) 90000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-5 py-3.5 text-[16px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white font-mono transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Movimentação Estimada */}
              {step === 4 && (
                <div className="animate-fade-in max-w-[680px]">
                  <h2 className="text-[28px] sm:text-[36px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-2">
                    {isEn ? 'What is your estimated monthly volume?' : (isEs ? '¿Cuál es el volumen mensual estimado?' : 'Qual é o volume mensal estimado?')}
                  </h2>
                  <p className="text-[16px] text-slate-500 mb-8">
                    {isEn 
                      ? 'This helps us calibrate operational limits and tailored conditions'
                      : (isEs ? 'Esto nos ayuda a calibrar sus límites y condiciones exclusivas' : 'Isso nos ajuda a calibrar seus limites operacionais e condições exclusivas')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {volumeOptions.map((vol) => (
                      <div
                        key={vol.id}
                        onClick={() => setFormData({ ...formData, monthlyVolume: vol.id })}
                        className={`p-5 rounded-[18px] border-2 cursor-pointer transition-all ${
                          formData.monthlyVolume === vol.id
                            ? 'border-slate-900 bg-white shadow-sm'
                            : 'border-slate-200/90 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-[16px] font-normal text-slate-900 mb-1">
                          {vol.label}
                        </div>
                        <div className="text-[13px] text-slate-500">
                          {vol.sub}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Serviços de Interesse */}
              {step === 5 && (
                <div className="animate-fade-in max-w-[720px]">
                  <h2 className="text-[28px] sm:text-[36px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-2">
                    {isEn ? 'Which solutions do you wish to enable?' : (isEs ? '¿Qué soluciones desea habilitar?' : 'Quais soluções você deseja habilitar?')}
                  </h2>
                  <p className="text-[16px] text-slate-500 mb-6">
                    {isEn 
                      ? 'Select initial modules for instant activation in your account'
                      : (isEs ? 'Seleccione los módulos iniciales para activación' : 'Selecione os módulos iniciais para ativação na sua conta')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {serviceOptions.map((srv) => {
                      const isSelected = formData.services.includes(srv.id);
                      const Icon = srv.icon;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.id)}
                          className={`p-4.5 rounded-[16px] border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-slate-900 bg-white shadow-sm'
                              : 'border-slate-200/80 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-grow">
                            <div className="text-[15px] font-normal text-slate-900 flex items-center justify-between">
                              <span>{srv.title}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#A3192E]" />}
                            </div>
                            <div className="text-[12.5px] text-slate-500">
                              {srv.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Resumo & Confirmação */}
              {step === 6 && (
                <div className="animate-fade-in max-w-[640px]">
                  <h2 className="text-[28px] sm:text-[36px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-2">
                    {isEn ? 'All set to open your account!' : (isEs ? '¡Todo listo para abrir su cuenta!' : 'Tudo pronto para abrir sua conta!')}
                  </h2>
                  <p className="text-[16px] text-slate-500 mb-6">
                    {isEn 
                      ? 'Review the details below before submitting for activation'
                      : (isEs ? 'Revise los datos a continuación antes de enviar' : 'Revise os dados abaixo antes de enviar para ativação')}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-[18px] p-5 mb-6 space-y-3 text-[14.5px]">
                    <div className="flex justify-between pb-2.5 border-b border-slate-200/70">
                      <span className="text-slate-500">{isEn ? 'Account Type:' : (isEs ? 'Tipo de Cuenta:' : 'Tipo de Conta:')}</span>
                      <span className="text-slate-900 font-normal">
                        {accountType === 'PJ' 
                          ? (isEn ? 'Business' : (isEs ? 'Persona Jurídica' : 'Pessoa Jurídica')) 
                          : (isEn ? 'Individual' : (isEs ? 'Persona Física' : 'Pessoa Física'))}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2.5 border-b border-slate-200/70">
                      <span className="text-slate-500">{isEn ? 'Holder / Company:' : (isEs ? 'Titular / Empresa:' : 'Titular / Empresa:')}</span>
                      <span className="text-slate-900 font-normal">{formData.name || (isEn ? 'Not provided' : (isEs ? 'No informado' : 'Não informado'))}</span>
                    </div>
                    <div className="flex justify-between pb-2.5 border-b border-slate-200/70">
                      <span className="text-slate-500">{isEn ? 'Tax ID:' : (isEs ? 'Documento:' : 'Documento:')}</span>
                      <span className="text-slate-900 font-mono">{formData.document || (isEn ? 'Not provided' : (isEs ? 'No informado' : 'Não informado'))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{isEn ? 'Email:' : (isEs ? 'Correo Electrónico:' : 'E-mail:')}</span>
                      <span className="text-slate-900">{formData.email || (isEn ? 'Not provided' : (isEs ? 'No informado' : 'Não informado'))}</span>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 text-[13.5px] text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="w-4 h-4 rounded text-[#A3192E] border-slate-300 focus:ring-[#A3192E]"
                    />
                    <span>
                      {isEn 
                        ? 'I agree with the Terms of Use, Privacy Policy and Banking Secrecy (LGPD)'
                        : (isEs 
                          ? 'Acepto los Términos de Uso, Política de Privacidad y Secreto Bancario (LGPD)'
                          : 'Concordo com os Termos de Uso e Política de Privacidade e Sigilo Bancário (LGPD)')}
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-full border border-slate-300 text-[14.5px] font-normal transition-all flex items-center gap-2 ${
                    step === 1
                      ? 'opacity-40 cursor-not-allowed text-slate-400 border-slate-200'
                      : 'text-slate-700 hover:bg-slate-50 hover:border-slate-400 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isEn ? 'Back' : (isEs ? 'Anterior' : 'Anterior')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-3 rounded-full bg-[#646464] hover:bg-slate-900 text-white text-[14.5px] font-normal transition-all flex items-center gap-2 cursor-pointer shadow-sm ml-auto sm:ml-0"
                >
                  <span>
                    {step === 6 
                      ? (isEn ? 'Complete Registration' : (isEs ? 'Finalizar Registro' : 'Finalizar Cadastro'))
                      : (isEn ? 'Next' : (isEs ? 'Siguiente' : 'Próxima'))}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[12.5px] text-slate-400 font-normal hidden sm:flex items-center gap-1.5">
                <span>{isEn ? 'Press' : (isEs ? 'Presione' : 'Pressione')}</span>
                <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[11px]">
                  Enter ↵
                </kbd>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

