import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const DigitalLicensing = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Digital Product Licensing & Usage Policy
          </h1>
          <p className="text-muted-foreground mb-12">Last Updated: October 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">
                This Licensing Policy applies to all digital products, including but not limited to sound libraries, sample packs, loops, MIDI files, and synthesizer presets (collectively, "Products"), purchased or downloaded from FutureCandy.
              </p>
            </div>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Grant of License</h2>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">1.1. Nature of License</h3>
              <p className="mb-4">
                Upon purchasing or legally downloading a Product, FutureCandy grants you a worldwide, perpetual, non-exclusive, non-transferable license to use the sounds and musical compositions contained within the Products, subject to the restrictions below.
              </p>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">1.2. Royalty-Free (Standard Usage)</h3>
              <p>
                Unless otherwise explicitly stated (e.g., in the case of specific premium kits), all standard Products are 100% Royalty-Free for use in your original musical compositions. This means you do not owe FutureCandy any additional royalties or performance fees for commercial exploitation of a composition incorporating the sounds.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Permitted Usage</h2>
              <p className="mb-4">You are permitted to use the Products for:</p>
              <ol className="space-y-2 list-[lower-alpha] list-inside">
                <li>Incorporation into new, original musical compositions and sound recordings.</li>
                <li>Use in film, television, radio broadcasts, video games, advertisements, and other commercial multimedia projects.</li>
                <li>Public performance, broadcast, or streaming of musical compositions incorporating the Products.</li>
              </ol>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Restrictions (Prohibited Usage)</h2>
              <p className="mb-4">You may not do the following:</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.1. Resale or Redistribution</h3>
                  <p>You may not sell, trade, loan, give away, rent, assign, or otherwise transfer the Products or the rights to use the Products to any third party.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.2. Derivative Libraries</h3>
                  <p>You may not use the Products to create a competing sound library, sample pack, virtual instrument, or any other commercial product that directly repackages or re-licenses the individual sounds.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.3. Standalone Use</h3>
                  <p>Individual sounds, samples, or loops may not be resold or distributed in isolation or stand-alone form. They must be incorporated into a new musical work.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.4. Misrepresentation</h3>
                  <p>You may not claim authorship or ownership of the individual sounds or samples within the Products.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-candy-cyan mb-2">3.5. Content ID Registration</h3>
                  <p>You are strictly prohibited from registering any musical work incorporating the Products with any Content Identification system (e.g., YouTube Content ID, Audible Magic) unless the incorporated Product has been heavily processed, layered, and forms only a minor part of a larger composition. Registration of individual loops or samples is explicitly forbidden.</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">4. Premium Samples/Kits (Specific Clearance)</h2>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">4.1. Clearance Required</h3>
              <p className="mb-4">
                If a Product description explicitly states that the samples are not standard royalty-free (e.g., "Requires Clearance for Major Label Use," or "Contains Compositions Subject to Publishing Splits"), you must contact FutureCandy for explicit clearance and negotiation of publishing and mechanical royalties if your composition achieves a major commercial release (e.g., placement on a major label, or exceeding a specified stream/sales threshold).
              </p>
              
              <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">4.2. Default Split (If Applicable)</h3>
              <p>
                In cases where clearance is required, the default publishing split shall be 50% of the Publishing and 50% of the Master Royalty of the composition attributable to the use of the Product, unless otherwise negotiated in writing.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">5. Termination</h2>
              <p>
                FutureCandy reserves the right to terminate this License if you violate any of the terms outlined herein. Upon termination, you must immediately cease all use of the Products and destroy all copies, digital or otherwise.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">6. No Refunds for Digital Goods</h2>
              <p>
                Due to the nature of digital goods, which cannot be physically returned, all sales are final. We do not offer refunds, exchanges, or credits once a Product has been downloaded, unless the file is proven to be corrupted or technically non-functional.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DigitalLicensing;
