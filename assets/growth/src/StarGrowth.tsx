import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { starGeometry as data } from "./starGeometry";

const source = staticFile("stargrowth/original-chart.png");
const path = data.points
  .map((p, i) => (i === 0 ? "M" : "L") + p[0] + " " + p[1])
  .join(" ");
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = (v: number) => {
  const u = Math.max(0, Math.min(1, v));
  return u * u * (3 - 2 * u);
};
const cameraEase = (v: number) => {
  const u = Math.max(0, Math.min(1, v));
  return u * u * u * (u * (u * 6 - 15) + 10);
};
const drawProgress = (t: number) => smooth((t - 0.45) / 6.85);
const blend = (a: number, b: number, u: number) => a + (b - a) * u;
const pointAt = (distance: number) => {
  const last = data.points.length - 1;
  for (let i = 1; i <= last; i++) {
    if (data.lengths[i] >= distance) {
      const q =
        (distance - data.lengths[i - 1]) /
        (data.lengths[i] - data.lengths[i - 1]);
      return [
        data.points[i - 1][0] + (data.points[i][0] - data.points[i - 1][0]) * q,
        data.points[i - 1][1] + (data.points[i][1] - data.points[i - 1][1]) * q,
      ];
    }
  }
  return [data.points[last][0], data.points[last][1]];
};

const ChartDrawing = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const progress = drawProgress(t);
  const [x, y] = pointAt(progress * data.pathLength);
  const stars = Math.max(0, (data.baselineY - y) / -data.pixelsPerStar);
  const roundedK = Math.round(stars / 10000) * 10;
  const labelX = Math.max(420, Math.min(2090, x - 150));
  const labelY = y - 120;
  const tipOpacity = interpolate(
    t,
    [0.45, 0.8, 7.3, 9.2],
    [0, 1, 1, 0.88],
    clamp,
  );
  const [lx, ly, lr, lb] = data.logoBox;
  const [rx, ry, rr, rb] = data.legendBox;
  const [gx, gy, gr, gb] = data.greenBox;
  return (
    <svg
      width="1280"
      height="883"
      viewBox={data.viewBox.join(" ")}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <defs>
        <filter
          id="star-white-ink"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -2.1 0 0 0 1.4"
          />
        </filter>
        <filter
          id="star-green-ink"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2 2 -2 0 -0.3"
          />
        </filter>
        <mask
          id="star-static-ink"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={data.width}
          height={data.height}
        >
          <rect width={data.width} height={data.height} fill="white" />
          <circle
            cx={(lx + lr) / 2}
            cy={(ly + lb) / 2}
            r={(lr - lx) / 2 + 3}
            fill="black"
          />
          <rect
            x={rx - 2}
            y={ry - 2}
            width={rr - rx + 4}
            height={rb - ry + 4}
            fill="black"
          />
          <rect
            x={gx - 4}
            y={gy - 4}
            width={gr - gx + 8}
            height={gb - gy + 8}
            fill="black"
          />
        </mask>
        <clipPath id="star-original-logo">
          <circle
            cx={(lx + lr) / 2}
            cy={(ly + lb) / 2}
            r={(lr - lx) / 2 - 0.5}
          />
        </clipPath>
        <filter
          id="star-tip-glow"
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <image
        href={source}
        width={data.width}
        height={data.height}
        filter="url(#star-white-ink)"
        mask="url(#star-static-ink)"
      />
      <image
        href={source}
        width={data.width}
        height={data.height}
        clipPath="url(#star-original-logo)"
      />
      <image
        href={source}
        width={data.width}
        height={data.height}
        filter="url(#star-green-ink)"
      />
      <rect
        x={rx}
        y={ry}
        width={rr - rx}
        height={rb - ry}
        rx="5"
        fill={data.lineColor}
      />
      <path
        d={path}
        fill="none"
        stroke="#5a1e13"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={data.pathLength}
        strokeDashoffset={data.pathLength * (1 - progress)}
        opacity=".38"
        transform="translate(2 7)"
      />
      <path
        d={path}
        fill="none"
        stroke={data.lineColor}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={data.pathLength}
        strokeDashoffset={data.pathLength * (1 - progress)}
      />
      <g opacity={tipOpacity}>
        <circle
          cx={x}
          cy={y}
          r="23"
          fill="#ff622e"
          filter="url(#star-tip-glow)"
        />
        <circle cx={x} cy={y} r="11" fill="#ff9f5b" />
        <circle cx={x} cy={y} r="4.3" fill="#fff0c5" />
        <g transform={"translate(" + labelX + " " + labelY + ")"}>
          <rect
            x="0"
            y="0"
            width="360"
            height="92"
            rx="14"
            fill="#121519"
            stroke="#e9553280"
            strokeWidth="2"
          />
          <text
            x="24"
            y="69"
            fill="#fff2e7"
            fontSize="76"
            fontWeight="700"
            fontFamily="Arial, sans-serif"
          >
            ≈{roundedK}K
          </text>
        </g>
      </g>
    </svg>
  );
};

