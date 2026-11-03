# 素材与 Skill 来源

检索与获取日期：2026-10-28（Asia/Shanghai）。

## Skill

- 官方仓库：https://github.com/remotion-dev/skills
- 总入口：https://raw.githubusercontent.com/remotion-dev/skills/main/skills/remotion-best-practices/SKILL.md
- 创建、排版、图片、字体、合成与导出说明：同一仓库 `skills/remotion-best-practices/` 下的对应 references，已保存使用的本地快照。

## 实际使用的下载素材

| 文件 | 来源 |
| --- | --- |
| `chatgpt-icon.webp` | OpenAI 静态资源站：https://cdn.oaistatic.com/assets/apple-touch-icon-mz9nytnj.webp |
| `openclaw-logo.svg` | OpenClaw 官网：https://openclaw.ai/favicon.svg |
| `openclaw-card.png` | OpenClaw 官网分享图：https://openclaw.ai/og-image.png |
| `workbuddy-logo.svg` | 腾讯 WorkBuddy 官网 https://www.workbuddy.cn/ 的 favicon：https://assets.workbuddy.cn/web/workbuddy/a5b2fb510f0e7b156f19d072fae0cd12ae1f2f19/assets/logo.svg |
| `codex-logo.svg` | LobeHub 开源图标库的 Codex 彩色图标：https://raw.githubusercontent.com/lobehub/lobe-icons/master/packages/static-svg/icons/codex-color.svg |

Codex 图标来自开源图标库，其他上述素材来自对应品牌官网或静态资源站。没有用生成式图像重画这些 Logo。

## v2 新增的 Muse / Grok Bot 素材

- Muse 官网：https://ai.meta.com/muse/download/ 。`muse-card.webp` 为该页面的 `og:image`。实际下载地址保存在 `reference/v2-asset-sources.json`，图片已下载保存。
- Muse 图标：官方 App Store 条目 https://apps.apple.com/us/app/muse-from-meta/id6760173601 ，开发者 Meta Platforms, Inc.；通过 Apple iTunes Lookup/Search API 取得 512px 图标，保存为 `muse-icon.jpg`。
- Grok Bot 官网：https://x.ai/news/introducing-grok-bot 。`grokbot-card.png` 来自该文章的官网分享图 https://x.ai/images/news/introducing-grok-bot-og-2.png 。
- Grok Bot 图标：官方 App Store 条目 https://apps.apple.com/us/app/grok-bot/id6794501026 ，开发者 X Corp.；通过 Apple iTunes Lookup API 取得 512px 图标，保存为 `grokbot-icon.jpg`。

## 自行制作部分

- 黑色织纹背景：`generate-media.py` 中的确定性噪声及纹理函数。
- 时间轴、卡片、示意手机和软件窗口、所有文字与镜头：Remotion / React / SVG。
- 音效：`generate-media.py` 自行合成的刻度声、低频提示与转场声，没有下载音乐或使用原片配音。
- 字体：用户本机 Arial Black、STHeiti Medium、SFNSMono 的字形子集，用于本地样片。

各产品商标归相应权利人；此文件记录素材来源，不表示品牌参与制作或认可本样片。

## v3 时间线设定

四个阶段的线下年份采用用户明确指定的 2023、2025、2026、2026。上坡路线、逐组出现和单镜头爬升后拉远的结构均来自用户本次修改要求。

v4 根据用户后续要求，将路线改为平滑上升曲线，并使卡片、刻度、年份连接线与连续镜头共同跟随曲线。
