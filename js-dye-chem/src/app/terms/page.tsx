import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for purchases and services from ${BUSINESS.name}, textile chemicals and printing inks wholesaler, Kadodara, Surat.`,
  robots: { index: false, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-xl font-semibold text-ink">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted sm:text-[15px]">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle={`Last updated: August 2026 · ${BUSINESS.name}, Kadodara, Surat, Gujarat`}
      />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          <Section title="1. Acceptance of Terms">
            <p>
              By using this website, requesting a quote, or placing an order with {BUSINESS.name},
              you agree to these terms. If you do not agree, please do not use our services.
            </p>
          </Section>

          <Section title="2. Business-to-Business Supply">
            <p>
              Our products are supplied primarily to business customers — textile processing
              houses, mills, printers and converters. Orders are accepted on a wholesale basis and
              product use is the responsibility of the purchaser, who must handle, store and apply
              all chemicals in accordance with the manufacturer's safety data sheets (SDS) and
              applicable regulations.
            </p>
          </Section>

          <Section title="3. Quotes, Orders & Pricing">
            <p>
              Quotes are valid for the period stated and prices may change without notice for new
              orders. An order is confirmed only when accepted by us in writing (including via
              WhatsApp or email). Quantity, grade, packaging and delivery terms are as stated on
              the confirmed order.
            </p>
          </Section>

          <Section title="4. Samples & Trials">
            <p>
              Samples are provided for evaluation purposes. The purchaser should test samples and
              products on their own fabric and process before committing to bulk production, as
              results can vary with fabric, machinery and process parameters.
            </p>
          </Section>

          <Section title="5. Delivery & Dispatch">
            <p>
              Dispatch timelines are indicative. We dispatch from Kadodara, Surat, Gujarat and ship
              across India. Risk in goods passes to the buyer on delivery, and freight, insurance
              and transit damage claims are governed by the transporter's terms.
            </p>
          </Section>

          <Section title="6. Returns & Claims">
            <p>
              Claims for shortages, damage or quality issues must be raised within 7 days of
              receipt, along with batch details and supporting evidence. Returns are considered on
              a case-by-case basis and only for unopened, resaleable stock or as agreed in writing.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, {BUSINESS.name}'s liability for any claim
              arising out of the supply of products is limited to the invoice value of the products
              in question. We are not liable for indirect or consequential losses, including
              production downtime, lost profits or damage to fabric, arising from the use of our
              products.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All content on this website — text, graphics, logos and product information — is the
              property of {BUSINESS.name} and may not be reproduced without written permission.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These terms are governed by the laws of India, and any disputes are subject to the
              exclusive jurisdiction of the courts of Surat, Gujarat.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              {BUSINESS.name}
              <br />
              {BUSINESS.address}
              <br />
              {BUSINESS.phoneDisplay} · {BUSINESS.email}
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
