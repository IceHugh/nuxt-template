# Nuxt 4 + Drizzle ORM + Cloudflare D1 集成指南

## 概述

本项目集成了 Drizzle ORM 与 Cloudflare D1 数据库，为 Nuxt 4 项目提供完整的数据库解决方案。

## 项目结构

```
nuxt-template/
├── server/
│   ├── lib/
│   │   ├── db.ts          # 数据库连接
│   │   └── schema.ts       # 数据库 Schema
│   └── api/
│       └── users/
│           ├── index.get.ts    # 获取用户列表
│           └── index.post.ts   # 创建用户
├── drizzle.config.ts          # Drizzle 配置
├── wrangler.toml              # Cloudflare 配置
└── migrations/               # 数据库迁移文件
```

## 已安装的依赖

```bash
# 核心依赖
drizzle-orm          # ORM 框架
drizzle-kit          # 迁移工具

# 数据库脚本
db:generate          # 生成迁移文件
db:migrate          # 执行迁移
db:push             # 推送 schema 到数据库
db:studio           # 打开 Drizzle Studio
```

## 配置说明

### 1. 环境变量配置

复制 `.env.example` 为 `.env` 并配置：

```bash
# Cloudflare D1 配置
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_d1_api_token
```

### 2. wrangler.toml 配置

```toml
[[d1_databases]]
binding = "DB"
database_name = "nuxt-template-db"
database_id = "" # 填入你的 D1 数据库 ID
```

### 3. 数据库 Schema

当前包含以下表结构：

- **users**: 用户表（id, email, name, avatar, created_at, updated_at）
- **posts**: 文章表（id, title, content, slug, published, author_id, created_at, updated_at）
- **categories**: 分类表（id, name, slug, description, created_at）
- **post_categories**: 文章分类关联表

## 使用方法

### 1. 数据库基本操作

```typescript
import { eq } from 'drizzle-orm'
import { getDb } from '~/server/lib/db'
import { posts, users } from '~/server/lib/schema'

// 在 API 路由中使用
export default defineEventHandler(async event => {
  const db = getDb(event)

  // 查询所有用户
  const allUsers = await db.select().from(users)

  // 根据条件查询
  const user = await db.select().from(users).where(eq(users.id, 1))

  // 插入数据
  const newUser = await db
    .insert(users)
    .values({
      email: 'test@example.com',
      name: 'Test User',
    })
    .returning()

  return { users: allUsers, user, newUser }
})
```

### 2. API 端点示例

#### GET /api/users

获取所有用户列表

```bash
curl -X GET http://localhost:3000/api/users
```

#### POST /api/users

创建新用户

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "name": "New User"
  }'
```

## 部署到 Cloudflare Pages

### 1. 创建 D1 数据库

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler auth login

# 创建数据库
wrangler d1 create nuxt-template-db
```

### 2. 配置数据库绑定

在 `wrangler.toml` 中填入数据库 ID：

```toml
[[d1_databases]]
binding = "DB"
database_name = "nuxt-template-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### 3. 生成并执行迁移

```bash
# 生成迁移文件
bun run db:generate

# 本地测试迁移
bun run db:migrate

# 推送到远程数据库
bun run db:push
```

### 4. 部署到 Cloudflare Pages

1. 在 Cloudflare Dashboard 中创建 Pages 项目
2. 连接到你的 Git 仓库
3. 配置构建命令：`bun run build`
4. 配置输出目录：`.output/public`
5. 在环境变量中添加 D1 绑定

## 本地开发

### 1. 快速开始

本地开发使用 SQLite 数据库，无需配置 Cloudflare 账号：

```bash
# 初始化数据库和添加种子数据
bun run db:reset

# 或者分步执行
bun run db:init    # 仅初始化数据库结构
bun run db:seed    # 添加种子数据
```

### 2. 开发工作流

#### 修改 Schema

1. 编辑 `server/lib/schema.ts`
2. 重置数据库：`bun run db:reset`
3. 本地测试：启动开发服务器验证
4. 提交代码

#### 添加新的 API 端点

1. 在 `server/api/` 目录下创建新文件
2. 使用 `getDb(event)` 获取数据库连接
3. 编写业务逻辑

#### 数据库调试

```bash
# 查看数据库（需要安装 sqlite3 命令行工具）
sqlite3 ./data/app.db

# 或者使用 Drizzle Studio
bun run db:local:studio
```

### 3. 可用脚本

```bash
bun run db:reset          # 完全重置数据库（删除+初始化+种子）
bun run db:init           # 仅初始化数据库结构
bun run db:seed          # 仅添加种子数据
bun run db:local:studio   # 打开 Drizzle Studio（本地）
bun run db:local:generate # 生成迁移文件（本地）
bun run db:local:migrate  # 执行迁移（本地）
```

### 4. 数据位置

- **数据库文件**: `./data/app.db`
- **迁移文件**: `./migrations/`
- **种子脚本**: `./server/scripts/seed.ts`

### 5. 环境切换

代码会自动检测运行环境：

- **本地开发**（`NODE_ENV !== 'production'`）：使用 SQLite
- **生产环境**：使用 Cloudflare D1

### 6. 使用 Drizzle Studio

```bash
# 本地开发
bun run db:local:studio

# 生产环境（需要配置 D1 凭证）
bun run db:studio
```

### 7. 种子数据

项目包含示例种子数据：

- 2 个用户（管理员、作者）
- 3 个分类（技术、生活、教程）
- 3 篇文章（2 篇已发布，1 篇草稿）
- 文章分类关联数据

### 8. 故障排除

#### 数据库连接问题

- 确认 `data/` 目录存在
- 检查 SQLite 文件权限
- 重新运行 `bun run db:reset`

#### 迁移问题

- 删除 `./data/app.db` 重新开始
- 检查 `migrations/` 目录中的文件
- 查看控制台错误信息

## 类型安全

项目使用 TypeScript 提供完整的类型安全：

```typescript
// 从 Schema 自动生成类型
import type { NewPost, NewUser, Post, User } from '~/server/lib/schema'

// 在 API 中使用类型
async function createUser(userData: NewUser): Promise<User> {
  const db = getDb(event)
  const result = await db.insert(users).values(userData).returning()
  return result[0]
}
```

## 注意事项

1. **本地开发**: 可以使用 `wrangler d1 dev` 本地模拟 D1 数据库
2. **迁移管理**: 所有迁移文件都存储在 `migrations/` 目录
3. **性能优化**: D1 有读写限制，建议合理使用缓存
4. **备份**: Cloudflare D1 提供自动备份，但建议定期导出重要数据

## 故障排除

### 1. 数据库连接失败

- 检查 `wrangler.toml` 中的数据库绑定
- 确认环境变量配置正确
- 验证 D1 数据库是否存在

### 2. 迁移失败

- 检查迁移文件语法
- 确认数据库连接正常
- 查看详细错误信息

### 3. 类型错误

- 重新生成类型：`bun run db:generate`
- 检查 Schema 定义
- 重启开发服务器

## 更多资源

- [Drizzle ORM 官方文档](https://orm.drizzle.team/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Nuxt 4 文档](https://nuxt.com/)
