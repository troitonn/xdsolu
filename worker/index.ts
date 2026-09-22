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

    if (url.pathname === "/api/ethics" && request.method === "POST") {
  return handleEthics(request, env);
}
    // Endpoint LGPD / Direitos do Titular
    if (url.pathname === "/api/lgpd" && request.method === "POST") {
      return handleLgpd(request, env);
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



async function handleEthics(request: Request, env: Env): Promise<Response> {
  try {
    const data = await request.json();

    const {
      reportType,
      isAnonymous,
      name,
      email,
      phone,
      involvement,
      description,
    } = data as {
      reportType?: string;
      isAnonymous?: boolean;
      name?: string;
      email?: string;
      phone?: string;
      involvement?: string;
      description?: string;
    };

    if (!description?.trim()) {
      return json(
        {
          success: false,
          message: "A descrição dos fatos é obrigatória.",
        },
        400
      );
    }

    if (!reportType?.trim()) {
      return json(
        {
          success: false,
          message: "Selecione o tipo de ocorrência.",
        },
        400
      );
    }

    /*
     * Se a denúncia for identificada, valida o e-mail.
     */
    if (!isAnonymous) {
      if (!name?.trim()) {
        return json(
          {
            success: false,
            message: "Informe seu nome para uma denúncia identificada.",
          },
          400
        );
      }

      if (!email?.trim()) {
        return json(
          {
            success: false,
            message: "Informe seu e-mail para uma denúncia identificada.",
          },
          400
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return json(
          {
            success: false,
            message: "Informe um e-mail válido.",
          },
          400
        );
      }
    }

    const protocol = `ETH-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const now = new Date();

    const date = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "full",
      timeStyle: "medium",
    }).format(now);

    const reportTypes: Record<string, string> = {
      codigo_conduta: "Violação do Código de Conduta e Ética",
      conflito_interesses: "Conflito de Interesses",
      corrupcao: "Corrupção, Propina ou Vantagem Indevida",
      pld_ft:
        "Suspeita de Fraude, Lavagem de Dinheiro ou Financiamento ao Terrorismo",
      sigilo_lgpd: "Vazamento de Informações, Quebra de Sigilo ou LGPD",
      assedio: "Assédio Moral, Sexual ou Discriminação",
      outros: "Outras irregularidades operacionais",
    };

    const reportTypeLabel =
      reportTypes[reportType] || "Outras irregularidades";

    const anonymous = Boolean(isAnonymous);

    const safeName = anonymous
      ? "Denúncia anônima"
      : escapeHtml(name?.trim() || "");

    const safeEmail = anonymous
      ? "Não informado — denúncia anônima"
      : escapeHtml(email?.trim() || "");

    const safePhone = anonymous
      ? "Não informado — denúncia anônima"
      : escapeHtml(phone?.trim() || "");

    const safeInvolvement = escapeHtml(
      involvement?.trim() || "Não informado"
    );

    const safeDescription = escapeHtml(description.trim());

    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Nova manifestação ética - ${protocol}</title>
        </head>

        <body style="margin:0;padding:0;background:#f5f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;">
          <div style="max-width:700px;margin:40px auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">

            <div style="padding:28px 32px;background:#0b0f19;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#cbd5e1;margin-bottom:10px;">
                XD Capital · Comitê de Ética, Integridade e Compliance
              </div>

              <h1 style="margin:0;font-size:24px;font-weight:500;">
                Nova Manifestação Confidencial
              </h1>
            </div>

            <div style="padding:32px;">

              <div style="padding:18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:24px;">
                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">
                  Protocolo
                </div>

                <div style="font-size:22px;font-weight:700;color:#a3192e;font-family:monospace;">
                  ${protocol}
                </div>
              </div>

              <table style="width:100%;border-collapse:collapse;font-size:14px;">
                <tr>
                  <td style="padding:10px 0;color:#64748b;width:180px;">
                    Data do registro
                  </td>
                  <td style="padding:10px 0;font-weight:600;">
                    ${escapeHtml(date)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Tipo da ocorrência
                  </td>
                  <td style="padding:10px 0;font-weight:600;">
                    ${escapeHtml(reportTypeLabel)}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Forma de identificação
                  </td>
                  <td style="padding:10px 0;font-weight:600;">
                    ${anonymous ? "Anônima" : "Identificada"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Nome
                  </td>
                  <td style="padding:10px 0;">
                    ${safeName}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    E-mail
                  </td>
                  <td style="padding:10px 0;">
                    ${safeEmail}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Telefone
                  </td>
                  <td style="padding:10px 0;">
                    ${safePhone}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;">
                    Envolvidos
                  </td>
                  <td style="padding:10px 0;">
                    ${safeInvolvement}
                  </td>
                </tr>
              </table>

              <div style="margin-top:28px;">
                <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                  Descrição dos fatos
                </div>

                <div style="padding:18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;line-height:1.7;white-space:pre-wrap;">
                  ${safeDescription}
                </div>
              </div>

              <div style="margin-top:28px;padding:16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;font-size:12px;color:#9a3412;line-height:1.6;">
                Esta manifestação foi recebida através do Canal de Denúncias
                da XD Capital. O conteúdo deve ser tratado de forma
                confidencial e restrita às pessoas autorizadas para sua
                apuração.
              </div>

            </div>
          </div>
        </body>
      </html>
    `;

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
          to: ["compliance@xdcapital.com.br"],
          ...(anonymous
            ? {}
            : {
                reply_to: email!.trim(),
              }),
          subject: `Nova manifestação ética — ${protocol}`,
          html,
        }),
      }
    );

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();

      console.error("Erro ao enviar manifestação ética:", errorText);

      return json(
        {
          success: false,
          message:
            "Não foi possível registrar a manifestação neste momento. Tente novamente.",
        },
        502
      );
    }

    return json({
      success: true,
      protocol,
      date,
      message: "Manifestação registrada com sucesso.",
    });
  } catch (error) {
    console.error("Erro no endpoint /api/ethics:", error);

    return json(
      {
        success: false,
        message: "Erro interno ao processar a manifestação.",
      },
      500
    );
  }
}




