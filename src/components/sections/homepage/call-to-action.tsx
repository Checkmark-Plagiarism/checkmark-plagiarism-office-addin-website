import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/card";
import { Download, ExternalLink, HelpCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/95 backdrop-blur-sm shadow-elegant border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Grading Process?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educators who trust Checkmark Plagiarism to maintain 
              academic integrity while saving valuable time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="cta" size="xl" className="group">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Get the Office Add-in
              </Button>
              
              <Button variant="outline" size="xl">
                <ExternalLink className="w-4 h-4" />
                Visit Main Site
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Need help? Contact Teacher Support</span>
              </div>
              <div className="hidden sm:block text-muted-foreground/50">•</div>
              <div>Compatible with Microsoft Office 365 & 2019+</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;
