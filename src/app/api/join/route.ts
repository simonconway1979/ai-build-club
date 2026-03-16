import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, linkedin } = await req.json();

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "EMAIL_NOT_CONFIGURED",
          message: "Resend API key not configured. Set RESEND_API_KEY environment variable.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const resend = new Resend(resendApiKey);

    const to = process.env.AI_BUILD_CLUB_TO ?? "simon.conway@condaal.com";
    const from = process.env.AI_BUILD_CLUB_FROM ?? "onboarding@resend.dev";

    const emailContent = `New AI Build Club application:

Name: ${name ?? ""}
Email: ${email ?? ""}
LinkedIn: ${linkedin ?? ""}

---
Sent from AI Build Club landing page`;

    await resend.emails.send({
      from,
      to,
      subject: "AI Build Club - New Application",
      text: emailContent,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: "EMAIL_SEND_FAILED",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

