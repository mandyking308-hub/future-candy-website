import LegalPageLayout from "@/components/LegalPageLayout";

const PrivacyPolicy = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "data-controller", title: "1. Data Controller" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "how-we-use", title: "3. How We Use Your Information" },
    { id: "disclosure", title: "4. Disclosure of Information" },
    { id: "data-security", title: "5. Data Security" },
    { id: "data-retention", title: "6. Data Retention" },
    { id: "your-rights", title: "7. Your GDPR Rights" },
    { id: "contact", title: "8. Contact Information" },
  ];

  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="October 2025"
      sections={sections}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PrivacyPolicy",
          "name": "Privacy Policy - NeonCandy",
          "description": "GDPR-compliant Privacy Policy for NeonCandy, detailing how we collect, use, and protect your personal data.",
          "publisher": {
            "@type": "Organization",
            "name": "NeonCandy",
            "url": "https://futurecandy.online"
          }
        })}
      </script>

      <div className="prose prose-invert max-w-none space-y-8">
        <div id="intro" className="glass p-8 rounded-lg scroll-mt-24">
          <p className="text-lg text-candy-cyan mb-4">
            NeonCandy is committed to protecting your privacy. This Privacy Policy describes how we collect, use, process, and disclose your information in compliance with GDPR regulations when you visit our website or engage with our services.
          </p>
        </div>

        <section id="data-controller" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Data Controller</h2>
          <p className="mb-2">NeonCandy, operated by Global Solutions Management LLC, is the Data Controller responsible for your personal data.</p>
          <p><strong>Registered Jurisdiction:</strong> Delaware, United States — Delaware State File Number: 10420698.</p>
        </section>

        <section id="information-collected" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Information We Collect</h2>
          <p className="mb-4">We collect several types of information from and about users of our Website and Services:</p>
          
          <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">A. Information You Provide to Us:</h3>
          <ul className="space-y-2 list-disc list-inside mb-6">
            <li><strong>Contact Data:</strong> Name, email address, telephone number, and postal address, primarily collected when you contact us via email or submission forms regarding production inquiries, job applications, or licensing requests.</li>
            <li><strong>Financial Data:</strong> Payment information (e.g., bank details, credit card information) required to process payments for Services, which is processed securely by third-party payment processors.</li>
          </ul>

          <h3 className="text-xl font-semibold text-candy-pink mt-6 mb-3">B. Information Collected Automatically:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Usage Data:</strong> Details of your visits to our Website (e.g., traffic data, logs, accessing times).</li>
            <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type and version, operating system, device type, time zone setting, and location.</li>
            <li><strong>Tracking Technologies (Cookies):</strong> We use cookies and similar technologies to enhance user experience and analyze website traffic.</li>
          </ul>
        </section>

        <section id="how-we-use" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">3. How We Use Your Information (Legal Basis)</h2>
          <p className="mb-4">We process your data based on the following legal grounds:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-candy-pink">Purpose of Processing</th>
                  <th className="text-left py-3 px-4 text-candy-cyan">Legal Basis (GDPR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3 px-4">To provide and manage the Services (e.g., delivering finalized tracks, responding to production briefs).</td>
                  <td className="py-3 px-4">Necessary for the performance of a contract with you.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">To respond to your inquiries and manage customer support.</td>
                  <td className="py-3 px-4">Our legitimate interests (managing our business effectively).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">To process payments for Services rendered.</td>
                  <td className="py-3 px-4">Necessary for the performance of a contract and legal obligation (tax/accounting).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">To analyze website performance and improve user experience.</td>
                  <td className="py-3 px-4">Your consent (for non-essential cookies) and/or legitimate interests (improving our service).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">To send marketing communications (if consented to).</td>
                  <td className="py-3 px-4">Your explicit consent.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="disclosure" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">4. Disclosure of Your Information</h2>
          <p className="mb-4">We may share your personal data with the following parties:</p>
          <ul className="space-y-3 list-none">
            <li><strong className="text-candy-pink">4.1. Operating Entity & Affiliates:</strong> Within Global Solutions Management LLC (our operating entity, registered in Delaware, USA) and other related entities for internal administrative purposes.</li>
            <li><strong className="text-candy-pink">4.2. Service Providers:</strong> Third-party vendors who perform functions on our behalf (e.g., cloud hosting, IT support, payment processing, professional accounting/legal services).</li>
            <li><strong className="text-candy-pink">4.3. Legal Requirements:</strong> When required by law, court order, or governmental regulation.</li>
            <li><strong className="text-candy-pink">4.4. Music Industry Partners:</strong> Where necessary for the scope of the project (e.g., sharing contact information with mixing engineers, mastering houses, or collection societies).</li>
            <li><strong className="text-candy-pink">4.5. International Data Transfers:</strong> For global distribution and royalty management, NeonCandy may share limited metadata (track titles, artist identifiers, rights information) with international streaming and licensing platforms. All transfers comply with applicable data protection frameworks, including the EU-US Data Privacy Framework and EU Standard Contractual Clauses where relevant.</li>
          </ul>
        </section>

        <section id="data-security" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-pink mb-4">5. Data Security</h2>
          <p>
            We have implemented technical and organizational measures designed to secure your personal data from accidental loss and unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of your data transmitted to our Website.
          </p>
        </section>

        <section id="data-retention" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">6. Data Retention</h2>
          <p>
            We retain personal data only for as long as necessary to fulfil the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section id="your-rights" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">7. Your Rights (GDPR)</h2>
          <p className="mb-4">As a US-registered company serving a global audience, we adhere to applicable data protection regulations (including GDPR for EU users), granting you the following rights regarding your personal data:</p>
          <ul className="space-y-2 list-none">
            <li><strong className="text-candy-pink">a. Right to Access:</strong> The right to request copies of your personal data.</li>
            <li><strong className="text-candy-pink">b. Right to Rectification:</strong> The right to request that we correct any information you believe is inaccurate.</li>
            <li><strong className="text-candy-pink">c. Right to Erasure (Right to be Forgotten):</strong> The right to request that we erase your personal data, under certain conditions.</li>
            <li><strong className="text-candy-pink">d. Right to Restrict Processing:</strong> The right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong className="text-candy-pink">e. Right to Object to Processing:</strong> The right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong className="text-candy-pink">f. Right to Data Portability:</strong> The right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p className="mt-4">To exercise any of these rights, please contact us using the details in the Contact Information section.</p>
        </section>

        <section id="contact" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-pink mb-4">8. Contact Information</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy, our data practices, or if you wish to exercise your rights, please use our contact form:
          </p>
          <p className="mb-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-candy-pink to-candy-violet rounded-lg text-white font-semibold hover:scale-105 transition-transform">
              Contact Us
            </a>
          </p>
          <p>
            You also have the right to lodge a complaint with the UK supervisory authority, the Information Commissioner's Office (ICO), if you believe your data has been processed unlawfully.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
