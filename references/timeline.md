# 时间轴模式：Agent Timeline v4

入口 `assets/timeline/studio/src/TimelineFilm.tsx`；注册 `src/Root.tsx`，composition `AgentTimeline`，480 帧。素材来源保存在模板根目录 `SOURCES.md`，是旧素材的记录，不为新素材背书。

## 修改点

- `TimelineFilm` 尾部的 Sequence 定义事件、年份、品牌、产品、logo、入场时点和位置。`ProductCard`、`StageMarker`、各 `*Art` 控制视觉内容。换主题时同时更新 Captions 和 Sequence 名称。
- `railY(x)` 是曲线单一来源；`railGradient(x)` 是其导数，用于法向刻度和镜头取景。换曲线必须同步两者。卡片、年份连线与刻度都以该曲线定位，不单独画一条视觉不相连的线。
- 参考世界范围 7400×3500，曲线 x≈77–6600，y 由 2700 升至 850。四组卡片，后两组双卡片。保持组间距离，尤其最后一组不可挤在 WorkBuddy / Codex 上。
- `climbProgress(t)=smoothstep((t-0.4)/11.8)`；`Camera` 的 movingX/movingY 沿 railY 跟随。12.1 秒开始约 3.1 秒的 wide 混合，到中心约 (3150,1510)、缩放 0.255。临近陡段用 `railGradient` 放宽视野，避免裁掉卡片。
- 时间轴主要靠大平面平移/缩放产生纵深感，别为了“3D”强加难读的大角度旋转。结尾全景应看到曲线、年份和全部阶段。

## 替换注意

默认阶段是 ChatGPT、OpenClaw、WorkBuddy/Codex、Grok Bot/Muse；不是新视频的固定内容或可直接引用的事实。素材在 `public/assets`。保留旧图仅适用于复现；新主题用用户素材或有来源的 Logo。内置音效随 16 秒节奏生成，调整节奏后应重新对齐。

`generate-media.py` 是旧项目专用的纹理/字体/音效生成器，含本机字体路径和固定文字；如需重跑，先读代码并调整环境与文案，已有素材可直接使用。
