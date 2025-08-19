import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/homepage/hero";
import CallToAction from "@/components/sections/homepage/call-to-action";
import Features from "@/components/sections/homepage/features";
import HowItWorks from "@/components/sections/homepage/how-it-works";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
