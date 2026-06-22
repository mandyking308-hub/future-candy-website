import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

const Journal = () => {
  const posts = [
    { date: "2026-06-22", category: "Studio", title: "FutureCandy Opens the Studio", excerpt: "A digital-first pop studio for AI artists, songs, videos, and visual worlds." },
    { date: "2026-06-22", category: "Artist", title: "Velvette and ByteBaby", excerpt: "Two artist lanes, two visual identities, one fast-moving production engine." },
    { date: "2026-06-22", category: "System", title: "Built to Publish", excerpt: "FutureCandy is structured around real releases, real enquiries, and admin-controlled content." },
  ];

  return (
    <>
      <Helmet>
        <title>The Drop Room - Journal | FutureCandy</title>
        <meta name="description" content="Announcements, creative notes, and studio updates from FutureCandy." />
        <link rel="canonical" href="https://futurecandy.online/journal" />
      </Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition">
        <Navigation />
        <section className="pt-32 pb-24 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold text-center mb-6"><span className="text-gradient">The Drop Room</span></h1>
              <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Announcements, creative statements, and notes from the FutureCandy studio.</p>
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <Card key={index} className="p-8 glass border-candy-pink/30 hover:border-candy-pink/50 transition-all animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-candy text-white">{post.category}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3 text-gradient">{post.title}</h2>
                    <p className="text-lg text-foreground/80">{post.excerpt}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Journal;