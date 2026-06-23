import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex min-h-11 w-full rounded-xl border border-border bg-background px-4 py-2 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground/75 focus-visible:border-primary sm:text-sm",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
