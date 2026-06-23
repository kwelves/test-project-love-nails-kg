import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-11 sm:py-20", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-6 max-w-3xl sm:mb-12">
            {eyebrow && <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary sm:mb-3 sm:text-xs">{eyebrow}</p>}
            {title && <h2 className="text-[1.7rem] font-semibold leading-tight tracking-tight min-[390px]:text-3xl sm:text-5xl">{title}</h2>}
            {description && <p className="mt-3 text-[15px] leading-7 text-muted-foreground sm:mt-4 sm:text-lg">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
