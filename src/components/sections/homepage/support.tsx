import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { MARKETPLACE_HREF, SUPPORT_CENTER_HREF, SUPPORT_EMAIL } from "@/lib/links";

const linkClass = "font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700";

const QUESTIONS = [
  {
    question: "Where is the add-in in Word?",
    answer: (
      <>
        On the <strong>Home</strong> tab, in the Checkmark Plagiarism group. Click <strong>Checkmark Plagiarism</strong>{" "}
        to open the panel beside your document. It can also open on its own when you open a document.
      </>
    ),
  },
  {
    question: "It didn't appear after I installed it.",
    answer: (
      <>
        Close Word completely and open it again; the add-in loads when Word starts. If it still isn&apos;t there, ask your
        IT team: the installer needs administrator rights, because it installs for everyone on the computer.
      </>
    ),
  },
  {
    question: "I'm on a Mac, or using Word in a browser.",
    answer: (
      <>
        Use{" "}
        <a href={MARKETPLACE_HREF} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Microsoft Marketplace
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        , not the Windows installer. Click <strong>Get it now</strong>, sign in, and the add-in is in your add-ins.
      </>
    ),
  },
  {
    question: "What does the add-in collect?",
    answer: (
      <>
        The{" "}
        <Link href="/privacy-policy" className={linkClass}>
          privacy policy
        </Link>{" "}
        explains what the add-in and its service collect, and how it is used.
      </>
    ),
  },
];

export default function Support() {
  return (
    <section id="support" aria-labelledby="support-title" className="scroll-mt-6 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Support</p>
            <h2 id="support-title" className="mt-2 text-3xl font-bold text-foreground text-balance md:text-4xl">
              Common questions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {QUESTIONS.map(({ question, answer }) => (
              <Card key={question} className="bg-white shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg leading-snug">{question}</CardTitle>
                  <CardDescription className="pt-1 text-base leading-relaxed text-foreground/80">{answer}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 px-6 py-8 text-center">
            <h3 className="text-xl font-bold text-foreground">Still stuck?</h3>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              The Checkmark Support Center has guides for admins, teachers and students, and our team is a message away.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 max-sm:flex-col max-sm:items-stretch">
              <Button asChild>
                <a href={SUPPORT_CENTER_HREF}>
                  <ExternalLink aria-hidden="true" />
                  Checkmark Support Center
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-white">
                <a href={`mailto:${SUPPORT_EMAIL}`}>
                  <Mail aria-hidden="true" />
                  {SUPPORT_EMAIL}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
