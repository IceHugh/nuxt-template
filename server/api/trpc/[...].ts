import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../../trpc/router'

export default defineEventHandler(async event => {
  const url = getRequestURL(event)

  // 读取请求体
  let body: any
  const method = event.node.req.method

  if (!['GET', 'HEAD'].includes(method)) {
    body = await readRawBody(event)
  }

  // 构建headers对象，避免使用可能包含非法值的headers
  const headers: Record<string, string> = {}
  if (event.node.req.headers) {
    Object.entries(event.node.req.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value
      } else if (Array.isArray(value)) {
        headers[key] = value.join(', ')
      } else if (value !== undefined) {
        headers[key] = String(value)
      }
    })
  }

  // 构建标准Request对象
  const requestInit: RequestInit = {
    method,
    headers,
  }

  // 只有在有body时才添加body和duplex选项
  if (body) {
    requestInit.body = body
    requestInit.duplex = 'half'
  }

  const request = new Request(url.toString(), requestInit)

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: () => ({ event }),
  })
})
