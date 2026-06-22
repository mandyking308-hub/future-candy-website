import LegalPageLayout from "@/components/LegalPageLayout";

const TermsOfUse = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "use", title: "1. Website Use" },
    { id: "ip", title: "2. Intellectual Property" },
    { id: "enquiries", title: "3. Enquiries" },
    { id: "links", title: "4. Third-Party Links" },
    { id: "law", title: "5. Governing Law" },
  ];
  return (
    <LegalPageLayout title="Website Terms of Use" lastUpdated="June 2026" sections={sections}>
      <div className="prose prose-invert max-w-none space-y-8">
        <div id="intro" className="glass p-8 rounded-lg scroll-mt-24"><p className="text-lg mb-4 text-candy-cyan">These Terms of Use apply to the NeonCandy website, public pages, enquiry forms, artist pages, music pages, and related digital materials.</p><p>NeonCandy is operated by Global Solutions Management LLC, a company registered in Delaware, United States, Delaware State File Number 10420698.</p></div>
        <section id="use" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Website Use</h2><p>You may browse the website, view public content, and submit genuine enquiries. You must not misuse the website, attempt unauthorised access, submit false information, or interfere with admin or security functionality.</p></section>
        <section id="ip" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-violet mb-4">2. Intellectual Property</h2><p>Unless stated otherwise, website text, graphics, logos, artist identities, prompts, visual concepts, audio, video, artwork, and related creative assets are owned by NeonCandy, Global Solutions Management LLC, or their licensors. Written permission is required for copying, commercial use, distribution, or adaptation.</p></section>
        <section id="enquiries" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-pink mb-4">3. Enquiries</h2><p>The contact and partner enquiry forms are for genuine business, licensing, collaboration, media, and general enquiries. Submitting a form does not create a contract, partnership, licence, or obligation for NeonCandy to proceed.</p></section>
        <section id="links" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-cyan mb-4">4. Third-Party Links</h2><p>The website may link to third-party platforms, tools, music services, or external content. Those services operate independently and have their own terms and policies.</p></section>
        <section id="law" className="glass p-8 rounded-lg scroll-mt-24"><h2 className="text-2xl font-bold text-candy-pink mb-4">5. Governing Law</h2><p>These terms are governed by the laws of the State of Delaware, United States, unless mandatory local law applies.</p></section>
      </div>
    </LegalPageLayout>
  );
};

export default TermsOfUse;