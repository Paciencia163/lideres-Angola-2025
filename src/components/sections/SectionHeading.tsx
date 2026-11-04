import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  action?: ReactNode;
}

const SectionHeading = ({ eyebrow, title, description, align = "center", as: Tag = "h2", className, action }: SectionHeadingProps) => (
  <Reveal
    className={cn(
      "mb-14 md:mb-20",
      align === "center" ? "mx-auto max-w-3xl text-center" : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
      className,
    )}
  >
    <div className={cn(align === "left" && "max-w-2xl")}>
      <div className={cn("mb-6 flex items-center gap-4", align === "center" && "justify-center")}>
        <span className="gold-rule-short" />
        <p className="eyebrow">{eyebrow}</p>
        {align === "center" && <span className="gold-rule-short" />}
      </div>
      <Tag className="text-display-md text-foreground">{title}</Tag>
      {description && <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </Reveal>
);

export default SectionHeading;
