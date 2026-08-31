import React, { useState, useEffect, useId, useCallback } from 'react';
import {
  Building2,
  User,
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Landmark,
  CreditCard,
  Layers,
  FileText,
  TrendingUp,
  Search,
  Loader2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AppView } from '../App';
import { useLanguage } from '../context/LanguageContext';

interface OpenAccountPageProps {
  onBackToHome: () => void;
  onNavigateContact?: (subject?: string) => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateView?: (view: AppView) => void;
}

// Algoritmo oficial de validação de CNPJ (Módulo 11)
function isValidCNPJ(cnpj: string): boolean {
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length !== 14) return false;
  if (/^(\d)\1+$/.test(clean)) return false;

  let size = clean.length - 2;
  let numbers = clean.substring(0, size);
  const digits = clean.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) return false;

  size = size + 1;
  numbers = clean.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1), 10);
}

// Validação de CPF (Módulo 11)
function isValidCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1+$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(clean.charAt(10), 10);
}

function maskCNPJ(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

function maskCPF(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

function maskPhone(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function maskCEP(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
}

export const OpenAccountPage: React.FC<OpenAccountPageProps> = ({
  onBackToHome,
  onNavigateContact,
  onNavigateTerms,
  onNavigatePrivacy,
}) => {
  const formId = useId();
  const { language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  // Step state: 1 to 6
  const [step, setStep] = useState<number>(1);
  const [accountType, setAccountType] = useState<'PF' | 'PJ'>('PJ');

  // Form State
  const [formData, setFormData] = useState({
    // Step 2: Dados cadastrais da empresa / titular
    companyName: '',
    tradeName: '',
    document: '', // CNPJ ou CPF
    activitySegment: 'Fornecedor Setor Público / Licitações',

    // Step 3: Responsável legal & contato
    representativeName: '',
    representativeRole: 'Sócio-Administrador',
    email: '',
    phone: '',

    // Step 4: Endereço
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: 'SP',

    // Step 5: Produtos e soluções
    services: ['conta-pj', 'pix-24-7', 'recebiveis'] as string[],

    // Step 6: Termos & Conformidade
    acceptTerms: true,
    acceptPrivacy: true,
    authorizedCreditCheck: true,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  useEffect(() => {
    document.title = isEn
      ? 'Payment Account Registration | XD Capital'
      : isEs
      ? 'Apertura de Cuenta de Pago | XD Capital'
      : 'Abertura de Conta de Pagamento | XD Capital';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [language, isEn, isEs]);

  // CEP Auto-Fill
  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsSearchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            street: data.logradouro || prev.street,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state,
          }));
        }
      } catch (err) {
        console.warn('ViaCEP search failed', err);
      } finally {
        setIsSearchingCep(false);
      }
    }
  };

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'companyName':
        if (!value.trim()) {
          return accountType === 'PJ'
            ? (isEn ? 'Please enter legal company name.' : (isEs ? 'Ingrese la razón social.' : 'Informe a Razão Social da empresa.'))
            : (isEn ? 'Please enter full name.' : (isEs ? 'Ingrese el nombre completo.' : 'Informe seu nome completo.'));
        }
        return '';
      case 'document':
        if (!value.trim()) {
          return accountType === 'PJ'
            ? (isEn ? 'CNPJ is required.' : (isEs ? 'El CNPJ es obligatorio.' : 'O CNPJ é obrigatório.'))
            : (isEn ? 'CPF is required.' : (isEs ? 'El CPF es obligatorio.' : 'O CPF é obrigatório.'));
        }
        if (accountType === 'PJ' && !isValidCNPJ(value) && !isEn && !isEs) {
          return 'CNPJ inválido. Verifique os 14 dígitos informados.';
        }
        if (accountType === 'PF' && !isValidCPF(value) && !isEn && !isEs) {
          return 'CPF inválido. Verifique os 11 dígitos informados.';
        }
        return '';
      case 'representativeName':
        if (!value.trim()) {
          return isEn ? 'Enter the full name.' : (isEs ? 'Ingrese el nombre completo.' : 'Informe o nome completo do responsável.');
        }
        return '';
      case 'email':
        if (!value.trim()) {
          return isEn ? 'Email is required.' : (isEs ? 'El correo es obligatorio.' : 'O e-mail é obrigatório.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return isEn ? 'Enter a valid email address.' : (isEs ? 'Ingrese un correo electrónico válido.' : 'Informe um e-mail válido.');
        }
        return '';
      case 'phone':
        if (!value.trim() || value.replace(/\D/g, '').length < 10) {
          return isEn ? 'Valid phone number with area code is required.' : (isEs ? 'Ingrese el teléfono con código.' : 'Informe o telefone com DDD (mínimo 10 dígitos).');
        }
        return '';
      case 'city':
        if (!value.trim()) {
          return isEn ? 'City is required.' : (isEs ? 'La ciudad es obligatoria.' : 'Informe a cidade.');
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, (formData as any)[field] || '');
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: string, value: string) => {
    let formatted = value;
    if (field === 'document') {
      formatted = accountType === 'PJ' ? maskCNPJ(value) : maskCPF(value);
    } else if (field === 'phone') {
      formatted = maskPhone(value);
    } else if (field === 'cep') {
      formatted = maskCEP(value);
    }

    setFormData((prev) => ({ ...prev, [field]: formatted }));

    if (touched[field]) {
      const errorMsg = validateField(field, formatted);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
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

  const validateCurrentStep = useCallback((): boolean => {
    const currentErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 2) {
      const nameErr = validateField('companyName', formData.companyName);
      const docErr = validateField('document', formData.document);
      if (nameErr) {
        currentErrors.companyName = nameErr;
        isValid = false;
      }
      if (docErr) {
        currentErrors.document = docErr;
        isValid = false;
      }
      setTouched((prev) => ({ ...prev, companyName: true, document: true }));
    } else if (step === 3) {
      const repErr = validateField('representativeName', formData.representativeName);
      const emailErr = validateField('email', formData.email);
      const phoneErr = validateField('phone', formData.phone);
      if (repErr) {
        currentErrors.representativeName = repErr;
        isValid = false;
      }
      if (emailErr) {
        currentErrors.email = emailErr;
        isValid = false;
      }
      if (phoneErr) {
        currentErrors.phone = phoneErr;
        isValid = false;
      }
      setTouched((prev) => ({ ...prev, representativeName: true, email: true, phone: true }));
    } else if (step === 4) {
      const cityErr = validateField('city', formData.city);
      if (cityErr) {
        currentErrors.city = cityErr;
        isValid = false;
      }
      setTouched((prev) => ({ ...prev, city: true }));
    } else if (step === 6) {
      if (!formData.acceptTerms || !formData.acceptPrivacy) {
        currentErrors.terms = isEn
          ? 'You must accept the Terms of Use and Privacy Policy.'
          : isEs
          ? 'Debe aceptar los Términos de Uso y la Política de Privacidad.'
          : 'É necessário concordar com os Termos de Uso e Política de Privacidade.';
        isValid = false;
      }
    }

    setErrors((prev) => ({ ...prev, ...currentErrors }));
    return isValid;
  }, [step, formData, accountType, isEn, isEs]);

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) {
      return;
    }
    if (step < 6) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [step, validateCurrentStep]);

  const handlePrev = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const proto = `XD-CAD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date());

      setProtocolNumber(proto);
      setSubmissionDate(now);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  // Keyboard navigation: Enter advances to next step
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitted) return;
      if (e.key === 'Enter' && !e.shiftKey) {
        // Prevent default submit in textarea if any
        if ((e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, isSubmitted]);

  const serviceOptions = [
    {
      id: 'conta-pj',
      icon: Landmark,
      title: isEn ? 'Payment Account & Pix 24/7' : (isEs ? 'Cuenta de Pago y Pix 24/7' : 'Conta de Pagamento & Pix 24/7'),
      desc: isEn ? 'Full digital banking, TED & instant transfers' : (isEs ? 'Gestión bancaria digital, TED y transferencias' : 'Gestão bancária digital, conciliação e transferências instantâneas'),
    },
    {
      id: 'recebiveis',
      icon: CreditCard,
      title: isEn ? 'Receivables & Invoices Advance' : (isEs ? 'Anticipo de Facturas y Contratos' : 'Antecipação de Empenhos & Recebíveis'),
      desc: isEn ? 'Fast liquidity and invoice factoring desk' : (isEs ? 'Liquidez predecible y monetización de contratos' : 'Liquidez ágil e monetização de contratos e empenhos públicos'),
    },
    {
      id: 'maquininhas',
      icon: Layers,
      title: isEn ? 'XD Pay POS & Card Acquiring' : (isEs ? 'Terminales POS XD Pay' : 'XD Pay Maquininhas & Meios de Pagamento'),
      desc: isEn ? 'Competitive merchant rates and automatic payout' : (isEs ? 'Tasas competitivas y liquidación diaria' : 'Taxas de captura diferenciadas e repasse financeiro automático'),
    },
    {
      id: 'consignado',
      icon: FileText,
      title: isEn ? 'Payroll Loans & Benefit Agreements' : (isEs ? 'Crédito de Nómina' : 'Crédito Consignado em Folha'),
      desc: isEn ? 'Credit lines for employees and civil servants' : (isEs ? 'Líneas de crédito para colaboradores' : 'Linhas de crédito com desconto em folha para empresas e servidores'),
    },
    {
      id: 'investimentos',
      icon: TrendingUp,
      title: isEn ? 'Cash Management & Treasury' : (isEs ? 'Gestión de Tesorería' : 'Gestão de Caixa & Tesouraria'),
      desc: isEn ? 'Liquidity yield for working capital' : (isEs ? 'Optimización de liquidez para capital de trabajo' : 'Rentabilidade e liquidez diária para o capital de giro'),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B0F19] flex flex-col justify-between selection:bg-[#A3192E] selection:text-white">
      {/* Top Header: Centered Logo & Top-Right Close button (Matching example) */}
      <header className="w-full px-6 py-6 sm:px-12 flex items-center justify-between border-b border-transparent">
        <div className="w-8" aria-hidden="true" />
        
        {/* Brand Logo in Top Center */}
        <div className="flex items-center justify-center">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="XD Capital Home"
          >
            <span className="font-extrabold text-[22px] sm:text-[24px] tracking-[-0.04em] text-[#0B0F19] uppercase font-sans">
              XD <span className="text-[#A3192E]">CAPITAL</span>
            </span>
          </button>
        </div>

        {/* Close Button on Right */}
        <button
          onClick={onBackToHome}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          title={isEn ? 'Close registration' : (isEs ? 'Cerrar registro' : 'Fechar cadastro')}
          aria-label={isEn ? 'Close registration' : (isEs ? 'Cerrar registro' : 'Fechar cadastro')}
        >
          <X className="w-6 h-6 stroke-[1.75]" />
        </button>
      </header>

      {/* Main Centered Content Area */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-[680px] mx-auto">
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h1 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.03em] mb-2 leading-tight">
                  {isEn ? 'Registration Transmitted Successfully!' : (isEs ? '¡Registro Enviado con Éxito!' : 'Cadastro Enviado com Sucesso!')}
                </h1>
                <p className="text-[15px] sm:text-[16px] text-slate-500 max-w-[540px] mx-auto leading-relaxed">
                  {isEn
                    ? `Your payment account application was received. Confirmation details were sent to ${formData.email || 'your email'}.`
                    : isEs
                    ? `Su solicitud de apertura de cuenta fue recibida. Enviamos los detalles a ${formData.email || 'su correo'}.`
                    : `Sua solicitação de abertura de conta de pagamento foi recebida. Enviamos os detalhes para ${formData.email || 'seu e-mail'}.`}
                </p>
              </div>

              {/* Protocol Details Box */}
              <div className="bg-[#F8F9FA] border border-slate-200/90 rounded-[20px] p-6 text-left space-y-3 font-mono text-[13.5px] max-w-[540px] mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-slate-500 font-sans">{isEn ? 'Protocol Number:' : (isEs ? 'Número de Protocolo:' : 'Protocolo de Abertura:')}</span>
                  <span className="font-bold text-[#A3192E] text-[15px]">{protocolNumber}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-slate-500 font-sans">{isEn ? 'Holder / Entity:' : (isEs ? 'Titular:' : 'Titular:')}</span>
                  <span className="text-slate-900 font-sans font-medium">{formData.companyName || 'Empresa Cadastrada'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-slate-500 font-sans">{isEn ? 'Document:' : (isEs ? 'Documento:' : 'Documento (CNPJ/CPF):')}</span>
                  <span className="text-slate-900">{formData.document}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-sans">{isEn ? 'Analysis Timeframe:' : (isEs ? 'Plazo de Análisis:' : 'Prazo de Análise Cadastral:')}</span>
                  <span className="text-slate-900 font-sans font-medium">{isEn ? 'Up to 24-48 business hours' : (isEs ? 'Hasta 24 a 48 horas' : 'Até 24 a 48 horas úteis')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href="https://ib.xdcapital.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#A3192E] hover:bg-[#8A1224] text-white text-[14.5px] font-medium transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>{isEn ? 'Access Internet Banking' : (isEs ? 'Acceder al Internet Banking' : 'Acessar Internet Banking')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onBackToHome}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-[14.5px] font-medium transition-all cursor-pointer"
                >
                  {isEn ? 'Back to Home' : (isEs ? 'Volver al Inicio' : 'Voltar para o Início')}
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Flow (Exact Layout from Image) */
            <div className="space-y-7">
              {/* Step Counter: e.g. "1 de 6" */}
              <div className="text-[13.5px] font-normal text-slate-500 font-sans">
                {isEn ? `${step} of 6` : (isEs ? `${step} de 6` : `${step} de 6`)}
              </div>

              {/* STEP 1: Qual tipo de conta você gostaria de abrir? */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-[28px] sm:text-[36px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.15] mb-2">
                      {isEn
                        ? 'What type of account would you like to open?'
                        : isEs
                        ? '¿Qué tipo de cuenta le gustaría abrir?'
                        : 'Qual tipo de conta você gostaria de abrir?'}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-slate-500">
                      {isEn ? 'Select account type' : (isEs ? 'Seleccione el tipo de cuenta' : 'Selecione o tipo de conta')}
                    </p>
                  </div>

                  {/* Cards side by side: Pessoa Física & Pessoa Jurídica */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Pessoa Física Card */}
                    <button
                      type="button"
                      id="opt-pf-account"
                      onClick={() => setAccountType('PF')}
                      className={`p-5 rounded-[16px] border text-left transition-all duration-150 flex items-center gap-4 cursor-pointer ${
                        accountType === 'PF'
                          ? 'border-slate-900 bg-slate-50/70 shadow-xs ring-1 ring-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        accountType === 'PF' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[15.5px] font-bold text-slate-900 leading-tight">
                          {isEn ? 'Individual' : (isEs ? 'Persona Física' : 'Pessoa Física')}
                        </div>
                        <div className="text-[13px] text-slate-500 mt-0.5">
                          {isEn ? 'Personal account' : (isEs ? 'Cuenta personal' : 'Conta pessoal')}
                        </div>
                      </div>
                    </button>

                    {/* Pessoa Jurídica Card */}
                    <button
                      type="button"
                      id="opt-pj-account"
                      onClick={() => setAccountType('PJ')}
                      className={`p-5 rounded-[16px] border text-left transition-all duration-150 flex items-center gap-4 cursor-pointer ${
                        accountType === 'PJ'
                          ? 'border-slate-900 bg-slate-50/70 shadow-xs ring-1 ring-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        accountType === 'PJ' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[15.5px] font-bold text-slate-900 leading-tight">
                          {isEn ? 'Corporate / Business' : (isEs ? 'Pessoa Jurídica' : 'Pessoa Jurídica')}
                        </div>
                        <div className="text-[13px] text-slate-500 mt-0.5">
                          {isEn ? 'Business account' : (isEs ? 'Cuenta empresarial' : 'Conta empresarial')}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Dados da Empresa / Titular */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.15] mb-2">
                      {accountType === 'PJ'
                        ? (isEn ? 'What are your company details?' : (isEs ? '¿Cuáles son los datos de su empresa?' : 'Quais são os dados da sua empresa?'))
                        : (isEn ? 'What are your personal details?' : (isEs ? '¿Cuáles son sus datos personales?' : 'Quais são os seus dados pessoais?'))}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-slate-500">
                      {accountType === 'PJ'
                        ? (isEn ? 'Enter the legal company name and CNPJ' : (isEs ? 'Ingrese la razón social y el CNPJ' : 'Informe a Razão Social e o CNPJ da empresa'))
                        : (isEn ? 'Enter your full legal name and CPF' : (isEs ? 'Ingrese su nombre legal y CPF' : 'Informe seu nome completo e CPF'))}
                    </p>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div>
                      <label htmlFor={`${formId}-companyName`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                        {accountType === 'PJ'
                          ? (isEn ? 'Legal Company Name *' : (isEs ? 'Razón Social *' : 'Razão Social *'))
                          : (isEn ? 'Full Legal Name *' : (isEs ? 'Nombre Completo *' : 'Nome Completo *'))}
                      </label>
                      <input
                        id={`${formId}-companyName`}
                        type="text"
                        autoFocus
                        placeholder={accountType === 'PJ' ? 'Ex: Alpha Engenharia & Serviços Ltda.' : 'Ex: Carlos Eduardo Silva'}
                        value={formData.companyName}
                        onBlur={() => handleBlur('companyName')}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className={`w-full bg-white border rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all ${
                          errors.companyName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.companyName && (
                        <div className="text-[12.5px] text-red-600 mt-1">{errors.companyName}</div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${formId}-document`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {accountType === 'PJ'
                            ? (isEn ? 'CNPJ (Company Tax ID) *' : (isEs ? 'CNPJ *' : 'CNPJ da Empresa *'))
                            : (isEn ? 'CPF (Tax ID) *' : (isEs ? 'CPF *' : 'CPF do Titular *'))}
                        </label>
                        <input
                          id={`${formId}-document`}
                          type="text"
                          maxLength={accountType === 'PJ' ? 18 : 14}
                          placeholder={accountType === 'PJ' ? '00.000.000/0001-00' : '000.000.000-00'}
                          value={formData.document}
                          onBlur={() => handleBlur('document')}
                          onChange={(e) => handleChange('document', e.target.value)}
                          className={`w-full bg-white border rounded-[14px] px-4 py-3.5 text-[15px] font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all ${
                            errors.document ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.document && (
                          <div className="text-[12.5px] text-red-600 mt-1">{errors.document}</div>
                        )}
                      </div>

                      {accountType === 'PJ' ? (
                        <div>
                          <label htmlFor={`${formId}-tradeName`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                            {isEn ? 'Trade Name (Optional)' : (isEs ? 'Nombre Fantasía' : 'Nome Fantasia (Opcional)')}
                          </label>
                          <input
                            id={`${formId}-tradeName`}
                            type="text"
                            placeholder="Ex: Alpha Serviços"
                            value={formData.tradeName}
                            onChange={(e) => handleChange('tradeName', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                          />
                        </div>
                      ) : (
                        <div>
                          <label htmlFor={`${formId}-segment`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                            {isEn ? 'Profession / Area' : (isEs ? 'Profesión' : 'Área de Atuação')}
                          </label>
                          <input
                            id={`${formId}-segment`}
                            type="text"
                            placeholder="Ex: Servidor Público, Empresário"
                            value={formData.activitySegment}
                            onChange={(e) => handleChange('activitySegment', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                          />
                        </div>
                      )}
                    </div>

                    {accountType === 'PJ' && (
                      <div>
                        <label htmlFor={`${formId}-activitySegment`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Main Industry / Activity' : (isEs ? 'Sector de Actividad' : 'Segmento Principal de Atuação')}
                        </label>
                        <select
                          id={`${formId}-activitySegment`}
                          value={formData.activitySegment}
                          onChange={(e) => handleChange('activitySegment', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[14.5px] text-slate-900 focus:outline-none focus:border-slate-900 transition-all cursor-pointer"
                        >
                          <option value="Fornecedor Setor Público / Licitações">Fornecedor Setor Público / Licitações & Empenhos</option>
                          <option value="Construção Civil & Infraestrutura">Construção Civil & Infraestrutura</option>
                          <option value="Saúde & Serviços Hospitalares">Saúde & Serviços Hospitalares</option>
                          <option value="Comércio & Varejo">Comércio & Varejo (PDV / E-commerce)</option>
                          <option value="Transporte & Logística">Transporte & Logística</option>
                          <option value="Serviços Corporativos & Tecnologia">Serviços Corporativos & Tecnologia</option>
                          <option value="Outros">Outros Segmentos</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: Responsável Legal & Contato */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.15] mb-2">
                      {isEn
                        ? 'Who is the primary contact?'
                        : isEs
                        ? '¿Quién es el contacto principal?'
                        : 'Quem é o responsável pelo contato?'}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-slate-500">
                      {isEn
                        ? 'Enter direct contact information for verification'
                        : isEs
                        ? 'Datos de contacto para validación de la cuenta'
                        : 'Dados diretos para validação cadastral e comunicação'}
                    </p>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div>
                      <label htmlFor={`${formId}-repName`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                        {isEn ? 'Full Name of Representative *' : (isEs ? 'Nombre del Representante *' : 'Nome Completo do Responsável *')}
                      </label>
                      <input
                        id={`${formId}-repName`}
                        type="text"
                        autoFocus
                        placeholder="Ex: Carlos Eduardo Silva"
                        value={formData.representativeName}
                        onBlur={() => handleBlur('representativeName')}
                        onChange={(e) => handleChange('representativeName', e.target.value)}
                        className={`w-full bg-white border rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all ${
                          errors.representativeName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.representativeName && (
                        <div className="text-[12.5px] text-red-600 mt-1">{errors.representativeName}</div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${formId}-email`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Corporate / Personal Email *' : (isEs ? 'Correo Electrónico *' : 'E-mail Principal *')}
                        </label>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          placeholder="carlos@empresa.com.br"
                          value={formData.email}
                          onBlur={() => handleBlur('email')}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full bg-white border rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all ${
                            errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.email && (
                          <div className="text-[12.5px] text-red-600 mt-1">{errors.email}</div>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`${formId}-phone`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Cell Phone / WhatsApp *' : (isEs ? 'Teléfono Celular *' : 'Telefone Celular (WhatsApp) *')}
                        </label>
                        <input
                          id={`${formId}-phone`}
                          type="text"
                          maxLength={15}
                          placeholder="(11) 98765-4321"
                          value={formData.phone}
                          onBlur={() => handleBlur('phone')}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={`w-full bg-white border rounded-[14px] px-4 py-3.5 text-[15px] font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all ${
                            errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.phone && (
                          <div className="text-[12.5px] text-red-600 mt-1">{errors.phone}</div>
                        )}
                      </div>
                    </div>

                    {accountType === 'PJ' && (
                      <div>
                        <label htmlFor={`${formId}-role`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Role in Company' : (isEs ? 'Cargo en la Empresa' : 'Cargo / Vínculo com a Empresa')}
                        </label>
                        <select
                          id={`${formId}-role`}
                          value={formData.representativeRole}
                          onChange={(e) => handleChange('representativeRole', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[14.5px] text-slate-900 focus:outline-none focus:border-slate-900 transition-all cursor-pointer"
                        >
                          <option value="Sócio-Administrador">Sócio-Administrador</option>
                          <option value="Diretor / CFO">Diretor / Diretor Financeiro (CFO)</option>
                          <option value="Gerente Financeiro">Gerente / Coordenador Financeiro</option>
                          <option value="Procurador Legal">Procurador Legal Constituído</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: Endereço & Sede */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.15] mb-2">
                      {accountType === 'PJ'
                        ? (isEn ? 'Where is your company located?' : (isEs ? '¿Dónde está ubicada su empresa?' : 'Onde sua empresa está sediada?'))
                        : (isEn ? 'What is your address?' : (isEs ? '¿Cuál es su dirección?' : 'Qual é o seu endereço?'))}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-slate-500">
                      {accountType === 'PJ'
                        ? (isEn ? 'Enter registered fiscal address' : (isEs ? 'Ingrese la dirección fiscal' : 'Informe o endereço comercial cadastrado no CNPJ'))
                        : (isEn ? 'Enter your residential address' : (isEs ? 'Ingrese su dirección residencial' : 'Informe seu endereço residencial'))}
                    </p>
                  </div>

                  <div className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1">
                        <label htmlFor={`${formId}-cep`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'ZIP / CEP' : (isEs ? 'Código Postal (CEP)' : 'CEP')}
                        </label>
                        <div className="relative">
                          <input
                            id={`${formId}-cep`}
                            type="text"
                            autoFocus
                            maxLength={9}
                            placeholder="00000-000"
                            value={formData.cep}
                            onBlur={handleCepBlur}
                            onChange={(e) => handleChange('cep', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                          />
                          {isSearchingCep && (
                            <div className="absolute right-3.5 top-4 text-slate-400 animate-spin">
                              <Loader2 className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor={`${formId}-street`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Street / Address' : (isEs ? 'Calle / Dirección' : 'Logradouro / Rua / Avenida')}
                        </label>
                        <input
                          id={`${formId}-street`}
                          type="text"
                          placeholder="Ex: Av. Brigadeiro Faria Lima"
                          value={formData.street}
                          onChange={(e) => handleChange('street', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label htmlFor={`${formId}-number`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Number' : (isEs ? 'Número' : 'Número')}
                        </label>
                        <input
                          id={`${formId}-number`}
                          type="text"
                          placeholder="1500"
                          value={formData.number}
                          onChange={(e) => handleChange('number', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor={`${formId}-complement`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Complement' : (isEs ? 'Complemento' : 'Complemento')}
                        </label>
                        <input
                          id={`${formId}-complement`}
                          type="text"
                          placeholder="Conj. 12"
                          value={formData.complement}
                          onChange={(e) => handleChange('complement', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                        />
                      </div>

                      <div className="col-span-2">
                        <label htmlFor={`${formId}-neighborhood`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'Neighborhood' : (isEs ? 'Barrio' : 'Bairro')}
                        </label>
                        <input
                          id={`${formId}-neighborhood`}
                          type="text"
                          placeholder="Itaim Bibi"
                          value={formData.neighborhood}
                          onChange={(e) => handleChange('neighborhood', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label htmlFor={`${formId}-city`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'City *' : (isEs ? 'Ciudad *' : 'Cidade *')}
                        </label>
                        <input
                          id={`${formId}-city`}
                          type="text"
                          placeholder="São Paulo"
                          value={formData.city}
                          onBlur={() => handleBlur('city')}
                          onChange={(e) => handleChange('city', e.target.value)}
                          className={`w-full bg-white border rounded-[14px] px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-all ${
                            errors.city ? 'border-red-500 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.city && (
                          <div className="text-[12.5px] text-red-600 mt-1">{errors.city}</div>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`${formId}-state`} className="block text-[13px] font-medium text-slate-700 mb-1.5">
                          {isEn ? 'State (UF)' : (isEs ? 'Estado (UF)' : 'Estado (UF)')}
                        </label>
                        <select
                          id={`${formId}-state`}
                          value={formData.state}
                          onChange={(e) => handleChange('state', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3.5 text-[14.5px] text-slate-900 focus:outline-none focus:border-slate-900 transition-all cursor-pointer font-mono"
                        >
                          <option value="SP">SP</option>
                          <option value="RJ">RJ</option>
                          <option value="MG">MG</option>
                          <option value="PR">PR</option>
                          <option value="RS">RS</option>
                          <option value="SC">SC</option>
                          <option value="BA">BA</option>
                          <option value="DF">DF</option>
                          <option value="GO">GO</option>
                          <option value="PE">PE</option>
                          <option value="CE">CE</option>
                          <option value="ES">ES</option>
                          <option value="MT">MT</option>
                          <option value="MS">MS</option>
                          <option value="PA">PA</option>
                          <option value="AM">AM</option>
                          <option value="MA">MA</option>
                          <option value="PB">PB</option>
                          <option value="RN">RN</option>
                          <option value="AL">AL</option>
                          <option value="SE">SE</option>
                          <option value="PI">PI</option>
                          <option value="TO">TO</option>
                          <option value="RO">RO</option>
                          <option value="AC">AC</option>
                          <option value="AP">AP</option>
                          <option value="RR">RR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Serviços Desejados */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.15] mb-2">
                      {isEn
                        ? 'Which services would you like to enable?'
                        : isEs
                        ? '¿Qué soluciones desea habilitar?'
                        : 'Quais serviços você deseja habilitar?'}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-slate-500">
                      {isEn
                        ? 'Select one or more financial solutions'
                        : isEs
                        ? 'Seleccione una o más opciones'
                        : 'Selecione as soluções de seu interesse (você pode escolher múltiplas)'}
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {serviceOptions.map((serv) => {
                      const isSelected = formData.services.includes(serv.id);
                      const Icon = serv.icon;
                      return (
                        <div
                          key={serv.id}
                          onClick={() => toggleService(serv.id)}
                          className={`p-4 sm:p-5 rounded-[16px] border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer ${
                            isSelected
                              ? 'border-slate-900 bg-slate-50/80 shadow-xs ring-1 ring-slate-900'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-[15px] font-bold text-slate-900 leading-tight">
                                {serv.title}
                              </div>
                              <div className="text-[13px] text-slate-500 mt-0.5">
                                {serv.desc}
                              </div>
                            </div>
                          </div>

                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Revisão & Termos */}
              {step === 6 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-[28px] sm:text-[34px] font-bold text-slate-900 tracking-[-0.03em] leading-[1.15] mb-2">
                      {isEn
                        ? 'Almost done! Review and confirm'
                        : isEs
                        ? '¡Casi listo! Revise y confirme'
                        : 'Quase pronto! Revise e confirme'}
                    </h1>
                    <p className="text-[15px] sm:text-[16px] text-slate-500">
                      {isEn
                        ? 'Verify information before submitting for onboarding'
                        : isEs
                        ? 'Verifique los datos antes de enviar la propuesta'
                        : 'Verifique seus dados antes de submeter a proposta para nossa mesa de operações'}
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#F8F9FA] border border-slate-200 rounded-[18px] p-5 space-y-2.5 text-[13.5px]">
                    <div className="flex justify-between border-b border-slate-200/70 pb-2">
                      <span className="text-slate-500">{isEn ? 'Account Type:' : (isEs ? 'Tipo de Cuenta:' : 'Tipo de Conta:')}</span>
                      <span className="font-semibold text-slate-900">{accountType === 'PJ' ? 'Pessoa Jurídica (Empresarial)' : 'Pessoa Física (Individual)'}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-200/70 pb-2">
                      <span className="text-slate-500">{isEn ? 'Holder / Legal Name:' : (isEs ? 'Titular:' : 'Razão Social / Nome:')}</span>
                      <span className="font-medium text-slate-900 text-right">{formData.companyName || '-'}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-200/70 pb-2">
                      <span className="text-slate-500">{isEn ? 'Document:' : (isEs ? 'Documento:' : 'Documento (CNPJ/CPF):')}</span>
                      <span className="font-mono text-slate-900">{formData.document || '-'}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-200/70 pb-2">
                      <span className="text-slate-500">{isEn ? 'Representative:' : (isEs ? 'Contacto:' : 'Responsável / Contato:')}</span>
                      <span className="text-slate-900 text-right">{formData.representativeName || '-'} ({formData.phone})</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">{isEn ? 'Email:' : (isEs ? 'Correo:' : 'E-mail:')}</span>
                      <span className="text-slate-900">{formData.email || '-'}</span>
                    </div>
                  </div>

                  {/* Terms & Consent Checkboxes */}
                  <div className="space-y-3 pt-1">
                    <label className="flex items-start gap-3 text-[13.5px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                      />
                      <span>
                        {isEn ? (
                          <>I agree with the <button type="button" onClick={onNavigateTerms} className="text-slate-900 underline font-medium">Terms of Use</button> and <button type="button" onClick={onNavigatePrivacy} className="text-slate-900 underline font-medium">Privacy Policy</button> of XD Capital.</>
                        ) : isEs ? (
                          <>Acepto los <button type="button" onClick={onNavigateTerms} className="text-slate-900 underline font-medium">Términos de Uso</button> y la <button type="button" onClick={onNavigatePrivacy} className="text-slate-900 underline font-medium">Política de Privacidad</button> de XD Capital.</>
                        ) : (
                          <>Declaro que li e concordo com os <button type="button" onClick={onNavigateTerms} className="text-slate-900 underline font-medium">Termos de Uso</button> e a <button type="button" onClick={onNavigatePrivacy} className="text-slate-900 underline font-medium">Política de Privacidade</button> da XD Capital.</>
                        )}
                      </span>
                    </label>

                    <label className="flex items-start gap-3 text-[13.5px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.authorizedCreditCheck}
                        onChange={(e) => setFormData((prev) => ({ ...prev, authorizedCreditCheck: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                      />
                      <span>
                        {isEn
                          ? 'I authorize compliance and banking verification under Central Bank (BACEN) regulations.'
                          : (isEs 
                            ? 'Autorizo la verificación de antecedentes regulatorios ante el Banco Central de Brasil.'
                            : 'Autorizo a consulta e validação de compliance perante órgãos reguladores e Banco Central (BACEN 382).')}
                      </span>
                    </label>

                    {errors.terms && (
                      <div className="text-[12.5px] text-red-600 pt-1">{errors.terms}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Buttons: < Anterior (Outline pill) & Próxima > (Solid pill) + Helper text "Pressione Enter ↵" */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  {/* Anterior Button (Disabled or hidden on step 1) */}
                  {step > 1 ? (
                    <button
                      type="button"
                      id="btn-form-prev"
                      onClick={handlePrev}
                      className="px-6 py-2.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:bg-slate-50 text-[14.5px] font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{isEn ? 'Previous' : (isEs ? 'Anterior' : 'Anterior')}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Próxima / Concluir Button */}
                  <button
                    type="button"
                    id="btn-form-next"
                    disabled={isSubmitting}
                    onClick={handleNext}
                    className="px-7 py-2.5 rounded-full bg-slate-700 hover:bg-slate-800 active:scale-[0.98] text-white text-[14.5px] font-medium transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ml-auto shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isEn ? 'Submitting...' : (isEs ? 'Enviando...' : 'Enviando...')}</span>
                      </>
                    ) : step === 6 ? (
                      <>
                        <span>{isEn ? 'Complete Registration' : (isEs ? 'Finalizar Registro' : 'Concluir Cadastro')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>{isEn ? 'Next' : (isEs ? 'Próxima' : 'Próxima')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Helper text: Pressione Enter ↵ */}
                <div className="text-left text-[12px] text-slate-400 font-sans">
                  {isEn ? 'Press' : (isEs ? 'Presione' : 'Pressione')}{' '}
                  <span className="font-semibold text-slate-600 font-mono">Enter ↵</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Subtle bottom footer bar */}
      <footer className="w-full py-4 text-center text-[12px] text-slate-400 font-mono">
        XD CAPITAL PARTICIPAÇÕES LTDA · BACEN 382
      </footer>
    </div>
  );
};
