import Link from "next/link";
import Logo from "@/components/layout/logo";
import FooterBubbles from "@/components/layout/footer-bubbles";
import {
  CONTACT_HREF,
  MAIN_SITE,
  MARKETPLACE_HREF,
  MSI_FILENAME,
  MSI_HREF,
  SUPPORT_CENTER_HREF,
  SUPPORT_EMAIL,
  TERMS_HREF,
} from "@/lib/links";

type FooterLink = { href: string; label: string; download?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Word Add-in",
    links: [
      { href: MSI_HREF, label: "Windows Installer (.msi)", download: MSI_FILENAME },
      { href: MARKETPLACE_HREF, label: "Microsoft Marketplace" },
      { href: "/#install", label: "Installation" },
      { href: "/#district-it", label: "District IT Deployment" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support-document", label: "Add-in Support Guide" },
      { href: SUPPORT_CENTER_HREF, label: "Support Center" },
      { href: CONTACT_HREF, label: "Contact" },
      { href: `mailto:${SUPPORT_EMAIL}`, label: "Email Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: MAIN_SITE, label: "checkmarkplagiarism.com" },
      { href: "/privacy-policy", label: "Add-in Privacy Policy" },
      { href: TERMS_HREF, label: "Terms of Service" },
    ],
  },
];

/** The public website's inner-page footer, with this site's links. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-900 text-white pt-20 pb-10">
      {/* A short fade from the page into the footer through a light blue, instead of a hard edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background via-brand-300 via-40% to-brand-900"
      />
      <FooterBubbles />
      <div className="relative container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="sm:col-span-2">
            <div className="mb-4">
              <Logo light size={40} />
            </div>
            <p className="text-white/70 max-w-xs">
              Checkmark Plagiarism inside Microsoft Word: writing-process analysis for teachers, where students already
              write.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") && !link.download ? (
                      <Link href={link.href} className="text-white/70 hover:text-white transition-smooth">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} download={link.download} className="text-white/70 hover:text-white transition-smooth">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Checkmark Plagiarism. All rights reserved.</p>
          <p className="text-white/60 text-sm">Built with transparency and trust for education</p>
        </div>
      </div>
    </footer>
  );
}
