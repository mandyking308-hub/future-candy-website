import { ReactNode, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

interface LegalPageLayoutProps {
  children: ReactNode;
  title: string;
  lastUpdated: string;
  sections: { id: string; title: string }[];
}

const LegalPageLayout = ({ children, title, lastUpdated, sections }: LegalPageLayoutProps) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Update active section based on scroll position
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const currentSection = sectionElements.find((el, index) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{title} | FutureCandy</title>
        <meta name="description" content={`${title} for FutureCandy - The next evolution of pop, digital-first and AI-powered.`} />
        <link rel="canonical" href={`https://futurecandy.lovable.app${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
      </Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition">
        <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="glass border-2 border-candy-cyan/20 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-semibold text-candy-cyan mb-3">
                    On This Page
                  </h3>
                  <ScrollArea className="h-auto max-h-[60vh]">
                    <nav className="space-y-2">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left text-sm py-2 px-3 rounded transition-all ${
                            activeSection === section.id
                              ? "bg-candy-pink/20 text-candy-pink font-semibold"
                              : "text-muted-foreground hover:text-candy-cyan hover:bg-candy-cyan/10"
                          }`}
                        >
                          {section.title}
                        </button>
                      ))}
                    </nav>
                  </ScrollArea>
                </div>

                {/* Quick Links */}
                <div className="glass border-2 border-candy-violet/20 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-candy-violet mb-3">
                    Legal Documents
                  </h3>
                  <nav className="space-y-2 text-sm">
                    <a href="/terms" className="block text-muted-foreground hover:text-candy-pink transition-colors">
                      Terms of Use
                    </a>
                    <a href="/privacy" className="block text-muted-foreground hover:text-candy-pink transition-colors">
                      Privacy Policy
                    </a>
                    <a href="/digital-licensing" className="block text-muted-foreground hover:text-candy-pink transition-colors">
                      Digital Licensing
                    </a>
                    <a href="/refund-policy" className="block text-muted-foreground hover:text-candy-pink transition-colors">
                      Refund Policy
                    </a>
                    <a href="/cookies" className="block text-muted-foreground hover:text-candy-pink transition-colors">
                      Cookies Policy
                    </a>
                    <a href="/modern-slavery" className="block text-muted-foreground hover:text-candy-pink transition-colors">
                      Modern Slavery Statement
                    </a>
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                    {title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Last Updated: {lastUpdated}
                  </p>
                </div>
                
                <div className="glass border border-candy-cyan/30 rounded-lg px-4 py-2">
                  <p className="text-xs text-candy-cyan font-semibold">
                    FutureCandy — Sweet Beats. Synthetic Dreams
                  </p>
                  <p className="text-xs text-muted-foreground">
                    A subsidiary of HEALTH CHOICES GLOBAL LIMITED
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Company No. 10941962
                  </p>
                </div>
              </div>

              {children}

              {/* Contact Information */}
              <div className="mt-16 glass border-2 border-candy-pink/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-candy-pink mb-4">
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground">
                    <strong>FutureCandy — Sweet Beats. Synthetic Dreams</strong>
                  </p>
                  <p className="text-muted-foreground">
                    A subsidiary of HEALTH CHOICES GLOBAL LIMITED
                  </p>
                  <p className="text-muted-foreground">
                    Company No. 10941962
                  </p>
                  <p className="text-muted-foreground">
                    Registered Office: 128 City Road, London, EC1V 2NX
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <a href="mailto:hello@futurecandy.online" className="text-candy-cyan hover:underline">
                      hello@futurecandy.online
                    </a>
                    <a href="mailto:privacy@futurecandy.online" className="text-candy-cyan hover:underline">
                      privacy@futurecandy.online
                    </a>
                    <a href="mailto:licensing@futurecandy.online" className="text-candy-cyan hover:underline">
                      licensing@futurecandy.online
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full w-12 h-12 p-0 bg-gradient-to-r from-candy-pink to-candy-violet shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-110 transition-transform animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
      </div>
    </>
  );
};

export default LegalPageLayout;
