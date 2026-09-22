import { Button } from "@/components/common/ui/button";
import { Download, Monitor, CheckCircle2, ExternalLink } from "lucide-react";
import Image from "next/image";

const heroImage = "/images/hero_02.png";

const Hero = () => {
  return (
    <section className="bg-gradient-hero py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <Monitor className="w-4 h-4 text-cyan-300" />
              <span>Available for Windows (.msi) & Word Online (Microsoft Marketplace)</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-hero-fg mb-6 leading-tight">
              Microsoft Word Add-in for
              <span className="block text-transparent bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text">
                Plagiarism Detection
              </span>
            </h1>

            <p className="text-xl text-hero-fg/90 mb-8 leading-relaxed">
              Native plagiarism detection directly inside Microsoft Word. Download our dedicated
              one-click installer for <strong>Windows</strong>, or install via Microsoft Marketplace
              for <strong>Word Online</strong> and <strong>Office 365</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="/downloads/checkmark_plagiarism_addin.msi" download="checkmark_plagiarism_addin.msi">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download for Windows (.msi)
                </a>
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="bg-white text-primary hover:bg-blue-50 font-semibold border-white shadow-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <a
                  href="https://marketplace.microsoft.com/en-us/product/WA200009581"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 text-primary" />
                  Word Online Add-in
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-hero-fg/75">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                Windows: Dedicated .msi installer
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                Word Online & 365:{" "}
                <a
                  href="https://marketplace.microsoft.com/en-us/product/WA200009581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-white underline font-medium transition-colors"
                >
                  Microsoft Marketplace Add-in
                </a>
              </span>
            </div>

            <p className="mt-2.5 text-xs text-hero-fg/70">
              Note: macOS users should use the Word Add-in from the{" "}
              <a
                href="https://marketplace.microsoft.com/en-us/product/WA200009581"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-200 underline hover:text-white"
              >
                Microsoft Marketplace
              </a>
              .
            </p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <Image
                src={heroImage}
                alt="Checkmark Plagiarism Office Add-in Interface"
                className="w-full h-auto shadow-2xl"
                height={553}
                width={1024}
                quality={100}
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
