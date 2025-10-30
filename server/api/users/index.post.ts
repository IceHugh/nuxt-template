import { eq } from 'drizzle-orm'
import { getDb } from '../../lib/db'
import { users } from '../../lib/schema'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)

    // 验证必填字段
    if (!body.email || !body.name) {
      throw createError({
        statusCode: 400,
        statusMessage: '邮箱和姓名为必填项',
      })
    }

    // 获取 D1 数据库实例
    const db = getDb(event)

    // 检查邮箱是否已存在
    const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1)

    if (existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: '该邮箱已被注册',
      })
    }

    // 创建新用户
    const newUser = {
      email: body.email,
      name: body.name,
      avatar: body.avatar || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.insert(users).values(newUser).returning()

    return {
      success: true,
      data: result[0],
      message: '用户创建成功',
    }
  } catch (error) {
    // 如果是我们主动抛出的错误，直接抛出
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '创建用户失败',
      data: {
        error: error instanceof Error ? error.message : '未知错误',
      },
    })
  }
})
