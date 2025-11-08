import { existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import Database from 'better-sqlite3'
import { drizzle as drizzleLocal } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import * as schema from '../lib/schema'

const dbPath = './data/app.db'

async function initDatabase() {
  console.warn('🚀 初始化本地数据库...')

  try {
    // 确保目录存在
    const dbDir = dirname(dbPath)
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true })
      console.warn('📁 创建数据目录')
    }

    // 创建数据库连接
    const sqlite = new Database(dbPath)

    // 启用外键约束
    sqlite.pragma('foreign_keys = ON')

    const db = drizzleLocal(sqlite, { schema })

    console.warn('✅ 数据库连接成功')

    // 运行迁移
    console.warn('📝 执行数据库迁移...')
    await migrate(db, { migrationsFolder: './migrations' })
    console.warn('✅ 数据库迁移完成')

    // 关闭数据库连接
    sqlite.close()

    console.warn('🎉 数据库初始化完成！')
    console.warn(`📁 数据库文件位置: ${dbPath}`)
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error)
    process.exit(1)
  }
}

// 运行初始化
initDatabase()
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ 数据库初始化脚本执行失败:', error)
    process.exit(1)
  })
