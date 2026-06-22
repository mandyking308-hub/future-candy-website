import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import GlobalDistribution from "@/components/CurrentRelease";
import About from "@/components/About";
import Artists from "@/components/Artists";
import Visuals from "@/components/Visuals";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NowPlaying from "@/components/NowPlaying";
import CandyClub from "@/components/CandyClub";
import CookieConsent from "@/components/CookieConsent";

import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>FutureCandy | AI Pop for the Future</title>
        <meta name="description" content="FutureCandy is a digital-first AI pop studio creating synthetic artists, visual music drops, and future-facing pop content." />
        <link rel="canonical" href="https://futurecandy.online/" />
      </Helmet>
      <div className="min-h-screen page-transition">
        <Navigation />
        <Hero />
        <GlobalDistribution />
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