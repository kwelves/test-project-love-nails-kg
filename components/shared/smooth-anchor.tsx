"use client";

import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { scrollToAnchorHash } from "@/components/shared/anchor-scroll";

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

          if (!scrollToAnchorHash(href)) {
            return;
          }

          event.preventDefault();
          window.history.pushState(null, "", href);
        }}
      />
    );
  },
);

SmoothAnchor.displayName = "SmoothAnchor";
