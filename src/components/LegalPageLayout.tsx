import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

interface LegalPageLayoutProps {
  children: ReactNode;
  title: string;
  lastUpdated: string;
  sections: { id: string; title: string }[];
}

const LegalPageLayout = ({ children, title, lastUpdated, sections }: LegalPageLayoutProps) => (
  <>
    <Helmet>
      <title>{title} | NeonCandy</title>
      <meta name="description" content={`${title} for NeonCandy.`} />
      <link rel="canonical" href={`https://neoncandy.net${typeof window !== "undefined" ? window.location.pathname : ""}`} />
    </Helmet>
    <ContentProtection />
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>
          <div className="glass border-2 border-candy-cyan/20 rounded-lg p-4 mb-8">
            <h3 className="text-sm font-semibold text-candy-cyan mb-3">On This Page</h3>
            <nav className="flex flex-wrap gap-3 text-sm">{sections.map((section) => <a key={section.id} href={`#${section.id}`} className="text-muted-foreground hover:text-candy-pink transition-colors">{section.title}</a>)}</nav>
          </div>
          {children}
          <div className="mt-16 glass border-2 border-candy-pink/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-candy-pink mb-4">Contact Information</h3>
            <p className="text-foreground"><strong>NeonCandy</strong></p>
            <p className="text-muted-foreground text-sm">Operated by Global Solutions Management LLC · Delaware File No. 10420698</p>
            <a href="/contact" className="inline-flex mt-4 px-4 py-2 bg-gradient-to-r from-candy-pink to-candy-violet rounded-lg text-white font-semibold">Contact Us</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
);

export default LegalPageLayout;