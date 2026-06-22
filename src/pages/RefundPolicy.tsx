import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Refund & Cancellation Policy</h1>
          <p className="text-muted-foreground mb-12">Last Updated: June 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">This policy applies to paid FutureCandy creative services, licensing work, production work, or bespoke digital deliverables agreed directly with Global Solutions Management LLC.</p>
            </div>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Written Agreement</h2>
              <p>Paid work should be covered by a written agreement, order form, invoice, or licence that explains scope, fees, delivery dates, and usage rights.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Project Changes</h2>
              <p>If a project changes or is cancelled, the position will be handled according to the written agreement for that project and the amount of work already completed.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Digital Deliverables</h2>
              <p>Digital files, creative previews, exports, and downloadable materials are handled according to the relevant written agreement or licence.</p>
            </section>
            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">4. Questions</h2>
              <p>For questions about a specific project, invoice, or licence, please contact FutureCandy through the contact page.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;