import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '~/server/trpc/router'

const handler = fetchRequestHandler({
  endpoint: '/api/trpc',
  router: appRouter,
  createContext: () => ({}),
})

export default defineEventHandler(handler)