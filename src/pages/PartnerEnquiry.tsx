import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const PartnerEnquiry = () => {
  return (
    <>
      <Helmet>
        <title>Partner Enquiry | FutureCandy</title>
        <meta name="description" content="Contact FutureCandy for project enquiries." />
      </Helmet>
      <div className="min-h-screen page-transition">
        <Navigation />
        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4"><span className="text-gradient">FutureCandy Enquiries</span></h1>
              <p className="text-lg text-muted-foreground mb-10">Use the live contact form for partnership, media, and licensing messages.</p>
              <a href="/contact"><Button size="lg" className="glow-pink">Open Contact Form</Button></a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PartnerEnquiry;