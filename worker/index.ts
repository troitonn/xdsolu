export interface Env {
  ASSETS: Fetcher;
  API_FORMULARIO: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Endpoint do formulário
    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
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
          from: "XD Capital <contato@xdcapital.com.br>",
          to: ["projects@troiton.com.br"],
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
