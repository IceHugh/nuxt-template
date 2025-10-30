import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/lib/schema.ts',
  out: './migrations',
  dbCredentials: {
    // 生产环境使用 D1 数据库
    url: process.env.DATABASE_URL || './data/app.db',
  },
  verbose: true,
  strict: true,
  // 为 D1 数据库添加特定的配置
  ...(process.env.NODE_ENV === 'production' && process.env.DATABASE_URL
    ? {
        driver: 'd1-http',
        dbCredentials: {
          url: process.env.DATABASE_URL,
        },
      }
    : {}),
})
