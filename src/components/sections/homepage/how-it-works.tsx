import { Button } from "@/components/common/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";

const addonInterface = "/images/interface_02.png";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Choose Your Platform",
      description: "For Windows Word, download and run our dedicated checkmark_plagiarism_addin.msi installer. For macOS and Word Online, install the official Word Add-in directly from the Microsoft Marketplace."
    },
    {
      number: "02",
      title: "Open Microsoft Word",
      description: "The add-in appears directly in your Word ribbon. Students work normally while typing patterns, WPM, and revisions are monitored in real time."
    },
    {
      number: "03",
      title: "Automatic Analysis",
      description: "Our educator-designed algorithm tracks typing speed, sudden bulk insertions, and revision history to detect potential plagiarism automatically."
    },
    {
      number: "04",
      title: "Review Results in Word",
      description: "Get instant authenticity scores and flagged sections inside the Word task pane to guide fair, informed grading."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/30 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Teachers can often tell when writing has been copied by looking at revision history.
            Our add-in automates this process with sophisticated analysis right inside Windows Word.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mx-auto max-w-3xl">
          <div className="mb-12 lg:mb-0">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-3">
              <Button variant="default" size="lg" className="group" asChild>
                <a href="/downloads/checkmark_plagiarism_addin.msi" download="checkmark_plagiarism_addin.msi">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download Windows Installer (.msi)
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://marketplace.microsoft.com/en-us/product/WA200009581"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Word Online Add-in
                </a>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <Card className="w-fit overflow-hidden shadow-elegant border border-slate-200">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle>Checkmark Add-in Interface</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Seamlessly integrated into Microsoft Word
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 bg-slate-50 flex justify-center">
                <Image
                  src={addonInterface}
                  alt="Checkmark Plagiarism Add-in Interface in Microsoft Word"
                  className="w-auto h-auto max-w-[326px]"
                  width={326}
                  height={738}
                  quality={100}
                  unoptimized
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
