import { getDb } from '../../lib/db'
import { users } from '../../lib/schema'

export default defineEventHandler(async event => {
  try {
    // 获取 D1 数据库实例
    const db = getDb(event)

    // 查询所有用户
    const result = await db.select().from(users)

    return {
      success: true,
      data: result,
      count: result.length,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: '获取用户列表失败',
      data: {
        error: error instanceof Error ? error.message : '未知错误',
      },
    })
  }
})
