import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ModernSlavery = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Modern Slavery & Human Trafficking Statement
          </h1>
          <p className="text-muted-foreground mb-12">Financial Year 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">
                This statement is made pursuant to section 54(1) of the Modern Slavery Act 2015 and constitutes FutureCandy's (a subsidiary of HEALTH CHOICES GLOBAL LIMITED) modern slavery and human trafficking statement for the current financial year.
              </p>
            </div>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Our Structure and Business</h2>
              <p>
                FutureCandy is a UK-based music production and licensing company specializing in electronic and synthesized music creation. Our core business involves the provision of creative services, digital content production, and commercial licensing. We operate primarily in the United Kingdom.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Our Supply Chains</h2>
              <p className="mb-4">As a creative service provider, our supply chains are relatively short and specialized. They principally involve:</p>
              <ol className="space-y-2 list-[lower-alpha] list-inside mb-4">
                <li><strong>Digital Content Providers:</strong> Cloud hosting services, software developers, and music distribution platforms.</li>
                <li><strong>Professional Services:</strong> Legal, accounting, and specialized engineering/mixing contractors (individual freelancers).</li>
                <li><strong>Hardware/Equipment:</strong> Manufacturers and retailers of music technology hardware.</li>
              </ol>
              <p>
                Given the nature of our industry, the risk of modern slavery within our direct operational staff is assessed as very low. The highest risk area is associated with the global sourcing of hardware and IT components within our broader group supply chain.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Our Policies on Slavery and Trafficking</h2>
              <p className="mb-4">
                FutureCandy adheres to the policies established by its parent company, HEALTH CHOICES GLOBAL LIMITED, which are designed to ensure that there is no modern slavery or human trafficking in our supply chains or in any part of our business. These policies include:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Whistleblowing Policy:</strong> Encouraging staff to report any concerns regarding unlawful conduct, including slavery and human trafficking, without fear of reprisal.</li>
                <li><strong>Supplier Code of Conduct:</strong> Requiring key suppliers to comply with all applicable laws, including those relating to human rights, labour standards, and modern slavery.</li>
              </ul>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">4. Due Diligence and Risk Assessment</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-candy-pink mb-2">4.1. Contractual Requirements</h3>
                  <p>We incorporate anti-slavery clauses into high-value commercial contracts with suppliers, requiring them to confirm their compliance with the Modern Slavery Act 2015.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-pink mb-2">4.2. Internal Audits</h3>
                  <p>Regular reviews of onboarding procedures for contractors and freelancers to verify identity and right-to-work status.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-pink mb-2">4.3. Parent Company Oversight</h3>
                  <p>We rely on the established robust due diligence framework of HEALTH CHOICES GLOBAL LIMITED for assessment of high-risk international hardware and technology suppliers.</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">5. Training</h2>
              <p>
                Relevant employees, particularly those involved in procurement and supplier management, receive training on recognizing the indicators of modern slavery and understanding their responsibilities under the Act.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">6. Commitment</h2>
              <p className="mb-6">
                FutureCandy is committed to ensuring full transparency in our business and in our approach to tackling modern slavery. We will continue to review and update our procedures annually.
              </p>
              <p className="text-muted-foreground">
                Approved by the Board of Directors of FutureCandy (a subsidiary of HEALTH CHOICES GLOBAL LIMITED).
              </p>
              <p className="text-muted-foreground">Date: October 2025</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ModernSlavery;
