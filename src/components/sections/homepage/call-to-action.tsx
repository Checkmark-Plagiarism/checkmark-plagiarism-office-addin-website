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
              Ready to Bring Plagiarism Detection to Microsoft Word?
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Download our dedicated installer for <strong>Windows</strong> (.msi), or get the Word Add-in
              from Microsoft Marketplace for <strong>macOS</strong>, <strong>Word Online</strong>, and <strong>Office 365</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="cta" size="xl" className="group" asChild>
                <a href="/downloads/checkmark_plagiarism_addin.msi" download="checkmark_plagiarism_addin.msi">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download for Windows (.msi)
                </a>
              </Button>
              
              <Button variant="outline" size="xl" asChild>
                <a href="https://marketplace.microsoft.com/en-us/product/WA200009581" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Word Online Add-in
                </a>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <a href="/support-document" className="hover:underline">Need help? View Support Guide</a>
              </div>
              <div className="hidden sm:block text-muted-foreground/50">•</div>
              <div>Windows via .msi • macOS & Word Online via Microsoft Marketplace • Office 365</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;
