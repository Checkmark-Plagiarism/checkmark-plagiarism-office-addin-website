import type { ReactNode } from "react";
import { Laptop, Building2, Download, ExternalLink, Globe, Monitor } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { MARKETPLACE_HREF, MSI_FILENAME, MSI_HREF } from "@/lib/links";

function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
            {i + 1}
          </span>
          <span className="pt-0.5 text-foreground/85 leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Install() {
  return (
    <section id="install" className="scroll-mt-24 pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Installation</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">Pick the version for your Word</h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Desktop Word on Windows uses our installer. Word on a Mac, Word on the web and Microsoft 365 get the add-in from
              Microsoft Marketplace.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col bg-white shadow-soft">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500">
                  <Monitor className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <CardTitle>Windows: desktop Word</CardTitle>
                <CardDescription>Word 2016 and later, and the Microsoft 365 desktop app.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <Steps
                  steps={[
                    <>
                      Download <span className="font-semibold">{MSI_FILENAME}</span>.
                    </>,
                    <>
                      Open it. It installs for everyone on the computer, so Windows asks for administrator approval. There is
                      no setup wizard, only a short progress bar.
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

            <Card className="flex flex-col bg-white shadow-soft">
              <CardHeader>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700">
                    <Laptop className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700">
                    <Globe className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                </div>
                <CardTitle>Mac, Word on the web &amp; Microsoft 365</CardTitle>
                <CardDescription>Installed from Microsoft Marketplace with your Microsoft account.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-6">
                <Steps
                  steps={[
                    <>Open the Checkmark Plagiarism listing on Microsoft Marketplace.</>,
                    <>
                      Click <span className="font-semibold">Get it now</span> and sign in with your Microsoft account.
                    </>,
                    <>Open Word on your Mac or in your browser. Checkmark Plagiarism is available from your add-ins.</>,
                  ]}
                />
                <div className="mt-auto">
                  <Button asChild variant="outline" className="bg-white">
                    <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer">
                      <ExternalLink aria-hidden="true" />
                      Open Microsoft Marketplace
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card id="district-it" className="mt-6 scroll-mt-24 border-0 bg-brand-900 text-white shadow-strong">
            <CardHeader className="md:flex-row md:items-start md:gap-6 md:space-y-0">
              <div className="mb-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 md:mb-0">
                <Building2 className="h-5 w-5 text-[hsl(195_100%_70%)]" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[hsl(195_100%_70%)]">For district IT</p>
                <CardTitle className="mt-1 text-white">Deploy to every Windows computer</CardTitle>
                <CardDescription className="mt-2 max-w-3xl text-base text-white/75">
                  The MSI installs per machine and runs silently, so you can push it with Intune, SCCM (Configuration Manager)
                  or Group Policy. Teachers and students see the add-in the next time they open Word.
                </CardDescription>
                <pre className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white">
                  <code>msiexec /i {MSI_FILENAME} /qn</code>
                </pre>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