async function handleLgpd(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const data = await request.json<{
      requestType?: string;
      name?: string;
      document?: string;
      email?: string;
      phone?: string;
      description?: string;
    }>();

    const {
      requestType,
      name,
      document,
      email,
      phone,
      description,
    } = data;

    // Validação dos campos obrigatórios
    if (
      !name?.trim() ||
      !document?.trim() ||
      !email?.trim() ||
      !description?.trim()
    ) {
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

    // Gera protocolo da solicitação LGPD
    const protocol = `XD-LGPD-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    // Data/hora oficial do recebimento
    const submissionDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Sao_Paulo",
    }).format(new Date());

    const requestTypes: Record<string, string> = {
      confirmacao:
        "Confirmação da existência de tratamento de dados",
      acesso:
        "Acesso aos meus dados pessoais cadastrados",
      correcao:
        "Correção de dados incompletos, inexatos ou desatualizados",
      anonimizacao:
        "Anonimização, bloqueio ou eliminação de dados",
      compartilhamento:
        "Informações sobre entidades públicas/privadas com quem houve compartilhamento",
      revogacao:
        "Revogação do consentimento",
      duvidas:
        "Outras dúvidas sobre a Política de Privacidade",
    };

    const requestTypeLabel =
      requestTypes[requestType || ""] || requestType || "-";

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

          // Destinatário do DPO / Privacidade
          to: ["dpo@xdcapital.com.br"],

          // Responder diretamente para o titular
          reply_to: email.trim(),

          subject: `Nova solicitação LGPD — ${protocol}`,

          html: `
            <div style="
              font-family: Arial, Helvetica, sans-serif;
              line-height: 1.6;
              color: #222;
              max-width: 700px;
              margin: 0 auto;
            ">

              <h2>
                Nova solicitação de titular — XD Capital
              </h2>

              <p>
                Uma nova solicitação relacionada ao exercício de direitos
                previstos na LGPD foi recebida através do site.
              </p>

              <hr />

              <h3>Protocolo</h3>

              <p>
                <strong>${escapeHtml(protocol)}</strong>
              </p>

              <p>
                <strong>Data de recebimento:</strong><br />
                ${escapeHtml(submissionDate)}
              </p>

              <h3>Tipo de solicitação</h3>

              <p>
                ${escapeHtml(requestTypeLabel)}
              </p>

              <h3>Dados do titular</h3>

              <p>
                <strong>Nome completo:</strong><br />
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>CPF / CNPJ:</strong><br />
                ${escapeHtml(document)}
              </p>

              <p>
                <strong>E-mail:</strong><br />
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Telefone:</strong><br />
                ${escapeHtml(phone || "-")}
              </p>

              <h3>Detalhamento da solicitação</h3>

              <p>
                ${escapeHtml(description).replace(/\n/g, "<br />")}
              </p>

              <hr />

              <p>
                <strong>Canal:</strong> Portal LGPD / DPO
              </p>

              <p>
                <strong>Protocolo:</strong>
                ${escapeHtml(protocol)}
              </p>

              <p style="color:#666;font-size:13px;">
                Solicitação recebida através do canal institucional
                de privacidade da XD Capital.
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
        "Erro Resend — solicitação LGPD:",
        error
      );

      return json(
        {
          success: false,
          error: "Não foi possível enviar a solicitação.",
        },
        500
      );
    }

    // Sucesso
    return json({
      success: true,
      protocol,
      date: submissionDate,
      message: "Solicitação enviada com sucesso.",
    });

  } catch (error) {
    console.error(
      "Erro no formulário LGPD:",
      error
    );

    return json(
      {
        success: false,
        error: "Erro ao processar a solicitação.",
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
