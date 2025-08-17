import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/common/ui/card";
import {
  FileText,
  Zap,
  Shield,
  Users,
  BarChart3,
  Clock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Native Word Integration",
      description: "Works seamlessly within Microsoft Word - no need to switch between applications or copy-paste text."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Real-time Detection",
      description: "Analyze typing behavior and revision history in real-time as students work on their assignments."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Teacher-Designed Algorithm",
      description: "Built by educators who understand how to spot plagiarism through natural writing patterns and behaviors."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Classroom Ready",
      description: "Designed specifically for educational environments with batch processing and class management features."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Detailed Reports",
      description: "Get comprehensive analysis reports showing authenticity scores and flagged sections for easy review."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Time-Saving",
      description: "Automated detection frees up your time to focus on teaching and providing meaningful feedback."
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
            Experience the power of Checkmark's plagiarism detection directly within
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
