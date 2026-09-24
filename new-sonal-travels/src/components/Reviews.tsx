"use client";

import { Star, Quote } from "lucide-react";
import { StaggerGroup, StaggerItem, FadeInView } from "./motion";
import { WhatsAppButton } from "./cta";
import { BUSINESS, DEFAULT_WA_MESSAGE } from "@/lib/business";

type Review = {
  name: string;
  role: string;
  avatar: string;
  text: string;
  when: string;
};

const REVIEWS: Review[] = [
  {
    name: "Rakesh Patel",
    role: "Self-Drive · Innova Crysta",
    avatar: "https://i.pravatar.cc/96?img=12",
    text: "Took an Innova Crysta for 24 hours for a family function. Spotless car, transparent rate and the delivery to my doorstep was right on time.",
    when: "2 weeks ago",
  },
  {
    name: "Priya Sharma",
    role: "Self-Drive · Thar",
    avatar: "https://i.pravatar.cc/96?img=47",
    text: "Booked a Thar on WhatsApp at 11 PM and the car was at my place by morning! Clean, well-maintained and the deposit was refunded quickly.",
    when: "1 month ago",
  },
  {
    name: "Amit Desai",
    role: "Self-Drive · XUV700",
    avatar: "https://i.pravatar.cc/96?img=15",
    text: "Rented the XUV700 for a weekend trip. Fair extra-km charges, full tank on pickup and zero hidden costs. Best self-drive service in Gandhinagar.",
    when: "1 month ago",
  },
  {
    name: "Kavita Joshi",
    role: "Self-Drive · Baleno",
    avatar: "https://i.pravatar.cc/96?img=45",
    text: "Very smooth experience. Just shared my documents on WhatsApp, paid the deposit and got the keys. The Baleno was fuel-efficient and great for city driving.",
    when: "2 months ago",
  },
  {
    name: "Suresh Mehta",
    role: "Self-Drive · Creta",
    avatar: "https://i.pravatar.cc/96?img=59",
    text: "Perfect for my daily commute for a month. They even swapped the car for servicing with no extra charge. Very professional and always reachable.",
    when: "2 months ago",
  },
  {
    name: "Neha Shah",
    role: "Self-Drive · Defender",
    avatar: "https://i.pravatar.cc/96?img=32",
    text: "Couldn't believe I could self-drive a Defender in Gandhinagar! Immaculate car, easy documents, and the whole booking took 10 minutes on WhatsApp.",
    when: "3 months ago",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-[-160px] h-[420px] w-[420px] rounded-full bg-accent/6 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-accent">
            Customer Reviews
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by Gandhinagar
          </h2>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-line-2 bg-surface-2/70 px-5 py-2.5">
            <span className="font-heading text-xl font-bold text-white">{BUSINESS.rating.toFixed(1)}</span>
            <Stars />
            <span className="text-sm text-muted">
              {BUSINESS.reviewCount}+ Google reviews
            </span>
          </div>
        </FadeInView>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <StaggerItem key={r.name}>
              <figure className="relative flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-surface-2/80">
                <Quote className="absolute top-5 right-5 h-8 w-8 text-accent/15" aria-hidden="true" />
                <Stars />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    loading="lazy"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-line-2"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-[12px] text-dim">
                      {r.role} · {r.when}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeInView className="mt-12 flex flex-col items-center gap-4 text-center" delay={0.1}>
          <p className="text-sm text-dim">
            Have you travelled with us? We&apos;d love to hear about it.
          </p>
          <WhatsAppButton
            message="Hello New Sonal Travels! I'd like to enquire about booking a car."
            label="Book Your Ride"
          />
        </FadeInView>
      </div>
    </section>
  );
}
