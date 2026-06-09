"use client";
import HeroSection from "./components/HeroSection";
import ServicesPage from "./services/page";
import NetworkPage from "./network/NetworkClient";
import IndustryPage from "./industry/page";
import AboutPage from "./about/page";
import ReviewPage from "./review/page";
import FAQPage from "./faq/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] relative overflow-x-hidden text-[var(--foreground)] [&_h1]:font-satoshi [&_h2]:font-satoshi [&_h3]:font-satoshi [&_h4]:font-satoshi [&_h5]:font-satoshi [&_h6]:font-satoshi">


      <div id="home" className="w-full">
        <HeroSection />
      </div>

      <div id="services" className="w-full relative z-10">
        <ServicesPage isEmbedded={true} />
      </div>

      <div id="network" className="w-full relative z-10">
        <NetworkPage />
      </div>

      <div id="industry" className="w-full relative z-10">
        <IndustryPage isEmbedded={true} />
      </div>

      <div id="about" className="w-full relative z-10">
        <AboutPage isEmbedded={true} />
      </div>

      {/* { <div id="section-review" className="w-full relative z-10">
        <ReviewPage />
      </div> } */}

      { <div id="faq" className="w-full relative z-10">
        <FAQPage isEmbedded={true} />
      </div> }

    </main>
  );
}
