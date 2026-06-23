import { Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricePill } from "@/components/shared/price-pill";
import type { Service } from "@/lib/domain/types";
import { cn, formatDuration } from "@/lib/utils";

export function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-ui)] hover:-translate-y-1 hover:border-primary/30",
        featured && "bg-foreground text-background",
      )}
    >
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <PricePill priceFrom={service.priceFrom} priceTo={service.priceTo} priceNote={service.priceNote} />
          {service.isPopular && <Badge variant={featured ? "secondary" : "outline"}>часто выбирают</Badge>}
        </div>
        <CardTitle className={cn("mt-3 text-2xl", featured && "text-background")}>{service.shortName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn("min-h-20 text-sm leading-6 text-muted-foreground", featured && "text-background/75")}>
          {service.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-current/10 pt-4">
          <span className="inline-flex items-center gap-2 text-sm">
            <Clock className="size-4" aria-hidden="true" />
            {formatDuration(service.durationFromMinutes, service.durationToMinutes)}
          </span>
          <Sparkles className="size-5 text-primary transition-transform group-hover:rotate-12" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );
}
