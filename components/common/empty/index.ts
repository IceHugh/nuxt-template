import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export { default as Empty } from "./Empty.vue";

export const emptyVariants = cva(
  "flex flex-col items-center justify-center text-center p-8",
  {
    variants: {
      layout: {
        card: "rounded-lg border bg-card text-card-foreground shadow-sm",
        full: "w-full min-h-[200px]",
        inline: "flex-row gap-4 p-4 text-left",
        compact: "py-6",
      },
      size: {
        sm: "p-4 text-sm",
        default: "p-8",
        lg: "p-12 text-lg",
      },
    },
    defaultVariants: {
      layout: "card",
      size: "default",
    },
  }
);

export type EmptyVariants = VariantProps<typeof emptyVariants>;