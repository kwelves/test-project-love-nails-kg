import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Master } from "@/lib/domain/types";

export function MasterCard({ master }: { master: Master }) {
  const initials = master.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="motion-card flex items-center gap-4 p-4 shadow-none">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-sm font-semibold text-primary">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{master.name}</h3>
          {master.isTopMaster && <Badge>топ</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {master.role}, {master.specialty}
        </p>
      </div>
    </Card>
  );
}
