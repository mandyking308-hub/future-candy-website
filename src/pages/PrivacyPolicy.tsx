import LegalPageLayout from "@/components/LegalPageLayout";

const PrivacyPolicy = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "controller", title: "1. Data Controller" },
    { id: "collect", title: "2. Information We Collect" },
    { id: "use", title: "3. How We Use Information" },
    { id: "storage", title: "4. Storage and Security" },
    { id: "rights", title: "5. Your Rights" },
    { id: "contact", title: "6. Contact" },
  ];
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 2026" sections={sections}>
      <div className="prose prose-invert max-w-none space-y-8">
        <div id="intro" className="glass p-8 rounded-lg scroll-mt-24"><p className="text-lg text-candy-cyan mb-4">NeonCandy respects your privacy. This policy explains how we collect and use information submitted through the website, including contact and collaboration enquiry forms.</p></div>
        <section id="controller" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Data Controller</h2><p>NeonCandy is operated by Global Solutions Management LLC, Delaware, United States, File Number 10420698.</p></section>
        <section id="collect" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-violet mb-4">2. Information We Collect</h2><p className="mb-4">We may collect information you provide directly, including:</p><ul className="space-y-2 list-disc list-inside"><li>Name and email address</li><li>Phone number, company or organisation, if provided</li><li>Subject, enquiry type, website or social link, if provided</li><li>Message content and source page</li><li>Basic technical information needed to operate, secure, and improve the website</li></ul></section>
        <section id="use" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-cyan mb-4">3. How We Use Information</h2><p>We use submitted information to review and respond to enquiries, manage collaboration or licensing conversations, maintain internal admin records, improve website operations, and comply with legal or business obligations.</p></section>
        <section id="storage" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-pink mb-4">4. Storage and Security</h2><p>Enquiries submitted through the website are stored in the NeonCandy admin database and can be viewed by authorised admin users. We use reasonable technical and organisational measures to protect submitted information.</p></section>
        <section id="rights" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-violet mb-4">5. Your Rights</h2><p>Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal information. You can contact us through the website contact form to make a request.</p></section>
        <section id="contact" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-pink mb-4">6. Contact</h2><p className="mb-4">For privacy questions or data requests, please use the contact form.</p><a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-candy-pink to-candy-violet rounded-lg text-white font-semibold hover:scale-105 transition-transform">Contact Us</a></section>
      </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;