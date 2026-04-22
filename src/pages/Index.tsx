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
import ContentProtection from "@/components/ContentProtection";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>NeonCandy | Sweet Beats. Synthetic Dreams. AI Pop for the Future.</title>
        <meta name="description" content="NeonCandy is the next evolution of pop — digital-first, multilingual, and powered by AI." />
        <link rel="canonical" href="https://futurecandy.lovable.app/" />
      </Helmet>
      <ContentProtection />
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
    </>
  );
};

export default Index;
