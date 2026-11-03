# Remotion Curve Story

用 Remotion 制作暗色曲线时间轴、沿线运镜的数据增长与柔和透视动画的 Agent Skill。包含两套可编辑工程和制作指导。

## 两种模式

- **曲线时间轴**：年份、事件、品牌卡片沿上升曲线展开，镜头连续跟随并在结尾拉远。参考工程为 16 秒、1080p、30fps。
- **数据增长**：红线绘制、同步数值、贴线跟随、柔和透视，随后拉远并平移至文字。参考工程为 15 秒、1080p、30fps。

## 安装 Skill

将仓库克隆到所用智能体的技能目录（目标目录应不存在）。以下以 `~/.agents/skills` 为例，其他工具请调整安装目录：

```bash
git clone https://github.com/alanxuyiyao-hash/remotion-curve-story.git ~/.agents/skills/remotion-curve-story
```

已有同名技能时请先比较内容，不要覆盖自定义修改。公开版使用系统字体回退，本机原版可能保留原样片的字体子集。

调用示例：

> 使用 $remotion-curve-story，把这些事件做成同款曲线时间轴，交付 MP4 和可编辑工程。

> 使用 $remotion-curve-story，把这张增长图做成沿红线爬升、拉远后转入文字的透视动画。

## 直接使用模板

```bash
python3 scripts/create_project.py timeline /tmp/my-timeline
cd /tmp/my-timeline/studio
npm ci
npm run dev
npm run render
```

增长模式将 `timeline` 改为 `growth`，Node 工程在输出目录根部。Node 版本要求见各工程 package.json。详细说明见 [SKILL.md](SKILL.md) 和 [references](references)。

## 数据与素材

示例时间轴年份是原项目指定的叙事标记，不代表经本仓库核验的产品首发时间。Star 示例为输入图片估读，约 390K，并非实时 GitHub 数据。更换主题时需同时替换内容、几何和数值来源。

公开版不包含从系统字体提取的 woff2 文件，使用本机字体回退；不同系统的排版会有差异。生成脚本中的本机字体路径是可选的原制作流程，运行前需适配。

品牌图片、Logo、输入截图的来源见模板中的 SOURCES.md；商标和第三方素材归各自权利人，未统一授予第三方素材的再许可。本仓库公开不代表品牌认可。模板 package.json 保留原来的 UNLICENSED 声明；此发布未额外授予开源许可证。

## 验证状态

Skill 格式校验、项目创建脚本、两套原工程 lint / TypeScript 检查已通过。公开版移除了字体加载并采用系统字体回退，两套公开版工程的 lint / TypeScript 检查也已通过。此次未成功重渲染预览：本机浏览器启动受限，因此不能据此保证公开版在各系统上的最终排版。制作新视频时应按 references/verification.md 检查关键帧和完整成片。
