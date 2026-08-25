import React, { useState, useEffect, useId } from 'react';
import {
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  Loader2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { AppView } from '../App';
import { useLanguage } from '../context/LanguageContext';

// ============================================================================
// ENDPOINT DA API: Conecte aqui o webhook ou endpoint de CRM da mesa corporativa
// Exemplo: const API_CONTACT_ENDPOINT = 'https://api.xdcapital.com.br/v1/leads';
// ============================================================================
const API_CONTACT_ENDPOINT = '';

interface ContactPageProps {
  onBackToHome: () => void;
  onOpenAccount: () => void;
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

function maskCNPJ(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
}

function maskPhone(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com',
  'yahoo.com.br',
  'outlook.com',
  'live.com',
  'icloud.com',
  'bol.com.br',
  'uol.com.br',
  'terra.com.br'
];

export const ContactPage: React.FC<ContactPageProps> = ({
  onBackToHome,
  onOpenAccount,
  onNavigatePrivacy,
  onNavigateView,
}) => {
  const formId = useId();
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  // Estados do formulário
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    cnpj: '',
    email: '',
    phone: '',
    subject: isEn ? 'Public Sector Contracts Advance' : (isEs ? 'Anticipo de Contratos Públicos' : 'Antecipação de Empenhos e Contratos Públicos'),
    operationVolume: isEn ? 'From $50,000 to $200,000' : 'De R$ 250.000 a R$ 1.000.000',
    message: '',
    website_hp: '', // Honeypot anti-spam
  });

  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');

  // Estados de erro por campo (inline validation no blur)
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [emailWarning, setEmailWarning] = useState('');

  // SEO & Acessibilidade: Atualiza title e injeta Schema.org Organization
  useEffect(() => {
    document.title = isEn ? 'Contact & Corporate Desk | XD Capital' : (isEs ? 'Contacto y Mesa Corporativa | XD Capital' : 'Atendimento e Mesa Corporativa | XD Capital');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Schema.org Organization JSON-LD
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'schema-org-contact';
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'XD Capital Serviço de Intermediação Financeira Ltda.',
      alternateName: 'XD Capital',
      identifier: '55.038.166/0001-99',
      legalName: 'XD Capital Serviço de Intermediação Financeira Ltda.',
      url: 'https://xdcapital.com.br',
      logo: 'https://xdcapital.com.br/logo.png',
      telephone: '+55-11-3000-0000',
      email: 'contato@xdcapital.com.br',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Avenida Brigadeiro Faria Lima, 1485, Conjunto 121',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        postalCode: '01452-002',
        addressCountry: 'BR',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+55-11-3000-0000',
          contactType: 'customer service',
          areaServed: 'BR',
          availableLanguage: ['Portuguese', 'English', 'Spanish'],
        },
        {
          '@type': 'ContactPoint',
          email: 'privacidade@xdcapital.com.br',
          contactType: 'Data Protection Officer',
        },
      ],
    });
    document.head.appendChild(schemaScript);

    return () => {
      const existing = document.getElementById('schema-org-contact');
      if (existing) existing.remove();
    };
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return isEn ? 'Please enter your full name.' : (isEs ? 'Ingrese el nombre completo del solicitante.' : 'Informe o nome completo do solicitante.');
        if (value.trim().split(' ').length < 2) return isEn ? 'Please enter first and last name.' : (isEs ? 'Ingrese nombre y apellido.' : 'Informe nome e sobrenome.');
        return '';
      case 'company':
        if (!value.trim()) return isEn ? 'Please enter company name.' : (isEs ? 'Ingrese la razón social o nombre de la empresa.' : 'Informe a razão social ou nome empresarial.');
        return '';
      case 'cnpj':
        if (!value.trim()) return isEn ? 'Tax ID / CNPJ is required.' : (isEs ? 'El CNPJ / Identificación fiscal es obligatorio.' : 'O CNPJ é obrigatório para triagem pela mesa.');
        if (!isValidCNPJ(value) && !isEn && !isEs) return 'CNPJ inválido. Verifique os números digitados.';
        return '';
      case 'email':
        if (!value.trim()) return isEn ? 'Please enter contact email.' : (isEs ? 'Ingrese el correo electrónico de contacto.' : 'Informe o e-mail para contato.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return isEn ? 'Enter a valid email address.' : (isEs ? 'Ingrese un correo electrónico válido.' : 'Informe um endereço de e-mail válido.');
        return '';
      case 'phone':
        if (!value.trim()) return isEn ? 'Please enter phone number.' : (isEs ? 'Ingrese el número de teléfono com código.' : 'Informe o telefone com DDD.');
        if (value.replace(/\D/g, '').length < 10) return isEn ? 'Phone incomplete. Minimum 10 digits.' : (isEs ? 'Teléfono incompleto. Mínimo 10 dígitos.' : 'Telefone incompleto. Mínimo 10 dígitos com DDD.');
        return '';
      case 'message':
        if (!value.trim()) return isEn ? 'Please describe your request.' : (isEs ? 'Describa brevemente la solicitud u operación.' : 'Descreva brevemente a demanda ou operação.');
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, (formData as any)[field] || '');
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));

    // Verificação de domínio gratuito no e-mail
    if (field === 'email' && formData.email) {
      const domain = formData.email.split('@')[1]?.toLowerCase();
      if (domain && FREE_EMAIL_DOMAINS.includes(domain)) {
        setEmailWarning('Recomendamos o uso de e-mail corporativo institucional para agilizar a triagem de crédito pela mesa.');
      } else {
        setEmailWarning('');
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    let formattedValue = value;
    if (field === 'cnpj') formattedValue = maskCNPJ(value);
    if (field === 'phone') formattedValue = maskPhone(value);

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    if (touched[field]) {
      const errorMsg = validateField(field, formattedValue);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const isConditionalSubject =
    formData.subject.includes('Empenhos') ||
    formData.subject.includes('Contracts') ||
    formData.subject.includes('Contratos') ||
    formData.subject.includes('Agro') ||
    formData.subject.includes('Barter');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Proteção Anti-Spam: Honeypot
    if (formData.website_hp) {
      console.warn('Bot submission blocked via honeypot.');
      return;
    }

    // Rate Limiting por sessão (máximo 3 envios por sessão)
    const sessionCount = parseInt(sessionStorage.getItem('xd_contact_submissions') || '0', 10);
    if (sessionCount >= 3) {
      setRateLimitError('Limite de envios atingido nesta sessão. Caso necessite de atendimento imediato, utilize nossos canais telefônicos.');
      return;
    }

    // Validar todos os campos obrigatórios
    const fieldsToValidate = ['name', 'company', 'cnpj', 'email', 'phone', 'message'];
    const newErrors: Record<string, string> = {};
    let hasError = false;

    fieldsToValidate.forEach((f) => {
      const err = validateField(f, (formData as any)[f] || '');
      if (err) {
        newErrors[f] = err;
        hasError = true;
      }
    });

    if (!consentAccepted) {
      newErrors['consent'] = 'É necessário autorizar o tratamento de dados para prosseguir.';
      hasError = true;
    }

    setTouched({
      name: true,
      company: true,
      cnpj: true,
      email: true,
      phone: true,
      message: true,
      consent: true,
    });

    setErrors(newErrors);

    if (hasError) {
      const firstErrorEl = document.querySelector('[aria-invalid="true"]');
      if (firstErrorEl) (firstErrorEl as HTMLElement).focus();
      return;
    }

    setIsSubmitting(true);

    // Simulação de envio com geração de protocolo e timestamp
    setTimeout(() => {
      const proto = `XD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date());

      sessionStorage.setItem('xd_contact_submissions', (sessionCount + 1).toString());
      setProtocolNumber(proto);
      setSubmissionDate(now);
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 850);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigatePrivacy) {
      onNavigatePrivacy();
    } else if (onNavigateView) {
      onNavigateView('politica-de-privacidade');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F6] text-[#0D0D0D] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-[1180px] mx-auto">
        {/* Breadcrumb: Início / Atendimento */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-[13px] text-[#0D0D0D]/60 font-mono">
            <li>
              <button
                onClick={onBackToHome}
                className="hover:text-[#7A0F28] transition-colors focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 rounded-[2px]"
              >
                {isEn ? 'Home' : (isEs ? 'Inicio' : 'Início')}
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#0D0D0D] font-medium" aria-current="page">
              {isEn ? 'Corporate Desk' : (isEs ? 'Atención' : 'Atendimento')}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A0F28]/[0.08] border border-[#7A0F28]/20 text-[#7A0F28] text-[11.5px] font-mono tracking-wider mb-3">
            {isEn ? 'INSTITUTIONAL SERVICE & CORPORATE DESK' : (isEs ? 'ATENCIÓN INSTITUCIONAL Y MESA CORPORATIVA' : 'ATENDIMENTO INSTITUCIONAL & MESA CORPORATIVA')}
          </div>
          <h1 className="text-[32px] sm:text-[44px] md:text-[48px] font-[500] text-[#0D0D0D] tracking-[-0.03em] leading-[1.1] mb-3">
            {t('nav.contact')}
          </h1>
          <p className="text-[16px] sm:text-[17.5px] text-[#0D0D0D]/70 max-w-[700px] leading-relaxed">
            {isEn 
              ? 'Direct channel with our corporate credit specialists for structured debt, government receivables factoring, POS acquiring, and corporate payment accounts.'
              : (isEs 
                ? 'Canal directo con nuestros especialistas para estructuración de crédito corporativo, anticipación de contratos públicos, medios de pago y cuenta digital PJ.'
                : 'Canal direto com nossos especialistas para estruturação de crédito corporativo, antecipação de contratos públicos, meios de pagamento e conta de pagamento PJ.')}
          </p>
        </header>

        {/* Main Grid: Left Column (Informações + Diretrizes) & Right Column (Formulário) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card Principal: Canais de Contato & Informações Oficiais */}
            <div className="bg-white border border-[rgba(13,13,13,0.10)] rounded-[6px] p-6 sm:p-7 text-[#0D0D0D]">
              {/* Central de Atendimento Telefônico */}
              <div className="pb-5">
                <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5">
                  <Phone className="w-4 h-4 text-[#7A0F28]" strokeWidth={1.5} />
                  <span>{isEn ? 'Support Center' : (isEs ? 'Central de Atención' : 'Central de Atendimento')}</span>
                </div>
                {/* Publicar apenas se o 0800 estiver efetivamente contratado e operante. */}
                <div className="text-[15px] font-normal text-[#0D0D0D]">
                  (11) 3000-0000
                </div>
                <div className="text-[12.5px] text-[#0D0D0D]/60 mt-0.5">
                  {isEn ? 'Corporate phone support' : (isEs ? 'Atención telefónica corporativa' : 'Atendimento telefônico corporativo')}
                </div>
              </div>

              {/* Hairline */}
              <div className="h-[1px] bg-[rgba(13,13,13,0.08)] -mx-6 sm:-mx-7" />

              {/* E-mail Corporativo */}
              <div className="py-5">
                <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5">
                  <Mail className="w-4 h-4 text-[#7A0F28]" strokeWidth={1.5} />
                  <span>{isEn ? 'Corporate Email' : (isEs ? 'Correo Corporativo' : 'E-mail Corporativo')}</span>
                </div>
                <div className="text-[15px] font-normal text-[#0D0D0D]">
                  <a
                    href="mailto:contato@xdcapital.com.br"
                    className="hover:text-[#7A0F28] hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-[#7A0F28] rounded-[2px]"
                  >
                    contato@xdcapital.com.br
                  </a>
                </div>
                <div className="text-[12.5px] text-[#0D0D0D]/60 mt-0.5">
                  {isEn ? 'Terms, proposals, and credit documentations' : (isEs ? 'Envío de términos, propuestas y documentación' : 'Envio de termos, propostas e documentações')}
                </div>
              </div>

              {/* Hairline */}
              <div className="h-[1px] bg-[rgba(13,13,13,0.08)] -mx-6 sm:-mx-7" />

              {/* Horário de Funcionamento */}
              <div className="py-5">
                <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5">
                  <Clock className="w-4 h-4 text-[#7A0F28]" strokeWidth={1.5} />
                  <span>{isEn ? 'Business Hours' : (isEs ? 'Horario de Atención' : 'Horário de Funcionamento')}</span>
                </div>
                <div className="text-[15px] font-normal text-[#0D0D0D]">
                  {isEn ? 'Monday to Friday · 08:30 to 18:00 (BRT)' : (isEs ? 'Lunes a Viernes · 08:30 a 18:00' : 'Segunda a Sexta · 08h30 às 18h00')}
                </div>
                <div className="text-[12.5px] text-[#0D0D0D]/60 mt-0.5">
                  {isEn ? 'Except national banking holidays' : (isEs ? 'Excepto feriados nacionales y bancarios' : 'Exceto feriados nacionais e bancários')}
                </div>
              </div>

              {/* Hairline */}
              <div className="h-[1px] bg-[rgba(13,13,13,0.08)] -mx-6 sm:-mx-7" />

              {/* PRAZOS DE RESPOSTA */}
              <div className="py-5">
                <div className="text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-2">
                  {isEn ? 'RESPONSE TIMES' : (isEs ? 'PLAZOS DE RESPUESTA' : 'PRAZOS DE RESPOSTA')}
                </div>
                <ul className="space-y-1.5 text-[13.5px] text-[#0D0D0D]/80">
                  <li className="flex items-center justify-between">
                    <span>{isEn ? 'Questions & commercial screening:' : (isEs ? 'Consultas y evaluación comercial:' : 'Dúvidas e triagem comercial:')}</span>
                    <span className="font-mono text-[12.5px] font-medium text-[#0D0D0D]">
                      {isEn ? 'Up to 2 business days' : (isEs ? 'Hasta 2 días hábiles' : 'Até 2 dias úteis')}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{isEn ? 'Support & Helpdesk:' : (isEs ? 'Atención y SAC:' : 'Reclamações e SAC:')}</span>
                    <span className="font-mono text-[12.5px] font-medium text-[#0D0D0D]">
                      {isEn ? 'Up to 5 business days' : (isEs ? 'Hasta 5 días hábiles' : 'Até 5 dias úteis')}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>{isEn ? 'Operational audits:' : (isEs ? 'Consultas operativas:' : 'Contestações operacionais:')}</span>
                    <span className="font-mono text-[12.5px] font-medium text-[#0D0D0D]">
                      {isEn ? 'Up to 10 business days' : (isEs ? 'Hasta 10 días hábiles' : 'Até 10 dias úteis')}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Hairline */}
              {/* ENDEREÇO DA SEDE */}
              <div className="pt-5">
                <div className="text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-2">
                  {isEn ? 'HEADQUARTERS ADDRESS' : (isEs ? 'DIRECCIÓN DE LA SEDE' : 'ENDEREÇO DA SEDE')}
                </div>
                <div className="text-[13.5px] text-[#0D0D0D] font-medium">
                  XD Capital Serviço de Intermediação Financeira Ltda.
                </div>
                <div className="text-[12.5px] font-mono text-[#0D0D0D]/60 mt-0.5">
                  CNPJ: 55.038.166/0001-99
                </div>
                <div className="text-[13px] text-[#0D0D0D]/75 mt-1.5 leading-relaxed">
                  Avenida Brigadeiro Faria Lima, 1.485, Conjunto 121, Pinheiros, São Paulo - SP, CEP 01452-002
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formulário Funcional (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[rgba(13,13,13,0.10)] rounded-[6px] p-6 sm:p-9 text-[#0D0D0D]">
            {formSubmitted ? (
              <div className="py-10 text-left space-y-6" role="status" aria-live="polite">
                <div className="w-12 h-12 rounded-[6px] bg-[#7A0F28]/10 flex items-center justify-center text-[#7A0F28]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="text-[24px] font-[500] text-[#0D0D0D] tracking-[-0.02em] mb-2">
                    {isEn ? 'Request Received Successfully' : (isEs ? 'Solicitud Recibida con Éxito' : 'Solicitação Recebida com Sucesso')}
                  </h2>
                  <p className="text-[15px] text-[#0D0D0D]/70 leading-relaxed">
                    {isEn 
                      ? 'Your demand has been registered and forwarded to the XD Capital corporate desk. Our technical team will return contact within the specified timeframe.'
                      : (isEs 
                        ? 'Su solicitud ha sido registrada y enviada a la mesa corporativa de XD Capital. Nuestro equipo se comunicará en el plazo establecido.'
                        : 'Sua demanda foi registrada e encaminhada para a mesa corporativa da XD Capital. Nossa equipe técnica retornará o contato no prazo estipulado.')}
                  </p>
                </div>

                <div className="bg-[#F7F7F6] border border-[rgba(13,13,13,0.08)] rounded-[6px] p-5 space-y-2.5 font-mono text-[13px]">
                  <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.06)] pb-2">
                    <span className="text-[#0D0D0D]/60">{isEn ? 'Protocol Number:' : (isEs ? 'Número de Protocolo:' : 'Número do Protocolo:')}</span>
                    <span className="font-bold text-[#7A0F28]">{protocolNumber}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.06)] pb-2">
                    <span className="text-[#0D0D0D]/60">{isEn ? 'Registration Timestamp:' : (isEs ? 'Fecha y Hora:' : 'Data e Hora do Registro:')}</span>
                    <span className="text-[#0D0D0D]">{submissionDate}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[rgba(13,13,13,0.06)] pb-2">
                    <span className="text-[#0D0D0D]/60">{isEn ? 'Response Timeframe:' : (isEs ? 'Plazo de Respuesta:' : 'Prazo de Retorno:')}</span>
                    <span className="text-[#0D0D0D] font-medium">{isEn ? 'Up to 2 business hours' : (isEs ? 'Hasta 2 horas hábiles' : 'Até 2 horas úteis')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0D0D0D]/60">{isEn ? 'Subject:' : (isEs ? 'Asunto:' : 'Assunto:')}</span>
                    <span className="text-[#0D0D0D] truncate max-w-[240px]">{formData.subject}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        cnpj: '',
                        email: '',
                        phone: '',
                        subject: isEn ? 'Public Sector Contracts Advance' : (isEs ? 'Anticipo de Contratos Públicos' : 'Antecipação de Empenhos e Contratos Públicos'),
                        operationVolume: isEn ? 'From $50,000 to $200,000' : 'De R$ 250.000 a R$ 1.000.000',
                        message: '',
                        website_hp: '',
                      });
                      setConsentAccepted(false);
                      setErrors({});
                      setTouched({});
                    }}
                    className="px-5 py-2.5 rounded-[6px] border border-[rgba(13,13,13,0.15)] bg-white text-[14px] text-[#0D0D0D] hover:bg-[#F7F7F6] transition-colors focus-visible:outline-2 focus-visible:outline-[#7A0F28] cursor-pointer"
                  >
                    {isEn ? 'Submit new request' : (isEs ? 'Enviar nueva solicitud' : 'Enviar nova solicitação')}
                  </button>

                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="px-5 py-2.5 rounded-[6px] bg-[#7A0F28] text-white text-[14px] hover:bg-[#610C20] transition-colors focus-visible:outline-2 focus-visible:outline-[#7A0F28] cursor-pointer"
                  >
                    {isEn ? 'Back to home' : (isEs ? 'Volver al inicio' : 'Voltar para o início')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot invisível para bots */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="mb-6">
                  <h2 className="text-[20px] sm:text-[22px] font-[500] text-[#0D0D0D] tracking-[-0.02em] mb-1">
                    {isEn ? 'Send a message to our desk' : (isEs ? 'Envíe un mensaje a la mesa corporativa' : 'Envie uma mensagem para a mesa')}
                  </h2>
                  <p className="text-[13.5px] text-[#0D0D0D]/60 leading-relaxed">
                    {isEn 
                      ? 'Fill in the fields below with your corporate details to route your inquiry to our vertical specialist.'
                      : (isEs 
                        ? 'Complete los campos siguientes con los datos de su empresa para dirigir la consulta al especialista.'
                        : 'Preencha os campos abaixo com os dados cadastrais da sua empresa para direcionamento ao analista da vertical.')}
                  </p>
                </div>

                {rateLimitError && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-[6px] text-[13.5px] text-amber-900 flex items-start gap-2.5" role="alert">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{rateLimitError}</span>
                  </div>
                )}

                {/* Linha 1: Nome Completo & Razão Social */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                    >
                      {isEn ? 'FULL NAME *' : (isEs ? 'NOMBRE COMPLETO *' : 'NOME COMPLETO *')}
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      required
                      placeholder={isEn ? 'Your full name' : (isEs ? 'Nombre del solicitante' : 'Nome do solicitante')}
                      value={formData.name}
                      onBlur={() => handleBlur('name')}
                      onChange={(e) => handleChange('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                      className={`w-full bg-white border rounded-[6px] px-3.5 py-2.5 text-[14.5px] text-[#0D0D0D] transition-colors placeholder:text-[#0D0D0D]/35 focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 ${
                        errors.name ? 'border-[#7A0F28] bg-red-50/20' : 'border-[rgba(13,13,13,0.15)]'
                      }`}
                    />
                    {errors.name && (
                      <div id={`${formId}-name-err`} className="text-[12px] text-[#7A0F28] mt-1 font-mono" aria-live="polite">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-company`}
                      className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                    >
                      {isEn ? 'COMPANY NAME *' : (isEs ? 'RAZÓN SOCIAL / EMPRESA *' : 'RAZÃO SOCIAL / EMPRESA *')}
                    </label>
                    <input
                      id={`${formId}-company`}
                      type="text"
                      required
                      placeholder={isEn ? 'Legal company name' : (isEs ? 'Nombre de la empresa' : 'Nome empresarial da empresa')}
                      value={formData.company}
                      onBlur={() => handleBlur('company')}
                      onChange={(e) => handleChange('company', e.target.value)}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? `${formId}-company-err` : undefined}
                      className={`w-full bg-white border rounded-[6px] px-3.5 py-2.5 text-[14.5px] text-[#0D0D0D] transition-colors placeholder:text-[#0D0D0D]/35 focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 ${
                        errors.company ? 'border-[#7A0F28] bg-red-50/20' : 'border-[rgba(13,13,13,0.15)]'
                      }`}
                    />
                    {errors.company && (
                      <div id={`${formId}-company-err`} className="text-[12px] text-[#7A0F28] mt-1 font-mono" aria-live="polite">
                        {errors.company}
                      </div>
                    )}
                  </div>
                </div>

                {/* Linha 2: CNPJ & Telefone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${formId}-cnpj`}
                      className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                    >
                      {isEn ? 'TAX ID / CNPJ *' : (isEs ? 'CNPJ / ID FISCAL *' : 'CNPJ DA EMPRESA *')}
                    </label>
                    <input
                      id={`${formId}-cnpj`}
                      type="text"
                      required
                      maxLength={18}
                      placeholder="00.000.000/0000-00"
                      value={formData.cnpj}
                      onBlur={() => handleBlur('cnpj')}
                      onChange={(e) => handleChange('cnpj', e.target.value)}
                      aria-invalid={!!errors.cnpj}
                      aria-describedby={errors.cnpj ? `${formId}-cnpj-err` : undefined}
                      className={`w-full bg-white border rounded-[6px] px-3.5 py-2.5 text-[14.5px] font-mono text-[#0D0D0D] transition-colors placeholder:text-[#0D0D0D]/35 focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 ${
                        errors.cnpj ? 'border-[#7A0F28] bg-red-50/20' : 'border-[rgba(13,13,13,0.15)]'
                      }`}
                    />
                    {errors.cnpj && (
                      <div id={`${formId}-cnpj-err`} className="text-[12px] text-[#7A0F28] mt-1 font-mono" aria-live="polite">
                        {errors.cnpj}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-phone`}
                      className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                    >
                      {isEn ? 'PHONE / WHATSAPP *' : (isEs ? 'TELÉFONO / WHATSAPP *' : 'TELEFONE / WHATSAPP *')}
                    </label>
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      required
                      maxLength={15}
                      placeholder="(11) 90000-0000"
                      value={formData.phone}
                      onBlur={() => handleBlur('phone')}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
                      className={`w-full bg-white border rounded-[6px] px-3.5 py-2.5 text-[14.5px] font-mono text-[#0D0D0D] transition-colors placeholder:text-[#0D0D0D]/35 focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 ${
                        errors.phone ? 'border-[#7A0F28] bg-red-50/20' : 'border-[rgba(13,13,13,0.15)]'
                      }`}
                    />
                    {errors.phone && (
                      <div id={`${formId}-phone-err`} className="text-[12px] text-[#7A0F28] mt-1 font-mono" aria-live="polite">
                        {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Linha 3: E-mail Corporativo */}
                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                  >
                    {isEn ? 'CORPORATE EMAIL *' : (isEs ? 'CORREO CORPORATIVO *' : 'E-MAIL CORPORATIVO *')}
                  </label>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    required
                    placeholder={isEn ? 'name@yourcompany.com' : 'nome@suaempresa.com.br'}
                    value={formData.email}
                    onBlur={() => handleBlur('email')}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email
                        ? `${formId}-email-err`
                        : emailWarning
                        ? `${formId}-email-warn`
                        : undefined
                    }
                    className={`w-full bg-white border rounded-[6px] px-3.5 py-2.5 text-[14.5px] text-[#0D0D0D] transition-colors placeholder:text-[#0D0D0D]/35 focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 ${
                      errors.email ? 'border-[#7A0F28] bg-red-50/20' : 'border-[rgba(13,13,13,0.15)]'
                    }`}
                  />
                  {errors.email && (
                    <div id={`${formId}-email-err`} className="text-[12px] text-[#7A0F28] mt-1 font-mono" aria-live="polite">
                      {errors.email}
                    </div>
                  )}
                  {!errors.email && emailWarning && (
                    <div id={`${formId}-email-warn`} className="text-[12px] text-amber-700 mt-1 flex items-center gap-1.5 font-mono" aria-live="polite">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailWarning}</span>
                    </div>
                  )}
                </div>

                {/* Linha 4: Assunto de Interesse */}
                <div>
                  <label
                    htmlFor={`${formId}-subject`}
                    className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                  >
                    {isEn ? 'TOPIC OF INTEREST *' : (isEs ? 'ASUNTO DE INTERÉS *' : 'ASSUNTO DE INTERESSE *')}
                  </label>
                  <select
                    id={`${formId}-subject`}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-[rgba(13,13,13,0.15)] rounded-[6px] px-3.5 py-2.5 text-[14.5px] text-[#0D0D0D] focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 transition-colors cursor-pointer"
                  >
                    {isEn ? (
                      <>
                        <option value="Public Sector Contracts Advance">Public Sector Contracts Advance</option>
                        <option value="Working Capital & Collateral Loans">Working Capital & Collateral Loans</option>
                        <option value="Payment Methods & POS Acquiring">Payment Methods & POS Acquiring</option>
                        <option value="Corporate Digital Account">Corporate Digital Account</option>
                        <option value="Agribusiness, CPR & Barter">Agribusiness, CPR & Barter</option>
                        <option value="Treasury & Cash Management">Treasury & Cash Management</option>
                        <option value="Payroll & Consigned Credit">Payroll & Consigned Credit</option>
                        <option value="Partnerships & Press">Partnerships & Press</option>
                      </>
                    ) : isEs ? (
                      <>
                        <option value="Anticipo de Contratos Públicos">Anticipo de Contratos Públicos</option>
                        <option value="Capital de Trabajo y Garantías">Capital de Trabajo y Garantías</option>
                        <option value="Medios de Pago y Terminales POS">Medios de Pago y Terminales POS</option>
                        <option value="Cuenta Digital PJ">Cuenta Digital PJ</option>
                        <option value="Agronegocios, CPR y Barter">Agronegocios, CPR y Barter</option>
                        <option value="Gestión de Caja y Tesorería">Gestión de Caja y Tesorería</option>
                        <option value="Nómina y Crédito de Nómina">Nómina y Crédito de Nómina</option>
                        <option value="Alianzas y Prensa">Alianzas y Prensa</option>
                      </>
                    ) : (
                      <>
                        <option value="Antecipação de Empenhos e Contratos Públicos">
                          Antecipação de Empenhos e Contratos Públicos
                        </option>
                        <option value="Capital de Giro e Garantias">
                          Capital de Giro e Garantias
                        </option>
                        <option value="Meios de Pagamento e Maquininha">
                          Meios de Pagamento e Maquininha
                        </option>
                        <option value="Conta de Pagamento PJ">
                          Conta de Pagamento PJ
                        </option>
                        <option value="Agronegócio, CPR e Barter">
                          Agronegócio, CPR e Barter
                        </option>
                        <option value="Gestão de Caixa">
                          Gestão de Caixa
                        </option>
                        <option value="Folha e Consignado">
                          Folha e Consignado
                        </option>
                        <option value="Parcerias e Imprensa">
                          Parcerias e Imprensa
                        </option>
                      </>
                    )}
                  </select>
                </div>

                {/* Campo Condicional: Volume Estimado da Operação (Setor Público e Agro) */}
                {isConditionalSubject && (
                  <div className="animate-in fade-in duration-200">
                    <label
                      htmlFor={`${formId}-volume`}
                      className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                    >
                      {isEn ? 'ESTIMATED VOLUME OF OPERATION' : (isEs ? 'VOLUMEN ESTIMADO DE OPERACIÓN' : 'VOLUME ESTIMADO DA OPERAÇÃO')}
                    </label>
                    <select
                      id={`${formId}-volume`}
                      value={formData.operationVolume}
                      onChange={(e) => setFormData({ ...formData, operationVolume: e.target.value })}
                      className="w-full bg-white border border-[rgba(13,13,13,0.15)] rounded-[6px] px-3.5 py-2.5 text-[14.5px] text-[#0D0D0D] focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 transition-colors cursor-pointer"
                    >
                      {isEn ? (
                        <>
                          <option value="Up to $50,000">Up to $50,000</option>
                          <option value="From $50,000 to $200,000">From $50,000 to $200,000</option>
                          <option value="From $200,000 to $1,000,000">From $200,000 to $1,000,000</option>
                          <option value="Above $1,000,000">Above $1,000,000</option>
                        </>
                      ) : isEs ? (
                        <>
                          <option value="Hasta R$ 250.000">Hasta R$ 250.000</option>
                          <option value="De R$ 250.000 a R$ 1.000.000">De R$ 250.000 a R$ 1.000.000</option>
                          <option value="De R$ 1.000.000 a R$ 5.000.000">De R$ 1.000.000 a R$ 5.000.000</option>
                          <option value="Más de R$ 5.000.000">Más de R$ 5.000.000</option>
                        </>
                      ) : (
                        <>
                          <option value="Até R$ 250.000">Até R$ 250.000</option>
                          <option value="De R$ 250.000 a R$ 1.000.000">De R$ 250.000 a R$ 1.000.000</option>
                          <option value="De R$ 1.000.000 a R$ 5.000.000">De R$ 1.000.000 a R$ 5.000.000</option>
                          <option value="Acima de R$ 5.000.000">Acima de R$ 5.000.000</option>
                        </>
                      )}
                    </select>
                  </div>
                )}

                {/* Linha 5: Mensagem */}
                <div>
                  <label
                    htmlFor={`${formId}-message`}
                    className="block text-[12px] uppercase tracking-[0.1em] text-[#0D0D0D]/50 font-mono mb-1.5"
                  >
                    {isEn ? 'MESSAGE OR DEMAND DETAILS *' : (isEs ? 'MENSAJE O DETALLES DE LA SOLICITUD *' : 'MENSAGEM OU DETALHES DA DEMANDA *')}
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    rows={4}
                    required
                    placeholder={
                      isEn 
                        ? 'Describe the demand, timeframe, public agencies involved or operational volume...'
                        : (isEs 
                          ? 'Describa la solicitud, plazos involucrados, entidad pública o volumen operativo...' 
                          : 'Descreva a demanda, prazos envolvidos, órgãos públicos ou volume operacional...')
                    }
                    value={formData.message}
                    onBlur={() => handleBlur('message')}
                    onChange={(e) => handleChange('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `${formId}-msg-err` : undefined}
                    className={`w-full bg-white border rounded-[6px] p-3.5 text-[14.5px] text-[#0D0D0D] transition-colors placeholder:text-[#0D0D0D]/35 focus:outline-none focus:border-[#7A0F28] focus:ring-1 focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 resize-none ${
                      errors.message ? 'border-[#7A0F28] bg-red-50/20' : 'border-[rgba(13,13,13,0.15)]'
                    }`}
                  />
                  {errors.message && (
                    <div id={`${formId}-msg-err`} className="text-[12px] text-[#7A0F28] mt-1 font-mono" aria-live="polite">
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Checkbox Obrigatório de Consentimento LGPD */}
                <div className="pt-2">
                  <div className="flex items-start gap-3">
                    <input
                      id={`${formId}-consent`}
                      type="checkbox"
                      required
                      checked={consentAccepted}
                      onChange={(e) => {
                        setConsentAccepted(e.target.checked);
                        if (errors.consent) {
                          setErrors((prev) => ({ ...prev, consent: '' }));
                        }
                      }}
                      className="mt-1 w-4 h-4 rounded-[3px] border-[rgba(13,13,13,0.25)] text-[#7A0F28] focus:ring-[#7A0F28] focus-visible:outline-2 focus-visible:outline-[#7A0F28] cursor-pointer"
                    />
                    <label
                      htmlFor={`${formId}-consent`}
                      className="text-[13px] text-[#0D0D0D]/80 leading-snug cursor-pointer select-none"
                    >
                      {isEn ? (
                        <>
                          I authorize XD Capital to contact me and process my data for this purpose under the terms of the{' '}
                          <a
                            href="#politica-de-privacidade"
                            onClick={handlePrivacyClick}
                            className="text-[#7A0F28] underline hover:text-[#610C20] font-medium"
                          >
                            Privacy Policy
                          </a>
                          .
                        </>
                      ) : isEs ? (
                        <>
                          Autorizo el contacto de XD Capital y el tratamiento de mis datos personales según los términos de la{' '}
                          <a
                            href="#politica-de-privacidade"
                            onClick={handlePrivacyClick}
                            className="text-[#7A0F28] underline hover:text-[#610C20] font-medium"
                          >
                            Política de Privacidad
                          </a>
                          .
                        </>
                      ) : (
                        <>
                          Autorizo o contato da XD Capital e o tratamento dos meus dados para esta finalidade, nos termos da{' '}
                          <a
                            href="#politica-de-privacidade"
                            onClick={handlePrivacyClick}
                            className="text-[#7A0F28] underline hover:text-[#610C20] font-medium"
                          >
                            Política de Privacidade
                          </a>
                          .
                        </>
                      )}
                    </label>
                  </div>
                  {errors.consent && (
                    <div className="text-[12px] text-[#7A0F28] mt-1.5 font-mono ml-7" aria-live="polite">
                      {errors.consent}
                    </div>
                  )}
                </div>

                {/* Botão de Envio Sólido #7A0F28 (Desabilitado sem consentimento) */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!consentAccepted || isSubmitting}
                    className={`w-full py-3.5 px-6 rounded-[6px] text-white font-[500] text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-[#7A0F28] focus-visible:outline-offset-2 flex items-center justify-center gap-2 ${
                      !consentAccepted || isSubmitting
                        ? 'bg-[#7A0F28]/50 cursor-not-allowed text-white/70'
                        : 'bg-[#7A0F28] hover:bg-[#610C20] cursor-pointer shadow-none'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{isEn ? 'Sending request to desk...' : (isEs ? 'Enviando solicitud a la mesa...' : 'Enviando solicitação para a mesa...')}</span>
                      </>
                    ) : (
                      <span>{isEn ? 'Send message to corporate desk' : (isEs ? 'Enviar mensaje a la mesa' : 'Enviar mensagem para a mesa')}</span>
                    )}
                  </button>
                </div>

                {/* Aviso Regulatório de LGPD Abaixo do Botão */}
                <div className="text-center text-[12.5px] text-[#0D0D0D]/60 pt-1">
                  {isEn ? (
                    <>
                      Your data is processed in accordance with privacy laws. Consult our{' '}
                      <a
                        href="#politica-de-privacidade"
                        onClick={handlePrivacyClick}
                        className="text-[#7A0F28] underline hover:text-[#610C20]"
                      >
                        Privacy Policy
                      </a>
                      .
                    </>
                  ) : isEs ? (
                    <>
                      Sus datos se tratan de acuerdo con las leyes de privacidad. Consulte nuestra{' '}
                      <a
                        href="#politica-de-privacidade"
                        onClick={handlePrivacyClick}
                        className="text-[#7A0F28] underline hover:text-[#610C20]"
                      >
                        Política de Privacidad
                      </a>
                      .
                    </>
                  ) : (
                    <>
                      Seus dados são tratados conforme a Lei nº 13.709/2018. Consulte nossa{' '}
                      <a
                        href="#politica-de-privacidade"
                        onClick={handlePrivacyClick}
                        className="text-[#7A0F28] underline hover:text-[#610C20]"
                      >
                        Política de Privacidade
                      </a>
                      .
                    </>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
