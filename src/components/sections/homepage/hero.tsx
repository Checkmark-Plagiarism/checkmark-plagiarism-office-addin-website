import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import Logo from "@/components/layout/logo";
import { MARKETPLACE_HREF, MSI_FILENAME, MSI_HREF } from "@/lib/links";

/** A plain, calm opening: the logo, one line about the add-in, and the two install buttons. */
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b bg-gradient-to-b from-brand-50 to-background">
      <div className="container mx-auto px-6 pt-14 pb-16 text-center md:pt-20 md:pb-20">
        <div className="flex justify-center">
          <Logo size="lg" priority />
        </div>
        <h1 id="hero-title" className="mx-auto mt-10 max-w-3xl text-4xl font-extrabold text-foreground text-balance md:text-5xl">
          The Checkmark <span className="whitespace-nowrap">add-in</span> for Microsoft Word
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
          See how a document came together, from typing pace and large pastes to its revision history, without leaving
          Word.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4 max-sm:flex-col max-sm:items-stretch">
          <Button asChild size="lg">
            <a href={MSI_HREF} download={MSI_FILENAME}>
              <Download aria-hidden="true" />
              Download for Windows (.msi)
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white">
            <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden="true" />
              Mac, Web &amp; Microsoft 365
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Desktop Word on Windows uses the installer. A Mac, or Word in a browser, uses Microsoft Marketplace.{" "}
          <a href="#install" className="font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700">
            Installation details
          </a>
        </p>
      </div>
    </section>
  );
}
