import Image from "next/image";

const STEPS = [
  {
    title: "Install the add-in",
    body: "The .msi on Windows desktop Word, or Microsoft Marketplace on Mac, Word on the web and Microsoft 365.",
  },
  {
    title: "Students write in Word",
    body: "Nothing changes for them. While they write, the add-in records typing pace, pastes and revisions in the document.",
  },
  {
    title: "Open the Checkmark panel",
    body: "Open the document, click Checkmark Plagiarism in the ribbon, and the panel reads the record saved in it.",
  },
  {
    title: "Review and decide",
    body: "Counts, flagged pastes and the revision timeline, next to the writing, to guide a fair conversation and grade.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">How it works</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground text-balance">Four steps, all in Word</h2>
            <ol className="mt-10 space-y-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 font-bold text-white shadow-soft">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-[326px] overflow-hidden rounded-2xl border bg-white shadow-strong">
            <div className="border-b bg-brand-900 px-5 py-3 text-sm font-semibold text-white">Checkmark Plagiarism panel</div>
            <Image
              src="/images/interface_02.png"
              alt="The Checkmark Plagiarism task pane in Word, showing word, character and paragraph counts"
              width={326}
              height={738}
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
