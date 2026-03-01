import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BentoItem {
  id: string
  className?: string
  children: ReactNode
}

interface BentoGridProps {
  items: BentoItem[]
  className?: string
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.id} className={cn("min-h-[180px]", item.className)}>
          {item.children}
        </div>
      ))}
    </div>
  )
}

// Preset sizing classes for bento items
export const bentoSizes = {
  default: "",
  wide: "md:col-span-2",
  tall: "row-span-2",
  large: "md:col-span-2 row-span-2",
  full: "col-span-full",
}
