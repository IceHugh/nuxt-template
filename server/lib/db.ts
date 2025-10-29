import { drizzle } from 'drizzle-orm/d1'
import { drizzle as drizzleLocal } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
import { eq } from 'drizzle-orm'

// 获取数据库连接（支持本地开发和生产环境）
export function getDb(event?: any) {
  // 检查是否在 Cloudflare 环境中
  if (event?.context?.cloudflare?.env?.DB) {
    // Cloudflare Pages/Workers 环境 - 使用 D1
    console.log('Using D1 database from Cloudflare environment')
    return drizzle(event.context.cloudflare.env.DB, { schema })
  }

  // 检查是否在全局变量中（某些 Cloudflare Pages 环境）
  if (typeof globalThis !== 'undefined' && (globalThis as any).__env__?.DB) {
    console.log('Using D1 database from global environment')
    return drizzle((globalThis as any).__env__.DB, { schema })
  }

  // 本地开发环境 - 使用 SQLite
  if (process.env.NODE_ENV !== 'production') {
    console.log('Using local SQLite database')
    const dbPath = process.env.DATABASE_URL || './data/app.db'
    const sqlite = new Database(dbPath)

    // 启用外键约束
    sqlite.pragma('foreign_keys = ON')

    return drizzleLocal(sqlite, { schema })
  }

  // 如果在生产环境中但没有找到 D1，抛出详细错误
  console.error('Database connection failed. Available env:', {
    hasEvent: !!event,
    hasCloudflareEnv: !!event?.context?.cloudflare?.env,
    hasDB: !!event?.context?.cloudflare?.env?.DB,
    nodeEnv: process.env.NODE_ENV,
    globalKeys: typeof globalThis !== 'undefined' ? Object.keys(globalThis) : 'undefined'
  })

  throw new Error('Database connection not available - please check D1 binding configuration')
}

// 本地开发专用函数
export function getLocalDb() {
  const dbPath = process.env.DATABASE_URL || './data/app.db'
  const sqlite = new Database(dbPath)

  // 启用外键约束
  sqlite.pragma('foreign_keys = ON')

  return drizzleLocal(sqlite, { schema })
}

// 导出 schema
export { schema }
export { eq }

// 导出数据库类型
export type Database = ReturnType<typeof drizzle>
export type LocalDatabase = ReturnType<typeof drizzleLocal>