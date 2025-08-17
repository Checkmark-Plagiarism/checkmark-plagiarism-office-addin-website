import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import Image from "next/image";

const addonInterface = "/images/interface.jpg";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Install the Add-in",
      description: "Download and install the Checkmark Plagiarism add-in directly from the Microsoft AppSource or Office Add-ins store."
    },
    {
      number: "02",
      title: "Open in Word",
      description: "The add-in appears in your Word ribbon. Students work normally while the tool monitors typing patterns in the background."
    },
    {
      number: "03",
      title: "Automatic Analysis",
      description: "Our algorithm analyzes revision history, typing speed, and writing patterns to detect potential plagiarism automatically."
    },
    {
      number: "04",
      title: "Review Results",
      description: "Get instant reports highlighting suspicious sections and authenticity scores to guide your review process."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Teachers can often tell when writing has been copied by looking at revision history.
            Our add-in automates this process with sophisticated analysis.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
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
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-elegant">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle>Checkmark Add-in Interface</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Seamlessly integrated into Microsoft Word
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src={addonInterface}
                  alt="Checkmark Plagiarism Add-in Interface in Microsoft Word"
                  className="w-full h-auto object-cover"
                  height={"200"}
                  width={"200"}
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
