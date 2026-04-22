import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

const Journal = () => {
  const posts = [
    {
      date: "2025-03-15",
      category: "Release",
      title: "New Track: Boom in My Step",
      excerpt: "Velvette's debut single drops today — a sugar rush of pure pop euphoria.",
    },
    {
      date: "2025-03-10",
      category: "Lab Notes",
      title: "Creating Sound Without Limits",
      excerpt: "Behind the scenes: How we craft emotion through synthesis and experimentation.",
    },
    {
      date: "2025-03-01",
      category: "Announcement",
      title: "Welcome to the Drop Room",
      excerpt: "Your portal into NeonCandy's creative universe — no social media required.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>The Drop Room - Journal | NeonCandy</title>
        <meta name="description" content="Announcements, creative statements, and notes from the NeonCandy universe. Your direct line to digital-first AI pop." />
        <link rel="canonical" href="https://neoncandy.online/journal" />
      </Helmet>
      <ContentProtection />
      <div className="min-h-screen page-transition">
        <Navigation />
      
      <section className="pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-center mb-6">
              <span className="text-gradient">The Drop Room</span>
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Announcements, creative statements, and notes from the lab.
              <br />
              Your direct line to the NeonCandy universe.
            </p>

            <div className="space-y-8">
              {posts.map((post, index) => (
                <Card
                  key={index}
                  className="p-8 glass border-candy-pink/30 hover:border-candy-pink/50 transition-all cursor-pointer interactive-glow animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-candy text-white">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 text-gradient">
                    {post.title}
                  </h2>
                  <p className="text-lg text-foreground/80">
                    {post.excerpt}
                  </p>
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
