import LegalPageLayout from "@/components/LegalPageLayout";

const MultilingualRights = () => {
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "versions", title: "1. Language Versions" },
    { id: "ownership", title: "2. Ownership" },
    { id: "requests", title: "3. Requests" },
  ];

  return (
    <LegalPageLayout title="Multilingual and International Rights Addendum" lastUpdated="June 2026" sections={sections}>
      <div className="prose prose-invert max-w-none space-y-8">
        <div id="intro" className="glass p-8 rounded-lg scroll-mt-24">
          <p className="text-lg mb-4 text-candy-cyan">This addendum explains FutureCandy's approach to future multilingual productions, international versions, and regional licensing conversations.</p>
        </div>
        <section id="versions" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-cyan mb-4">1. Language Versions</h2>
          <p>FutureCandy may create language-specific or region-specific versions of songs, lyrics, visuals, or promotional materials where appropriate.</p>
        </section>
        <section id="ownership" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-violet mb-4">2. Ownership</h2>
          <p>Unless separately agreed in writing, multilingual versions, translated lyrics, adapted visual assets, metadata, artwork, and related materials remain owned or controlled by FutureCandy, Global Solutions Management LLC, or their licensors.</p>
        </section>
        <section id="requests" className="glass p-8 rounded-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-candy-pink mb-4">3. Requests</h2>
          <p>Requests for regional, language-specific, or international licensing should be submitted through the live enquiry system so they are stored in the admin dashboard.</p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default MultilingualRights;