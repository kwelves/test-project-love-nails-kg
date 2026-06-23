import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm uppercase tracking-[0.16em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Страница не найдена</h1>
        <p className="mt-3 text-muted-foreground">
          Возможно, ссылка устарела. Вернитесь на главную и выберите запись, филиал или услугу.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </main>
  );
}
