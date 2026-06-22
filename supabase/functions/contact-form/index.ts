import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  subject: z.enum(["general", "licensing", "collaboration", "press", "privacy", "other"]),
  message: z.string().min(10).max(2000),
  sourcePage: z.string().optional().default(""),
  captchaToken: z.string().optional().default(""),
});

const subjectMap: Record<string, string> = {
  general: "General Enquiry",
  licensing: "Music Licensing",
  collaboration: "Collaboration Request",
  press: "Press & Media",
  privacy: "Privacy & Data",
  other: "Other",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  sourcePage: string;
  dateTime: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:680px;margin:0 auto;padding:24px;">
      <h1 style="margin:0 0 16px;color:#d946ef;">New NeonCandy Enquiry</h1>
      <p style="margin:0 0 20px;color:#555;">A new enquiry has been submitted through the NeonCandy website.</p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.phone || "Not provided")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.company || "Not provided")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Subject</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.subject)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Source</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.sourcePage || "Not provided")}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Date/Time</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(data.dateTime)}</td></tr>
      </table>
      <h2 style="font-size:18px;margin:0 0 8px;">Message</h2>
      <div style="white-space:pre-wrap;border:1px solid #ddd;padding:12px;background:#fafafa;">${escapeHtml(data.message)}</div>
      <p style="margin-top:20px;color:#555;font-size:13px;">This enquiry has also been stored in the NeonCandy admin dashboard.</p>
    </div>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid form data", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, phone, company, subject, message, sourcePage, captchaToken } = parsed.data;

    const hcaptchaSecret = Deno.env.get("HCAPTCHA_SECRET");
    if (captchaToken && hcaptchaSecret) {
      const captchaRes = await fetch("https://api.hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${encodeURIComponent(captchaToken)}&secret=${encodeURIComponent(hcaptchaSecret)}`,
      });
      const captchaData = await captchaRes.json();
      if (!captchaData.success) {
        return new Response(JSON.stringify({ error: "Captcha verification failed" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: inserted, error: dbError } = await supabase
      .from("futurecandy_enquiries")
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        source_page: sourcePage || null,
        status: "new",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Failed to store enquiry" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messageId = crypto.randomUUID();
    const dateTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
    const recipient = Deno.env.get("CONTACT_NOTIFICATION_EMAIL") || "hello@neoncandy.online";
    const senderDomain = Deno.env.get("NEONCANDY_SENDER_DOMAIN") || "notify.neoncandy.net";
    const publicSubject = subjectMap[subject] || subject;
    const html = buildEmailHtml({ name, email, phone, company, subject: publicSubject, message, sourcePage, dateTime });
    const text = `New NeonCandy enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCompany: ${company || "Not provided"}\nSubject: ${publicSubject}\nSource: ${sourcePage || "Not provided"}\nDate/Time: ${dateTime}\n\nMessage:\n${message}\n\nStored in admin dashboard. Enquiry ID: ${inserted?.id || "unknown"}`;

    let notificationQueued = false;
    try {
      await supabase.from("email_send_log").insert({
        message_id: messageId,
        template_name: "contact-enquiry",
        recipient_email: recipient,
        status: "pending",
      });

      const { error: enqueueError } = await supabase.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          run_id: `contact-form-${messageId}`,
          message_id: messageId,
          to: recipient,
          from: `NeonCandy <noreply@${senderDomain}>`,
          sender_domain: senderDomain,
          subject: `New NeonCandy enquiry: ${publicSubject}`,
          html,
          text,
          purpose: "transactional",
          label: "contact-enquiry",
          queued_at: new Date().toISOString(),
        },
      });

      if (enqueueError) {
        console.error("Failed to enqueue contact notification:", enqueueError);
        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: "contact-enquiry",
          recipient_email: recipient,
          status: "failed",
          error_message: "Failed to enqueue contact notification",
        });
      } else {
        notificationQueued = true;
      }
    } catch (emailErr) {
      console.error("Email queue error, enquiry still stored:", emailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        stored: true,
        notificationQueued,
        message: "Thank you for contacting NeonCandy — we'll get back to you soon.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});