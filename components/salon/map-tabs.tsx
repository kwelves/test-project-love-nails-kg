"use client";

import { useState } from "react";
import { ExternalLink, MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics";
import { branches } from "@/lib/data/branches";
import type { BranchId, MapProvider } from "@/lib/domain/types";

export function MapTabs() {
  const [provider, setProvider] = useState<MapProvider>("2gis");
  const [branchId, setBranchId] = useState<BranchId>("suerkulova");
  const branch = branches.find((item) => item.id === branchId) ?? branches[0];
  const eventName = provider === "2gis" ? "map_open_2gis" : "map_open_yandex";

  return (
    <Card className="grid gap-4 overflow-hidden p-4 sm:p-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <Badge variant="secondary">карты</Badge>
        <h3 className="mt-4 text-2xl font-semibold">Маршрут до филиала</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Embed подключим после подтверждения точных ссылок. Сейчас это безопасные внешние переходы.
        </p>
        <div className="mt-5 grid gap-3 sm:mt-6">
          <Select value={branchId} onChange={(event) => setBranchId(event.target.value as BranchId)}>
            {branches.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortName}
              </option>
            ))}
          </Select>
          <div className="grid grid-cols-2 gap-2">
            <Button variant={provider === "2gis" ? "default" : "outline"} onClick={() => setProvider("2gis")}>
              2ГИС
            </Button>
            <Button variant={provider === "yandex" ? "default" : "outline"} onClick={() => setProvider("yandex")}>
              Яндекс
            </Button>
          </div>
          <Button asChild variant="secondary">
            <a
              href={branch.mapLinks[provider]}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent(eventName, { branch_id: branch.id, placement: "map_tabs" })}
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Открыть маршрут
            </a>
          </Button>
        </div>
      </div>
      <div className="min-h-56 rounded-[1.25rem] border border-border bg-[linear-gradient(135deg,#f8f0eb,#fffdf9)] p-4 sm:min-h-72 sm:p-5">
        {branch.mapEmbeds?.[provider] ? (
          <iframe
            title={`Карта ${branch.shortName}`}
            src={branch.mapEmbeds[provider]}
            className="h-full min-h-48 w-full rounded-[1rem] border-0 sm:min-h-64"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-48 flex-col justify-between rounded-[1rem] border border-dashed border-primary/25 bg-background/70 p-4 sm:min-h-64 sm:p-5">
            <MapPinned className="size-9 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xl font-semibold">{branch.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {branch.address}, {branch.floorRoom}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
