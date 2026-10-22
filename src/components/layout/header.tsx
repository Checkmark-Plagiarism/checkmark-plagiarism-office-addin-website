"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import Logo from "@/components/layout/logo";
import { SUPPORT_CENTER_HREF } from "@/lib/links";

/** Pages that open on a dark sky hero: the nav starts transparent over it, as on the
    public website, and turns white once you scroll. The rest start white. */
const SKY_HERO_PAGES = ["/", "/help", "/support-document"];

export default function Header() {
  const pathname = usePathname();
  const hasDarkHero = SKY_HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(!hasDarkHero);
  const [menuOpen, setMenuOpen] = useState(false);

  // /help shows the homepage, so its section links stay on the page.
  const onHome = pathname === "/" || pathname === "/help";
  const section = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const links = [
    { href: section("install"), label: "Install" },
    { href: section("features"), label: "Features" },
    { href: "/support-document", label: "Support Guide" },
  ];

  useEffect(() => {
    const update = () => setScrolled(!hasDarkHero || window.scrollY > 50);
    update();
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, [hasDarkHero]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = `font-medium transition-smooth ${
    scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
  }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-soft py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" aria-label="Checkmark Plagiarism for Word, home">
            <Logo light={!scrolled} />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className={linkClass} aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
            <a href={SUPPORT_CENTER_HREF} className={`${linkClass} inline-flex items-center gap-1`}>
              Support Center <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href={section("install")}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-smooth h-9 px-4 ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
                  : "border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
              }`}
            >
              Get the Add-in
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-smooth ${
              scrolled ? "text-foreground hover:bg-gray-100" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Backdrop and drawer are siblings of the header, not children: the scrolled
          header's backdrop-blur would otherwise become their containing block. */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
      )}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-[280px] max-w-[80vw] bg-white shadow-strong transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full invisible"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-lg text-brand-700">Menu</span>
          <button
            className="p-2 rounded-lg text-foreground hover:bg-gray-100 transition-smooth"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-1" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium hover:bg-brand-50 hover:text-brand-700 transition-smooth ${
                pathname === l.href ? "bg-brand-50 text-brand-700 font-semibold" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SUPPORT_CENTER_HREF}
            className="px-4 py-3 rounded-lg font-medium text-foreground hover:bg-brand-50 hover:text-brand-700 transition-smooth inline-flex items-center gap-1.5"
          >
            Support Center <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <Link
            href={section("install")}
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center rounded-lg text-sm font-semibold h-11 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
          >
            Get the Add-in
          </Link>
        </div>
      </div>
    </>
  );
}
