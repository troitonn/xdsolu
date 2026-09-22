export interface Env {
  ASSETS: Fetcher;
  API_FORMULARIO: string;
}


export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

      // Endpoint do formulário de contato
      if (url.pathname === "/api/contact" && request.method === "POST") {
        return handleContact(request, env);
      }
      
      // Endpoint de abertura de conta
      if (
        url.pathname === "/api/account-opening" &&
        request.method === "POST"
      ) {
        return handleAccountOpening(request, env);
      }

    // Todo o restante continua sendo servido pelo React/Vite
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const data = await request.json<{
      subject?: string;
      companyName?: string;
      cnpj?: string;
      name?: string;
      email?: string;
      phone?: string;
      volume?: string;
      message?: string;
    }>();

    const {
      subject,
      companyName,
      cnpj,
      name,
      email,
      phone,
      volume,
      message,
    } = data;

    // Validação básica
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json(
        {
          success: false,
          error: "Preencha os campos obrigatórios.",
        },
        400
      );
    }

    // Validação simples de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return json(
        {
          success: false,
          error: "Informe um e-mail válido.",
        },
        400
      );
    }

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.API_FORMULARIO}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "XD Capital <noreply@update.xdcapital.com.br>",
          to: ["contato@xdcapital.com.br"],
          reply_to: email.trim(),

          subject: `Novo contato pelo site — ${
            subject?.trim() || "Atendimento"
          }`,

          html: `
            <h2>Novo contato pelo site XD Capital</h2>

            <p>
              <strong>Assunto:</strong>
              ${escapeHtml(subject || "-")}
            </p>

            <p>
              <strong>Empresa:</strong>
              ${escapeHtml(companyName || "-")}
            </p>

            <p>
              <strong>CNPJ:</strong>
              ${escapeHtml(cnpj || "-")}
            </p>

            <p>
              <strong>Nome:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>E-mail:</strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Telefone:</strong>
              ${escapeHtml(phone || "-")}
            </p>

            <p>
              <strong>Volume:</strong>
              ${escapeHtml(volume || "-")}
            </p>

            <hr />

            <p>
              <strong>Mensagem:</strong>
            </p>

            <p>
              ${escapeHtml(message).replace(/\n/g, "<br />")}
            </p>
          `,
        }),
      }
    );

    if (!resendResponse.ok) {
      const error = await resendResponse.text();

      console.error("Erro Resend:", error);

      return json(
        {
          success: false,
          error: "Não foi possível enviar sua mensagem.",
        },
        500
      );
    }

    return json({
      success: true,
      message: "Mensagem enviada com sucesso.",
    });
  } catch (error) {
    console.error("Erro no formulário:", error);

    return json(
      {
        success: false,
        error: "Erro ao processar o formulário.",
      },
      500
    );
  }
}



