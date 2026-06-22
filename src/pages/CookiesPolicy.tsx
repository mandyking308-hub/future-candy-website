import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Cookies Policy</h1>
          <p className="text-muted-foreground mb-12">Last Updated: June 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">This Cookies Policy explains how FutureCandy uses cookies and similar technologies on the website.</p>
            </div>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. What Cookies Are</h2>
              <p>Cookies are small files placed on your device to help websites work, remember preferences, and understand site usage.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. How We Use Cookies</h2>
              <p>FutureCandy may use essential cookies for website functionality and optional cookies for analytics or future marketing only where enabled and accepted.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Managing Cookies</h2>
              <p>You can accept, reject, or manage non-essential cookies through the cookie banner. You can also control cookies through your browser settings.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">4. Contact</h2>
              <p>For questions about cookies, please use the FutureCandy contact form.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPolicy;