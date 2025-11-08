import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '../../lib/db'
import type { NewDebugRecord } from '../../lib/schema'
import { debugRecords } from '../../lib/schema'

// 辅助函数：获取数据库连接
const getDatabase = (event?: any) => getDb(event)

const _createRecordSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  status: z.string().default('active'),
})

const _updateRecordSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  status: z.string().optional(),
})

const _deleteRecordSchema = z.object({
  id: z.number(),
})

export const debugRouter = {
  // 数据库连接状态检查
  checkConnection: async (event?: any) => {
    try {
      const db = getDatabase(event)
      // 执行一个简单的查询来测试连接
      await db.select().from(debugRecords).limit(1)

      return {
        status: 'connected',
        timestamp: new Date().toISOString(),
        message: '数据库连接正常',
      }
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: error instanceof Error ? error.message : '未知连接错误',
      }
    }
  },

  // 获取所有调试记录
  getRecords: async (event?: any) => {
    try {
      const db = getDatabase(event)
      const records = await db.select().from(debugRecords).orderBy(desc(debugRecords.createdAt))

      return {
        success: true,
        data: records,
        count: records.length,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '获取记录失败',
      }
    }
  },

  // 根据 ID 获取单条记录
  getRecordById: async (input: { id: number }, event?: any) => {
    try {
      const db = getDatabase(event)
      const record = await db
        .select()
        .from(debugRecords)
        .where(eq(debugRecords.id, input.id))
        .limit(1)

      if (record.length === 0) {
        return {
          success: false,
          error: '记录不存在',
        }
      }

      return {
        success: true,
        data: record[0],
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '获取记录失败',
      }
    }
  },

  // 创建新记录
  createRecord: async (input: z.infer<typeof _createRecordSchema>, event?: any) => {
    try {
      const db = getDb(event)

      const newRecord: NewDebugRecord = {
        title: input.title,
        description: input.description,
        status: input.status,
      }

      const result = await db.insert(debugRecords).values(newRecord).returning()

      return {
        success: true,
        data: result[0],
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '创建记录失败',
      }
    }
  },

  // 更新记录
  updateRecord: async (input: z.infer<typeof _updateRecordSchema>, event?: any) => {
    try {
      const db = getDatabase(event)

      // 先检查记录是否存在
      const existing = await db
        .select()
        .from(debugRecords)
        .where(eq(debugRecords.id, input.id))
        .limit(1)

      if (existing.length === 0) {
        return {
          success: false,
          error: '记录不存在',
        }
      }

      // 准备更新数据
      const updateData: Partial<NewDebugRecord> = {}
      if (input.title !== undefined) updateData.title = input.title
      if (input.description !== undefined) updateData.description = input.description
      if (input.status !== undefined) updateData.status = input.status

      const result = await db
        .update(debugRecords)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(debugRecords.id, input.id))
        .returning()

      return {
        success: true,
        data: result[0],
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '更新记录失败',
      }
    }
  },

  // 删除记录
  deleteRecord: async (input: z.infer<typeof _deleteRecordSchema>, event?: any) => {
    try {
      const db = getDatabase(event)

      // 先检查记录是否存在
      const existing = await db
        .select()
        .from(debugRecords)
        .where(eq(debugRecords.id, input.id))
        .limit(1)

      if (existing.length === 0) {
        return {
          success: false,
          error: '记录不存在',
        }
      }

      await db.delete(debugRecords).where(eq(debugRecords.id, input.id))

      return {
        success: true,
        message: '删除成功',
        deletedId: input.id,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '删除记录失败',
      }
    }
  },

  // 批量创建记录
  bulkCreate: async (input: { records: z.infer<typeof _createRecordSchema>[] }, event?: any) => {
    try {
      const db = getDatabase(event)

      const newRecords: NewDebugRecord[] = input.records.map(record => ({
        title: record.title,
        description: record.description,
        status: record.status,
      }))

      const result = await db.insert(debugRecords).values(newRecords).returning()

      return {
        success: true,
        data: result,
        count: result.length,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '批量创建失败',
      }
    }
  },

  // 清空所有记录
  clearAll: async (event?: any) => {
    try {
      const db = getDatabase(event)
      const result = await db.delete(debugRecords)

      return {
        success: true,
        message: '清空成功',
        deletedCount: result.changes || 0,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '清空失败',
      }
    }
  },

  // 获取数据库统计信息
  getStats: async (event?: any) => {
    try {
      const db = getDatabase(event)
      const records = await db.select().from(debugRecords)

      const stats = {
        totalRecords: records.length,
        activeRecords: records.filter((r: any) => r.status === 'active').length,
        inactiveRecords: records.filter((r: any) => r.status !== 'active').length,
        lastUpdated:
          records.length > 0
            ? Math.max(...records.map((r: any) => new Date(r.updatedAt).getTime()))
            : null,
      }

      return {
        success: true,
        data: stats,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '获取统计信息失败',
      }
    }
  },
}
