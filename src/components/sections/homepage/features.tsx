import { BarChart3, ClipboardPaste, FileText, Gauge, History, Save } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";

const FEATURES = [
  {
    icon: FileText,
    title: "Right in the Word ribbon",
    body: "Students write in Word as usual. Teachers open the Checkmark panel in the same document, without switching apps.",
  },
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
    icon: Save,
    title: "Saved with the document",
    body: "The writing record is kept inside the document itself. Close the panel and keep working; nothing is lost.",
  },
  {
    icon: BarChart3,
    title: "Results in the panel",
    body: "Word, sentence and paragraph counts and an authenticity summary, shown in the task pane next to the writing.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-y bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Features</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">
              The writing process, where students already write
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Teachers can often tell copied work from its revision history. The add-in keeps that history for you while the
              student writes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="bg-white shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-medium">
                <CardHeader>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500">
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
