import { getLocalDb } from '../lib/db'
import { categories, postCategories, posts, users } from '../lib/schema'

const db = getLocalDb()

async function seed() {
  console.warn('🌱 开始种子数据...')

  try {
    // 清空现有数据
    await db.delete(postCategories)
    await db.delete(posts)
    await db.delete(users)
    await db.delete(categories)
    console.warn('✅ 清空现有数据')

    // 创建分类
    const [techCategory] = await db
      .insert(categories)
      .values({
        name: '技术',
        slug: 'tech',
        description: '技术相关文章',
        createdAt: new Date(),
      })
      .returning()

    const [_lifeCategory] = await db
      .insert(categories)
      .values({
        name: '生活',
        slug: 'life',
        description: '生活随笔',
        createdAt: new Date(),
      })
      .returning()

    const [tutorialCategory] = await db
      .insert(categories)
      .values({
        name: '教程',
        slug: 'tutorial',
        description: '编程教程',
        createdAt: new Date(),
      })
      .returning()

    console.warn('✅ 创建分类完成')

    // 创建用户
    const [adminUser] = await db
      .insert(users)
      .values({
        email: 'admin@example.com',
        name: '管理员',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    const [authorUser] = await db
      .insert(users)
      .values({
        email: 'author@example.com',
        name: '作者',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=author',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.warn('✅ 创建用户完成')

    // 创建文章
    const [post1] = await db
      .insert(posts)
      .values({
        title: '欢迎使用 Drizzle ORM',
        content: `# 欢迎使用 Drizzle ORM

这是一篇示例文章，展示了如何在 Nuxt 4 中使用 Drizzle ORM 和 Cloudflare D1。

## 主要特性

- 类型安全的数据库操作
- 自动迁移管理
- 支持 Cloudflare D1
- 本地开发支持

## 开始使用

1. 运行 \`bun run db:reset\` 重置数据库
2. 运行 \`bun run db:seed\` 添加种子数据
3. 启动开发服务器 \`bun run dev\`

祝您开发愉快！`,
        excerpt: '这是一篇关于 Drizzle ORM 和 Nuxt 4 集成的介绍文章。',
        slug: 'welcome-to-drizzle-orm',
        published: 1,
        authorId: adminUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    const [post2] = await db
      .insert(posts)
      .values({
        title: 'Cloudflare D1 入门指南',
        content: `# Cloudflare D1 入门指南

Cloudflare D1 是一个基于 SQLite 的全球分布式 SQL 数据库。

## 什么是 D1？

- 全球分布的 SQLite 数据库
- 无服务器架构
- 边缘计算优化
- 与 Cloudflare Workers 深度集成

## 如何在项目中使用

1. 创建 D1 数据库
2. 配置 wrangler.toml
3. 使用 Drizzle ORM 连接
4. 编写数据库操作代码

## 最佳实践

- 使用索引优化查询性能
- 合理设计数据结构
- 利用边缘缓存`,
        excerpt: '学习如何使用 Cloudflare D1 构建高性能应用。',
        slug: 'cloudflare-d1-getting-started',
        published: 1,
        authorId: authorUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    const [post3] = await db
      .insert(posts)
      .values({
        title: 'Nuxt 4 新特性介绍',
        content: `# Nuxt 4 新特性介绍

Nuxt 4 带来了许多令人兴奋的新特性和改进。

## 主要改进

### 性能优化
- 更快的冷启动
- 更好的 SSR 性能
- 优化的包大小

### 开发体验
- 改进的热重载
- 更好的 TypeScript 支持
- 新的开发工具

### 生态系统
- 兼容更多数据库
- 更多的集成选项
- 改进的部署流程`,
        excerpt: '探索 Nuxt 4 框架的最新特性和改进。',
        slug: 'nuxt-4-new-features',
        published: 0, // 草稿
        authorId: authorUser.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.warn('✅ 创建文章完成')

    // 创建文章分类关联
    await db.insert(postCategories).values([
      { postId: post1.id, categoryId: tutorialCategory.id },
      { postId: post2.id, categoryId: techCategory.id },
      { postId: post2.id, categoryId: tutorialCategory.id },
      { postId: post3.id, categoryId: techCategory.id },
    ])

    console.warn('✅ 创建文章分类关联完成')

    // 输出统计信息
    const userCount = await db.select().from(users)
    const postCount = await db.select().from(posts)
    const categoryCount = await db.select().from(categories)

    console.warn('🎉 种子数据创建完成！')
    console.warn('📊 统计信息:')
    console.warn(`   - 用户数量: ${userCount.length}`)
    console.warn(`   - 文章数量: ${postCount.length}`)
    console.warn(`   - 分类数量: ${categoryCount.length}`)
    console.warn(`   - 已发布文章: ${postCount.filter(p => p.published).length}`)
    console.warn(`   - 草稿文章: ${postCount.filter(p => !p.published).length}`)
  } catch (error) {
    console.error('❌ 种子数据创建失败:', error)
    process.exit(1)
  }
}

// 运行种子数据
seed()
  .then(() => {
    console.warn('🎉 种子数据脚本执行完成')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ 种子数据脚本执行失败:', error)
    process.exit(1)
  })
