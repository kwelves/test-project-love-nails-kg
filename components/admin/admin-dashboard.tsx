"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Lock, Save, Settings2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AdminPreviewCard } from "@/components/salon/admin-preview-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { branches as defaultBranches } from "@/lib/data/branches";
import { masters as defaultMasters } from "@/lib/data/masters";
import { salon as defaultSalon } from "@/lib/data/salon";
import { services as defaultServices } from "@/lib/data/services";
import type { Branch, Master, SalonInfo, Service } from "@/lib/domain/types";

type AdminTab = "salon" | "branches" | "services" | "masters" | "contacts" | "maps" | "hero" | "promo" | "seo";

interface AdminState {
  salon: SalonInfo;
  branches: Branch[];
  services: Service[];
  masters: Master[];
  heroTitle: string;
  heroCopy: string;
  promo: string;
  seoTitle: string;
  seoDescription: string;
}

const initialState: AdminState = {
  salon: defaultSalon,
  branches: defaultBranches,
  services: defaultServices,
  masters: defaultMasters,
  heroTitle: "Love Nails - nail-студии в Бишкеке с 2016 года",
  heroCopy:
    "Маникюр, педикюр, покрытие, дизайн и наращивание в удобных филиалах. Выберите филиал, услугу и мастера - администратор подтвердит запись.",
  promo: "Fix price от 850 сом",
  seoTitle: "Love Nails Бишкек - маникюр, педикюр, покрытие и наращивание",
  seoDescription:
    "Love Nails - сеть nail-студий в Бишкеке с 2016 года. Маникюр от 500 сом, покрытие от 850 сом, френч, дизайн, педикюр и наращивание.",
};

const tabs: { id: AdminTab; label: string }[] = [
  { id: "salon", label: "Салон" },
  { id: "branches", label: "Филиалы" },
  { id: "services", label: "Услуги" },
  { id: "masters", label: "Мастера" },
  { id: "contacts", label: "Контакты" },
  { id: "maps", label: "Карты" },
  { id: "hero", label: "Hero" },
  { id: "promo", label: "Акции" },
  { id: "seo", label: "SEO preview" },
];

const storageKey = "love-nails-admin-state";