// Orbit one continuous camera around a point on the chart plane. Its target
// follows the growing tip, returns to the whole chart, then pans to the titles.
// Solving the perspective transform keeps the tip framed while the plane tilts.
const rotatePoint = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  rz: number,
) => {
  const rad = Math.PI / 180;
  const a = rx * rad;
  const b = ry * rad;
  const c = rz * rad;
  const zx = x * Math.cos(c) - y * Math.sin(c);
  const zy = x * Math.sin(c) + y * Math.cos(c);
  const yx = zx * Math.cos(b);
  const yz = -zx * Math.sin(b);
  return [
    yx,
    zy * Math.cos(a) - yz * Math.sin(a),
    zy * Math.sin(a) + yz * Math.cos(a),
  ];
};

const GrowthWords = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const first = cameraEase((t - 10.95) / 0.9);
  const second = cameraEase((t - 11.75) / 0.9);
  const frameDraw = cameraEase((t - 11.45) / 1.1);
  const connector = cameraEase((t - 12.65) / 0.85);
  const emotion = cameraEase((t - 13.05) / 0.8);
  return (
    <div
      style={{
        position: "absolute",
        left: 805,
        top: -230,
        width: 440,
        height: 475,
        transformStyle: "preserve-3d",
      }}
    >
      <svg
        width="605"
        height="475"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <rect
          x="3"
          y="3"
          width="434"
          height="469"
          rx="16"
          fill="none"
          stroke="#d3f443"
          strokeWidth="4"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - frameDraw}
          opacity={frameDraw}
        />
        <path
          d="M 437 16 L 572 183 M 437 459 L 572 292"
          fill="none"
          stroke="#d3f443"
          strokeWidth="4"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - connector}
          opacity={connector}
        />
      </svg>
      {[
        { cn: "动手能力", en: "HANDS-ON ABILITY", y: 57, reveal: first },
        { cn: "记忆能力", en: "MEMORY ABILITY", y: 267, reveal: second },
      ].map((word) => (
        <div
          key={word.cn}
          style={{
            position: "absolute",
            left: 22,
            top: word.y,
            width: 396,
            textAlign: "center",
            opacity: word.reveal,
            transform: `translate3d(0,${(1 - word.reveal) * 14}px,18px)`,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontFamily: "PingFang SC, Microsoft YaHei, sans-serif",
              fontSize: 87,
              fontWeight: 900,
              lineHeight: 1.12,
              whiteSpace: "nowrap",
              textShadow: "0 5px 8px #0006",
            }}
          >
            {word.cn}
          </div>
          <div
            style={{
              color: "#d2d4ce",
              fontFamily: "Arial, sans-serif",
              fontSize: 27,
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            {word.en}
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 535,
          top: 150,
          width: 515,
          textAlign: "center",
          opacity: emotion,
          transform: `translate3d(${(1 - emotion) * 20}px,0,30px)`,
        }}
      >
        <div
          style={{
            fontFamily: "PingFang SC, Microsoft YaHei, sans-serif",
            color: "#c9ee3b",
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 1.12,
            whiteSpace: "nowrap",
            textShadow: "3px 5px 0 #667a1e, 8px 10px 16px #0006",
          }}
        >
          情绪价值
        </div>
        <div
          style={{
            color: "#c9ee3b",
            fontFamily: "Arial, sans-serif",
            fontSize: 33,
            lineHeight: 1.5,
            letterSpacing: 1.5,
          }}
        >
          EMOTIONAL VALUE
        </div>
      </div>
    </div>
  );
};

const ChartPlane = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const progress = drawProgress(t);
  const [px, py] = pointAt(progress * data.pathLength);
  // Overlap the slow end of the pullback with the start of the pan so the
  // camera glides into the title area without stopping and starting again.
  const pullback = cameraEase((t - 7.05) / 3.2);
  const pan = cameraEase((t - 9.35) / 4.0);
  const x = ((px - data.viewBox[0]) / data.viewBox[2]) * 1280 - 640;
  const y = ((py - data.viewBox[1]) / data.viewBox[3]) * 883 - 441.5;
  const targetX = blend(x, 0, pullback) + pan * 1100;
  const targetY = blend(y, 0, pullback) + pan * 5;
  const rx = blend(blend(12, 8, progress), 4, pullback) - pan * 2;
  const ry = blend(blend(-23, -17, progress), -10, pullback) + pan * 4;
  const rz = blend(blend(-5, -3, progress), -1.5, pullback) + pan * 0.5;
  const distance =
    blend(blend(1180, 1220, progress), 1800, pullback) + pan * 80;
  const anchorX = blend(1010, 960, pullback);
  const anchorY = blend(620, 540, pullback);
  const rotatedTarget = rotatePoint(targetX, targetY, rx, ry, rz);
  const tx = ((anchorX - 960) * distance) / 1800 - rotatedTarget[0];
  const ty = ((anchorY - 540) * distance) / 1800 - rotatedTarget[1];
  const z = 1800 - distance - rotatedTarget[2];
  return (
    <div
      style={{
        position: "absolute",
        left: 960,
        top: 540,
        width: 0,
        height: 0,
        transformOrigin: "0 0",
        transformStyle: "preserve-3d",
        transform:
          "translate3d(" +
          tx +
          "px," +
          ty +
          "px," +
          z +
          "px) rotateX(" +
          rx +
          "deg) rotateY(" +
          ry +
          "deg) rotateZ(" +
          rz +
          "deg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -640,
          top: -441.5,
          width: 1280,
          height: 883,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 6,
            background: "rgba(8,10,14,.18)",
            border: "1px solid #373c4120",
            boxShadow: "0 30px 70px #0005",
            borderRadius: 7,
            transform: "translateZ(-22px)",
          }}
        />
        <ChartDrawing />
      </div>
      <GrowthWords />
    </div>
  );
};

