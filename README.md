# Skills Zoom

一个好用的 **Skill 聚合分享平台**。发现、收集、分享各类优质项目与工具，支持标签筛选、批量导出、收藏管理和在线投稿。

---

## 功能特色

- **Skill 展示**：卡片式展示投稿的 Skill 项目，包含名称、简介、标签、作者等信息
- **标签筛选**：点击标签即可快速筛选同类 Skill，支持多标签组合筛选
- **搜索功能**：支持按名称、描述、标签关键词搜索
- **批量选择**：点击卡片即可勾选，支持"全选当前"批量操作
- **批量导出**：勾选多个 Skill 后，可一键导出项目地址为 `.txt` 文件或复制到剪贴板
- **Skill 详情页**：点击"查看详情"进入详情页，展示更完整的项目信息，支持通过标签跳转筛选
- **收藏功能**：点击卡片上的星标即可收藏/取消收藏，收藏数据保存在本地浏览器中
- **我的收藏**：独立的收藏列表页面，方便快速查看和管理已收藏的 Skill
- **在线投稿**：提供表单页面，可直接提交新的 Skill 信息（数据保存在本地）
- **投稿说明**：详细的投稿流程和规范说明页面

## 技术栈

- Vue 3 + TypeScript
- Vue Router
- Pinia
- Element Plus
- Vite

## 本地开发

```sh
npm install
npm run dev
```

## 构建部署

```sh
npm run build-only
```

构建产物位于 `dist/` 目录，可部署到 GitHub Pages 等静态托管服务。

项目已配置 `base: '/skills-zoom/'`，如需修改请编辑 `vite.config.ts`。

## 项目结构

```
src/
  components/        # 公共组件
    AppHeader.vue    # 顶部导航栏
    SkillCard.vue    # Skill 卡片组件
  views/             # 页面视图
    HomeView.vue     # 首页（Skill 列表）
    SkillDetailView.vue   # Skill 详情页
    FavoritesView.vue     # 我的收藏页
    SubmitView.vue        # 投稿说明页
    SubmitFormView.vue    # 在线投稿表单页
  stores/            # Pinia 状态管理
    skills.ts        # Skill 数据状态
    favorites.ts     # 收藏状态（localStorage 持久化）
  data/
    skills.json      # Skill 数据
  router/
    index.ts         # 路由配置
```

## 项目地址

[https://github.com/duguBoss/skills-zoom](https://github.com/duguBoss/skills-zoom)
