import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-12">Last Updated: October 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="glass p-8 rounded-lg">
              <p className="text-lg">
                FutureCandy — Sweet Beats. Synthetic Dreams ("FutureCandy," "we," "us") is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, process, and disclose your information when you visit our website, inquire about our services, or engage with us professionally.
              </p>
            </div>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Data Controller</h2>
              <p className="mb-2">FutureCandy is the Data Controller responsible for your personal data.</p>
              <p><strong>Registered Office:</strong> 128 City Road, London, United Kingdom, EC1V 2NX.</p>
            </section>

            <section className="glass p-8 rounded-lg">
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

            <section className="glass p-8 rounded-lg">
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

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">4. Disclosure of Your Information</h2>
              <p className="mb-4">We may share your personal data with the following parties:</p>
              <ul className="space-y-3 list-none">
                <li><strong className="text-candy-pink">4.1. Affiliates:</strong> With HEALTH CHOICES GLOBAL LIMITED (our parent company) and other related entities for internal administrative purposes.</li>
                <li><strong className="text-candy-pink">4.2. Service Providers:</strong> Third-party vendors who perform functions on our behalf (e.g., cloud hosting, IT support, payment processing, professional accounting/legal services).</li>
                <li><strong className="text-candy-pink">4.3. Legal Requirements:</strong> When required by law, court order, or governmental regulation.</li>
                <li><strong className="text-candy-pink">4.4. Music Industry Partners:</strong> Where necessary for the scope of the project (e.g., sharing contact information with mixing engineers, mastering houses, or collection societies).</li>
              </ul>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">5. Data Security</h2>
              <p>
                We have implemented technical and organizational measures designed to secure your personal data from accidental loss and unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of your data transmitted to our Website.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-cyan mb-4">6. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary to fulfil the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-violet mb-4">7. Your Rights (GDPR)</h2>
              <p className="mb-4">As a UK-based company, we adhere to GDPR regulations, granting you the following rights regarding your personal data:</p>
              <ul className="space-y-2 list-none">
                <li><strong className="text-candy-pink">a. Right to Access:</strong> The right to request copies of your personal data.</li>
                <li><strong className="text-candy-pink">b. Right to Rectification:</strong> The right to request that we correct any information you believe is inaccurate.</li>
                <li><strong className="text-candy-pink">c. Right to Erasure (Right to be Forgotten):</strong> The right to request that we erase your personal data, under certain conditions.</li>
                <li><strong className="text-candy-pink">d. Right to Restrict Processing:</strong> The right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong className="text-candy-pink">e. Right to Object to Processing:</strong> The right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong className="text-candy-pink">f. Right to Data Portability:</strong> The right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
              <p className="mt-4">To exercise any of these rights, please contact us using the details below.</p>
            </section>

            <section className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-candy-pink mb-4">8. Contact Information</h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy, our data practices, or if you wish to exercise your rights, please contact us at:
              </p>
              <p className="mb-4"><strong>Email:</strong> privacy@futurecandy.studio</p>
              <p>
                You also have the right to lodge a complaint with the UK supervisory authority, the Information Commissioner's Office (ICO), if you believe your data has been processed unlawfully.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
