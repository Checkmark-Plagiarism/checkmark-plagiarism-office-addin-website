import Link from "next/link";
import { BookOpen, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { SkySection } from "@/components/sky/sky-hero";
import { SUPPORT_CENTER_HREF, SUPPORT_EMAIL } from "@/lib/links";

export default function CallToAction() {
  return (
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <SkySection as="div" seed="office-help" className="mx-auto max-w-6xl rounded-3xl px-6 pt-16 pb-24 text-center shadow-strong">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-balance">Need a hand?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 text-pretty">
            The add-in support guide covers installing and using it. For everything else Checkmark, the Support Center has
            guides for admins, teachers and students.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 max-sm:flex-col max-sm:items-stretch">
            <Button asChild variant="hero">
              <Link href="/support-document">
                <BookOpen aria-hidden="true" />
                Add-in Support Guide
              </Link>
            </Button>
            <Button asChild variant="outline-white">
              <a href={SUPPORT_CENTER_HREF}>
                <ExternalLink aria-hidden="true" />
                Checkmark Support Center
              </a>
            </Button>
            <Button asChild variant="outline-white">
              <a href={`mailto:${SUPPORT_EMAIL}`}>
                <Mail aria-hidden="true" />
                Email Support
              </a>
            </Button>
          </div>
        </SkySection>
      </div>
    </section>
  );
}
