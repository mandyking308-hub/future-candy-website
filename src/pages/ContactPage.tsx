import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Briefcase, Film, Music, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.enum([
    "general",
    "licensing",
    "collaboration",
    "press",
    "privacy",
    "other",
  ]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  honeypot: z.string().max(0), // Bot trap
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "general",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!captchaToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: fnData, error: fnError } = await supabase.functions.invoke("contact-form", {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          company: data.company || "",
          subject: data.subject,
          message: data.message,
          sourcePage: window.location.href,
          captchaToken,
        },
      });

      if (fnError) throw fnError;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting NeonCandy — we'll get back to you soon.",
      });

      form.reset();
      setCaptchaToken(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | NeonCandy</title>
        <meta
          name="description"
          content="Get in touch with NeonCandy for licensing, collaboration, press inquiries, and more. Professional contact form with secure verification."
        />
        <link rel="canonical" href="https://neoncandy.online/contact" />
      </Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition">
        <Navigation />

        <main className="pt-32 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-gradient">Get in Touch</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Ready to collaborate? Have a question? We're here to help.
                  <br />
                  Fill out the form below and we'll respond within 24-48 hours.
                </p>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 glass border-candy-cyan/30 hover:border-candy-cyan/50 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-r from-candy-cyan to-candy-violet rounded-lg flex items-center justify-center glow-cyan mb-4">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-candy-cyan">
                    Licensing
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Music licensing for film, brands, and digital experiences
                  </p>
                </Card>

                <Card className="p-6 glass border-candy-pink/30 hover:border-candy-pink/50 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-r from-candy-pink to-candy-violet rounded-lg flex items-center justify-center glow-pink mb-4">
                    <Film className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-candy-pink">
                    Collaboration
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Partner with us on creative projects and productions
                  </p>
                </Card>

                <Card className="p-6 glass border-candy-violet/30 hover:border-candy-violet/50 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-r from-candy-violet to-candy-pink rounded-lg flex items-center justify-center glow-violet mb-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-candy-violet">
                    Press & Media
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Media inquiries, interviews, and press materials
                  </p>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="p-8 glass border-candy-pink/30">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="w-6 h-6 text-candy-pink" />
                  <h2 className="text-2xl font-bold text-gradient">
                    Send Us a Message
                  </h2>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Honeypot field - hidden from users */}
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input {...field} tabIndex={-1} autoComplete="off" />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                              Full Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your name"
                                className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your@email.com"
                                className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                              Phone Number (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="+44 XXX XXX XXXX"
                                className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                              Company/Organisation (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Your company"
                                className="bg-background/50 border-candy-pink/30 focus:border-candy-pink"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">
                            Subject *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-candy-pink/30 focus:border-candy-pink">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="licensing">
                                Music Licensing
                              </SelectItem>
                              <SelectItem value="collaboration">
                                Collaboration Request
                              </SelectItem>
                              <SelectItem value="press">
                                Press & Media
                              </SelectItem>
                              <SelectItem value="privacy">
                                Privacy & Data
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">
                            Your Message *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your project or inquiry..."
                              rows={6}
                              className="bg-background/50 border-candy-pink/30 focus:border-candy-pink resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* hCaptcha */}
                    <div className="flex justify-center">
                      <HCaptcha
                        sitekey="10000000-ffff-ffff-ffff-000000000001" // Test key - replace with real key in production
                        onVerify={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                        theme="dark"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !captchaToken}
                      className="w-full glow-pink text-lg"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    <p className="text-sm text-center text-muted-foreground">
                      By submitting, you consent to NeonCandy securely storing
                      your message for communication purposes. See our{" "}
                      <a href="/privacy" className="text-candy-pink hover:underline">Privacy Policy</a>{" "}
                      and{" "}
                      <a href="/terms" className="text-candy-pink hover:underline">Terms of Use</a>.
                    </p>
                  </form>
                </Form>
              </Card>

              {/* Additional Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 glass border-candy-cyan/20">
                  <h3 className="text-lg font-bold text-candy-cyan mb-3">
                    Response Time
                  </h3>
                  <p className="text-sm text-foreground/70">
                    We aim to respond to all inquiries within 24-48 hours during
                    business days.
                  </p>
                </Card>

                <Card className="p-6 glass border-candy-violet/20">
                  <h3 className="text-lg font-bold text-candy-violet mb-3">
                    Business Information
                  </h3>
                  <p className="text-sm text-foreground/70">
                    NeonCandy is operated by Global Solutions Management LLC
                    <br />
                    Delaware, United States
                    <br />
                    File Number: 10420698
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
