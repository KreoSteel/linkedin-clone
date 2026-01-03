import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-neutral-300",
        bottomBorder: "border-b border-t-0 border-l-0 border-r-0 rounded-none border-neutral-300 focus-visible:border-b-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Input({ className, type, variant = "default", ...props }: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({ variant, className })
      )}
      {...props}
    />
  )
}

export { Input }
