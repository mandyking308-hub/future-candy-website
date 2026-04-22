import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContentProtection from "@/components/ContentProtection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { CheckCircle2, Send } from "lucide-react";

const enquirySchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Invalid email address").max(255),
  enquiry_type: z.string().min(1, "Please choose an enquiry type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  website: z.string().trim().max(255).optional().or(z.literal("")),
});

const ENQUIRY_TYPES = [
  { value: "partnership", label: "Partnership" },
  { value: "collaboration", label: "Collaboration" },
  { value: "dj", label: "DJ" },
  { value: "creator", label: "Creator" },
  { value: "media", label: "Media / Press" },
  { value: "brand", label: "Brand Enquiry" },
  { value: "other", label: "Other" },
];

const PartnerEnquiry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    enquiry_type: "",
    message: "",
  });
  // honeypot — bots tend to fill all fields
  const [hp, setHp] = useState("");

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // honeypot check — silently succeed
    if (hp.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast({
        title: "Please check the form",
        description: first ?? "Some fields are invalid.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("neoncandy_partner_enquiries").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      phone: parsed.data.phone || null,
      website: parsed.data.website || null,
      enquiry_type: parsed.data.enquiry_type,
      message: parsed.data.message,
      source_page: typeof window !== "undefined" ? window.location.href : null,
      status: "new",
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Enquiry received",
      description: "Thanks — we'll be in touch soon.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Partner & Collaboration Enquiry | NeonCandy</title>
        <meta
          name="description"
          content="Reach out for partnerships, collaborations, DJ bookings, brand projects, and media enquiries with NeonCandy."
        />
        <link rel="canonical" href="https://neoncandy.online/collab/enquire" />
      </Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition">
        <Navigation />
        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
                <span className="text-gradient">Get in Touch</span>
              </h1>
              <p className="text-lg text-center text-muted-foreground mb-12 max-w-xl mx-auto">
                For partnerships, collaborations, DJs, creators, media and brand projects —
                tell us a little about what you have in mind.
              </p>

              {submitted ? (
                <Card className="p-10 glass border-candy-cyan/30 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-candy-cyan" />
                  <h2 className="text-2xl font-bold mb-2 text-foreground">Enquiry received</h2>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. The team will review your message and reply by email.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/collab")}
                    className="border-candy-pink/30"
                  >
                    Back to Collab
                  </Button>
                </Card>
              ) : (
                <Card className="p-6 md:p-8 glass border-candy-pink/30">
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Honeypot (visually hidden) */}
                    <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                      <Label htmlFor="company_website_hp">Leave this field empty</Label>
                      <Input
                        id="company_website_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input
                          id="full_name"
                          value={form.full_name}
                          onChange={(e) => update("full_name", e.target.value)}
                          required
                          maxLength={120}
                          className="bg-background/50 border-candy-pink/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          required
                          maxLength={255}
                          className="bg-background/50 border-candy-pink/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company / Brand</Label>
                        <Input
                          id="company"
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          maxLength={150}
                          className="bg-background/50 border-candy-pink/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp</Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          maxLength={60}
                          className="bg-background/50 border-candy-pink/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website / Social Link</Label>
                      <Input
                        id="website"
                        value={form.website}
                        onChange={(e) => update("website", e.target.value)}
                        placeholder="https://"
                        maxLength={255}
                        className="bg-background/50 border-candy-pink/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="enquiry_type">Subject / Enquiry Type *</Label>
                      <Select
                        value={form.enquiry_type}
                        onValueChange={(v) => update("enquiry_type", v)}
                      >
                        <SelectTrigger
                          id="enquiry_type"
                          className="bg-background/50 border-candy-pink/30"
                        >
                          <SelectValue placeholder="Choose an enquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ENQUIRY_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        required
                        minLength={10}
                        maxLength={2000}
                        rows={6}
                        className="bg-background/50 border-candy-pink/30 resize-none"
                        placeholder="Tell us about your project, timeline, and what you're hoping to build together."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full glow-pink gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? "Sending..." : "Send Enquiry"}
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PartnerEnquiry;
