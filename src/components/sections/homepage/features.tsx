import Image from "next/image";
import { BarChart3, ClipboardPaste, FileText, Gauge, History, Save } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";

const FEATURES = [
  {
    icon: Gauge,
    title: "Typing pace",
    body: "Words per minute over the life of the document, so bursts that don't match how a student types stand out.",
  },
  {
    icon: ClipboardPaste,
    title: "Large pastes",
    body: "Sudden blocks of text that appear all at once are flagged, so you can ask where they came from.",
  },
  {
    icon: History,
    title: "Revision history",
    body: "A timeline of how the writing grew and changed, the record teachers otherwise piece together by hand.",
  },
  {
    icon: BarChart3,
    title: "Counts and readability",
    body: "Words, characters, paragraphs, spoken length, editing time and a readability score, live in the panel next to the writing.",
  },
  {
    icon: Save,
    title: "Saved with the document",
    body: "The writing record is kept inside the document itself. Close the panel and keep working; nothing is lost.",
  },
  {
    icon: FileText,
    title: "Reports for teachers",
    body: "The add-in powers the Checkmark Plagiarism report, so teachers can review how the work was written.",
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-6 border-y bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Features</p>
            <h2 id="features-title" className="mt-2 text-3xl font-bold text-foreground text-balance md:text-4xl">
              The writing process, where students already write
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Teachers can often tell copied work from its revision history. The add-in keeps that history for you while the
              student writes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="bg-white shadow-soft">
                <CardHeader>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl leading-tight">{title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <figure className="mt-14">
            {/* A phone-width crop of the panel on small screens, the full Word window from md up.
                The one that is display:none never loads (both are lazy). */}
            <div className="mx-auto w-full max-w-[326px] overflow-hidden rounded-2xl border bg-white shadow-strong md:hidden">
              <Image
                src="/images/interface_02.png"
                alt="The Checkmark Plagiarism panel in Word, showing word, character and paragraph counts, spoken length, editing time and readability"
                width={326}
                height={738}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-strong md:block">
              <Image
                src="/images/hero_02.png"
                alt="Microsoft Word with the Checkmark Plagiarism panel open on the right, showing word, character and paragraph counts"
                width={1024}
                height={553}
                className="h-auto w-full"
                unoptimized
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              The Checkmark Plagiarism panel in Word.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
