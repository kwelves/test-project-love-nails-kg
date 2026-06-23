import * as React from "react";
import { Slot } from "@/components/ui/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[background,color,transform,box-shadow,border-color] duration-200 ease-[var(--ease-ui)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-button hover:bg-[#7f1836] hover:shadow-[0_16px_34px_rgb(142_31_63_/_0.24)]",
        secondary:
          "border border-border bg-secondary text-secondary-foreground hover:border-primary/35 hover:bg-[#f5e4dc]",
        ghost: "text-foreground hover:bg-muted",
        outline:
          "border border-border bg-background/70 text-foreground hover:border-primary/40 hover:bg-muted",
        dark: "bg-foreground text-background hover:bg-[#343036]",
      },
      size: {
        default: "px-5 py-3",
        sm: "min-h-9 px-4 py-2 text-xs",
        lg: "min-h-12 px-6 py-3.5 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return <Slot className={classes} {...props} />;
    }

    return <button className={classes} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
