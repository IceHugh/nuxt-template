[根目录](../../CLAUDE.md) > **migrations**

# Migrations 数据库迁移模块文档

## 变更记录 (Changelog)

### 2025-11-08T10:31:42+0000

- **文档更新**: 完成项目初始化架构分析
- **覆盖率确认**: 确认迁移模块扫描覆盖率 100%
- **面包屑导航**: 添加导航面包屑

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

### 迁移日志 (`meta/_journal.json`)

记录所有迁移的执行状态和顺序：

```json
{
  "version": "7",
  "dialect": "sqlite",
  "entries": [
    {
      "idx": 0,
      "version": "2024-08-07T10:13:56.951Z",
      "name": "icy_nicolaos",
      "breakpoints": true
    },
    {
      "idx": 1,
      "version": "2024-08-07T10:16:58.837Z",
      "name": "lyrical_mole_man",
      "breakpoints": true
    }
  ]
}
```

## 数据库架构演进

### 迁移 0000: 初始架构 (`0000_icy_nicolaos.sql`)

**创建时间**: 2024-08-07T10:13:56.951Z

**核心数据表**:

1. **用户表 (users)**

   ```sql
   CREATE TABLE `users` (
   	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
   	`email` text NOT NULL,
   	`name` text NOT NULL,
   	`avatar` text,
   	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
   	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
   );
   ```

2. **文章表 (posts)**

   ```sql
   CREATE TABLE `posts` (
   	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
   	`title` text NOT NULL,
   	`content` text NOT NULL,
   	`excerpt` text,
   	`slug` text NOT NULL,
   	`published` integer DEFAULT false NOT NULL,
   	`author_id` integer NOT NULL,
   	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
   	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
   	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
   );
   ```

3. **分类表 (categories)**

   ```sql
   CREATE TABLE `categories` (
   	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
   	`name` text NOT NULL,
   	`slug` text NOT NULL,
   	`description` text,
   	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
   );
   ```

4. **文章分类关联表 (post_categories)**
   ```sql
   CREATE TABLE `post_categories` (
   	`post_id` integer NOT NULL,
   	`category_id` integer NOT NULL,
   	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action,
   	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
   );
   ```

### 迁移 0001: 调试记录表 (`0001_lyrical_mole_man.sql`)

**创建时间**: 2024-08-07T10:16:58.837Z

**新增功能**:

1. **调试记录表 (debug_records)**

   ```sql
   CREATE TABLE `debug_records` (
   	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
   	`title` text NOT NULL,
   	`description` text,
   	`status` text DEFAULT 'active',
   	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
   	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
   );
   ```

2. **索引优化**
   ```sql
   CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
   CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);
   CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);
   CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);
   ```

## 数据库约束与索引

### 唯一性约束

- `users.email` - 用户邮箱唯一
- `posts.slug` - 文章别名唯一
- `categories.name` - 分类名称唯一
- `categories.slug` - 分类别名唯一

### 外键约束

- `posts.author_id` → `users.id` - 文章作者关联
- `post_categories.post_id` → `posts.id` - 文章分类关联
- `post_categories.category_id` → `categories.id` - 分类文章关联

### 数据类型

- **时间戳**: `integer` (Unix timestamp)
- **布尔值**: `integer` (0/1)
- **文本**: `text` (无长度限制)
- **自增ID**: `integer PRIMARY KEY AUTOINCREMENT`

## 迁移管理

### 生成迁移

```bash
# 生成新的迁移文件
pnpm db:generate

# 查看待执行的迁移
pnpm db:push --dry-run
```

### 执行迁移

```bash
# 执行所有待执行的迁移
pnpm db:migrate

# 推送架构变更（开发环境）
pnpm db:push
```

### 重置数据库

```bash
# 重置数据库到初始状态
pnpm db:reset
```

### 数据库可视化

```bash
# 启动数据库可视化工具
pnpm db:studio
```

## 环境适配

