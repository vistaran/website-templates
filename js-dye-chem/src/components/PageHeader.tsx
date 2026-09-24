import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 lg:pt-44 lg:pb-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute -top-32 left-1/2 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-cyan/[0.07] blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p
          className={cn(
            "mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan"
          )}
        >
          <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
