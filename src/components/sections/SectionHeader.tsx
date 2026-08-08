import { FadeIn } from "@/components/ui/FadeIn";

type SectionHeaderProps = {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({ label, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <FadeIn className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {label && <p className="text-sm font-medium tracking-widest text-primary">{label}</p>}
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
