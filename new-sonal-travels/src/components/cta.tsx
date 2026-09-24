import Link from "next/link";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, telLink } from "@/lib/business";
import { cn } from "@/lib/cn";

export function WhatsAppButton({
  message,
  phone,
  label = "Chat on WhatsApp",
  className,
  size = "md",
}: {
  message: string;
  phone?: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link
      href={waLink(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold",
        "bg-[#25D366] text-[#062b16] shadow-[0_8px_30px_rgba(37,211,102,0.28)]",
        "transition-all duration-300 hover:bg-[#34e075] hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)]",
        "hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-[15px]",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
    >
      <WhatsAppIcon className={cn("shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      {label}
    </Link>
  );
}

export function CallButton({
  phone,
  label,
  className,
  size = "md",
}: {
  phone: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link
      href={telLink(phone)}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold",
        "border border-line-2 bg-surface-2 text-zinc-100",
        "transition-all duration-300 hover:border-accent/50 hover:bg-surface-2/80 hover:text-accent",
        "hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-[15px]",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
    >
      <Phone className={cn("shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      {label}
    </Link>
  );
}
