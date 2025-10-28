import { createTRPCFetch } from '@trpc/client'
import type { AppRouter } from '~/server/trpc/router'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser should use relative URL
    return ''
  }

  // Server-side rendering
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Development
  return 'http://localhost:3000'
}

export const trpc = createTRPCFetch<AppRouter>({
  links: [
    {
      url: `${getBaseUrl()}/api/trpc`,
    },
  ],
})