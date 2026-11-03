# OpenClaw Star Growth v3

15 秒 / 1920×1080 / 30fps，Remotion 4.0.539。

本版收敛透视：横向倾斜约 23°→17°，俯仰约 12°→8°，镜头后退约 25%，仍然跟随发光线头向上爬升。

0–7.3 秒跟线；7.05–10.25 秒逐渐拉远；9.35–13.35 秒缓慢向右平移。拉远和平移互相重叠，并以速度与加速度平滑的五次缓动衔接。文字进入视野后，依次柔和显出「动手能力」「记忆能力」「情绪价值」，包括英文副标题及黄绿色线框。

保留用户图片的坐标、手绘字、Logo 和来源。≈计数为依照图片刻度估读，四舍五入至 10K，结尾约 390K，并非实时 GitHub 数据。

## 使用

Node.js 20.19+ / 22.13+ / 24+。

```sh
npm ci
npm run dev
npm run render
```

包含原图、字体子集、原创音效，可直接预览与渲染。`src/StarGrowth.tsx` 包含镜头和字幕时序；`src/starGeometry.ts` 包含曲线数据。`scripts/trace-star-chart.py` 为可选素材重建脚本，依赖 numpy、Pillow、fonttools、brotli；重新提取字体需要 macOS 系统字体。
