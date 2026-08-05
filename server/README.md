# Forge-Design Server

Forge-Design 的后端 API 服务，基于 NestJS 构建。

## 功能

- **文件上传**: `POST /api/upload` - 接收文件并存储到本地
- **表单提交**: `POST /api/forms` - 接收并存储表单数据
- **组件元数据**: `GET /api/components` - 返回组件库配置信息

## 技术栈

- NestJS
- Prisma + SQLite
- Multer (文件上传)

## 开发

```bash
# 安装依赖
npm install

# 数据库迁移
npx prisma migrate dev --name init

# 生成 Prisma 客户端
npx prisma generate

# 启动开发服务器
npm run start:dev

# 打开 Prisma Studio
npm run prisma:studio
```

## API 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /health | 健康检查 |
| POST | /api/upload | 上传文件 |
| GET | /api/components | 获取组件元数据 |
| POST | /api/forms | 提交表单 |
| GET | /api/forms | 查询表单提交记录 |
| GET | /api/forms/:id | 查询单个表单提交 |

## 环境变量

复制 `.env` 文件并根据需要修改配置。

```bash
DATABASE_URL="file:./dev.db"
UPLOAD_DIR="./uploads"
UPLOAD_MAX_SIZE=10485760
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/gif,application/pdf
PORT=3000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```
