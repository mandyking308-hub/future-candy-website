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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

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

    // hCaptcha is optional: only verify when a token is supplied AND the secret is configured.
    // The form relies on a honeypot field for spam protection; this leaves the door open
    // for an hCaptcha widget to be wired up later without breaking submissions.
    const hcaptchaSecret = Deno.env.get("HCAPTCHA_SECRET");
    if (captchaToken && hcaptchaSecret) {
      const captchaRes = await fetch("https://api.hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `response=${encodeURIComponent(captchaToken)}&secret=${encodeURIComponent(hcaptchaSecret)}`,
      });
    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
      return new Response(
        JSON.stringify({ error: "Captcha verification failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("futurecandy_enquiries").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      subject,
      message,
      source_page: sourcePage || null,
      status: "new",
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to store enquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification
    const now = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
    const subjectMap: Record<string, string> = {
      general: "General Inquiry",
      licensing: "Music Licensing",
      collaboration: "Collaboration Request",
      press: "Press & Media",
      privacy: "Privacy & Data",
      other: "Other",
    };

    // Escape user-supplied values before interpolating into HTML email
    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeCompany = company ? escapeHtml(company) : "";
    const safeSubject = escapeHtml(subjectMap[subject] || subject);
    const safeSourcePage = sourcePage ? escapeHtml(sourcePage) : "";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1a1a2e; border-bottom: 2px solid #ff0080; padding-bottom: 10px;">New NeonCandy Enquiry</h1>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px; font-weight: bold; color: #333; width: 120px;">Name:</td><td style="padding: 8px; color: #555;">${safeName}</td></tr>
          <tr style="background: #f8f8f8;"><td style="padding: 8px; font-weight: bold; color: #333;">Email:</td><td style="padding: 8px; color: #555;">${safeEmail}</td></tr>
          ${safePhone ? `<tr><td style="padding: 8px; font-weight: bold; color: #333;">Phone:</td><td style="padding: 8px; color: #555;">${safePhone}</td></tr>` : ""}
          ${safeCompany ? `<tr style="background: #f8f8f8;"><td style="padding: 8px; font-weight: bold; color: #333;">Company:</td><td style="padding: 8px; color: #555;">${safeCompany}</td></tr>` : ""}
          <tr><td style="padding: 8px; font-weight: bold; color: #333;">Subject:</td><td style="padding: 8px; color: #555;">${safeSubject}</td></tr>
          <tr style="background: #f8f8f8;"><td style="padding: 8px; font-weight: bold; color: #333;">Date/Time:</td><td style="padding: 8px; color: #555;">${now}</td></tr>
          ${safeSourcePage ? `<tr><td style="padding: 8px; font-weight: bold; color: #333;">Source Page:</td><td style="padding: 8px; color: #555;">${safeSourcePage}</td></tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="color: #555; line-height: 1.6;">${safeMessage}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">This enquiry was submitted via the NeonCandy website contact form.</p>
      </div>
    `;


    // Try to send via Lovable email infrastructure
    try {
      const emailApiUrl = Deno.env.get("SUPABASE_URL")!;
      // Use the internal send function
      const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-enquiry",
          recipientEmail: "contact@futurecandy.studio",
          idempotencyKey: `contact-${Date.now()}`,
          templateData: { name, email, phone, company, subject: subjectMap[subject] || subject, message, sourcePage, dateTime: now },
        },
      });

      if (emailError) {
        console.error("Transactional email error, falling back:", emailError);
        // Fallback: still succeed since DB has the record
      }
    } catch (emailErr) {
      console.error("Email send error (non-critical):", emailErr);
      // Email sending is non-critical - the enquiry is stored in the database
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for contacting NeonCandy — we'll get back to you soon." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
