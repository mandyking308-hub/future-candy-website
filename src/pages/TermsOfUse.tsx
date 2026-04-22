import LegalPageLayout from "@/components/LegalPageLayout";

const TermsOfUse = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "definitions", title: "1. Definitions" },
    { id: "ip-rights", title: "2. Intellectual Property" },
    { id: "user-conduct", title: "3. User Conduct" },
    { id: "third-party", title: "4. Third-Party Links" },
    { id: "warranties", title: "5. Warranties" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "indemnification", title: "7. Indemnification" },
    { id: "governing-law", title: "8. Governing Law" },
    { id: "changes", title: "9. Changes to Terms" },
  ];

  return (
    <LegalPageLayout
      title="Website Terms of Use"
      lastUpdated="October 2025"
      sections={sections}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Use - NeonCandy",
          "description": "Website Terms of Use for NeonCandy, governing use of our website and services.",
          "publisher": {
            "@type": "Organization",
            "name": "NeonCandy",
            "url": "https://futurecandy.online"
          }
        })}
      </script>

      <div className="prose prose-invert max-w-none space-y-8">
        <div id="intro" className="glass p-8 rounded-lg scroll-mt-24">
          <p className="text-lg mb-4 text-candy-cyan">
            These Terms of Use govern your access to and use of the NeonCandy website and services. By using our platform, you agree to be bound by these terms. Please read them carefully before proceeding.
          </p>
          <p className="mb-4">
            NeonCandy is a digital music label operated by Global Solutions Management LLC ("we," "us," or "our"), a company registered in Delaware, United States (Delaware State File Number: 10420698).
          </p>
          <p>
            By accessing or using our website and services, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, you must not use our website.
          </p>
        </div>

        <section id="definitions" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Definitions</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Website:</strong> Refers to the internet properties of NeonCandy.</li>
            <li><strong>Services:</strong> Includes, but is not limited to, music production, licensing, mixing, mastering, consultation, and the provision of digital content (e.g., sound kits, samples).</li>
            <li><strong>User/You:</strong> Any person or entity accessing or using the Website or Services.</li>
          </ul>
        </section>

        <section id="ip-rights" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Intellectual Property Rights</h2>
          <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">2.1. Ownership</h3>
          <p className="mb-4">
            All content on the Website, including text, graphics, logos, sounds (unless explicitly offered for license), musical works, software, and compilation of the foregoing, is the exclusive property of NeonCandy or its licensors and is protected by United States and international copyright laws.
          </p>
          
          <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">2.2. Limited License</h3>
          <p className="mb-4">
            We grant you a limited, non-exclusive, non-transferable right to access and use the Website solely for your personal, non-commercial use, or to inquire about our commercial Services.
          </p>
          
          <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">2.3. Unauthorized Use</h3>
          <p className="mb-4">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the content on our Website without explicit written consent from NeonCandy.
          </p>
          
          <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">2.4. Multilingual Works</h3>
          <p>
            NeonCandy may create, reproduce, and distribute alternative-language versions of any musical work using AI voice and lyric models. Each language version constitutes a distinct master recording owned exclusively by NeonCandy while sharing the same underlying composition rights.
          </p>
        </section>

        <section id="user-conduct" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">3. User Conduct</h2>
          <p className="mb-4">You agree not to use the Website or Services to:</p>
          <ol className="space-y-2 list-[lower-alpha] list-inside">
            <li>Post or transmit any unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable material.</li>
            <li>Engage in any activity that could disable, overburden, damage, or impair the site.</li>
            <li>Attempt to gain unauthorized access to any portion of the Website, other accounts, computer systems, or networks connected to NeonCandy.</li>
            <li>Use any automated means (e.g., bots, spiders) to access the Website unless specifically permitted.</li>
          </ol>
        </section>

        <section id="third-party" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">4. Third-Party Links</h2>
          <p>
            The Website may contain links to third-party websites or resources. These links are provided solely as a convenience. NeonCandy has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </section>

        <section id="warranties" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-pink mb-4">5. Disclaimer of Warranties</h2>
          <p>
            The Website and Services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. NeonCandy disclaims all warranties, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Website will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section id="liability" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">6. Limitation of Liability</h2>
          <p>
            In no event shall NeonCandy, its operating entity Global Solutions Management LLC, its affiliates, directors, employees, or agents be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Website or Services, including any direct, indirect, special, incidental, consequential, or punitive damages.
          </p>
        </section>

        <section id="indemnification" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">7. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless NeonCandy, its operating entity Global Solutions Management LLC, its affiliates, and their respective directors, officers, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the Services.
          </p>
        </section>

        <section id="governing-law" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-pink mb-4">8. Governing Law and Jurisdiction</h2>
          <p>
            These Terms of Use and any dispute or claim arising out of them shall be governed by and construed in accordance with the laws of the State of Delaware, United States. You agree that the courts of the State of Delaware shall have exclusive jurisdiction to settle any dispute or claim that arises out of or in connection with these terms.
          </p>
        </section>

        <section id="changes" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">9. Changes to Terms</h2>
          <p>
            NeonCandy reserves the right to revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Website following the posting of revised Terms means that you accept and agree to the changes.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default TermsOfUse;
