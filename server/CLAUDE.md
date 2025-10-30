[根目录](../../CLAUDE.md) > **server**

# Server 模块文档

## 变更记录 (Changelog)

### 2025-10-29 14:46:59

- 初始化 server 模块文档
- 完成服务端架构分析
- 识别 tRPC 路由、数据库集成和 API 结构

## 模块职责

`server/` 目录包含所有服务端代码，负责 API 路由、数据库操作、tRPC 服务端配置和数据库脚本。该模块支持本地开发（SQLite）和生产环境（Cloudflare D1）的无缝切换。

## 目录结构

```
server/
├── api/              # 传统 API 路由
├── trpc/             # tRPC 配置和路由
│   ├── router.ts     # 主路由器
│   └── routes/       # 路由实现
├── lib/              # 服务端工具库
│   ├── db.ts         # 数据库连接
│   └── schema.ts     # 数据库架构
├── scripts/          # 数据库脚本
└── api/              # Nitro API 路由
```

## 入口与启动

### tRPC 主路由器 (`trpc/router.ts`)

- 定义所有 tRPC API 路由
- 集成 Zod 进行输入验证
- 支持嵌套路由结构

### 数据库连接 (`lib/db.ts`)

- 智能数据库连接管理
- 自动检测运行环境（本地/Cloudflare）
- 连接缓存和错误处理

## 对外接口

### tRPC API 路由

#### 基础路由

- `greeting` - 个性化问候 API
- `health` - 健康检查 API
- `userInfo` - 用户信息 API

#### 调试路由 (`debug.*`)

- `debug.checkConnection` - 数据库连接状态检查
- `debug.getRecords` - 获取所有调试记录
- `debug.getRecordById` - 根据 ID 获取记录
- `debug.createRecord` - 创建新记录
- `debug.updateRecord` - 更新记录
- `debug.deleteRecord` - 删除记录
- `debug.bulkCreate` - 批量创建记录
- `debug.clearAll` - 清空所有记录
- `debug.getStats` - 获取数据库统计信息

### 传统 API 路由

- `GET /api/health` - 健康检查端点
- `GET /api/users` - 获取用户列表
- `POST /api/users` - 创建新用户
- `POST /api/trpc/[...].ts` - tRPC 捕获所有路由

## 关键依赖与配置

### 数据库 ORM

- **Drizzle ORM**: 类型安全的数据库操作
- **better-sqlite3**: 本地开发数据库驱动
- **Cloudflare D1**: 生产环境数据库

### API 框架

- **tRPC**: 类型安全的 API 框架
- **Zod**: 运行时类型验证
- **Nitro**: Nuxt 的服务端引擎

### 数据库配置

- `drizzle.config.ts` - Drizzle ORM 配置
- 支持本地 SQLite 和 Cloudflare D1
- 自动迁移生成和管理

## 数据模型

### 核心数据表

#### 用户表 (`users`)

```typescript
{
  id: number (主键，自增)
  email: string (唯一，非空)
  name: string (非空)
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
```

#### 文章表 (`posts`)

```typescript
{
  id: number (主键，自增)
  title: string (非空)
  content: string (非空)
  excerpt?: string
  slug: string (唯一，非空)
  published: boolean
  authorId: number (外键 -> users.id)
  createdAt: Date
  updatedAt: Date
}
```

#### 分类表 (`categories`)

```typescript
{
  id: number (主键，自增)
  name: string (唯一，非空)
  slug: string (唯一，非空)
  description?: string
  createdAt: Date
}
```

#### 文章分类关联表 (`postCategories`)

```typescript
{
  postId: number (外键 -> posts.id)
  categoryId: number (外键 -> categories.id)
}
```

#### 调试记录表 (`debugRecords`)

```typescript
{
  id: number (主键，自增)
  title: string (非空)
  description?: string
  status: string (默认 "active")
  createdAt: Date
  updatedAt: Date
}
```

### 类型定义

所有数据表都有对应的 TypeScript 类型：

- `User` / `NewUser`
- `Post` / `NewPost`
- `Category` / `NewCategory`
- `DebugRecord` / `NewDebugRecord`

## 测试与质量

### API 测试

- **健康检查**: 验证服务端运行状态
- **数据库连接**: 测试不同环境的数据库连接
- **CRUD 操作**: 完整的增删改查功能测试
- **类型安全**: tRPC 确保前后端类型一致性

### 数据库测试

- **连接状态**: 自动检测和报告数据库连接状态
- **迁移测试**: 验证数据库架构迁移
- **种子数据**: 提供完整的测试数据集

### 错误处理

- 统一的错误响应格式
- 详细的错误信息和堆栈跟踪
- 数据库连接失败时的优雅降级

## 常见问题 (FAQ)

### Q: 如何在本地开发和生产环境之间切换数据库？

A: 数据库连接会自动检测环境，本地开发使用 SQLite，生产环境使用 Cloudflare D1，无需手动配置。

### Q: 如何添加新的 tRPC 路由？

A: 在 `server/trpc/router.ts` 中定义路由，在 `server/trpc/routes/` 中实现具体逻辑。

### Q: 如何修改数据库架构？

A: 修改 `server/lib/schema.ts` 中的表定义，然后运行 `bun run db:generate` 生成迁移文件。

### Q: 如何处理数据库迁移？

A: 使用 `bun run db:migrate` 应用迁移，`bun run db:push` 推送到生产环境。

### Q: 如何重置数据库？

A: 运行 `bun run db:reset` 清空数据库并重新创建种子数据。

## 相关文件清单

### 核心配置文件

- `server/lib/db.ts` - 数据库连接管理
- `server/lib/schema.ts` - 数据库架构定义
- `drizzle.config.ts` - Drizzle ORM 配置

### tRPC 文件

- `server/trpc/router.ts` - 主路由器
- `server/trpc/routes/debug.ts` - 调试路由实现
- `server/api/trpc/[...].ts` - tRPC API 入口

### API 路由文件

- `server/api/health.get.ts` - 健康检查 API
- `server/api/users/index.get.ts` - 获取用户列表
- `server/api/users/index.post.ts` - 创建用户

### 数据库脚本

- `server/scripts/init-db.ts` - 数据库初始化脚本
- `server/scripts/seed.ts` - 种子数据脚本

### 迁移文件 (位于 `migrations/`)

- `migrations/0000_icy_nicolaos.sql` - 初始架构
- `migrations/0001_lyrical_mole_man.sql` - 架构更新
- `migrations/meta/` - 迁移元数据

## 数据库操作示例

### 基本查询

```typescript
// 获取所有用户
const users = await db.select().from(users)

// 根据条件查询
const user = await db.select().from(users).where(eq(users.id, userId)).limit(1)
```

### 创建记录

```typescript
const newUser = await db
  .insert(users)
  .values({
    email: 'user@example.com',
    name: 'User Name',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .returning()
```

### 更新记录

```typescript
await db.update(users).set({ name: 'New Name', updatedAt: new Date() }).where(eq(users.id, userId))
```

### 删除记录

```typescript
await db.delete(users).where(eq(users.id, userId))
```

## 模块特点

1. **类型安全**: 完整的 TypeScript 类型定义和 tRPC 集成
2. **环境自适应**: 自动检测并适配不同的数据库环境
3. **完整 CRUD**: 提供完整的数据操作 API
4. **错误处理**: 统一的错误处理和响应格式
5. **迁移管理**: 自动化的数据库架构迁移
6. **开发友好**: 丰富的调试工具和种子数据支持
