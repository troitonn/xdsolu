import React, { FormEvent, useState } from 'react';

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
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
  'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
];

const etapas = [
  {
    numero: '01',
    titulo: 'Cadastro no Site da XD Capital',
    descricao:
      'Preencha o formulário de inscrição com os dados da empresa e do representante. Neste momento, o credenciamento é destinado exclusivamente a pessoas jurídicas.',
  },
  {
    numero: '02',
    titulo: 'Contato da Área de Canais',
    descricao:
      'Nossa equipe de Canais entrará em contato por telefone e e-mail para apresentar o programa, entender os objetivos de mercado e explorar oportunidades de sinergia.',
  },
  {
    numero: '03',
    titulo: 'Envio da Documentação',
    descricao:
      'Serão solicitados os documentos necessários para análise de viabilidade, incluindo identificação, estrutura societária, referências comerciais e histórico de operações.',
  },
  {
    numero: '04',
    titulo: 'Análise de Viabilidade e Aprovação',
    descricao:
      'A XD Capital realizará uma análise técnica, comercial e de conformidade, avaliando a compatibilidade, capacidade operacional e potencial de mercado do parceiro.',
  },
  {
    numero: '05',
    titulo: 'Credenciamento Formal',
    descricao:
      'Após a aprovação, será realizada a assinatura do Contrato de Parceria, formalizando a relação comercial e suas respectivas condições.',
  },
  {
    numero: '06',
    titulo: 'Onboarding do Novo Parceiro',
    descricao:
      'O parceiro receberá treinamento sobre produtos, plataforma, processos comerciais, suporte e ferramentas de venda, além da ativação dos acessos necessários.',
  },
  {
    numero: '07',
    titulo: 'Início das Operações',
    descricao:
      'A parceria é oficialmente iniciada. O parceiro passa a comercializar as soluções XD Capital com acompanhamento e suporte contínuo da equipe de Canais.',
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
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Informe o nome do representante.';
    }

    if (!formData.razaoSocial.trim()) {
      newErrors.razaoSocial = 'Informe a razão social.';
    }

    if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'Informe um CNPJ válido.';
    }

    if (onlyNumbers(formData.telefone).length < 10) {
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
        'É necessário aceitar a política de privacidade.';
    }

    setErrors(newErrors);

    return newErrors;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.keys(validationErrors)[0];

      if (firstError) {
        document.getElementById(firstError)?.focus();
      }

      return;
    }

    setLoading(true);

    try {
      /*
       * Integração futura:
       *
       * await fetch('/api/parceiros', {
       *   method: 'POST',
       *   headers: {
       *     'Content-Type': 'application/json',
       *   },
       *   body: JSON.stringify(formData),
       * });
       */

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitted(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="partners-page">
      {/* HERO */}
      <section className="partners-hero">
        <div className="partners-container">
          <button
            type="button"
            className="partners-back"
            onClick={onBackToHome}
          >
            ← Voltar para o início
          </button>

          <span className="partners-eyebrow">
            PROGRAMA DE PARCEIROS
          </span>

          <h1>
            Seja um Parceiro
            <br />
            <strong>XD Capital</strong>
          </h1>

          <p>
            Expanda seu portfólio com soluções financeiras inovadoras
            e construa novas oportunidades de negócio com a XD Capital.
          </p>

          <a
            href="#inscricao"
            className="partners-primary-button"
          >
            Quero ser parceiro
          </a>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="partners-benefits">
        <div className="partners-container">
          <div className="partners-section-header">
            <span className="partners-eyebrow">
              POR QUE SER PARCEIRO
            </span>

            <h2>
              Novas oportunidades
              <br />
              para o seu negócio.
            </h2>

            <p>
              Ao se tornar parceiro da XD Capital, sua empresa terá
              acesso a um ecossistema de soluções financeiras pensado
              para ampliar seu portfólio e gerar novas oportunidades.
            </p>
          </div>

          <div className="partners-benefits-grid">
            <article>
              <span>01</span>

              <h3>Retorno financeiro</h3>

              <p>
                Comissões e incentivos de vendas para apoiar o
                crescimento da parceria.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Portfólio BaaS</h3>

              <p>
                Acesso a soluções de contas, pagamentos, crédito,
                investimentos e outros serviços financeiros.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Suporte dedicado</h3>

              <p>
                Suporte técnico e comercial durante toda a jornada
                da parceria.
              </p>
            </article>

            <article>
              <span>04</span>

              <h3>Materiais e treinamento</h3>

              <p>
                Conteúdos, materiais comerciais e capacitação para
                apoiar sua operação.
              </p>
            </article>

            <article>
              <span>05</span>

              <h3>Ambiente seguro</h3>

              <p>
                Acesso a uma plataforma estruturada para operação
                de serviços financeiros.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ETAPAS */}
      <section className="partners-steps">
        <div className="partners-container">
          <div className="partners-section-header">
            <span className="partners-eyebrow">
              COMO FUNCIONA
            </span>

            <h2>
              Da inscrição
              <br />
              à operação.
            </h2>

            <p>
              O programa de parceria é estruturado em sete etapas
              para garantir uma jornada clara e organizada.
            </p>
          </div>

          <div className="partners-timeline">
            {etapas.map((etapa) => (
              <article
                className="partners-step"
                key={etapa.numero}
              >
                <div className="partners-step-number">
                  {etapa.numero}
                </div>

                <div className="partners-step-content">
                  <h3>{etapa.titulo}</h3>

                  <p>{etapa.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="partners-closing">
        <div className="partners-container">
          <span className="partners-eyebrow">
            VAMOS CRESCER JUNTOS
          </span>

          <h2>
            Uma parceria construída
            <br />
            para gerar valor.
          </h2>

          <p>
            Obrigado pelo interesse em se tornar parceiro da XD Capital.
            Acreditamos em relacionamentos comerciais transparentes,
            duradouros e extremamente produtivos.
          </p>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section
        className="partners-form-section"
        id="inscricao"
      >
        <div className="partners-container">
          <div className="partners-form-layout">
            <div className="partners-form-intro">
              <span className="partners-eyebrow">
                FAÇA SUA INSCRIÇÃO
              </span>

              <h2>
                Quero ser
                <br />
                parceiro.
              </h2>

              <p>
                Preencha os dados abaixo e nossa equipe de Canais
                entrará em contato para apresentar todos os detalhes
                do programa.
              </p>

              <div className="partners-form-info">
                <strong>Importante</strong>

                <span>
                  O credenciamento nesta etapa é destinado
                  exclusivamente a pessoas jurídicas.
                </span>
              </div>
            </div>

            <div className="partners-form-card">
              {submitted ? (
                <div className="partners-success">
                  <div className="partners-success-icon">
                    ✓
                  </div>

                  <h3>Inscrição recebida!</h3>

                  <p>
                    Sua inscrição foi recebida com sucesso.
                    Entraremos em contato em breve.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                  >
                    Fazer nova inscrição
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="partners-form-row">
                    <div className="partners-field">
                      <label htmlFor="nome">
                        Nome do representante *
                      </label>

                      <input
                        id="nome"
                        type="text"
                        maxLength={100}
                        value={formData.nome}
                        onChange={(event) =>
                          updateField(
                            'nome',
                            event.target.value,
                          )
                        }
                        placeholder="Digite seu nome completo"
                      />

                      {errors.nome && (
                        <small>{errors.nome}</small>
                      )}
                    </div>

                    <div className="partners-field">
                      <label htmlFor="razaoSocial">
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
                      />

                      {errors.razaoSocial && (
                        <small>{errors.razaoSocial}</small>
                      )}
                    </div>
                  </div>

                  <div className="partners-form-row">
                    <div className="partners-field">
                      <label htmlFor="cnpj">
                        CNPJ *
                      </label>

                      <input
                        id="cnpj"
                        type="text"
                        inputMode="numeric"
                        value={formData.cnpj}
                        onChange={(event) =>
                          updateField(
                            'cnpj',
                            formatCNPJ(
                              event.target.value,
                            ),
                          )
                        }
                        placeholder="00.000.000/0000-00"
                      />

                      {errors.cnpj && (
                        <small>{errors.cnpj}</small>
                      )}
                    </div>

                    <div className="partners-field">
                      <label htmlFor="telefone">
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
                            formatTelefone(
                              event.target.value,
                            ),
                          )
                        }
                        placeholder="(00) 00000-0000"
                      />

                      {errors.telefone && (
                        <small>{errors.telefone}</small>
                      )}
                    </div>
                  </div>

                  <div className="partners-form-row">
                    <div className="partners-field partners-field-large">
                      <label htmlFor="endereco">
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
                      />

                      {errors.endereco && (
                        <small>{errors.endereco}</small>
                      )}
                    </div>

                    <div className="partners-field partners-field-small">
                      <label htmlFor="numero">
                        Número *
                      </label>

                      <input
                        id="numero"
                        type="text"
                        inputMode="numeric"
                        value={formData.numero}
                        onChange={(event) =>
                          updateField(
                            'numero',
                            event.target.value,
                          )
                        }
                        placeholder="Nº"
                      />

                      {errors.numero && (
                        <small>{errors.numero}</small>
                      )}
                    </div>
                  </div>

                  <div className="partners-form-row">
                    <div className="partners-field">
                      <label htmlFor="complemento">
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
                      />
                    </div>

                    <div className="partners-field">
                      <label htmlFor="cep">
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
                            formatCEP(
                              event.target.value,
                            ),
                          )
                        }
                        placeholder="00000-000"
                      />

                      {errors.cep && (
                        <small>{errors.cep}</small>
                      )}
                    </div>
                  </div>

                  <div className="partners-form-row">
                    <div className="partners-field">
                      <label htmlFor="uf">
                        UF *
                      </label>

                      <select
                        id="uf"
                        value={formData.uf}
                        onChange={(event) =>
                          updateField(
                            'uf',
                            event.target.value,
                          )
                        }
                      >
                        <option value="">
                          Selecione o estado
                        </option>

                        {estados.map((estado) => (
                          <option
                            key={estado}
                            value={estado}
                          >
                            {estado}
                          </option>
                        ))}
                      </select>

                      {errors.uf && (
                        <small>{errors.uf}</small>
                      )}
                    </div>

                    <div className="partners-field">
                      <label htmlFor="cidade">
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
                      />

                      {errors.cidade && (
                        <small>{errors.cidade}</small>
                      )}
                    </div>
                  </div>

                  <div className="partners-field">
                    <label htmlFor="pais">
                      País *
                    </label>

                    <select
                      id="pais"
                      value={formData.pais}
                      onChange={(event) =>
                        updateField(
                          'pais',
                          event.target.value,
                        )
                      }
                    >
                      <option value="Brasil">
                        Brasil
                      </option>
                    </select>

                    {errors.pais && (
                      <small>{errors.pais}</small>
                    )}
                  </div>

                  <label className="partners-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.consentimento}
                      onChange={(event) =>
                        updateField(
                          'consentimento',
                          event.target.checked,
                        )
                      }
                    />

                    <span>
                      Li e concordo com a Política de Privacidade
                      e autorizo o tratamento dos meus dados para
                      fins de contato e análise da parceria.
                    </span>
                  </label>

                  {errors.consentimento && (
                    <small className="partners-checkbox-error">
                      {errors.consentimento}
                    </small>
                  )}

                  <button
                    type="submit"
                    className="partners-submit-button"
                    disabled={loading}
                  >
                    {loading
                      ? 'Enviando...'
                      : 'Quero ser parceiro'}
                  </button>

                  <p className="partners-form-footer">
                    Seus dados serão tratados de acordo com a
                    Política de Privacidade da XD Capital.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
