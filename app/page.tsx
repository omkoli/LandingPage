import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/layout/StickyCTA";
import ExitIntentModal from "@/components/layout/ExitIntentModal";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import Workflow from "@/components/sections/Workflow";
import Comparison from "@/components/sections/Comparison";
import DashboardPreview from "@/components/sections/DashboardPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Waitlist from "@/components/sections/Waitlist";
import FinalCTA from "@/components/sections/FinalCTA";
import { site } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: site.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <StickyCTA />
      <ExitIntentModal />
      <main className="relative">
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <Features />
        <Workflow />
        <Comparison />
        <DashboardPreview />
        <Testimonials />
        <FAQ />
        <Waitlist />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
