"use client";

import { MapPin, Navigation, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import type { Branch, BranchId } from "@/lib/domain/types";

interface BranchCardProps {
  branch: Branch;
  onBookBranch?: (branchId: BranchId) => void;
}

export function BranchCard({ branch, onBookBranch }: BranchCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <Badge variant="secondary">{branch.district}</Badge>
        <CardTitle className="mt-3">{branch.shortName}</CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">{branch.orientation}</p>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="flex items-start gap-2 font-medium">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              {branch.address}
              <span className="block text-sm font-normal text-muted-foreground">{branch.floorRoom}</span>
            </span>
          </p>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="min-h-11"
            onClick={() => trackEvent("map_open_2gis", { branch_id: branch.id, placement: "branch_card" })}
          >
            <a href={branch.mapLinks["2gis"]} target="_blank" rel="noreferrer">
              <Route className="size-4" aria-hidden="true" />
              2ГИС
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="min-h-11"
            onClick={() => trackEvent("map_open_yandex", { branch_id: branch.id, placement: "branch_card" })}
          >
            <a href={branch.mapLinks.yandex} target="_blank" rel="noreferrer">
              <Navigation className="size-4" aria-hidden="true" />
              Яндекс
            </a>
          </Button>
          <Button size="sm" className="min-h-11" onClick={() => onBookBranch?.(branch.id)}>
            Записаться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
