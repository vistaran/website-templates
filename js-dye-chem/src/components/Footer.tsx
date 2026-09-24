import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS, waLink, telHref } from "@/lib/business";
import { OFFERINGS } from "@/lib/offerings";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Logo } from "@/components/Navbar";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A trusted wholesale partner for textile processing chemicals and digital printing
              inks — supplying processing houses and mills across India from the heart of Surat's
              textile belt.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-[#062b16] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-ink">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products & Offerings" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact & Enquiry" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms & Conditions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition-colors hover:text-cyan">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-ink">Products</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {OFFERINGS.map((o) => (
                <li key={o.slug}>
                  <Link href={`/products#${o.slug}`} className="text-muted transition-colors hover:text-cyan">
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-ink">Reach Us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                <span className="text-muted">{BUSINESS.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                <a href={telHref} className="text-muted transition-colors hover:text-cyan">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`} className="text-muted transition-colors hover:text-cyan">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                <span className="text-muted">
                  {BUSINESS.hours}
                  <span className="block text-xs text-muted/70">{BUSINESS.hoursNote}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-cyan">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-cyan">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
