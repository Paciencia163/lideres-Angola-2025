import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-luxury focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-transparent hover:border-primary/60 hover:text-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Botão principal: dourado preenchido
        gold: "bg-primary text-primary-foreground uppercase tracking-[0.18em] text-xs hover:bg-[hsl(43_60%_66%)] hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)] active:scale-[0.98]",
        // Botão secundário: contorno dourado
        "gold-outline":
          "border border-primary/70 text-primary uppercase tracking-[0.18em] text-xs bg-transparent hover:bg-primary/10 hover:border-primary active:scale-[0.98]",
        "ivory-ghost":
          "text-foreground/80 uppercase tracking-[0.18em] text-xs hover:text-primary",
      },
      size: {
        default: "h-11 px-6 rounded-sm",
        sm: "h-9 px-4 rounded-sm",
        lg: "h-14 px-9 rounded-sm",
        xl: "h-16 px-10 rounded-sm",
        icon: "h-11 w-11 rounded-full",
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
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
