import type { AppRouter } from '@@/server/trpc/router'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use relative URL
    return ''
  }

  // Server-side rendering
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Development - 使用正确的端口
  return `http://localhost:${process.env.NUXT_PORT || process.env.PORT || 3000}`
}

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})
