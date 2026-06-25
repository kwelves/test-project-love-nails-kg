"use client";

import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";

interface SmoothAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const SmoothAnchor = forwardRef<HTMLAnchorElement, SmoothAnchorProps>(
  ({ href, onClick, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || !href.startsWith("#")) {
            return;
          }

          const target = document.getElementById(href.slice(1));
          if (!target) {
            return;
          }

          event.preventDefault();
          window.history.pushState(null, "", href);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
    );
  },
);

SmoothAnchor.displayName = "SmoothAnchor";
