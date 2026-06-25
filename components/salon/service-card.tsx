import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const duration = formatDuration(service.durationFromMinutes, service.durationToMinutes);

  return (
    <Card
      className={cn(
        "motion-card group relative flex h-full flex-col overflow-hidden shadow-[0_14px_38px_rgb(35_33_36_/_0.06)] hover:border-primary/30",
        featured && "border-primary/20 bg-[#fff7f5]",
      )}
    >
      {featured && <div className="absolute inset-x-5 top-0 h-px bg-primary/35" aria-hidden="true" />}
      <CardHeader className="gap-3 p-4 sm:p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <PricePill priceFrom={service.priceFrom} priceTo={service.priceTo} priceNote={service.priceNote} />
          {service.isPopular && <Badge variant="outline" className="bg-background/65">часто выбирают</Badge>}
          {featured && <Badge variant="default">выгодно</Badge>}
        </div>
        <CardTitle className="text-lg leading-tight sm:text-xl">{service.shortName}</CardTitle>
        <p className="text-sm leading-5 text-muted-foreground">{service.description}</p>
      </CardHeader>
      <CardContent className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 p-4 pt-3 sm:p-4 sm:pt-3">
        <div className="min-w-0 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{duration}</span>
          </div>
          <p className="mt-1 truncate">{categoryLabels[service.category]}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href={`/?service=${encodeURIComponent(service.id)}#booking`}>
            Выбрать
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
