import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/homepage/hero";
import Install from "@/components/sections/homepage/install";
import Features from "@/components/sections/homepage/features";
import Support from "@/components/sections/homepage/support";

// One page: hero, installation (with district IT), features, support. There is no top menu.
// /help (the add-in manifest's SupportUrl) and /support-document redirect here (next.config.ts).
export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Install />
        <Features />
        <Support />
      </main>
      <Footer />
    </div>
  );
}
