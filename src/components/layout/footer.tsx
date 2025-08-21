import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-hero-bg text-hero-fg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">
                Checkmark Plagiarism
              </span>
            </div>
            <p className="text-hero-fg/80 mb-4 max-w-md">
              Plagiarism detection designed by teachers, for teachers.
              Bringing advanced academic integrity tools directly to Microsoft Office.
            </p>
            <p className="text-sm text-hero-fg/60">
              © 2025 Checkmark Plagiarism. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Teacher Support
                </a>
              </li>
              <li>
                <a href="#" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Student Support
                </a>
              </li>
              <li>
                <a href="#" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  System Requirements
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://www.checkmarkplagiarism.com" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Main Website
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-hero-fg/80 hover:text-hero-fg transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
