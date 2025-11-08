import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const copyButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
    },
  }
)

export const emptyVariants = cva('flex items-center justify-center text-center', {
  variants: {
    layout: {
      default: 'flex-col',
      inline: 'flex-row',
      horizontal: 'flex-row',
      full: 'flex-col',
      card: 'flex-col',
    },
    size: {
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    layout: 'default',
    size: 'default',
  },
})

export type CopyButtonVariants = VariantProps<typeof copyButtonVariants>
export type EmptyVariants = VariantProps<typeof emptyVariants>

// 通用组件导出
export { default as AppLanguageSwitcher } from './AppLanguageSwitcher.vue'
export { default as AppThemeToggle } from './AppThemeToggle.vue'
