import { Button } from "@/components/common/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Image
                src="/images/checkmark_plagiarism_logo.png"
                alt="Checkmark Plagiarism Logo"
                width="100"
                height="100"
              />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Checkmark Plagiarism
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <Link href="/support-document" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </Link>
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