async function handleAccountOpening(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const data = await request.json<{
      accountType?: "PF" | "PJ";

      companyName?: string;
      tradeName?: string;
      document?: string;
      activitySegment?: string;

      representativeName?: string;
      representativeRole?: string;
      email?: string;
      phone?: string;

      cep?: string;
      street?: string;
      number?: string;
      complement?: string;
      neighborhood?: string;
      city?: string;
      state?: string;

      services?: string[];

      acceptTerms?: boolean;
      acceptPrivacy?: boolean;
      authorizedCreditCheck?: boolean;
    }>();

    const {
      accountType,
      companyName,
      tradeName,
      document,
      activitySegment,
      representativeName,
      representativeRole,
      email,
      phone,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      services,
      acceptTerms,
      acceptPrivacy,
      authorizedCreditCheck,
    } = data;

    // Validação dos campos obrigatórios
    if (
      !companyName?.trim() ||
      !document?.trim() ||
      !representativeName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !city?.trim()
    ) {
      return json(
        {
          success: false,
          error: "Preencha os campos obrigatórios.",
        },
        400
      );
    }

    // Validação do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return json(
        {
          success: false,
          error: "Informe um e-mail válido.",
        },
        400
      );
    }

    // Validação dos consentimentos
    if (!acceptTerms || !acceptPrivacy) {
      return json(
        {
          success: false,
          error:
            "É necessário aceitar os Termos e a Política de Privacidade.",
        },
        400
      );
    }

    // Gera o protocolo no servidor
    const protocol = `XD-CAD-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const submissionDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(new Date());

    // Serviços selecionados
    const servicesHtml =
      services && services.length > 0
        ? services
            .map(
              (service) =>
                `<li>${escapeHtml(service)}</li>`
            )
            .join("")
        : "<li>Nenhum serviço selecionado</li>";

    // Envia para o Resend
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.API_FORMULARIO}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "XD Capital <noreply@update.xdcapital.com.br>",

          // Destinatário do cadastro
          to: ["contato@xdcapital.com.br"],

          // Responder para o cliente
          reply_to: email.trim(),

          subject: `Nova abertura de conta — ${protocol}`,

          html: `
            <div style="
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #222;
            ">

              <h2>Nova abertura de conta — XD Capital</h2>

              <p>
                Um novo cadastro foi realizado através do site.
              </p>

              <hr />

              <h3>Protocolo</h3>

              <p>
                <strong>${escapeHtml(protocol)}</strong>
              </p>

              <p>
                <strong>Data de recebimento:</strong>
                ${escapeHtml(submissionDate)}
              </p>

              <h3>Tipo de conta</h3>

              <p>
                ${escapeHtml(accountType || "-")}
              </p>

              <h3>Dados da empresa</h3>

              <p>
                <strong>Razão Social / Nome:</strong><br />
                ${escapeHtml(companyName || "-")}
              </p>

              <p>
                <strong>Nome Fantasia:</strong><br />
                ${escapeHtml(tradeName || "-")}
              </p>

              <p>
                <strong>CNPJ / CPF:</strong><br />
                ${escapeHtml(document || "-")}
              </p>

              <p>
                <strong>Segmento:</strong><br />
                ${escapeHtml(activitySegment || "-")}
              </p>

              <h3>Representante</h3>

              <p>
                <strong>Nome:</strong><br />
                ${escapeHtml(representativeName || "-")}
              </p>

              <p>
                <strong>Cargo:</strong><br />
                ${escapeHtml(representativeRole || "-")}
              </p>

              <p>
                <strong>E-mail:</strong><br />
                ${escapeHtml(email || "-")}
              </p>

              <p>
                <strong>Telefone:</strong><br />
                ${escapeHtml(phone || "-")}
              </p>

              <h3>Endereço</h3>

              <p>
                <strong>CEP:</strong>
                ${escapeHtml(cep || "-")}
              </p>

              <p>
                <strong>Logradouro:</strong>
                ${escapeHtml(street || "-")}
              </p>

              <p>
                <strong>Número:</strong>
                ${escapeHtml(number || "-")}
              </p>

              <p>
                <strong>Complemento:</strong>
                ${escapeHtml(complement || "-")}
              </p>

              <p>
                <strong>Bairro:</strong>
                ${escapeHtml(neighborhood || "-")}
              </p>

              <p>
                <strong>Cidade:</strong>
                ${escapeHtml(city || "-")}
              </p>

              <p>
                <strong>Estado:</strong>
                ${escapeHtml(state || "-")}
              </p>

              <h3>Produtos / Serviços de interesse</h3>

              <ul>
                ${servicesHtml}
              </ul>

              <h3>Autorizações</h3>

              <p>
                <strong>Termos:</strong>
                ${acceptTerms ? "Sim" : "Não"}
              </p>

              <p>
                <strong>Política de Privacidade:</strong>
                ${acceptPrivacy ? "Sim" : "Não"}
              </p>

              <p>
                <strong>Consulta de crédito:</strong>
                ${authorizedCreditCheck ? "Sim" : "Não"}
              </p>

              <hr />

              <p>
                <strong>Protocolo:</strong>
                ${escapeHtml(protocol)}
              </p>

            </div>
          `,
        }),
      }
    );

    // Erro do Resend
    if (!resendResponse.ok) {
      const error = await resendResponse.text();

      console.error(
        "Erro Resend — abertura de conta:",
        error
      );

      return json(
        {
          success: false,
          error: "Não foi possível enviar o cadastro.",
        },
        500
      );
    }

    // Sucesso
    return json({
      success: true,
      protocol,
      date: submissionDate,
    });
  } catch (error) {
    console.error(
      "Erro no formulário de abertura de conta:",
      error
    );

    return json(
      {
        success: false,
        error: "Erro ao processar o cadastro.",
      },
      500
    );
  }
}

/**
 * Impede que conteúdo enviado pelo usuário
 * seja interpretado como HTML no e-mail.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
}
