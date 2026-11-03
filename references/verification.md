# 运行与验收

在复制后的 Node 工程目录运行。timeline 位于项目的 `studio/`，growth 位于项目根。模板锁定 Remotion 4.0.539、React 19.2.3；Node 范围见 package.json。先检查本机 Node 是否满足，不主动更新锁文件。首次无依赖时运行 `npm ci`；安装失败时保留真实错误并排查网络/运行时，不声称完成渲染。

```bash
npm run lint
npx remotion compositions src/index.ts
# timeline
npx remotion render src/index.ts AgentTimeline out/timeline.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p
# growth（在增长工程目录运行）
npx remotion render src/index.ts OpenClawStarGrowth out/growth.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p
```

创建项目脚本会将 render 命令统一指向该模式的 composition；自行合并工程时也要同步命令与 Root 注册。

先抽关键帧，确认视野再渲染整片，示例：

```bash
npx remotion still src/index.ts OpenClawStarGrowth out/frame-300.png --frame=300
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of json out/growth.mp4
ffmpeg -v error -i out/growth.mp4 -f null -
```

视觉检查：开头、每组事件/数值里程碑、最陡段、拉远前后、平移与文字重叠段、最后一帧。渲染过渡前后短片或密集抽帧检查，单张静帧不能证明顺滑。检查中文新字符、Logo 比例、卡片边缘、连线连接、轴刻度、计数和红线端点同步，以及末尾是否留足阅读时间。音效不能削波或盖过用户配音。

旧样片是视觉参考，不是自动化测试的真值；新素材改了布局就必须重新看。交付记录实际命令、输出参数和未验证事项即可。
