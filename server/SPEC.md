# Forge-Design 后端接入 Spec

## 1. 目标

为 Forge-Design 组件库前端项目补齐一个轻量后端，实现：

1. Upload 组件真实文件上传接口，替代 jsonplaceholder mock
2. Form 表单提交持久化，替代前端内存存储
3. 预留组件元数据 API，支持未来组件文档和配置中心扩展

## 2. 设计原则

- 以“可扩展、可维护、适合本地开发”为主
- 保持接口语义清晰，采用 REST 资源路径
- 预留后续生产数据库和对象存储替换点
- 先用 SQLite 和本地文件存储，后期可平滑迁移

## 3. 推荐目录结构

```
server/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── upload/
│   │   ├── upload.module.ts
│   │   ├── upload.controller.ts
│   │   ├── upload.service.ts
│   │   └── dto/
│   │       ├── create-upload.dto.ts
│   │       └── upload-response.dto.ts
│   ├── form/
│   │   ├── form.module.ts
│   │   ├── form.controller.ts
│   │   ├── form.service.ts
│   │   └── dto/
│   │       ├── create-form.dto.ts
│   │       └── form-submission-response.dto.ts
│   └── components/
│       ├── components.module.ts
│       ├── components.controller.ts
│       └── components.service.ts
├── prisma/
│   └── schema.prisma
├── uploads/
├── package.json
├── tsconfig.json
├── nest-cli.json
├── README.md
└── .env
```

## 4. 技术选型评估

| 方案            | 优点                                    | 缺点                             | 结论                               |
| --------------- | --------------------------------------- | -------------------------------- | ---------------------------------- |
| NestJS          | 结构化、模块化、可扩展、TypeScript 友好 | 学习与依赖成本较高               | 推荐，用于后续业务和组件元数据扩展 |
| Prisma + SQLite | 低运维、Schema 驱动、开发体验强         | 并发写入不适合高负载、生产需迁移 | 推荐作为本地/演示数据库            |
| multer          | 与 NestJS 集成良好，处理 multipart 标准 | 无                               | 推荐用于文件上传                   |
| class-validator | DTO 校验与 Nest 生态一致                | 运行时反射依赖                   | 推荐                               |
| CORS            | Vite 本地开发必需                       | 无                               | 必要                               |

## 5. API 设计

### 5.1 Upload 资源

`POST /api/uploads`

- 请求

  - Content-Type: multipart/form-data
  - body field: `file`

- 成功响应

```json
{
  "id": "uuid",
  "url": "http://localhost:3000/uploads/xxxxx.jpg",
  "fileName": "xxx.jpg",
  "mimeType": "image/jpeg",
  "size": 12345,
  "uploadedAt": "2026-08-04T10:00:00.000Z"
}
```

- 说明
  - 返回 `id` 便于后续关联记录
  - `url` 应支持直接访问或预览
  - `uploadedAt` 方便调试和日志展示

### 5.2 Form 提交资源

`POST /api/forms`

- 请求

```json
{
  "formName": "project-creation",
  "values": {
    "name": "My Project",
    "category": "web",
    "description": "A test project"
  }
}
```

- 成功响应

```json
{
  "id": "uuid",
  "formName": "project-creation",
  "values": {
    "name": "My Project",
    "category": "web",
    "description": "A test project"
  },
  "submittedAt": "2026-08-04T10:00:00.000Z"
}
```

- 说明
  - 使用 `/api/forms` 更符合 REST 资源语义
  - 后续可扩展为 `GET /api/forms/:id`、`GET /api/forms?formName=...`
  - `values` 以 JSON 存储，保持结构灵活

### 5.3 Components 元数据接口

`GET /api/components`

- 成功响应

```json
{
  "components": [
    {
      "name": "Button",
      "version": "1.0.14",
      "props": [
        {
          "name": "type",
          "type": "string",
          "default": "primary",
          "description": "按钮类型"
        }
      ],
      "docs": "https://..."
    }
  ]
}
```

- 说明
  - 该接口作为扩展预留，当前可返回静态数据
  - 若仅用于文档展示，可后期改为构建时生成静态 JSON

## 6. 数据模型

```prisma
model FormSubmission {
  id          String   @id @default(uuid())
  formName    String
  values      String   @db.Text
  submittedAt DateTime @default(now())

  @@index([formName])
  @@index([submittedAt])
}

model UploadRecord {
  id         String   @id @default(uuid())
  fileName   String
  filePath   String   @db.Text
  mimeType   String
  size       Int
  uploadedAt DateTime @default(now())

  @@index([uploadedAt])
}
```

- 说明
  - 采用 JSON 字符串存储 `values`，简化模型
  - 若后续需要按字段查询，可在下一阶段结构化数据模型

## 7. 环境配置

```
# server/.env
DATABASE_URL="file:./dev.db"
UPLOAD_DIR="./uploads"
UPLOAD_MAX_SIZE=10485760
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/gif,application/pdf
PORT=3000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

- 说明
  - `PORT` 明确服务端口
  - `CORS_ORIGIN` 允许前端本地开发访问
  - `DATABASE_URL` 可用于后续切换到 PostgreSQL/MySQL

## 8. 前端对接

### 8.1 Vite 代理

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

### 8.2 对接方式

- Upload 组件 `action` 使用 `import.meta.env.VITE_UPLOAD_ACTION` 指向 `http://localhost:3000/api/uploads`
- 表单提交使用 `fetch('/api/forms', { method: 'POST', body: JSON.stringify(payload) })`
- 生产环境可改为直接使用 `VITE_API_BASE_URL`

## 9. 开发与验证

```bash
cd server && npm install
cd server && npm run dev
cd server && npx prisma migrate dev --name init
cd server && npx prisma generate
```

### 验收标准

- [ ] `POST /api/uploads` 能接收文件并返回 `id`、`url`、`uploadedAt`
- [ ] `POST /api/forms` 能保存表单数据并返回 `id`
- [ ] `GET /api/components` 能返回组件元数据列表
- [ ] 前端 App 能通过 `/api` 代理访问后端接口
- [ ] `npx prisma studio` 可查看 `FormSubmission` 和 `UploadRecord`
- [ ] TypeScript 编译无错误

## 10. 可选优化

- 生产环境对象存储：支持 S3/MinIO，并将 `url` 指向外部访问地址
- API 认证：若后端面向真实用户，建议加 `Authorization` 中间件
- 输入校验：后续可考虑 `Zod` 或 schema-driven validation
- 组件元数据：若仅用于文档，可改为构建时静态生成
