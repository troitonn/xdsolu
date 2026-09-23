import React, { FormEvent, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Handshake,
  Landmark,
  Mail,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

interface PartnersPageProps {
  onBackToHome: () => void;
  onOpenContact?: (subject?: string) => void;
}

interface FormData {
  nome: string;
  razaoSocial: string;
  cnpj: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento: string;
  uf: string;
  cidade: string;
  cep: string;
  pais: string;
  consentimento: boolean;
}

const initialFormData: FormData = {
  nome: '',
  razaoSocial: '',
  cnpj: '',
  telefone: '',
  endereco: '',
  numero: '',
  complemento: '',
  uf: '',
  cidade: '',
  cep: '',
  pais: 'Brasil',
  consentimento: false,
};

const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const etapas = [
  {
    numero: '01',
    titulo: 'Cadastro no Site da XD Capital',
    descricao:
      'Preencha o formulário de inscrição com os dados da empresa e do representante. Nesta etapa, o credenciamento é destinado exclusivamente a pessoas jurídicas.',
    icon: Building2,
  },
  {
    numero: '02',
    titulo: 'Contato da Área de Canais',
    descricao:
      'Nossa equipe de Canais entrará em contato por telefone e e-mail para apresentar o programa, entender os objetivos de mercado e explorar oportunidades de sinergia.',
    icon: Users,
  },
  {
    numero: '03',
    titulo: 'Envio da Documentação',
    descricao:
      'Serão solicitados os documentos necessários para análise de viabilidade, incluindo identificação, estrutura societária, referências comerciais e histórico de operações.',
    icon: ShieldCheck,
  },
  {
    numero: '04',
    titulo: 'Análise de Viabilidade e Aprovação',
    descricao:
      'A XD Capital realizará uma análise técnica, comercial e de conformidade, avaliando a compatibilidade, capacidade operacional e potencial de mercado do parceiro.',
    icon: Target,
  },
  {
    numero: '05',
    titulo: 'Credenciamento Formal',
    descricao:
      'Após a aprovação, será realizada a assinatura do Contrato de Parceria, formalizando a relação comercial e suas respectivas condições.',
    icon: Handshake,
  },
  {
    numero: '06',
    titulo: 'Onboarding do Novo Parceiro',
    descricao:
      'O parceiro receberá treinamento sobre produtos, plataforma, processos comerciais, suporte e ferramentas de venda, além da ativação dos acessos necessários.',
    icon: TrendingUp,
  },
  {
    numero: '07',
    titulo: 'Início das Operações',
    descricao:
      'A parceria é oficialmente iniciada. O parceiro passa a comercializar as soluções XD Capital com acompanhamento e suporte contínuo da equipe de Canais.',
    icon: Clock,
  },
];

const beneficios = [
  {
    numero: '01',
    titulo: 'Retorno financeiro',
    descricao:
      'Comissões e incentivos comerciais estruturados para apoiar o crescimento da parceria.',
    icon: TrendingUp,
  },
  {
    numero: '02',
    titulo: 'Portfólio BaaS',
    descricao:
      'Acesso a soluções de contas, pagamentos, crédito, investimentos e outros serviços financeiros.',
    icon: Landmark,
  },
  {
    numero: '03',
    titulo: 'Suporte dedicado',
    descricao:
      'Suporte técnico e comercial durante toda a jornada da parceria.',
    icon: Users,
  },
  {
    numero: '04',
    titulo: 'Materiais e treinamento',
    descricao:
      'Conteúdos, materiais comerciais e capacitação para apoiar sua operação.',
    icon: Target,
  },
  {
    numero: '05',
    titulo: 'Ambiente seguro',
    descricao:
      'Acesso a uma plataforma estruturada para operação de serviços financeiros.',
    icon: ShieldCheck,
  },
];

function onlyNumbers(value: string) {
  return value.replace(/\D/g, '');
}

function formatCNPJ(value: string) {
  const numbers = onlyNumbers(value).slice(0, 14);

  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function formatTelefone(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return numbers
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

function formatCEP(value: string) {
  return onlyNumbers(value)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');
}

function validateCNPJ(cnpj: string) {
  const value = onlyNumbers(cnpj);

  if (value.length !== 14 || /^(\d)\1+$/.test(value)) {
    return false;
  }

  let length = 12;
  let position = 5;
  let sum = 0;

  for (let i = 0; i < length; i++) {
    sum += Number(value.charAt(i)) * position;
    position--;

    if (position < 2) {
      position = 9;
    }
  }

  let result = sum % 11;
  const digit1 = result < 2 ? 0 : 11 - result;

  if (Number(value.charAt(12)) !== digit1) {
    return false;
  }

  length = 13;
  position = 6;
  sum = 0;

  for (let i = 0; i < length; i++) {
    sum += Number(value.charAt(i)) * position;
    position--;

    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11;
  const digit2 = result < 2 ? 0 : 11 - result;

  return Number(value.charAt(13)) === digit2;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({
  onBackToHome,
  onOpenContact,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateField = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: '',
    }));

    setSubmitError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Informe o nome do representante.';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Informe o nome completo do representante.';
    }

    if (!formData.razaoSocial.trim()) {
      newErrors.razaoSocial = 'Informe a razão social.';
    }

    if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'Informe um CNPJ válido.';
    }

    const telefone = onlyNumbers(formData.telefone);

    if (telefone.length < 10 || telefone.length > 11) {
      newErrors.telefone = 'Informe um telefone válido.';
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Informe o endereço.';
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'Informe o número.';
    }

    if (!formData.uf) {
      newErrors.uf = 'Selecione o estado.';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Informe a cidade.';
    }

    if (onlyNumbers(formData.cep).length !== 8) {
      newErrors.cep = 'Informe um CEP válido.';
    }

    if (!formData.pais) {
      newErrors.pais = 'Selecione o país.';
    }

    if (!formData.consentimento) {
      newErrors.consentimento =
        'É necessário aceitar a Política de Privacidade.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];

      if (firstError) {
        document.getElementById(firstError)?.focus();
      }

      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      /*
       * Endpoint esperado:
       *
       * POST /api/parceiros
       *
       * O backend deverá:
       * 1. Validar novamente todos os dados.
       * 2. Gravar na tabela parceiros_inscritos.
       * 3. Enviar a notificação para contato@xdcapital.com.br.
       * 4. Aplicar proteção contra SQL Injection/XSS.
       *
       * Não coloque credenciais de e-mail no frontend.
       */

      const response = await fetch('/api/parceiros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome.trim(),
          razaoSocial: formData.razaoSocial.trim(),
          cnpj: onlyNumbers(formData.cnpj),
          telefone: onlyNumbers(formData.telefone),
          endereco: formData.endereco.trim(),
          numero: formData.numero.trim(),
          complemento: formData.complemento.trim(),
          uf: formData.uf,
          cidade: formData.cidade.trim(),
          cep: onlyNumbers(formData.cep),
          pais: formData.pais,
          consentimento: formData.consentimento,
        }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível enviar a inscrição.');
      }

      setSubmitted(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);

      /*
       * Caso o backend ainda não esteja publicado, o formulário
       * exibirá uma mensagem de erro em vez de fingir que foi enviado.
       */
      setSubmitError(
        'Não foi possível enviar sua inscrição agora. Tente novamente em alguns instantes.',
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 ${
      errors[field]
        ? 'border-red-400 ring-2 ring-red-100'
        : 'border-slate-200 hover:border-slate-300 focus:border-[#A3192E] focus:ring-2 focus:ring-[#A3192E]/10'
    }`;

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0B0F19] pt-28 pb-20 px-6">
      <div className="max-w-[1080px] mx-auto">

        {/* VOLTAR */}
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-[14.5px] text-slate-600 hover:text-[#A3192E] mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para a página inicial</span>
        </button>

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-[12px] text-slate-400 mb-7">
          <button
            type="button"
            onClick={onBackToHome}
            className="hover:text-[#A3192E] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600">Parceiros</span>
        </div>

        {/* HERO */}
        <div className="mb-14">
          <div className="flex items-center justify-between gap-6 mb-7">
            <img
              src="/xd-logo.png"
              alt="XD Capital"
              className="h-8 sm:h-9 w-auto object-contain opacity-95"
              width={157}
              height={36}
            />

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#A3192E]" />
              Programa de Parceiros
            </div>
          </div>

          <div className="max-w-[900px]">
            <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-4">
              PROGRAMA DE PARCEIROS
            </div>

            <h1 className="text-[34px] sm:text-[50px] font-normal text-[#0B0F19] tracking-[-0.04em] leading-[1.08] mb-6">
              Seja um Parceiro
              <br />
              <span className="text-[#A3192E]">XD Capital.</span>
            </h1>

            <p className="text-[17px] sm:text-[19px] text-slate-600 font-normal leading-relaxed max-w-[800px]">
              O programa de Parceiros da XD Capital é dinâmico e prevê
              retorno financeiro significativo e a oferta de soluções
              financeiras inovadoras para o mercado empresarial. Junte-se a
              nós e expanda seu portfólio de serviços com uma fintech em
              expansão.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#inscricao"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A3192E] hover:bg-[#8f1628] text-white px-6 py-3.5 text-[14px] transition-colors shadow-sm"
            >
              Quero ser parceiro
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {onOpenContact && (
              <button
                type="button"
                onClick={() =>
                  onOpenContact('Programa de Parceiros XD Capital')
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-6 py-3.5 text-[14px] transition-colors cursor-pointer"
              >
                Falar com a equipe
              </button>
            )}
          </div>
        </div>

        {/* INTRO CARD */}
        <div className="bg-white border border-slate-200/90 rounded-[28px] p-7 sm:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
                PARCERIA ESTRATÉGICA
              </div>

              <h2 className="text-[25px] sm:text-[31px] font-normal text-slate-900 tracking-[-0.025em] mb-5">
                Expanda seu portfólio com soluções financeiras.
              </h2>

              <p className="text-[15.5px] sm:text-[16px] text-slate-600 leading-relaxed">
                O programa foi estruturado para empresas que desejam ampliar
                sua oferta de produtos, criar novas oportunidades comerciais e
                disponibilizar soluções financeiras aos seus clientes através
                da infraestrutura da XD Capital.
              </p>
            </div>

            <div className="rounded-[22px] bg-slate-50 border border-slate-200/80 p-6">
              <div className="w-11 h-11 rounded-xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E] mb-5">
                <Handshake className="w-5 h-5" />
              </div>

              <h3 className="text-[17px] font-normal text-slate-900 mb-2">
                Construímos juntos
              </h3>

              <p className="text-[14px] text-slate-600 leading-relaxed">
                Uma relação comercial baseada em transparência, suporte,
                tecnologia e crescimento conjunto.
              </p>
            </div>
          </div>
        </div>

        {/* BENEFÍCIOS */}
        <section className="mb-12">
          <div className="mb-8">
            <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
              POR QUE SER PARCEIRO
            </div>

            <h2 className="text-[26px] sm:text-[31px] font-normal text-slate-900 tracking-[-0.025em] mb-4">
              Novas oportunidades
              <br />
              para o seu negócio.
            </h2>

            <p className="text-[15.5px] text-slate-600 leading-relaxed max-w-[720px]">
              Ao se tornar parceiro da XD Capital, sua empresa terá acesso a
              um ecossistema de soluções financeiras pensado para ampliar seu
              portfólio e gerar novas oportunidades.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon;

              return (
                <div
                  key={beneficio.numero}
                  className={`p-6 rounded-[20px] bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all ${
                    index === 0 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#A3192E]/10 flex items-center justify-center text-[#A3192E]">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[12px] font-mono text-slate-400">
                      {beneficio.numero}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-normal text-slate-900 mb-2">
                    {beneficio.titulo}
                  </h3>

                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    {beneficio.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ETAPAS */}
        <section className="bg-white border border-slate-200/90 rounded-[28px] p-7 sm:p-12 shadow-sm mb-12">
          <div className="mb-10">
            <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
              COMO FUNCIONA
            </div>

            <h2 className="text-[26px] sm:text-[31px] font-normal text-slate-900 tracking-[-0.025em] mb-4">
              Da inscrição
              <br />
              à operação.
            </h2>

            <p className="text-[15.5px] text-slate-600 leading-relaxed max-w-[700px]">
              O programa de parceria é estruturado em sete etapas para
              garantir uma jornada clara, organizada e acompanhada pela equipe
              de Canais.
            </p>
          </div>

          <div className="space-y-0">
            {etapas.map((etapa, index) => {
              const Icon = etapa.icon;
              const isLast = index === etapas.length - 1;

              return (
                <div
                  key={etapa.numero}
                  className="relative flex gap-5 sm:gap-7"
                >
                  {!isLast && (
                    <div className="absolute left-[21px] top-[48px] bottom-[-1px] w-px bg-slate-200" />
                  )}

                  <div className="relative z-10 shrink-0 w-[43px] h-[43px] rounded-full bg-[#A3192E] text-white flex items-center justify-center shadow-sm">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>

                  <div
                    className={`pb-9 ${
                      isLast ? 'pb-1' : ''
                    } flex-1`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[11px] font-mono tracking-[0.12em] text-[#A3192E]">
                        ETAPA {etapa.numero}
                      </span>

                      <h3 className="text-[17px] sm:text-[18px] font-normal text-slate-900">
                        {etapa.titulo}
                      </h3>
                    </div>

                    <p className="text-[14px] sm:text-[14.5px] text-slate-600 leading-relaxed max-w-[760px]">
                      {etapa.descricao}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section
          id="inscricao"
          className="scroll-mt-24 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-8 items-start">
            {/* INTRO */}
            <div className="lg:sticky lg:top-28">
              <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
                FAÇA SUA INSCRIÇÃO
              </div>

              <h2 className="text-[28px] sm:text-[34px] font-normal text-slate-900 tracking-[-0.03em] leading-tight mb-5">
                Quero ser
                <br />
                <span className="text-[#A3192E]">parceiro.</span>
              </h2>

              <p className="text-[15px] text-slate-600 leading-relaxed mb-7">
                Preencha os dados abaixo e nossa equipe de Canais entrará em
                contato para apresentar todos os detalhes do programa.
              </p>

              <div className="p-5 rounded-[20px] bg-white border border-slate-200/90 shadow-sm mb-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#A3192E] shrink-0 mt-0.5" />

                  <div>
                    <strong className="block text-[14px] text-slate-900 mb-1">
                      Cadastro empresarial
                    </strong>

                    <span className="text-[13px] text-slate-600 leading-relaxed">
                      O credenciamento nesta etapa é destinado exclusivamente
                      a pessoas jurídicas.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[13px] text-slate-500">
                <Mail className="w-4 h-4 text-[#A3192E]" />
                <span>Contato: contato@xdcapital.com.br</span>
              </div>
            </div>

            {/* CARD FORM */}
            <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-9 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-[#A3192E] mb-3">
                    INSCRIÇÃO RECEBIDA
                  </div>

                  <h3 className="text-[26px] font-normal text-slate-900 tracking-[-0.02em] mb-3">
                    Obrigado pelo interesse.
                  </h3>

                  <p className="text-[15px] text-slate-600 leading-relaxed max-w-[460px] mx-auto mb-8">
                    Sua inscrição foi recebida com sucesso! Entraremos em
                    contato em breve.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError('');
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 text-[14px] transition-colors cursor-pointer"
                  >
                    Fazer nova inscrição
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="mb-7">
                    <h3 className="text-[21px] font-normal text-slate-900 mb-2">
                      Dados da empresa
                    </h3>

                    <p className="text-[13.5px] text-slate-500">
                      Os campos marcados com * são obrigatórios.
                    </p>
                  </div>

                  {/* NOME / RAZÃO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="nome"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Nome do representante *
                      </label>

                      <input
                        id="nome"
                        type="text"
                        maxLength={100}
                        value={formData.nome}
                        onChange={(event) =>
                          updateField('nome', event.target.value)
                        }
                        placeholder="Nome completo"
                        className={inputClass('nome')}
                      />

                      {errors.nome && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.nome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="razaoSocial"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Razão Social *
                      </label>

                      <input
                        id="razaoSocial"
                        type="text"
                        maxLength={150}
                        value={formData.razaoSocial}
                        onChange={(event) =>
                          updateField(
                            'razaoSocial',
                            event.target.value,
                          )
                        }
                        placeholder="Razão social da empresa"
                        className={inputClass('razaoSocial')}
                      />

                      {errors.razaoSocial && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.razaoSocial}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CNPJ / TELEFONE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="cnpj"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        CNPJ *
                      </label>

                      <input
                        id="cnpj"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={formData.cnpj}
                        onChange={(event) =>
                          updateField(
                            'cnpj',
                            formatCNPJ(event.target.value),
                          )
                        }
                        placeholder="00.000.000/0000-00"
                        className={inputClass('cnpj')}
                      />

                      {errors.cnpj && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.cnpj}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="telefone"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Telefone de contato *
                      </label>

                      <input
                        id="telefone"
                        type="tel"
                        inputMode="tel"
                        value={formData.telefone}
                        onChange={(event) =>
                          updateField(
                            'telefone',
                            formatTelefone(event.target.value),
                          )
                        }
                        placeholder="(00) 00000-0000"
                        className={inputClass('telefone')}
                      />

                      {errors.telefone && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.telefone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ENDEREÇO */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-5">
                    <div>
                      <label
                        htmlFor="endereco"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Endereço *
                      </label>

                      <input
                        id="endereco"
                        type="text"
                        maxLength={100}
                        value={formData.endereco}
                        onChange={(event) =>
                          updateField(
                            'endereco',
                            event.target.value,
                          )
                        }
                        placeholder="Rua, avenida ou logradouro"
                        className={inputClass('endereco')}
                      />

                      {errors.endereco && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.endereco}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="numero"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Número *
                      </label>

                      <input
                        id="numero"
                        type="text"
                        maxLength={20}
                        value={formData.numero}
                        onChange={(event) =>
                          updateField(
                            'numero',
                            event.target.value,
                          )
                        }
                        placeholder="Nº"
                        className={inputClass('numero')}
                      />

                      {errors.numero && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.numero}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* COMPLEMENTO / CEP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="complemento"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Complemento
                      </label>

                      <input
                        id="complemento"
                        type="text"
                        maxLength={100}
                        value={formData.complemento}
                        onChange={(event) =>
                          updateField(
                            'complemento',
                            event.target.value,
                          )
                        }
                        placeholder="Sala, bloco, conjunto..."
                        className={inputClass('complemento')}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cep"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        CEP *
                      </label>

                      <input
                        id="cep"
                        type="text"
                        inputMode="numeric"
                        value={formData.cep}
                        onChange={(event) =>
                          updateField(
                            'cep',
                            formatCEP(event.target.value),
                          )
                        }
                        placeholder="00000-000"
                        className={inputClass('cep')}
                      />

                      {errors.cep && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.cep}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* UF / CIDADE / PAÍS */}
                  <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-5">
                    <div>
                      <label
                        htmlFor="uf"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        UF *
                      </label>

                      <select
                        id="uf"
                        value={formData.uf}
                        onChange={(event) =>
                          updateField('uf', event.target.value)
                        }
                        className={inputClass('uf')}
                      >
                        <option value="">UF</option>

                        {estados.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>

                      {errors.uf && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.uf}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cidade"
                        className="block text-[13px] font-medium text-slate-700 mb-2"
                      >
                        Cidade *
                      </label>

                      <input
                        id="cidade"
                        type="text"
                        maxLength={80}
                        value={formData.cidade}
                        onChange={(event) =>
                          updateField(
                            'cidade',
                            event.target.value,
                          )
                        }
                        placeholder="Nome da cidade"
                        className={inputClass('cidade')}
                      />

                      {errors.cidade && (
                        <p className="mt-1.5 text-[12px] text-red-600">
                          {errors.cidade}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="pais"
                      className="block text-[13px] font-medium text-slate-700 mb-2"
                    >
                      País *
                    </label>

                    <select
                      id="pais"
                      value={formData.pais}
                      onChange={(event) =>
                        updateField('pais', event.target.value)
                      }
                      className={inputClass('pais')}
                    >
                      <option value="Brasil">Brasil</option>
                    </select>

                    {errors.pais && (
                      <p className="mt-1.5 text-[12px] text-red-600">
                        {errors.pais}
                      </p>
                    )}
                  </div>

                  {/* LGPD */}
                  <div className="pt-3">
                    <label
                      htmlFor="consentimento"
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        errors.consentimento
                          ? 'border-red-300 bg-red-50/50'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        id="consentimento"
                        type="checkbox"
                        checked={formData.consentimento}
                        onChange={(event) =>
                          updateField(
                            'consentimento',
                            event.target.checked,
                          )
                        }
                        className="mt-0.5 w-4 h-4 accent-[#A3192E]"
                      />

                      <span className="text-[13px] text-slate-600 leading-relaxed">
                        Li e concordo com a Política de Privacidade e
                        autorizo o tratamento dos meus dados para fins de
                        contato e análise da parceria.
                      </span>
                    </label>

                    {errors.consentimento && (
                      <p className="mt-1.5 text-[12px] text-red-600">
                        {errors.consentimento}
                      </p>
                    )}
                  </div>

                  {/* ERRO ENVIO */}
                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                      {submitError}
                    </div>
                  )}

                  {/* BOTÃO */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#A3192E] hover:bg-[#8f1628] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-4 text-[15px] transition-colors shadow-sm cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Enviando inscrição...
                      </>
                    ) : (
                      <>
                        Quero ser parceiro
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11.5px] text-slate-400 leading-relaxed">
                    Seus dados serão tratados de acordo com a Política de
                    Privacidade da XD Capital.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FECHAMENTO */}
        <section className="mb-12">
          <div className="p-8 sm:p-12 rounded-[28px] bg-slate-900 text-white">
            <div className="max-w-[760px]">
              <div className="text-[12px] font-mono uppercase tracking-[0.16em] text-white/50 mb-4">
                VAMOS CRESCER JUNTOS
              </div>

              <h2 className="text-[26px] sm:text-[32px] font-normal tracking-[-0.025em] mb-4 text-white">
                Uma parceria construída
                <br />
                para gerar valor.
              </h2>

              <p className="text-[15px] text-slate-300 leading-relaxed max-w-[680px]">
                Obrigado pelo interesse em se tornar parceiro da XD Capital.
                Acreditamos em relacionamentos comerciais transparentes,
                duradouros e extremamente produtivos. Esperamos em breve fazer
                negócios que tragam valor significativo para ambas as partes.
                Vamos crescer juntos!
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href="#inscricao"
                  className="inline-flex items-center gap-2 rounded-full bg-[#A3192E] hover:bg-[#8f1628] text-white px-6 py-3.5 text-[14px] transition-colors"
                >
                  Iniciar inscrição
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {onOpenContact && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenContact('Programa de Parceiros XD Capital')
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3.5 text-[14px] transition-colors cursor-pointer"
                  >
                    Fale conosco
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* RODAPÉ DA PÁGINA */}
        <div className="pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[13px] text-slate-500">
              Programa de Parceiros XD Capital
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Soluções financeiras para ampliar oportunidades de negócio.
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-[#A3192E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};
