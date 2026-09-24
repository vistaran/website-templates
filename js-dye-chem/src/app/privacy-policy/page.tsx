import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${BUSINESS.name} — how we collect, use and protect your information.`,
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Last updated: August 2026 · ${BUSINESS.name}, Kadodara, Surat, Gujarat`}
      />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          <Section title="1. Overview">
            <p>
              {BUSINESS.name} ("we", "our", "us") respects your privacy. This policy explains what
              information we collect through this website, how we use it, and the choices you have.
            </p>
            <p>
              We operate primarily as a B2B wholesale supplier of textile chemicals and printing
              inks. Most of our interactions happen through WhatsApp, phone and email rather than
              this website.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>When you use our contact form or reach out to us, we may collect:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Your name and company name</li>
              <li>Phone number and email address</li>
              <li>Details of your enquiry or requirement</li>
              <li>Basic technical data (browser type, pages visited) if you enable cookies</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To respond to your enquiries and provide quotes</li>
              <li>To supply products, samples and technical support</li>
              <li>To share product updates and pricing with your consent</li>
              <li>To improve our website and services</li>
            </ul>
          </Section>

          <Section title="4. WhatsApp & Contact Form">
            <p>
              Our contact form opens WhatsApp with your enquiry pre-filled — the message is sent
              from your own WhatsApp account and is not stored on this website. Communications on
              WhatsApp are governed by WhatsApp's own privacy policy.
            </p>
          </Section>

          <Section title="5. Data Sharing">
            <p>
              We do not sell or rent your personal information. We may share limited data with
              service providers (e.g. hosting, analytics) only as needed to operate this website,
              and only where required by law.
            </p>
          </Section>

          <Section title="6. Data Retention & Security">
            <p>
              We retain enquiry information only as long as needed for business purposes. We apply
              reasonable technical and organisational measures to protect your data.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>
              You may request access to, correction of, or deletion of your personal information at
              any time by contacting us at{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-cyan hover:text-amber">
                {BUSINESS.email}
              </a>{" "}
              or on WhatsApp at {BUSINESS.phoneDisplay}.
            </p>
          </Section>

          <Section title="8. Contact">
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