### 开发环境

- **数据库**: SQLite (`./data/app.db`)
- **连接方式**: 本地文件连接
- **迁移执行**: 自动或手动触发

### 生产环境

- **数据库**: Cloudflare D1
- **连接方式**: HTTP API
- **迁移执行**: 通过部署流程自动执行

### 环境检测

项目自动检测运行环境并选择合适的数据库配置：

```typescript
// server/lib/db.ts
const db = drizzle(
  process.env.NODE_ENV === 'production' && process.env.DATABASE_URL
    ? // Cloudflare D1 连接
    : // SQLite 连接
)
```

## 迁移最佳实践

### 迁移命名

- 使用描述性名称：`add_user_avatar_column`
- 包含时间戳和随机后缀：`0001_add_user_avatar_column.sql`
- 避免特殊字符和空格

### 向后兼容

1. **新增字段**: 使用 `DEFAULT` 值
2. **字段类型变更**: 考虑数据迁移
3. **表结构变更**: 分步骤执行

### 回滚策略

1. **备份重要数据**
2. **测试迁移脚本**
3. **准备回滚脚本**
4. **监控迁移过程**

### 性能考虑

1. **大表操作**: 分批处理数据
2. **索引创建**: 在非高峰期执行
3. **锁表时间**: 最小化锁定时间

## 数据类型映射

### TypeScript 到 SQL

```typescript
// Drizzle Schema
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// 生成 SQL
CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `email` text NOT NULL,
  `name` text NOT NULL,
  `created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
```

## 数据操作示例

### 基本查询

```typescript
// 获取所有用户
const users = await db.select().from(users)

// 带条件查询
const activeUsers = await db.select().from(users).where(eq(users.status, 'active'))
```

### 数据插入

```typescript
// 插入新用户
const newUser = await db
  .insert(users)
  .values({
    email: 'user@example.com',
    name: 'John Doe',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .returning()
```

### 数据更新

```typescript
// 更新用户信息
await db
  .update(users)
  .set({
    name: 'Jane Doe',
    updatedAt: new Date(),
  })
  .where(eq(users.id, userId))
```

### 关联查询

```typescript
// 获取用户及其文章
const userWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
  .where(eq(users.id, userId))
```

## 常见问题 (FAQ)

### Q: 如何处理迁移冲突？

A:

1. 备份当前数据库
2. 解决冲突的迁移文件
3. 手动调整数据库状态
4. 重新运行迁移

### Q: 如何回滚迁移？

A:

1. 创建回滚迁移文件
2. 执行回滚操作
3. 验证数据完整性

### Q: 迁移过程中断怎么办？

A:

1. 检查迁移日志状态
2. 手动修复中断的迁移
3. 继续执行剩余迁移

### Q: 如何在不同环境间同步？

A:

1. 版本控制迁移文件
2. 使用相同迁移顺序
3. 考虑环境特定的差异

## 相关文件清单

### 迁移文件

- `0000_icy_nicolaos.sql` - 初始数据库架构
- `0001_lyrical_mole_man.sql` - 调试记录表添加

### 元数据文件

- `meta/_journal.json` - 迁移执行日志
- `meta/0000_snapshot.json` - 初始架构快照
- `meta/0001_snapshot.json` - 第二次架构快照

### 配置文件

- `drizzle.config.ts` - Drizzle ORM 配置
- `server/lib/schema.ts` - 数据库架构定义

### 脚本文件

- `server/scripts/init-db.ts` - 数据库初始化脚本
- `server/scripts/seed.ts` - 种子数据脚本

## 模块特点

1. **版本控制**: 完整的数据库架构变更追踪
2. **环境适配**: 自动适配开发和生产环境
3. **类型安全**: TypeScript 驱动的架构定义
4. **自动迁移**: 支持自动化部署流程
5. **回滚支持**: 完整的回滚和恢复机制
6. **性能优化**: 索引和约束的合理设计
