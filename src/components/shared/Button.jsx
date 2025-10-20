"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/helpers/tailwind";

const buttonVariants = cva(
  " inline-flex items-center cursor-pointer justify-center hover:opacity-80 gap-1 whitespace-nowrap rounded-3xl md:text-base text-sm two-sec-transition font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive leading-none ",
  {
    variants: {
      variant: {
        default: "bg-mainstack-primary-black text-mainstack-primary-white",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-1 border-mainstack-secondary-gray  bg-mainstack-primary-white text-mainstack-primary-black",
        secondary: "bg-mainstack-secondary-gray text-mainstack-primary-black ",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-3 ",
        sm: "rounded-full gap-1.5 px-4.5 py-2.5 text-sm",
        lg: "rounded-full md:py-3.5 py-2 md:px-13 px-5",
        icon: "p-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      children,
      disabled,
      onClick,
      loading,
      className,
      icon,
      id,
      style,
      variant,
      size,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick}
        disabled={disabled || loading}
        id={id}
        style={style}
        type={type}
        {...props}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            {children}
            {icon && (
              <span className="w-8 h-8 flex items-center justify-center rounded-sm shrink-0">
                {icon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
