import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-neutral-400 h-7 rounded-sm placeholder:text-muted-foreground focus:ring-0 flex min-h-16 w-full border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-nonedisabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none break-words whitespace-pre-wrap",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
