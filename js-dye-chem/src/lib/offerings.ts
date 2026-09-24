import {
  FlaskConical,
  Beaker,
  Droplets,
  Feather,
  Link2,
  Printer,
  Sparkles,
  Dna,
  type LucideIcon,
} from "lucide-react";

export interface Offering {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  applications: string[];
  group: "inks" | "processing" | "finishing";
}

export const OFFERINGS: Offering[] = [
  {
    slug: "digital-printing-inks",
    name: "Digital Printing Inks",
    icon: Printer,
    tagline: "Reactive · Disperse · Pigment",
    description:
      "High-performance digital textile printing inks engineered for sharp, bleed-free prints on cotton, polyester and blends. Consistent viscosity and particle size protect printheads and deliver repeatable colour run after run.",
    applications: ["Direct-to-fabric", "DTF / DTG", "Reactive & disperse systems", "Fashion & home textiles"],
    group: "inks",
  },
  {
    slug: "specialised-chemicals",
    name: "Specialised Chemicals",
    icon: FlaskConical,
    tagline: "Purpose-formulated processing aids",
    description:
      "Purpose-formulated chemicals for every stage of textile processing — wetting, scouring, bleaching, dyeing and fixing. Each grade is stabilised for batch-to-batch consistency so your process stays predictable.",
    applications: ["Pre-treatment", "Dyeing & printing", "Finishing", "Denim processing"],
    group: "processing",
  },
  {
    slug: "auxiliary-chemicals",
    name: "Auxiliary Chemicals",
    icon: Beaker,
    tagline: "The process-enabling essentials",
    description:
      "The supporting chemistry your line depends on — levelling agents, dispersants, sequestering agents, anti-foamers and emulsifiers that keep dye baths stable and shade reproducibility high.",
    applications: ["Levelling agents", "Dispersants & sequestering", "Anti-foamers", "Emulsifiers"],
    group: "processing",
  },
  {
    slug: "silicon-gel",
    name: "Silicon Gel",
    icon: Droplets,
    tagline: "Softness & water-repellent finishes",
    description:
      "Silicone gel and emulsion systems that deliver a premium soft handle, improved sewability and water-repellent effects. Ideal for finishes that need durability through multiple washes.",
    applications: ["Softening", "Water repellency", "Handle modification", "Denim & knitwear"],
    group: "finishing",
  },
  {
    slug: "softners",
    name: "Softners",
    icon: Feather,
    tagline: "Luxurious, lasting softness",
    description:
      "Cationic, non-ionic and micro-emulsion softeners that give fabric a smooth, plush feel without yellowing or affecting shade. Tuned for both exhaust and padding application routes.",
    applications: ["Knits & woven", "Towel & terry", "Garment softening", "Non-yellowing grades"],
    group: "finishing",
  },
  {
    slug: "bonding-agents",
    name: "Bonding Agents",
    icon: Link2,
    tagline: "Strong, durable bonds",
    description:
      "Binders and bonding agents for pigment printing, lamination and non-woven applications — delivering strong adhesion, good fastness and a soft hand even on stretch fabrics.",
    applications: ["Pigment printing", "Lamination", "Non-woven bonding", "High-stretch fabrics"],
    group: "processing",
  },
  {
    slug: "value-addition-chemicals",
    name: "Value Addition Chemicals",
    icon: Sparkles,
    tagline: "Finishes that upgrade fabric value",
    description:
      "Performance finishes that let you charge more per metre — anti-pilling, antimicrobial, UV-protection and wrinkle-free treatments formulated for demanding retail and export quality standards.",
    applications: ["Anti-pilling", "Antimicrobial", "UV protection", "Wrinkle-free"],
    group: "finishing",
  },
  {
    slug: "enzymes-for-fabric",
    name: "Enzymes for Fabric",
    icon: Dna,
    tagline: "Eco-friendly bio-processing",
    description:
      "Biotech enzymes for desizing, bio-scouring and bio-polishing that replace harsh chemicals — reducing water, energy and effluent load while improving fabric surface and feel.",
    applications: ["Desizing", "Bio-scouring", "Bio-polishing", "Denim stone-wash"],
    group: "finishing",
  },
];

export const GROUPS: {
  key: Offering["group"];
  label: string;
  blurb: string;
}[] = [
  {
    key: "inks",
    label: "Printing Inks",
    blurb: "Digital and specialty inks for modern textile printing lines.",
  },
  {
    key: "processing",
    label: "Processing Chemicals",
    blurb: "The chemistry that keeps pre-treatment, dyeing and printing running right.",
  },
  {
    key: "finishing",
    label: "Finishing & Value Add",
    blurb: "Softness, performance and eco-friendly finishes that lift fabric value.",
  },
];
