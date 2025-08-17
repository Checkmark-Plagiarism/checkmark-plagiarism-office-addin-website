import { Button } from "@/components/common/ui/button";
import { CheckCircle2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Checkmark Plagiarism
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#support" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
            <Button variant="cta" size="sm">
              Get Add-in
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
