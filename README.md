# Skills Zoom

一个好用的 **Skill 聚合分享平台**。发现、收集、分享各类优质项目与工具，支持标签筛选和批量导出。

---

## 功能特色

- **Skill 展示**：卡片式展示投稿的 Skill 项目，包含名称、简介、标签、作者等信息
- **标签筛选**：点击标签即可快速筛选同类 Skill，支持多标签组合筛选
- **搜索功能**：支持按名称、描述、标签关键词搜索
- **批量选择**：点击卡片即可勾选，支持"全选当前"批量操作
- **批量导出**：勾选多个 Skill 后，可一键导出项目地址为 `.txt` 文件或复制到剪贴板
- **投稿说明**：详细的投稿流程和规范说明页面

## 投稿方式

关注公众号 **黑曜石科技工坊**，发送 Skill 信息投稿：
- Skill 名称
- GitHub 仓库地址
- 简介说明
- 建议标签
- 作者/来源

审核通过后，维护者将更新项目代码并为其打上标签分类。

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

项目已配置 `base: '/skills/'`，如需修改请编辑 `vite.config.ts`。

## 项目地址

[https://github.com/duguBoss/skills-zoom](https://github.com/duguBoss/skills-zoom)
