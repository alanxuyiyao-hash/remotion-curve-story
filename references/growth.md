# 增长模式：OpenClaw Star v3

入口 `assets/growth/src/StarGrowth.tsx`；composition `OpenClawStarGrowth`，450 帧。`starGeometry.ts` 是渲染用几何，`public/stargrowth/geometry.json` 保存同一份几何及来源。图片 `original-chart.png` 和音效已随包提供；公开版使用系统字体回退。

## 数据路径

先区分输入：

1. 用户图片：估读曲线和刻度，标注“约/≈”与材料日期，不把像素估读包装成真实历史数据。
2. CSV/JSON 或已核验历史数据：按日期和值构造坐标及累计路径长度；计数从同一个数据插值结果计算，保持时间轴与曲线一致。不要把均匀绘线速度等同于均匀时间。
3. 最新 GitHub 数：查官方仓库/API 并记录获取时间。仓库当前 stargazers_count 只有当前总数，不能推导完整历史；缺历史时用用户数据或明确有来源的历史服务，不编造曲线。

旧样例的 ≈390K 是截图估读，按 10K 舍入。只换标题不换几何会沿用旧数据，必须避免。

## 同步路径、数值和镜头

- `data.points`、`lengths`、`pathLength` 和 `pointAt(distance)` 控制 SVG 路径、端点和镜头目标。
- `drawProgress(t)=smoothstep((t-.45)/6.85)`；SVG strokeDashoffset 按同一进度绘制；原示例从 y 坐标和 pixelsPerStar 估读计数。真实数据模式改为数据值插值。
- `ChartPlane` 将数据 viewBox 映射到 1280×883 的平面，以 rotatePoint 求旋转后的目标位置，再解平移与 z，让端点留在画面锚点。换长宽比必须同步平面映射、中心偏移和取景。
- v3 CSS perspective=1800px；追线阶段 rx≈12→8°、ry≈−23→−17°，距离≈1180→1220；拉远后 rx≈4°、ry≈−10°，距离≈1800。它们是柔和参考值，不是所有图表的固定配置。
- 拉远从 7.05 秒持续 3.2 秒，右移从 9.35 秒持续 4 秒，时间重叠。文字从 10.95 秒起进入，使用五阶 smootherstep `6u^5−15u^4+10u^3`；保留这种缓慢接续，避免镜头停住、突跳或字幕太早出界。
- 结尾 `GrowthWords`、黄绿线框与图表共用空间和镜头。可以替换或删除该段，随之重设 duration、音效和结束构图。

## 换图片

`ChartDrawing` 用原图滤色/遮罩保留手绘轴、Logo 与图例，再重画红线。logoBox、legendBox、greenBox、viewBox、baselineY、pixelsPerStar 都绑定旧图。新图需重设遮罩和刻度，检查是否残留旧红线、白色底块、重复图例或滤色污染。

`scripts/trace-star-chart.py` 是旧截图专用脚本：固定像素裁区、红色阈值、坐标刻度和本机字体路径；它还生成音效和字体。不可对任意新图直接运行。需要重新描线时复制并调整这些参数，先检查图尺寸与有效点数量，再运行；依赖 numpy、Pillow、fontTools（woff2 还需 brotli）。脚本的 minimum.accumulate 强制单调，只适用明确单调增长图，不能用来抹去真实下降。旧图的预计算几何可直接渲染，无需安装 Python 依赖。
