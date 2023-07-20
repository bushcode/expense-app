import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(ButtonVariants({ variant, size, className }))}
        disabled={isLoading}
        {...props}
        ref={ref}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);

export default Button;

export const ButtonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none font-semibold tracking-wide text-gray-700 text-sm",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        ghost: "bg-transparent hover:text-slate-900 hover:bg-slate-200 border",
        outline:
          "bg-transparent border border-slate-900 text-slate-900 hover:bg-slate-800 hover:text-white",
      },
      size: {
        default: "h-12 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
