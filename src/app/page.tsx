import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/homepage/hero";
import Install from "@/components/sections/homepage/install";
import Features from "@/components/sections/homepage/features";
import HowItWorks from "@/components/sections/homepage/how-it-works";
import CallToAction from "@/components/sections/homepage/call-to-action";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Install />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
