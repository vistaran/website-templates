import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p
        className={cn(
          "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />
        {eyebrow}
        {align === "center" && <span className="h-px w-8 bg-cyan/50" aria-hidden="true" />}
      </p>
      <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}
