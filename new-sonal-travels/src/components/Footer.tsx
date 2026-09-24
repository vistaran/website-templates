import { Car, MapPin, Phone, Clock, Star } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BUSINESS, DEFAULT_WA_MESSAGE, waLink } from "@/lib/business";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#08080a]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/30">
                <Car className="h-5 w-5 text-accent" />
              </span>
              <span className="font-heading text-lg font-bold text-white">
                New Sonal Travels
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Gandhinagar&apos;s trusted car rental for self-drive or with a driver.
              40+ cars from hatchbacks to luxury SUVs, 12-hour and 24-hour
              plans, doorstep delivery, open 24 hours a day.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface-2/60 px-3.5 py-1.5 text-[13px] text-zinc-200">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {BUSINESS.rating.toFixed(1)} · {BUSINESS.reviewCount}+ Google reviews
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>Self-Drive &amp; With-Driver Rental</li>
              <li>24-Hour &amp; 12-Hour Plans</li>
              <li>Luxury &amp; Premium Cars</li>
              <li>SUVs, Sedans &amp; Hatchbacks</li>
              <li>Doorstep Delivery</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-zinc-300">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="flex flex-col">
                  {BUSINESS.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel.replace(/[^+\d]/g, "")}`}
                      className="transition-colors hover:text-accent"
                    >
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                Open 24 Hours
              </li>
              <li>
                <a
                  href={waLink(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#25D366] transition-colors hover:text-[#34e075]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-[13px] text-dim">
            © {new Date().getFullYear()} New Sonal Travels, Gandhinagar. All rights reserved.
          </p>
          <p className="text-[13px] text-dim">
            Self-Drive &amp; With-Driver Rental · 24-Hour &amp; 12-Hour Plans · Luxury Cars
          </p>
        </div>
      </div>
    </footer>
  );
}