export function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("salon");
  const [state, setState] = useState<AdminState>(initialState);
  const [saved, setSaved] = useState(false);
  const [serverStats, setServerStats] = useState<{
    newBookings: number;
    todayBookings: number;
    servicesMissingPriceOrDuration: number;
    needsConfirmation: number;
  } | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      setState(JSON.parse(raw) as AdminState);
    }
  }, []);

  const stats = useMemo(
    () => [
      { label: "новых заявок", value: serverStats?.newBookings ?? 0 },
      { label: "заявок сегодня", value: serverStats?.todayBookings ?? 0 },
      { label: "активных мастеров", value: state.masters.filter((master) => master.isActive).length },
      { label: "требуют подтверждения", value: serverStats?.needsConfirmation ?? state.masters.filter((master) => master.needsConfirmation).length },
    ],
    [serverStats, state],
  );

  const refreshSummary = async () => {
    const response = await fetch("/api/admin/summary");
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as { stats?: typeof serverStats };
    if (data.stats) {
      setServerStats(data.stats);
    }
  };

  const login = async () => {
    setLoginError("");
    trackEvent("admin_login_attempt", { has_password: Boolean(password.trim()) });
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json()) as { ok: boolean; message?: string };
    if (!response.ok || !data.ok) {
      setLoginError(data.message ?? "Не удалось войти.");
      return;
    }
    setUnlocked(true);
    void refreshSummary();
  };

  const save = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    trackEvent("admin_update_saved", { storage: "localStorage" });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  if (!unlocked) {
    return (
      <main className="min-h-[100dvh] bg-background py-10">
        <Container>
          <div className="mx-auto max-w-md">
            <Card className="p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Lock className="size-6" aria-hidden="true" />
              </div>
              <h1 className="mt-5 text-3xl font-semibold">Mock admin</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Вход проверяется через серверный API и httpOnly cookie. Это MVP-auth без ролей и базы пользователей.
              </p>
              <div className="mt-6 grid gap-3">
                <Label htmlFor="admin-password">Пароль</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Любое значение для демо"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {loginError && <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">{loginError}</p>}
                <Button disabled={!password.trim()} onClick={login}>
                  Войти
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/">На сайт</Link>
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-background py-6 sm:py-8">
      <Container>
        <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-center md:justify-between md:pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Love Nails admin MVP</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Управление контентом</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link href="/">
                <Eye className="size-4" aria-hidden="true" />
                На сайт
              </Link>
            </Button>
            <Button onClick={save}>
              <Save className="size-4" aria-hidden="true" />
              {saved ? "Сохранено" : "Сохранить localStorage"}
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.label} className="p-5 shadow-none">
              <p className="font-mono text-3xl font-semibold text-primary">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:mt-8 lg:grid-cols-[250px_1fr] lg:gap-6">
          <aside className="-mx-4 overflow-x-auto border-y border-border bg-card p-3 min-[390px]:-mx-5 sm:mx-0 sm:rounded-[1.25rem] sm:border lg:sticky lg:top-24 lg:self-start">
            <div className="flex gap-2 lg:grid lg:gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="grid gap-5">
            <AdminPreviewCard />
            {activeTab === "salon" && (
              <Panel title="Салон">
                <TextField
                  label="Название"
                  value={state.salon.name}
                  onChange={(value) => setState((current) => ({ ...current, salon: { ...current.salon, name: value } }))}
                />
                <TextField
                  label="Позиционирование"
                  value={state.salon.positioning}
                  onChange={(value) =>
                    setState((current) => ({ ...current, salon: { ...current.salon, positioning: value } }))
                  }
                />
                <AreaField
                  label="Описание"
                  value={state.salon.description}
                  onChange={(value) =>
                    setState((current) => ({ ...current, salon: { ...current.salon, description: value } }))
                  }
                />
              </Panel>
            )}
            {activeTab === "branches" && (
              <Panel title="Филиалы">
                {state.branches.map((branch, index) => (
                  <EditableBlock key={branch.id} title={branch.name}>
                    <TextField
                      label="Название"
                      value={branch.name}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          branches: current.branches.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, name: value } : item,
                          ),
                        }))
                      }
                    />
                    <TextField
                      label="Адрес"
                      value={branch.address}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          branches: current.branches.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, address: value } : item,
                          ),
                        }))
                      }
                    />
                  </EditableBlock>
                ))}
              </Panel>
            )}
            {activeTab === "services" && (
              <Panel title="Услуги">
                {state.services.map((service, index) => (
                  <EditableBlock key={service.id} title={service.shortName}>
                    <TextField
                      label="Название"
                      value={service.name}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          services: current.services.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, name: value } : item,
                          ),
                        }))
                      }
                    />
                    <TextField
                      label="Цена от"
                      value={String(service.priceFrom ?? "")}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          services: current.services.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, priceFrom: Number(value) || undefined } : item,
                          ),
                        }))
                      }
                    />
                  </EditableBlock>
                ))}
              </Panel>
            )}
            {activeTab === "masters" && (
              <Panel title="Мастера">
                {state.masters.slice(0, 10).map((master, index) => (
                  <EditableBlock key={master.id} title={master.name}>
                    <TextField
                      label="Имя"
                      value={master.name}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          masters: current.masters.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, name: value } : item,
                          ),
                        }))
                      }
                    />
                    <TextField
                      label="Специализация"
                      value={master.specialty}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          masters: current.masters.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, specialty: value } : item,
                          ),
                        }))
                      }
                    />
                    <Label className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={master.isActive}
                        onChange={(event) =>
                          setState((current) => ({
                            ...current,
                            masters: current.masters.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, isActive: event.target.checked } : item,
                            ),
                          }))
                        }
                      />
                      Показывать публично
                    </Label>
                  </EditableBlock>
                ))}
              </Panel>
            )}
            {activeTab === "contacts" && (
              <Panel title="Контакты">
                <TextField
                  label="Телефон"
                  value={state.salon.contact.phone}
                  onChange={(value) =>
                    setState((current) => ({
                      ...current,
                      salon: { ...current.salon, contact: { ...current.salon.contact, phone: value } },
                    }))
                  }
                />
                <TextField
                  label="Instagram"
                  value={state.salon.contact.instagramUrl}
                  onChange={(value) =>
                    setState((current) => ({
                      ...current,
                      salon: { ...current.salon, contact: { ...current.salon.contact, instagramUrl: value } },
                    }))
                  }
                />
              </Panel>
            )}
            {activeTab === "maps" && (
              <Panel title="Карты">
                <p className="text-sm text-muted-foreground">Редактирование ссылок и embed для каждого филиала. Если embed пустой, сайт показывает красивый placeholder и кнопку маршрута.</p>
                {state.branches.map((branch, index) => (
                  <EditableBlock key={branch.id} title={branch.name}>
                    <TextField
                      label="Yandex Maps link"
                      value={branch.mapLinks.yandex}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          branches: current.branches.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, mapLinks: { ...item.mapLinks, yandex: value } } : item,
                          ),
                        }))
                      }
                    />
                    <TextField
                      label="2GIS link"
                      value={branch.mapLinks["2gis"]}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          branches: current.branches.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, mapLinks: { ...item.mapLinks, "2gis": value } } : item,
                          ),
                        }))
                      }
                    />
                    <TextField
                      label="Yandex embed"
                      value={branch.mapEmbeds?.yandex ?? ""}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          branches: current.branches.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, mapEmbeds: { ...item.mapEmbeds, yandex: value } }
                              : item,
                          ),
                        }))
                      }
                    />
                    <TextField
                      label="2GIS embed"
                      value={branch.mapEmbeds?.["2gis"] ?? ""}
                      onChange={(value) =>
                        setState((current) => ({
                          ...current,
                          branches: current.branches.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, mapEmbeds: { ...item.mapEmbeds, "2gis": value } }
                              : item,
                          ),
                        }))
                      }
                    />
                  </EditableBlock>
                ))}
              </Panel>
            )}
            {activeTab === "hero" && (
              <Panel title="Hero">
                <TextField label="H1" value={state.heroTitle} onChange={(value) => setState((current) => ({ ...current, heroTitle: value }))} />
                <AreaField label="Subcopy" value={state.heroCopy} onChange={(value) => setState((current) => ({ ...current, heroCopy: value }))} />
              </Panel>
            )}
            {activeTab === "promo" && (
              <Panel title="Акции">
                <TextField label="Активный оффер" value={state.promo} onChange={(value) => setState((current) => ({ ...current, promo: value }))} />
              </Panel>
            )}
            {activeTab === "seo" && (
              <Panel title="SEO preview">
                <TextField label="SEO title" value={state.seoTitle} onChange={(value) => setState((current) => ({ ...current, seoTitle: value }))} />
                <AreaField
                  label="Meta description"
                  value={state.seoDescription}
                  onChange={(value) => setState((current) => ({ ...current, seoDescription: value }))}
                />
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-lg text-blue-700">{state.seoTitle}</p>
                  <p className="mt-1 text-sm text-green-700">love-nails.kg</p>
                  <p className="mt-1 text-sm text-muted-foreground">{state.seoDescription}</p>
                </div>
              </Panel>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}

function Panel({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <Settings2 className="size-5 text-primary" aria-hidden="true" />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="grid gap-4">{children}</div>
    </Card>
  );
}

function EditableBlock({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="mb-4 font-semibold">{title}</p>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function TextField({ label, value, onChange }: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) {
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function AreaField({ label, value, onChange }: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) {
  return (
    <div className="sm:col-span-2">
      <Label className="mb-2 block">{label}</Label>
      <Textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
