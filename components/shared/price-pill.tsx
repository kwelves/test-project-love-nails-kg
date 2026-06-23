import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface PricePillProps {
  priceFrom?: number;
  priceTo?: number;
  priceNote?: string;
}

export function PricePill({ priceFrom, priceTo, priceNote }: PricePillProps) {
  return (
    <Badge variant="default" className="font-mono">
      {formatPrice({ priceFrom, priceTo, priceNote })}
    </Badge>
  );
}
