import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { debugRouter } from './routes/debug'

const t = initTRPC.create()

/**
 * Export type router type signature,
 * this is used by the client.
 */
export type AppRouter = typeof appRouter

/**
 * Create your application's root router
 */
export const appRouter = t.router({
  greeting: t.procedure
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name ?? 'World'}!`,
        timestamp: new Date().toISOString(),
      }
    }),

  health: t.procedure.query(() => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  }),

  userInfo: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        id: input.id,
        name: `User ${input.id}`,
        email: `user${input.id}@example.com`,
        createdAt: new Date().toISOString(),
      }
    }),

  // 调试相关路由
  debug: t.router({
    // 数据库连接状态检查
    checkConnection: t.procedure.query(({ ctx }) => debugRouter.checkConnection(ctx.event)),

    // 获取所有调试记录
    getRecords: t.procedure.query(({ ctx }) => debugRouter.getRecords(ctx.event)),

    // 根据 ID 获取单条记录
    getRecordById: t.procedure
      .input(z.object({ id: z.number() }))
      .query(({ input, ctx }) => debugRouter.getRecordById(input, ctx.event)),

    // 创建新记录
    createRecord: t.procedure
      .input(
        z.object({
          title: z.string().min(1).max(255),
          description: z.string().optional(),
          status: z.string().default('active'),
        })
      )
      .mutation(({ input, ctx }) => debugRouter.createRecord(input, ctx.event)),

    // 更新记录
    updateRecord: t.procedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).max(255).optional(),
          description: z.string().optional(),
          status: z.string().optional(),
        })
      )
      .mutation(({ input, ctx }) => debugRouter.updateRecord(input, ctx.event)),

    // 删除记录
    deleteRecord: t.procedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input, ctx }) => debugRouter.deleteRecord(input, ctx.event)),

    // 批量创建记录
    bulkCreate: t.procedure
      .input(
        z.object({
          records: z.array(
            z.object({
              title: z.string().min(1).max(255),
              description: z.string().optional(),
              status: z.string().default('active'),
            })
          ),
        })
      )
      .mutation(({ input, ctx }) => debugRouter.bulkCreate(input, ctx.event)),

    // 清空所有记录
    clearAll: t.procedure.mutation(({ ctx }) => debugRouter.clearAll(ctx.event)),

    // 获取数据库统计信息
    getStats: t.procedure.query(({ ctx }) => debugRouter.getStats(ctx.event)),
  }),
})
