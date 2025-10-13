import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CandyClub = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to the Candy Club!",
      description: "You'll receive exclusive previews and drops soon.",
    });
    setEmail("");
  };

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 glass border-candy-violet/30 glow-violet">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-candy rounded-full mb-6 glow-pink">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Join the Candy Club</span>
            </h2>
            <p className="text-xl text-foreground/80">
              Receive exclusive previews, drops, and limited releases.
              <br />
              Stay connected off-grid.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-background/50 border-candy-pink/30 focus:border-candy-pink"
            />
            <Button type="submit" size="lg" className="glow-pink">
              Join Now
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default CandyClub;
