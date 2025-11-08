[根目录](../../CLAUDE.md) > **migrations**

# Migrations 数据库迁移模块文档

## 变更记录 (Changelog)

### 2025-10-29 14:46:59

- 初始化 migrations 模块文档
- 完成数据库迁移文件分析
- 识别 Drizzle ORM 迁移结构

## 模块职责

`migrations/` 目录负责数据库架构变更的管理和版本控制。通过 Drizzle ORM 的迁移系统，确保数据库架构在不同环境（开发、测试、生产）之间的一致性，支持数据库结构的演进和回滚。

## 目录结构

```
migrations/
├── 0000_icy_nicolaos.sql      # 初始数据库架构
├── 0001_lyrical_mole_man.sql  # 第二次架构更新
└── meta/                      # 迁移元数据
    ├── _journal.json          # 迁移日志
    ├── 0000_snapshot.json     # 初始架构快照
    └── 0001_snapshot.json     # 第二次架构快照
```

## 入口与启动

### Drizzle 配置

在 `drizzle.config.ts` 中配置迁移：

```typescript
export default defineConfig({
  dialect: 'sqlite',
  schema: './server/lib/schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || './data/app.db',
  },
  verbose: true,
  strict: true,
})
```

### 迁移命令

```bash
# 生成迁移文件
bun run db:generate

# 应用迁移
bun run db:migrate

# 推送架构到 D1（生产环境）
bun run db:push

# 打开迁移管理界面
bun run db:studio
```

## 迁移文件详解

### 0000_icy_nicolaos.sql - 初始架构

创建基础的数据表结构：

- `users` - 用户表
- `posts` - 文章表
- `categories` - 分类表
- `post_categories` - 文章分类关联表
- `debug_records` - 调试记录表

**主要特点：**

- 完整的外键约束
- 索引优化
- 默认值设置
- 时间戳字段

### 0001_lyrical_mole_man.sql - 架构更新

基于开发过程中的需求变更进行架构调整：

- 表结构优化
- 索引添加
- 约束修改
- 性能优化

**更新内容：**

- 添加新的索引
- 修改字段类型
- 优化查询性能
- 增强数据完整性

## 元数据管理

### \_journal.json - 迁移日志

记录所有迁移的执行状态：

```json
{
  "version": "5",
  "dialect": "sqlite",
  "entries": [
    {
      "idx": 0,
      "version": "0000_icy_nicolaos",
      "when": 1738036454391
    },
    {
      "idx": 1,
      "version": "0001_lyrical_mole_man",
      "when": 1738036454392
    }
  ]
}
```

### 快照文件 (0000_snapshot.json, 0001_snapshot.json)

记录每个迁移点的完整数据库架构快照：

- 表结构定义
- 字段类型和约束
- 索引信息
- 外键关系

## 数据库架构

### 用户表 (users)

```sql
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`updated_at` integer DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
```

### 文章表 (posts)

```sql
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`slug` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`author_id` integer NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`updated_at` integer DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `posts_author_id_users_id_fk` FOREIGN KEY(`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT `posts_slug_unique` UNIQUE(`slug`)
);
```

### 分类表 (categories)

```sql
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	CONSTRAINT `categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
```

### 文章分类关联表 (post_categories)