const WireBackdrop = () => (
  <svg
    width="1920"
    height="1080"
    style={{ position: "absolute", inset: 0, opacity: 0.1 }}
  >
    {Array.from({ length: 24 }, (_, i) => {
      const cx = 1420 + (i % 6) * 115 + (Math.floor(i / 6) % 2) * 57;
      const cy = 55 + Math.floor(i / 6) * 100;
      const points = Array.from({ length: 6 }, (_, j) =>
        [
          cx + 66 * Math.cos((Math.PI * j) / 3),
          cy + 66 * Math.sin((Math.PI * j) / 3),
        ].join(","),
      ).join(" ");
      return (
        <polygon
          key={i}
          points={points}
          stroke="#c0c8b4"
          fill="none"
          strokeWidth="1.1"
        />
      );
    })}
  </svg>
);

export const OpenClawStarGrowth = () => (
  <AbsoluteFill
    style={{
      backgroundColor: "#141619",
      overflow: "hidden",
      perspective: "1800px",
      perspectiveOrigin: "50% 50%",
    }}
  >
    <Img
      src={staticFile("assets/charcoal-texture.jpg")}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 48% 42%,#0000 20%,#0007 100%)",
      }}
    />
    <WireBackdrop />
    <Img
      src={source}
      style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
    />
    <ChartPlane />
    <Audio src={staticFile("stargrowth/growth-sound.wav")} />
  </AbsoluteFill>
);
