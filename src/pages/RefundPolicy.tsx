import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Production Services Refund & Cancellation Policy
          </h1>
          <p className="text-muted-foreground mb-12">Last Updated: October 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">
                This policy applies specifically to bespoke music production, mixing, mastering, or consultation services ("Services") contracted directly with NeonCandy.
              </p>
            </div>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Service Agreements and Deposits</h2>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">1.1. Contract Required</h3>
              <p className="mb-4">
                All contracted Services will be governed by a separate, formal Production Agreement or Statement of Work (SOW) which will detail project scope, timelines, fees, intellectual property assignment, and delivery specifications.
              </p>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">1.2. Non-Refundable Deposit</h3>
              <p>
                A non-refundable deposit (typically 50% of the total fee) is required to secure booking and commence work. This deposit covers initial administrative costs, scheduling, and preparatory work, and is retained by NeonCandy upon cancellation by the Client.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Client Cancellation</h2>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">2.1. Cancellation Before Commencement</h3>
              <p className="mb-4">
                If the Client cancels the Services contract after the deposit has been paid but before NeonCandy has commenced significant creative or technical work (as defined in the SOW, e.g., before recording sessions, or before substantial mixing has begun), NeonCandy retains the full non-refundable deposit. No further fees will be charged.
              </p>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">2.2. Cancellation After Commencement</h3>
              <p className="mb-2">If the Client cancels the contract after significant creative or technical work has commenced:</p>
              <ol className="space-y-2 list-[lower-alpha] list-inside">
                <li>The full non-refundable deposit is retained.</li>
                <li>The Client will be liable for payment for all hours worked and costs incurred (e.g., third-party contractor fees, studio hire) up to the point of cancellation, even if this exceeds the deposit amount, as specified in the SOW.</li>
              </ol>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. NeonCandy Cancellation</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.1.</h3>
                  <p>If NeonCandy is forced to cancel the contracted Services (e.g., due to unforeseen technical failure or personnel inability), we will provide a full refund of all amounts paid, including the initial deposit.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.2.</h3>
                  <p>NeonCandy's liability is limited strictly to the fees paid for the specific Services cancelled and shall not include any compensation for consequential losses, lost opportunities, or fees paid to third parties by the Client.</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">4. Refund Policy (Completion of Services)</h2>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">4.1. Creative Satisfaction</h3>
              <p className="mb-4">
                Services delivered by NeonCandy are subjective and creative in nature. The formal Production Agreement will stipulate a maximum number of revision rounds included in the fee (e.g., two revision rounds for mixing).
              </p>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">4.2. No Refunds Based on Subjective Disagreement</h3>
              <p className="mb-4">
                NeonCandy does not provide refunds solely based on the Client's subjective dissatisfaction with the final creative outcome, provided that the work substantially meets the technical specifications and brief outlined in the SOW.
              </p>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">4.3. Technical Failure</h3>
              <p>
                If the delivered master or product contains verified technical flaws (e.g., clipping, incorrect format) that violate the SOW, NeonCandy will promptly correct the flaws at no additional cost. If correction is impossible, a proportional refund related to the unusable portion of the service may be issued.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">5. Failure to Pay</h2>
              <p>
                NeonCandy reserves the right to withhold all delivered audio files, masters, stems, and intellectual property transfers until the total outstanding balance for the Services has been paid in full. Failure to pay within 30 days of invoice issuance constitutes a material breach of contract.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
