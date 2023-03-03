import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  [
    "group select-none",
    "inline-flex items-center justify-center",
    "rounded-md border",
    "px-3 py-1.5",
    "text-sm text-foreground",
    "transition-colors active:scale-95",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-pink-500 bg-pink-500",
          "hover:bg-pink-600 hover:border-pink-600",
          "focus:ring-pink-600",
        ],
        destructive: [
          "text-red-700 bg-transparent border-red-200",
          "hover:bg-red-100 hover:border-red-200",
          "focus:ring-red-600 focus:bg-red-100",
        ],
        outline: [
          "bg-transparent text-pink-700 border-pink-200",
          "hover:bg-pink-100",
        ],
        ghost: [
          "bg-transparent border-transparent",
          "hover:text-pink-900 hover:bg-pink-50",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonStyles> {
  leading?: ReactNode;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant, leading, className, ...rest },
  ref
) {
  return (
    <button ref={ref} className={buttonStyles({ variant })} {...rest}>
      {leading && (
        <span
          className={clsx(
            "mr-2 -ml-0.5 flex h-5 w-5 items-center justify-center",
            variant === "destructive" && "text-red-500"
          )}
        >
          {leading}
        </span>
      )}
      {children}
    </button>
  );
});
