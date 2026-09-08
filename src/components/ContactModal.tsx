import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, Building, Mail, Phone, User, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialSubject = 'Atendimento Geral'
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

  const [subject, setSubject] = useState(initialSubject);
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [volume, setVolume] = useState('R$ 100k a R$ 500k');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    subject,
    companyName,
    cnpj,
    name,
    email,
    phone,
    volume,
    message,
  }),
});

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="contact-modal-card"
        className="relative w-full max-w-[620px] bg-white border border-slate-200 rounded-[24px] p-7 sm:p-9 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle red accent glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#A3192E]/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
          aria-label={isEn ? 'Close' : (isEs ? 'Cerrar' : 'Fechar')}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#A3192E]/10 border border-[#A3192E] flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#A3192E]" />
            </div>
            <h3 className="text-[24px] font-normal text-slate-900 mb-3">
              {isEn ? 'Request Sent Successfully' : (isEs ? 'Solicitud Enviada con Éxito' : 'Solicitação Enviada com Sucesso')}
            </h3>
            <p className="body-text text-[15.5px] max-w-[440px] text-center text-slate-600 mb-8">
              {isEn 
                ? 'Our technical corporate credit specialists have received your request and will contact you within 4 business hours with tailored conditions.'
                : (isEs 
                  ? 'Nuestro equipo técnico de crédito corporativo ha recibido sus datos y se comunicará en hasta 4 horas hábiles.'
                  : 'Nossa equipe técnica de crédito corporativo já recebeu seus dados e entrará em contato em até 4 horas úteis para apresentar as condições sob medida.')}
            </p>
            <div className="p-4 rounded-[12px] bg-slate-50 border border-slate-200 text-[13px] text-slate-600 mb-8 max-w-[400px]">
              {isEn ? 'Subject:' : (isEs ? 'Asunto:' : 'Assunto:')} <span className="text-slate-900 font-normal">{subject}</span>
              <br />
              {isEn ? 'Company:' : (isEs ? 'Empresa:' : 'Empresa:')} <span className="text-slate-900 font-normal">{companyName || (isEn ? 'Company informed' : (isEs ? 'Empresa informada' : 'Empresa informada'))}</span>
            </div>
            <button onClick={handleReset} className="btn-primary">
              {isEn ? 'Close Window' : (isEs ? 'Cerrar Ventana' : 'Fechar Janela')}
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center justify-between gap-3 mb-3">
                <img
                  src="/xd-logo.png"
                  alt="XD Capital"
                  className="h-7 w-auto object-contain"
                  width={122}
                  height={28}
                />
              </div>
              <h3 className="text-[24px] sm:text-[26px] font-normal text-slate-900 tracking-[-0.02em]">
                {isEn ? 'Speak with an XD Specialist' : (isEs ? 'Hable con un Especialista XD' : 'Fale com um Especialista XD')}
              </h3>
              <p className="text-[14px] text-slate-600 mt-1">
                {isEn 
                  ? 'Credit structuring, advance liquidity, and integrated financial solutions.'
                  : (isEs 
                    ? 'Estructuración de crédito, anticipación y soluciones financieras integradas.'
                    : 'Estruturação de crédito, antecipação e soluções financeiras integradas.')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Empresa & CNPJ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                    {isEn ? 'Legal Company Name' : (isEs ? 'Razón Social o Nombre Fantasía' : 'Razão Social ou Nome Fantasia')}
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={isEn ? 'Acme Corp LLC' : 'Sua Empresa Ltda.'}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                    {isEn ? 'Tax ID / CNPJ' : (isEs ? 'CNPJ / Documento' : 'CNPJ')}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Nome & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                    {isEn ? 'Your Full Name' : (isEs ? 'Su Nombre Completo' : 'Seu Nome Completo')}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={isEn ? 'Director or Manager' : 'Diretor ou Responsável'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                    {isEn ? 'Corporate Email' : (isEs ? 'Correo Corporativo' : 'E-mail Corporativo')}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="contato@empresa.com.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Telefone / WhatsApp & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                    {isEn ? 'Phone / WhatsApp' : (isEs ? 'Teléfono / WhatsApp' : 'Telefone / WhatsApp')}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+55 (11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-10 pr-4 py-2.5 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                    {isEn ? 'Estimated Transaction Volume' : (isEs ? 'Volumen Estimado de Operación' : 'Volume Estimado da Operação')}
                  </label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[12px] px-3.5 py-2.5 text-[14px] text-slate-900 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors"
                  >
                    <option value="ate-100k">{isEn ? 'Up to $ 20k' : (isEs ? 'Hasta R$ 100 mil' : 'Até R$ 100 mil')}</option>
                    <option value="100k-500k">{isEn ? '$ 20k to $ 100k' : (isEs ? 'R$ 100k a R$ 500k' : 'R$ 100k a R$ 500k')}</option>
                    <option value="500k-2m">{isEn ? '$ 100k to $ 500k' : (isEs ? 'R$ 500k a R$ 2M' : 'R$ 500k a R$ 2 milhões')}</option>
                    <option value="acima-2m">{isEn ? 'Above $ 500k' : (isEs ? 'Más de R$ 2M' : 'Acima de R$ 2 milhões')}</option>
                  </select>
                </div>
              </div>

              {/* Mensagem / Contexto */}
              <div>
                <label className="block text-[12.5px] font-normal text-slate-700 mb-1.5">
                  {isEn ? 'Operation or Contract Details' : (isEs ? 'Detalles de la Operación o Contrato' : 'Interesse ou Detalhes do Contrato')}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  placeholder={isEn ? `Intended operation: ${subject}...` : (isEs ? `Operación pretendida: ${subject}...` : `Operação pretendida: ${subject}...`)}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] p-3 text-[14px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#A3192E] focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary justify-center text-[15px] !py-3.5 cursor-pointer"
                >
                  <span>{isEn ? 'Send Message' : (isEs ? 'Enviar Mensaje' : 'Enviar Mensagem')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11.5px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A3192E]" />
                <span>
                  {isEn 
                    ? 'Data protected under banking secrecy and GDPR/LGPD compliance.'
                    : (isEs 
                      ? 'Datos protegidos bajo secreto corporativo y directrices LGPD.'
                      : 'Dados protegidos sob sigilo corporativo e diretrizes da LGPD.')}
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
