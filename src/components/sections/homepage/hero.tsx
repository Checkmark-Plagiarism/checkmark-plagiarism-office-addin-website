import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { SkyHero } from "@/components/sky/sky-hero";
import { MARKETPLACE_HREF, MSI_FILENAME, MSI_HREF } from "@/lib/links";

export default function Hero() {
  return (
    <>
      <SkyHero
        seed="office-add-in"
        eyebrow="Microsoft Word Add-in"
        title={
          <>
            Checkmark Plagiarism, <em>inside Word</em>
          </>
        }
        subtitle="See how a document came together, from typing pace and large pastes to its revision history, without leaving Microsoft Word."
        className="pb-40 md:pb-48"
      >
        <Button asChild variant="hero" size="lg">
          <a href={MSI_HREF} download={MSI_FILENAME}>
            <Download aria-hidden="true" />
            Download for Windows (.msi)
          </a>
        </Button>
        <Button asChild variant="outline-white" size="lg">
          <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" />
            Mac, Web &amp; Microsoft 365
          </a>
        </Button>
      </SkyHero>

      <div className="relative z-10 -mt-28 md:-mt-36 px-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/60 bg-white shadow-strong">
          <Image
            src="/images/hero_02.png"
            alt="Microsoft Word with the Checkmark Plagiarism panel open on the right"
            width={1024}
            height={553}
            className="h-auto w-full"
            priority
            unoptimized
          />
        </div>
      </div>
    </>
  );
}
