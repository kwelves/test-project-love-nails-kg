"use client";

import Link from "next/link";
import { CalendarCheck, Images, MapPin, Phone, Scissors, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type NavIcon = "services" | "branches" | "gallery" | "booking" | "contacts";

export interface TubelightNavItem {
  href: `#${string}`;
  label: string;
  icon: NavIcon;
}

const iconMap: Record<NavIcon, LucideIcon> = {
  services: Scissors,
  branches: MapPin,
  gallery: Images,
  booking: CalendarCheck,
  contacts: Phone,
};

export function TubelightNav({
  items,
  activeHref,
  onActiveChange,
  className,
}: Readonly<{
  items: TubelightNavItem[];
  activeHref: TubelightNavItem["href"] | null;
  onActiveChange: (href: TubelightNavItem["href"]) => void;
  className?: string;
}>) {
  const navRef = useRef<HTMLElement | null>(null);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const linkRefs = useRef<Partial<Record<TubelightNavItem["href"], HTMLAnchorElement | null>>>({});
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({
    opacity: 0,
    transform: "translate3d(0, 0, 0)",
    width: 0,
  });

  const updateIndicator = useCallback(() => {
    const activeLink = activeHref ? linkRefs.current[activeHref] : null;

    if (!activeLink) {
      setIndicatorStyle((current) => ({
        ...current,
        opacity: 0,
      }));
      return;
    }

    setIndicatorStyle({
      opacity: 1,
      transform: `translate3d(${activeLink.offsetLeft}px, 0, 0)`,
      width: activeLink.offsetWidth,
    });
  }, [activeHref]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(navRef.current);

    Object.values(linkRefs.current).forEach((link) => {
      if (link) {
        resizeObserver.observe(link);
      }
    });

    window.addEventListener("resize", updateIndicator);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [items, updateIndicator]);

  useEffect(() => {
    if (!activeHref || !activeLinkRef.current) {
      return;
    }

    activeLinkRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeHref]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: TubelightNavItem["href"]) => {
    event.preventDefault();
    onActiveChange(href);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Основная навигация"
      className={cn(
        "tubelight-nav -mx-1 flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border/75 bg-card/82 p-1 text-sm font-semibold text-muted-foreground backdrop-blur-xl [scrollbar-width:none]",
        className,
      )}
    >
      <span className="tubelight-indicator" style={indicatorStyle} aria-hidden="true" />
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive = activeHref === item.href;

        return (
          <Link
            key={item.href}
            ref={(node) => {
              linkRefs.current[item.href] = node;
              if (isActive) {
                activeLinkRef.current = node;
              }
            }}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={(event) => handleNavClick(event, item.href)}
            className={cn(
              "tap-motion relative z-10 inline-flex shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full px-3 py-2 transition-colors duration-300 ease-[var(--ease-ui)] min-[390px]:px-3.5 md:px-4",
              isActive ? "tubelight-item-active text-primary" : "hover:bg-background/58 hover:text-foreground",
            )}
          >
            <Icon className="relative z-10 size-4" aria-hidden="true" />
            <span className="relative z-10 hidden whitespace-nowrap min-[420px]:inline md:inline">{item.label}</span>
            <span className="sr-only">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
