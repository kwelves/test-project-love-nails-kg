"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ContactButton } from "@/components/shared/contact-button";
import { Container } from "@/components/layout/container";
import { TubelightNav, type TubelightNavItem } from "@/components/site/tubelight-nav";
import { cn } from "@/lib/utils";

const navItems: TubelightNavItem[] = [
  { href: "#team", label: "Мастера", icon: "team" },
  { href: "#services", label: "Услуги", icon: "services" },
  { href: "#branches", label: "Филиалы", icon: "branches" },
  { href: "#about", label: "О нас", icon: "about" },
  { href: "#gallery", label: "Работы", icon: "gallery" },
  { href: "#booking", label: "Запись", icon: "booking" },
];

export function Header() {
  const [activeHref, setActiveHref] = useState<TubelightNavItem["href"] | null>(null);
  const navIntentRef = useRef<TubelightNavItem["href"] | null>(null);
  const navIntentTimerRef = useRef<number | null>(null);

  const clearNavIntent = useCallback(() => {
    if (navIntentTimerRef.current) {
      window.clearTimeout(navIntentTimerRef.current);
      navIntentTimerRef.current = null;
    }
    navIntentRef.current = null;
  }, []);

  const syncActiveSection = useCallback(() => {
    const sections = navItems
      .map((item) => ({
        href: item.href,
        element: document.getElementById(item.href.slice(1)),
      }))
      .filter((section): section is { href: TubelightNavItem["href"]; element: HTMLElement } =>
        Boolean(section.element),
      );

    const firstSection = sections[0]?.element;
    if (!firstSection) {
      return;
    }

    const scrollY = window.scrollY;
    const headerOffset = 88;
    const firstSectionTop = firstSection.offsetTop - headerOffset;

    if (scrollY < firstSectionTop) {
      clearNavIntent();
      setActiveHref(null);
      return;
    }

    const probeY = scrollY + headerOffset + Math.min(window.innerHeight * 0.16, 150);
    const current = sections.reduce<TubelightNavItem["href"] | null>((active, section) => {
      return section.element.offsetTop - headerOffset <= probeY ? section.href : active;
    }, sections[0]?.href ?? null);

    if (navIntentRef.current && current !== navIntentRef.current) {
      return;
    }

    if (navIntentRef.current === current) {
      clearNavIntent();
    }

    setActiveHref(current);
  }, [clearNavIntent]);

  useEffect(() => {
    let frame = 0;
    const scheduleSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(syncActiveSection);
    };

    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("hashchange", scheduleSync);

    return () => {
      clearNavIntent();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", scheduleSync);
    };
  }, [clearNavIntent, syncActiveSection]);

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    clearNavIntent();
    setActiveHref(null);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavChange = (href: TubelightNavItem["href"]) => {
    const target = document.getElementById(href.slice(1));
    if (!target) {
      return;
    }

    clearNavIntent();
    navIntentRef.current = href;
    setActiveHref(href);
    window.history.replaceState(null, "", href);
    window.scrollTo({
      top: Math.max(target.offsetTop - 78, 0),
      behavior: "smooth",
    });

    navIntentTimerRef.current = window.setTimeout(() => {
      clearNavIntent();
      syncActiveSection();
    }, 950);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-[#fffdf9]/92 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-13 items-center justify-between gap-3 py-2 md:min-h-14">
          <Link
            href="/"
            onClick={handleBrandClick}
            aria-current={activeHref === null ? "page" : undefined}
            className={cn(
              "brand-home-glow tap-motion shrink-0 text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 min-[390px]:text-sm",
              activeHref === null ? "brand-home-glow-active text-foreground" : "hover:text-primary",
            )}
          >
            LOVE NAILS
          </Link>
          <TubelightNav
            items={navItems}
            activeHref={activeHref}
            onActiveChange={handleNavChange}
            className="hero-top-nav hidden md:flex"
          />
          <div className="hidden md:block">
            <ContactButton
              channel="whatsapp"
              label="WhatsApp"
              size="sm"
              className="whatsapp-header-pill"
              payload={{ placement: "header" }}
            />
          </div>
        </div>
        <TubelightNav
          items={navItems}
          activeHref={activeHref}
          onActiveChange={handleNavChange}
          className="hero-top-nav mb-2 md:hidden"
        />
      </Container>
    </header>
  );
}
