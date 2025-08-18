import { Button } from "@/components/common/ui/button";
import { Download, ChevronRight } from "lucide-react";
import Image from "next/image";

const heroImage = "/images/hero_02.png";

const Hero = () => {
  return (
    <section className="bg-gradient-hero py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-hero-fg mb-6 leading-tight">
              Microsoft Office Add-in for
              <span className="block text-transparent bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text">
                Plagiarism Detection
              </span>
            </h1>

            <p className="text-xl text-hero-fg/90 mb-8 leading-relaxed">
              Seamlessly integrate advanced plagiarism detection directly into Microsoft Word.
              Analyze typing behavior and revision history with the power of Checkmark&apos;s
              teacher-designed technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Add-in
              </Button>

              <Button variant="outline" size="xl" className="bg-white/10 text-hero-fg border-white/20 hover:bg-white/20">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <Image
                src={heroImage}
                alt="Checkmark Plagiarism Office Add-in Interface"
                className="w-full h-auto"
                height="200"
                width="200"
                quality={100}
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
