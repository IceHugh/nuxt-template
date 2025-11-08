# VSCode 配置文件

本目录包含了 VSCode 编辑器的推荐配置和插件设置，确保团队成员在开发过程中保持一致的开发体验。

## 配置文件说明

### `extensions.json`
推荐安装的 VSCode 扩展：
- **Vue.volar** - Vue 3 官方语言支持
- **Vue.vscode-typescript-vue-plugin** - Vue TypeScript 支持
- **bradlc.vscode-tailwindcss** - Tailwind CSS 智能提示
- **esbenp.prettier-vscode** - Prettier 代码格式化
- **dbaeumer.vscode-eslint** - ESLint 代码检查
- **EditorConfig.EditorConfig** - EditorConfig 支持
- **ms-vscode.vscode-json** - JSON 文件支持

### `settings.json`
编辑器设置：
- **代码格式化**：使用 Prettier 作为默认格式化工具
- **保存时格式化**：自动格式化代码
- **ESLint 集成**：保存时自动修复 ESLint 问题
- **文件关联**：为不同文件类型指定格式化工具
- **Vue 配置**：Vue 组件的代码补全和格式化设置

## 安装推荐插件

打开 VSCode 后，会自动提示安装推荐的扩展。也可以手动安装：

```bash
code --install-extension Vue.volar
code --install-extension Vue.vscode-typescript-vue-plugin
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension EditorConfig.EditorConfig
code --install-extension ms-vscode.vscode-json
```

## 工作流程

1. **编辑代码**：EditorConfig 确保缩进和换行符一致
2. **保存文件**：自动运行 ESLint 修复和 Prettier 格式化
3. **实时检查**：ESLint 在编辑器中实时显示错误和警告
4. **团队协作**：所有配置文件都提交到版本控制，确保团队一致性

## 注意事项

- 确保 VSCode 已安装并启用所有推荐扩展
- 如果格式化不工作，检查 Prettier 和 ESLint 是否正确安装
- 项目已配置忽略 `components/ui`、`.nuxt`、`.wrangler` 等目录
- EditorConfig 配置优先级高于编辑器默认设置
