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
    }

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

    const now = new Date().toLocaleString("en-GB", { timeZone: "Europe/London" });
    const subjectMap: Record<string, string> = {
      general: "General Enquiry",
      licensing: "Music Licensing",
      collaboration: "Collaboration Request",
      press: "Press & Media",
      privacy: "Privacy & Data",
      other: "Other",
    };

    try {
      const { error: emailError } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-enquiry",
          recipientEmail: "contact@futurecandy.studio",
          idempotencyKey: `futurecandy-contact-${Date.now()}`,
          templateData: {
            brand: "FutureCandy",
            name,
            email,
            phone,
            company,
            subject: subjectMap[subject] || subject,
            message,
            sourcePage,
            dateTime: now,
          },
        },
      });

      if (emailError) {
        console.error("Transactional email error, enquiry still stored:", emailError);
      }
    } catch (emailErr) {
      console.error("Email send error, enquiry still stored:", emailErr);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for contacting FutureCandy — we'll get back to you soon." }),
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