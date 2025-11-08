import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { drizzle as drizzleLocal } from 'drizzle-orm/better-sqlite3'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

// 缓存数据库连接以避免重复日志
let cachedDb: any = null
let dbLogged = false

// 获取数据库连接（支持本地开发和生产环境）
export function getDb(event?: any) {
  // 检查是否在 Cloudflare 环境中
  if (event?.context?.cloudflare?.env?.DB) {
    // Cloudflare Pages/Workers 环境 - 使用 D1
    if (!dbLogged) {
      console.warn('Using D1 database from Cloudflare environment')
      dbLogged = true
    }
    return drizzle(event.context.cloudflare.env.DB, { schema })
  }

  // 检查是否在全局变量中（某些 Cloudflare Pages 环境）
  if (typeof globalThis !== 'undefined' && (globalThis as any).__env__?.DB) {
    if (!dbLogged) {
      console.warn('Using D1 database from global environment')
      dbLogged = true
    }
    return drizzle((globalThis as any).__env__.DB, { schema })
  }

  // 本地开发环境 - 使用 SQLite
  if (process.env.NODE_ENV !== 'production') {
    // 如果已有缓存的数据库连接，直接返回
    if (cachedDb) {
      return cachedDb
    }

    // 只在第一次连接时输出日志
    if (!dbLogged) {
      console.warn('Using local SQLite database')
      dbLogged = true
    }

    const dbPath = process.env.DATABASE_URL || './data/app.db'
    const sqlite = new Database(dbPath)

    // 启用外键约束
    sqlite.pragma('foreign_keys = ON')

    cachedDb = drizzleLocal(sqlite, { schema })
    return cachedDb
  }

  // 如果在生产环境中但没有找到 D1，抛出详细错误
  console.error('Database connection failed. Available env:', {
    hasEvent: !!event,
    hasCloudflareEnv: !!event?.context?.cloudflare?.env,
    hasDB: !!event?.context?.cloudflare?.env?.DB,
    nodeEnv: process.env.NODE_ENV,
    globalKeys: typeof globalThis !== 'undefined' ? Object.keys(globalThis) : 'undefined',
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
export type AppDatabase = ReturnType<typeof drizzle>
export type LocalDatabase = ReturnType<typeof drizzleLocal>
