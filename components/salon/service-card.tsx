import Link from "next/link";
import { ArrowRight, Check, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PricePill } from "@/components/shared/price-pill";
import type { Service } from "@/lib/domain/types";
import { cn, formatDuration } from "@/lib/utils";

const categoryLabels = {
  manicure: "маникюр",
  pedicure: "педикюр",
  design: "дизайн",
  extension: "наращивание",
  express: "комплекс",
};

export function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  const details = [
    formatDuration(service.durationFromMinutes, service.durationToMinutes),
    categoryLabels[service.category],
    service.isPopular ? "часто выбирают" : "спокойный выбор",
  ];

  return (
    <Card
      className={cn(
        "motion-card group flex h-full flex-col overflow-hidden hover:border-primary/30",
        featured && "bg-foreground text-background",
      )}
    >
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <PricePill priceFrom={service.priceFrom} priceTo={service.priceTo} priceNote={service.priceNote} />
          {service.isPopular && <Badge variant={featured ? "secondary" : "outline"}>часто выбирают</Badge>}
        </div>
        <CardTitle className={cn("mt-2 text-xl sm:mt-3 sm:text-2xl", featured && "text-background")}>{service.shortName}</CardTitle>
        <p className={cn("text-sm leading-5 text-muted-foreground sm:leading-6", featured && "text-background/75")}>
          {service.description}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className={cn("grid gap-2 rounded-[1rem] border border-current/10 bg-background p-3 sm:gap-3 sm:rounded-2xl sm:p-4", featured && "bg-background/5")}>
          {details.map((detail, index) => (
            <div key={detail} className="flex items-center gap-2 text-sm">
              {index === 0 ? (
                <Clock className={cn("size-4 text-primary", featured && "text-[#f3c9d5]")} aria-hidden="true" />
              ) : (
                <Check className={cn("size-4 text-primary", featured && "text-[#f3c9d5]")} aria-hidden="true" />
              )}
              <span className={cn("text-muted-foreground", featured && "text-background/75")}>{detail}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t border-current/10 pt-4 sm:pt-5">
        <Sparkles className={cn("size-5 text-primary transition-transform group-hover:rotate-12", featured && "text-[#f3c9d5]")} aria-hidden="true" />
        <Button asChild variant={featured ? "secondary" : "outline"} size="sm">
          <Link href={`/?service=${encodeURIComponent(service.id)}#booking`}>
            Выбрать
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
