import { getDb } from '../lib/db'
import { users } from '../lib/schema'

export default defineEventHandler(async event => {
  try {
    const db = getDb(event)

    // 测试数据库连接
    const userCount = await db.select().from(users)

    return {
      success: true,
      message: 'Database connection successful',
      data: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
        database: {
          connected: true,
          userCount: userCount.length,
        },
      },
    }
  } catch (error) {
    return {
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
      },
    }
  }
})
