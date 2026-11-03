# Agent 时间轴 · 仿参考样片

参考用户提供的《个人agent1027.mp4》36–46 秒，重做黑色织纹背景、荧光绿卡片边框、空心品牌标题、双层时间刻度及拉远总览。当前 v4 为 16 秒、1920×1080、30fps，含自行合成的轻音效，无配音。

当前为 v4：四个阶段依次为 ChatGPT（2023 年）、OpenClaw（2025 年）、WorkBuddy / 代码助手（2026 年）、Grok Bot / Muse（2026 年）。年份按用户指定的时间线设定，每个阶段只有一个位于线下的年份标签。

时间线沿平滑的上升曲线从左下延伸到右上，起步较缓、中段更陡、尾端再放缓。年份、连接线及卡片依次出现，刻度跟随曲线法线转向。镜头沿同一条曲线连续运动，较陡处稍放宽构图以完整容纳卡片和年份；结束后用约 3 秒平滑拉远，收成完整全景。最后一组与上一组之间保留 930 个场景像素的空档，各组内双卡间距为 90。

用 Remotion 官方 skills 的 create、markup、render 工作流制作。官方说明快照保存在 `_skill/`。项目依赖固定为 Remotion 4.0.539。

## 预览与导出

```bash
cd studio
npm ci
npm run dev
```

在 Studio 选择 `AgentTimeline`。导出：

```bash
npm run render
```

已安装 Chrome 时，可以为导出命令加上 `--browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`。也可让 Remotion 下载和管理自己的浏览器。

## 修改入口

- `studio/src/TimelineFilm.tsx`：四个阶段、六张独立产品卡片、四个年份、曲线刻度、渐进绘制、连续镜头路径及结尾全景。
- `studio/src/Root.tsx`：时长、尺寸、帧率。
- `studio/public/assets/`：下载的 Logo、OpenClaw 图片、本地字体子集、背景和音效。
- `generate-media.py`：原创背景纹理和轻音效生成代码，也可从本机字体重建字形子集。已提供生成后的文件，正常预览和导出不需要运行此脚本。
- `SOURCES.md`：素材来源。

样片中的 01–04 是阶段编排编号，线下年份遵照用户设定。ChatGPT 手机卡、WorkBuddy 办公卡和 代码助手 窗口是为样片绘制的示意画面，Logo 使用网上获取的素材。Grok Bot 与 Muse 使用官网图片及经过应用名称、开发者核实的官方 App Store 图标。

验证：ESLint、TypeScript，关键帧检查，全片导出后再次解码和检查抽帧。静态图使用 Remotion `Img`，避免此机器上 `CanvasImage` 与大范围镜头变换组合时出现的渲染异常。
