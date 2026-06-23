import { Settings2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AdminPreviewCard() {
  return (
    <Card className="border-dashed p-5 shadow-none">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-secondary p-3 text-primary">
          <Settings2 className="size-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold">Mock admin готов к расширению</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            На следующем этапе эти данные можно подключить к реальной базе, Google Sheets или CMS.
          </p>
        </div>
      </div>
    </Card>
  );
}
