import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

const CandyClub = () => {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 glass border-candy-violet/30 glow-violet">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-candy rounded-full mb-6 glow-pink"><Mail className="w-10 h-10 text-white" /></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-gradient">Join the Candy Club</span></h2>
            <p className="text-xl text-foreground/80">Want updates, previews, or collaboration access?<br />Use the contact page so every enquiry is stored properly in admin.</p>
          </div>
          <div className="flex justify-center"><a href="/contact"><Button size="lg" className="glow-pink">Contact NeonCandy</Button></a></div>
        </Card>
      </div>
    </section>
  );
};

export default CandyClub;