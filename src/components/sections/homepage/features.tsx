import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import {
  FileText,
  Zap,
  Shield,
  Laptop,
  BarChart3,
  Lock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Laptop className="w-8 h-8 text-primary" />,
      title: "Windows Word Installer (.msi)",
      description: "One-click MSI installer designed specifically for Microsoft Word on Windows. Fast and effortless deployment for teachers and lab workstations."
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Native Word Ribbon Integration",
      description: "Embeds seamlessly into the Word ribbon. Students write naturally while educators analyze authenticity without leaving Microsoft Word."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Real-time Typing & WPM Detection",
      description: "Analyzes typing cadence, words-per-minute bursts, and live revision history as assignments are written."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Teacher-Designed Algorithm",
      description: "Built by educators who understand how to spot plagiarism and AI text through authentic writing behavior and revision trails."
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "Private In-Document Storage",
      description: "Session data and revision metrics are stored safely right inside the document — never exported to external servers."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Instant Authenticity Reports",
      description: "Get comprehensive analysis reports with authenticity scores, word counts, and revision timelines directly in the task pane."
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Office Add-in?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of Checkmark&apos;s plagiarism detection directly within
            Microsoft Word, the environment where your students are already working.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
