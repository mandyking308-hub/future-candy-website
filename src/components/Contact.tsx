import { Button } from "@/components/ui/button";
import { Music, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-gradient">Work With NeonCandy</span>
          </h2>
          
          <p className="text-xl text-foreground/80 mb-8">
            We collaborate with brands, filmmakers, designers, and dreamers.
            <br />
            Want your project to sound like tomorrow?
            <br />
            Get in touch through our contact page.
          </p>

          <a href="/contact" className="inline-block mb-12">
            <Button size="lg" className="glow-pink gap-2 text-lg px-8">
              Contact Us
            </Button>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Contact;
