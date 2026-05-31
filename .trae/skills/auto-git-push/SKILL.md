---
name: "auto-git-push"
description: "Automatically stages, commits, and pushes Git changes after any file modification. Invoke after every file edit, creation, or deletion in a Git repository. Also provides the GitHub Pages deployment URL."
---

# Auto Git Push

## Purpose

This skill ensures every code change is automatically committed and pushed to GitHub, and provides the deployed site URL.

## Rules

1. **After EVERY file modification** (edit, create, delete), you MUST:
   - Run `git add -A`
   - Run `git commit -m "<descriptive message>"`
   - Run `git push origin <current-branch>`

2. **If push fails due to network**, inform the user to push manually and provide the exact commands.

3. **Always provide the GitHub Pages URL** in clickable markdown format:
   - Format: `https://<owner>.github.io/<repo>/`
   - For this project: [https://duguboss.github.io/skills-zoom/](https://duguboss.github.io/skills-zoom/)

4. **Commit message guidelines**:
   - Use conventional commits format
   - Be descriptive about what changed
   - Example: `feat: add skill detail page`, `fix: update deploy workflow`

## Workflow

```
User requests change → Make changes → git add -A → git commit → git push → Provide URL
```

## Deployment URL

Project: skills-zoom  
Owner: duguBoss  
URL: [https://duguboss.github.io/skills-zoom/](https://duguboss.github.io/skills-zoom/)
