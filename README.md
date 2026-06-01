# Skills Zoom

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-%234FC08D?logo=vuedotjs" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-%233178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-%23646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Element_Plus-2.14-%23409EFF?logo=element" alt="Element Plus" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

<p align="center">
  <b>一个简洁、优雅的 Skill 聚合分享平台</b>
</p>

<p align="center">
  <a href="https://duguboss.github.io/skills-zoom/" target="_blank">🚀 在线预览</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/duguBoss/skills-zoom">📁 GitHub 仓库</a>
</p>

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🎴 **卡片展示** | 以精美卡片形式展示 Skill 项目，包含名称、简介、标签、作者等关键信息 |
| 🏷️ **标签筛选** | 点击标签即可快速筛选同类 Skill，支持多标签组合筛选 |
| 🔍 **全文搜索** | 支持按名称、描述、标签关键词进行实时搜索 |
| ☑️ **批量操作** | 点击卡片即可勾选，支持「全选当前」批量选择 |
| 📤 **批量导出** | 将选中的 Skill 一键导出为 `.txt` 文件或复制到剪贴板 |
| 📄 **详情页面** | 点击「查看详情」进入独立详情页，展示完整项目信息，支持标签跳转 |
| ⭐ **收藏管理** | 点击星标即可收藏 / 取消收藏，数据持久化保存在本地浏览器 |
| ❤️ **我的收藏** | 独立的收藏列表页面，方便快速查看和管理已收藏的 Skill |
| 📝 **在线投稿** | 提供表单页面，可直接提交新的 Skill 信息（数据保存在本地） |
| 📋 **投稿说明** | 详细的投稿流程与规范说明，降低参与门槛 |

---

## 🛠 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由方案**: [Vue Router](https://router.vuejs.org/)
- **UI 组件库**: [Element Plus](https://element-plus.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **代码规范**: ESLint + Oxlint

---

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) `^20.19.0 || >=22.12.0`
- [npm](https://www.npmjs.com/) 或 [pnpm](https://pnpm.io/)

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

启动后访问 `http://localhost:5173/skills-zoom/`。

### 生产构建

```bash
npm run build
```

构建产物输出至 `dist/` 目录，可直接部署到 GitHub Pages、Vercel、Netlify 等静态托管平台。

---

## 📁 项目结构

```
skills-zoom/
├── public/                  # 静态资源
├── src/
│   ├── assets/              # 样式与图片资源
│   ├── components/          # 公共组件
│   │   ├── AppHeader.vue    # 顶部导航栏
│   │   └── SkillCard.vue    # Skill 卡片组件
│   ├── data/
│   │   └── skills.json      # Skill 数据源
│   ├── router/
│   │   └── index.ts         # 路由配置
│   ├── stores/              # Pinia 状态管理
│   │   ├── favorites.ts     # 收藏状态 (localStorage 持久化)
│   │   └── skills.ts        # Skill 数据状态
│   ├── views/               # 页面视图
│   │   ├── HomeView.vue         # 首页 (Skill 列表)
│   │   ├── SkillDetailView.vue  # Skill 详情页
│   │   ├── FavoritesView.vue    # 我的收藏页
│   │   ├── SubmitView.vue       # 投稿说明页
│   │   └── SubmitFormView.vue   # 在线投稿表单页
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts           # Vite 配置 (base: '/skills-zoom/')
└── README.md
```

---

## 🌐 在线部署

项目已配置 `base: '/skills-zoom/'`，可直接通过以下命令一键部署到 GitHub Pages：

```bash
npm run deploy
```

该命令会先执行 `npm run build-only` 生成静态文件，再通过 `gh-pages` 将 `dist/` 目录推送至 `gh-pages` 分支。

**在线访问地址**: [https://duguboss.github.io/skills-zoom/](https://duguboss.github.io/skills-zoom/)

---

## 🤝 参与贡献

欢迎提交 Issue 或 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

本项目基于 [MIT](LICENSE) 协议开源。

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/duguBoss">duguBoss</a>
</p>
