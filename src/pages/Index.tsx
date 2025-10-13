import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Artists from "@/components/Artists";
import Visuals from "@/components/Visuals";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NowPlaying from "@/components/NowPlaying";
import CandyClub from "@/components/CandyClub";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      <Hero />
      <About />
      <Artists />
      <Visuals />
      <CandyClub />
      <Contact />
      <Footer />
      <NowPlaying />
      <CookieConsent />
    </div>
  );
};

export default Index;
