import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ModernSlavery = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Modern Slavery & Human Trafficking Statement</h1>
          <p className="text-muted-foreground mb-12">Financial Year 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">This statement is made on behalf of FutureCandy, operated by Global Solutions Management LLC, registered in Delaware, United States, File Number 10420698.</p>
            </div>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Our Business</h2>
              <p>FutureCandy is a digital-first AI pop studio. Our work includes music production, digital content, artist worlds, visual music, and creative licensing.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Supply Chains</h2>
              <p>Our direct supply chain is mainly digital and professional services, including hosting, software, creative tools, contractors, and advisers.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Commitment</h2>
              <p>FutureCandy is committed to ethical working practices and expects suppliers and partners to comply with applicable laws on labour standards, human rights, and modern slavery.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">4. Review</h2>
              <p>We will review this statement as the business, supplier base, and commercial activity expand.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ModernSlavery;