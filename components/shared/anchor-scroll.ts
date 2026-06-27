"use client";

const anchorGap = 12;

export function getAnchorOffset() {
  if (typeof document === "undefined") {
    return 0;
  }

  const header = document.querySelector<HTMLElement>("[data-site-header]");
  return (header?.getBoundingClientRect().height ?? 0) + anchorGap;
}

export function scrollToAnchorElement(element: HTMLElement, behavior: ScrollBehavior = "smooth") {
  const top = Math.max(element.getBoundingClientRect().top + window.scrollY - getAnchorOffset(), 0);
  window.scrollTo({ top, behavior });
}

export function scrollToAnchorHash(hash: string, behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById(hash.replace(/^#/, ""));
  if (!target) {
    return false;
  }

  scrollToAnchorElement(target, behavior);
  return true;
}
