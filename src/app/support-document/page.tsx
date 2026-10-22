import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LifeBuoy, Building2, Download, ExternalLink, Gauge, Hash, Mail, Pilcrow, Save, Type } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { SkyHero } from "@/components/sky/sky-hero";
import { MARKETPLACE_HREF, MSI_FILENAME, MSI_HREF, SUPPORT_CENTER_HREF, SUPPORT_EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Add-in Support Guide - Checkmark Plagiarism for Microsoft Word",
  description:
    "How to install and use the Checkmark Plagiarism add-in for Microsoft Word on Windows, Mac, Word on the web and Microsoft 365.",
};

const FEATURES = [
  { icon: Gauge, title: "WPM tracker", body: "Words-per-minute writing speed, tracked in real time while the document is written." },
  { icon: Type, title: "Sentence count", body: "The number of sentences in the document, to help monitor structure and flow." },
  { icon: Hash, title: "Word count", body: "The total number of words written, updated as you type." },
  { icon: Pilcrow, title: "Paragraph count", body: "How many paragraphs the document has, to help balance the writing." },
];

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <p className="text-xs font-bold uppercase tracking-wider text-brand-600">{kicker}</p>
      <h2 id={`${id}-title`} className="mt-1 text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
            {i + 1}
          </span>
          <span className="pt-0.5 leading-relaxed text-foreground/85">{step}</span>
        </li>
      ))}
    </ol>
  );
}

const linkClass = "font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700";

export default function SupportDocument() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SkyHero
        seed="office-support-guide"
        eyebrow="Add-in Support Guide"
        title={
          <>
            Using Checkmark <em>in Word</em>
          </>
        }
        subtitle="What the add-in does, how to install it on each version of Word, and where to get help."
      />

      <main className="flex-1 pb-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-16">
            <Section id="features" kicker="Features" title="What the add-in tracks">
              <div className="grid gap-4 sm:grid-cols-2">
                {FEATURES.map(({ icon: Icon, title, body }) => (
                  <Card key={title} className="bg-white shadow-soft">
                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500">
                        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <CardDescription className="mt-1 text-base">{body}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <Card className="mt-4 border-brand-100 bg-brand-50 shadow-none">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-700">
                    <Save className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Working while the add-in is closed</CardTitle>
                    <CardDescription className="mt-1 text-base text-foreground/75">
                      You can close the Checkmark Plagiarism panel and keep working on your document. The writing data,
                      including the counts and the analysis, is saved in the document, so your progress is never lost.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Section>

            <Section id="install" kicker="Installation" title="Installing the add-in">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex flex-col bg-white shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-xl">Windows: desktop Word</CardTitle>
                    <CardDescription>Word 2016, 2019, 2021 and the Microsoft 365 desktop app.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <Steps
                      steps={[
                        <>
                          Download the{" "}
                          <a href={MSI_HREF} download={MSI_FILENAME} className={linkClass}>
                            {MSI_FILENAME}
                          </a>{" "}
                          installer.
                        </>,
                        <>
                          Open the file. It installs for everyone on the computer, so Windows asks for administrator approval.
                          There is no setup wizard, only a short progress bar.
                        </>,
                        <>
                          Open Word, or close and reopen it if it was already open. The Checkmark Plagiarism add-in loads in
                          the ribbon automatically.
                        </>,
                      ]}
                    />
                    <div className="mt-auto">
                      <Button asChild size="sm">
                        <a href={MSI_HREF} download={MSI_FILENAME}>
                          <Download aria-hidden="true" />
                          Download (.msi)
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col bg-white shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-xl">Mac, Word on the web &amp; Microsoft 365</CardTitle>
                    <CardDescription>From Microsoft Marketplace, with your Microsoft account.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <Steps
                      steps={[
                        <>
                          Open the{" "}
                          <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            Checkmark Plagiarism Microsoft Marketplace listing
                          </a>
                          .
                        </>,
                        <>
                          Click <strong>Get it now</strong> and sign in with your Microsoft account.
                        </>,
                        <>Open Word on your Mac or in your browser. Checkmark Plagiarism is available from your add-ins.</>,
                      ]}
                    />
                    <div className="mt-auto">
                      <Button asChild size="sm" variant="outline" className="bg-white">
                        <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer">
                          <ExternalLink aria-hidden="true" />
                          Microsoft Marketplace
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Section>

            <Section id="district-it" kicker="For district IT" title="Deploying to many computers">
              <Card className="border-0 bg-brand-900 text-white shadow-strong">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Building2 className="h-5 w-5 text-[hsl(195_100%_70%)]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardDescription className="text-base text-white/80">
                      The MSI installs per machine and runs silently, so you can push it to Windows computers with Intune,
                      SCCM (Configuration Manager) or Group Policy:
                    </CardDescription>
                    <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white">
                      <code>msiexec /i {MSI_FILENAME} /qn</code>
                    </pre>
                    <p className="mt-4 text-sm text-white/70">
                      Users see the add-in in the Word ribbon the next time they open Word.
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Section>

            <Section id="help" kicker="Help" title="Need help?">
              <Card className="bg-white shadow-soft">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500">
                    <LifeBuoy className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <CardDescription className="text-base text-foreground/80">
                    If something isn&apos;t working or you have a question, the Checkmark Support Center has guides for admins,
                    teachers and students, and our team is a message away.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <a href={SUPPORT_CENTER_HREF}>
                      <ExternalLink aria-hidden="true" />
                      Checkmark Support Center
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="bg-white">
                    <a href={`mailto:${SUPPORT_EMAIL}`}>
                      <Mail aria-hidden="true" />
                      {SUPPORT_EMAIL}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
