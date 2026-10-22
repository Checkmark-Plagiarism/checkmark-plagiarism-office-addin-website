import type { ReactNode } from "react";
import { Building2, CalendarDays, Download, ExternalLink, Globe, Laptop, Monitor } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { CONTACT_HREF, MARKETPLACE_HREF, MSI_FILENAME, MSI_HREF, SUPPORT_EMAIL } from "@/lib/links";

function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700"
          >
            {i + 1}
          </span>
          <span className="pt-0.5 leading-relaxed text-foreground/85">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Install() {
  return (
    <section id="install" aria-labelledby="install-title" className="scroll-mt-6 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Installation</p>
            <h2 id="install-title" className="mt-2 text-3xl font-bold text-foreground text-balance md:text-4xl">
              Pick the version for your Word
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Desktop Word on Windows uses our installer. Word on a Mac, Word on the web and Microsoft 365 get the add-in
              from Microsoft Marketplace.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card id="windows" className="scroll-mt-6 flex flex-col bg-white shadow-soft">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500">
                  <Monitor className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Windows: desktop Word</CardTitle>
                <CardDescription className="text-base">The installer (.msi) for Word on a Windows computer.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <Steps
                  steps={[
                    <>
                      Download <span className="font-semibold">{MSI_FILENAME}</span> and open it.
                    </>,
                    <>
                      It installs for every user on the PC, so Windows asks for administrator approval. There is no setup
                      wizard, only a short progress bar.
                    </>,
                    <>
                      Open Word, or close and reopen it if it was already running. Checkmark Plagiarism loads in the ribbon
                      automatically.
                    </>,
                  ]}
                />
                <div className="mt-auto">
                  <Button asChild>
                    <a href={MSI_HREF} download={MSI_FILENAME}>
                      <Download aria-hidden="true" />
                      Download for Windows (.msi)
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card id="mac-web" className="scroll-mt-6 flex flex-col bg-white shadow-soft">
              <CardHeader>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700">
                    <Laptop className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700">
                    <Globe className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                </div>
                <CardTitle className="text-xl">Mac, Word on the web &amp; Microsoft 365</CardTitle>
                <CardDescription className="text-base">
                  Installed from Microsoft Marketplace with your Microsoft account.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <Steps
                  steps={[
                    <>Open the Checkmark Plagiarism listing on Microsoft Marketplace.</>,
                    <>
                      Click <span className="font-semibold">Get it now</span> and sign in with your Microsoft account.
                    </>,
                    <>Open Word on your Mac or in your browser. Checkmark Plagiarism is in your add-ins.</>,
                  ]}
                />
                <div className="mt-auto">
                  <Button asChild variant="outline" className="bg-white">
                    <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer">
                      <ExternalLink aria-hidden="true" />
                      Open Microsoft Marketplace
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card id="district-it" className="mt-6 scroll-mt-6 border-0 bg-brand-900 text-white shadow-strong">
            <CardHeader className="md:flex-row md:items-center md:gap-8 md:space-y-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Building2 className="h-5 w-5 text-[hsl(195_100%_70%)]" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[hsl(195_100%_70%)]">For district IT</p>
                </div>
                <CardTitle className="mt-4 text-2xl leading-tight text-white">Deploying to a whole school or district?</CardTitle>
                <CardDescription className="mt-2 max-w-2xl text-base leading-relaxed text-white/80">
                  Book a call with us and we&apos;ll help you roll it out, either as an installer push through your
                  device management or as central deployment in Microsoft 365, whichever fits how you manage your
                  computers.
                </CardDescription>
              </div>
              <div className="mt-4 flex flex-shrink-0 flex-col gap-3 max-md:items-stretch md:mt-0 md:items-center">
                <Button asChild variant="hero" size="lg">
                  <a href={CONTACT_HREF} target="_blank" rel="noopener noreferrer">
                    <CalendarDays aria-hidden="true" />
                    Book a call
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <p className="text-center text-sm text-white/80">
                  or email{" "}
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="font-semibold text-white underline underline-offset-4 hover:text-white/90"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
