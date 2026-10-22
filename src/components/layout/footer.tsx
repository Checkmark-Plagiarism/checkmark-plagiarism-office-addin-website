import Link from "next/link";
import Logo from "@/components/layout/logo";
import { CONTACT_HREF, MAIN_SITE } from "@/lib/links";

const linkClass = "text-white/80 underline-offset-4 transition-smooth hover:text-white hover:underline";

/** A short footer: the logo, three links, the copyright. */
export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Logo size="md" tone="light" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <a href={MAIN_SITE} className={linkClass}>
                  checkmarkplagiarism.com
                </a>
              </li>
              <li>
                <a href={CONTACT_HREF} className={linkClass}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/70 md:text-left">
          &copy; {new Date().getFullYear()} Checkmark Plagiarism. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
