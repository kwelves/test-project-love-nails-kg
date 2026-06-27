import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-7 md:scroll-mt-20 sm:py-14", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <div className={cn("mb-5 max-w-3xl sm:mb-9", headerClassName)}>
            {eyebrow && <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary sm:mb-3 sm:text-xs">{eyebrow}</p>}
            {title && (
              <h2 className={cn("text-[1.55rem] font-semibold leading-tight tracking-tight min-[390px]:text-[1.7rem] sm:text-5xl", titleClassName)}>
                {title}
              </h2>
            )}
            {description && <p className={cn("mt-2 text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-lg sm:leading-7", descriptionClassName)}>{description}</p>}
          </div>
        )}
        {contentClassName ? <div className={contentClassName}>{children}</div> : children}
      </Container>
    </section>
  );
}