```sql
CREATE TABLE `post_categories` (
	`post_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	CONSTRAINT `post_categories_post_id_posts_id_fk` FOREIGN KEY(`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT `post_categories_category_id_categories_id_fk` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
```

### 调试记录表 (debug_records)

```sql
CREATE TABLE `debug_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`updated_at` integer DEFAULT (current_timestamp) NOT NULL
);
```

## 索引策略

### 主要索引

- `users.email` - 唯一索引，用于用户登录
- `posts.slug` - 唯一索引，用于文章 URL
- `categories.slug` - 唯一索引，用于分类 URL
- `categories.name` - 唯一索引，用于分类名称
- `posts.author_id` - 外键索引，优化关联查询
- `post_categories.post_id` - 复合索引，优化查询性能
- `post_categories.category_id` - 复合索引，优化查询性能

## 迁移工作流

### 开发环境

1. **修改 Schema**: 在 `server/lib/schema.ts` 中修改数据表定义
2. **生成迁移**: 运行 `bun run db:generate` 生成迁移文件
3. **检查迁移**: 审查生成的 SQL 文件
4. **应用迁移**: 运行 `bun run db:migrate` 应用到本地数据库

### 生产环境

1. **备份数据**: 在执行迁移前备份生产数据
2. **测试迁移**: 在预发布环境测试迁移
3. **推送架构**: 使用 `bun run db:push` 推送到 Cloudflare D1
4. **验证结果**: 确认迁移成功和数据完整性

### 回滚策略

- 保留所有迁移文件
- 使用快照文件恢复架构
- 数据备份和恢复机制
- 迁移失败的回滚预案

## 数据库脚本

### 初始化脚本 (`server/scripts/init-db.ts`)

- 创建数据库文件和目录
- 设置数据库连接
- 应用初始架构
- 配置数据库参数

### 种子数据脚本 (`server/scripts/seed.ts`)

创建示例数据：

- 创建管理员和作者用户
- 创建技术、生活、教程分类
- 创建示例文章
- 建立文章分类关联
- 输出统计信息

### 重置脚本

通过 `bun run db:reset` 执行：

- 删除现有数据库文件
- 重新初始化数据库
- 应用所有迁移
- 添加种子数据

## 环境支持

### 本地开发 (SQLite)

- 文件数据库：`./data/app.db`
- 自动创建数据库文件
- 支持热重载和快速测试
- 完整的 SQLite 功能支持

### 生产环境 (Cloudflare D1)

- 全球分布的 SQLite 数据库
- 通过 Wrangler CLI 管理
- 支持多环境隔离
- 自动备份和恢复

### 环境检测

数据库连接自动检测：

```typescript
// 检查 Cloudflare 环境
if (event?.context?.cloudflare?.env?.DB) {
  return drizzle(event.context.cloudflare.env.DB, { schema })
}

// 检查全局变量
if (typeof globalThis !== 'undefined' && globalThis.__env__?.DB) {
  return drizzle(globalThis.__env__.DB, { schema })
}

// 本地 SQLite
return drizzleLocal(sqlite, { schema })
```

## 最佳实践

### 迁移设计

1. **向后兼容**: 尽量保持向后兼容性
2. **小步快跑**: 每个迁移只做有限的变更
3. **测试充分**: 在多个环境测试迁移
4. **文档完善**: 详细记录变更内容

### 性能优化

1. **索引优化**: 合理添加和优化索引
2. **查询优化**: 根据查询模式调整架构
3. **数据类型**: 选择合适的字段类型
4. **约束设计**: 平衡数据完整性和性能

### 安全考虑

1. **权限控制**: 限制数据库访问权限
2. **数据备份**: 定期备份重要数据
3. **迁移审查**: 仔细审查迁移 SQL
4. **监控告警**: 监控迁移执行状态

## 常见问题 (FAQ)

### Q: 如何处理冲突的迁移？

A: 使用 `db:generate` 会检测架构变更并生成新的迁移，避免冲突。

### Q: 如何回滚迁移？

A: Drizzle 不直接支持回滚，需要手动创建回滚迁移或从备份恢复。

### Q: 如何在不同环境间同步？

A: 使用相同的迁移文件，在不同环境执行相同的迁移流程。

### Q: 如何处理大表迁移？

A: 分批次迁移，避免长时间锁表，考虑零停机迁移策略。

### Q: 如何优化迁移性能？

A: 减少索引创建、批量操作、合理安排迁移顺序。

## 相关文件清单

### 迁移文件

- `migrations/0000_icy_nicolaos.sql` - 初始架构
- `migrations/0001_lyrical_mole_man.sql` - 架构更新

### 元数据文件

- `migrations/meta/_journal.json` - 迁移日志
- `migrations/meta/0000_snapshot.json` - 初始快照
- `migrations/meta/0001_snapshot.json` - 更新快照

### 配置文件

- `drizzle.config.ts` - Drizzle ORM 配置

### 数据库脚本

- `server/scripts/init-db.ts` - 初始化脚本
- `server/scripts/seed.ts` - 种子数据脚本

### Schema 定义

- `server/lib/schema.ts` - 数据库架构定义

## 模块特点

1. **版本控制**: 完整的迁移历史和版本管理
2. **环境适配**: 支持本地 SQLite 和生产 D1 数据库
3. **自动化**: 通过脚本自动执行迁移和管理
4. **数据安全**: 完整的备份和恢复机制
5. **性能优化**: 合理的索引和查询优化
6. **开发友好**: 热重载和调试支持
7. **生产就绪**: 支持大规模部署和维护
