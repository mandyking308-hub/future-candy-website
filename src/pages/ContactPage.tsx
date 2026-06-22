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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Briefcase, Film, Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({ name: z.string().min(2).max(100), email: z.string().email().max(255), phone: z.string().optional(), company: z.string().optional(), subject: z.enum(["general", "licensing", "collaboration", "press", "privacy", "other"]), message: z.string().min(10).max(2000), honeypot: z.string().max(0) });
type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), defaultValues: { name: "", email: "", phone: "", company: "", subject: "general", message: "", honeypot: "" } });
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error: fnError } = await supabase.functions.invoke("contact-form", { body: { name: data.name, email: data.email, phone: data.phone || "", company: data.company || "", subject: data.subject, message: data.message, sourcePage: window.location.href } });
      if (fnError) throw fnError;
      toast({ title: "Message Sent!", description: "Thank you for contacting NeonCandy — we'll get back to you soon." });
      form.reset();
    } catch (error) { toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" }); }
    finally { setIsSubmitting(false); }
  };
  return (
    <>
      <Helmet><title>Contact Us | NeonCandy</title><meta name="description" content="Get in touch with NeonCandy for licensing, collaboration, press enquiries, and creative partnerships." /><link rel="canonical" href="https://neoncandy.net/contact" /></Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition"><Navigation /><main className="pt-32 pb-24"><div className="container mx-auto px-4"><div className="max-w-4xl mx-auto"><div className="text-center mb-12"><h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="text-gradient">Get in Touch</span></h1><p className="text-xl text-muted-foreground max-w-2xl mx-auto">Ready to collaborate? Have a question? Fill out the form below and we'll respond within 24-48 hours.</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"><Card className="p-6 glass border-candy-cyan/30"><div className="w-12 h-12 bg-gradient-to-r from-candy-cyan to-candy-violet rounded-lg flex items-center justify-center glow-cyan mb-4"><Music className="w-6 h-6 text-white" /></div><h3 className="text-lg font-bold mb-2 text-candy-cyan">Licensing</h3><p className="text-sm text-foreground/70">Music and visual content licensing for film, brands, and digital experiences</p></Card><Card className="p-6 glass border-candy-pink/30"><div className="w-12 h-12 bg-gradient-to-r from-candy-pink to-candy-violet rounded-lg flex items-center justify-center glow-pink mb-4"><Film className="w-6 h-6 text-white" /></div><h3 className="text-lg font-bold mb-2 text-candy-pink">Collaboration</h3><p className="text-sm text-foreground/70">Partner with us on creative projects, artists, songs, and videos</p></Card><Card className="p-6 glass border-candy-violet/30"><div className="w-12 h-12 bg-gradient-to-r from-candy-violet to-candy-pink rounded-lg flex items-center justify-center glow-violet mb-4"><Briefcase className="w-6 h-6 text-white" /></div><h3 className="text-lg font-bold mb-2 text-candy-violet">Press & Media</h3><p className="text-sm text-foreground/70">Media enquiries, interviews, and press materials</p></Card></div><Card className="p-8 glass border-candy-pink/30"><div className="flex items-center gap-3 mb-6"><Mail className="w-6 h-6 text-candy-pink" /><h2 className="text-2xl font-bold text-gradient">Send Us a Message</h2></div><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"><FormField control={form.control} name="honeypot" render={({ field }) => <FormItem className="hidden"><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>} /><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel className="text-foreground font-semibold">Full Name *</FormLabel><FormControl><Input {...field} placeholder="Your name" className="bg-background/50 border-candy-pink/30" /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel className="text-foreground font-semibold">Email Address *</FormLabel><FormControl><Input {...field} type="email" placeholder="your@email.com" className="bg-background/50 border-candy-pink/30" /></FormControl><FormMessage /></FormItem>} /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField control={form.control} name="phone" render={({ field }) => <FormItem><FormLabel className="text-foreground font-semibold">Phone Number (Optional)</FormLabel><FormControl><Input {...field} type="tel" placeholder="+44 XXX XXX XXXX" className="bg-background/50 border-candy-pink/30" /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="company" render={({ field }) => <FormItem><FormLabel className="text-foreground font-semibold">Company/Organisation (Optional)</FormLabel><FormControl><Input {...field} placeholder="Your company" className="bg-background/50 border-candy-pink/30" /></FormControl><FormMessage /></FormItem>} /></div><FormField control={form.control} name="subject" render={({ field }) => <FormItem><FormLabel className="text-foreground font-semibold">Subject *</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="bg-background/50 border-candy-pink/30"><SelectValue placeholder="Select a subject" /></SelectTrigger></FormControl><SelectContent><SelectItem value="general">General Enquiry</SelectItem><SelectItem value="licensing">Music Licensing</SelectItem><SelectItem value="collaboration">Collaboration</SelectItem><SelectItem value="press">Press & Media</SelectItem><SelectItem value="privacy">Privacy / Data</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>} /><FormField control={form.control} name="message" render={({ field }) => <FormItem><FormLabel className="text-foreground font-semibold">Message *</FormLabel><FormControl><Textarea {...field} placeholder="Tell us about your enquiry..." rows={6} className="bg-background/50 border-candy-pink/30 resize-none" /></FormControl><FormMessage /></FormItem>} /><Button type="submit" size="lg" disabled={isSubmitting} className="w-full glow-pink">{isSubmitting ? "Sending..." : "Send Message"}</Button></form></Form></Card></div></div></main><Footer /></div>
    </>
  );
};

export default ContactPage;