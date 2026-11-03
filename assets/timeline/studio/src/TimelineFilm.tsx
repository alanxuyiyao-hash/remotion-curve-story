import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const GREEN = "#d0f46e";
const BOLD = "Arial Black, Arial, sans-serif";
const CN = "PingFang SC, Microsoft YaHei, sans-serif";
const MONO = "SFMono-Regular, Consolas, monospace";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const Picture = ({
  src,
  style,
}: {
  src: string;
  style?: React.CSSProperties;
}) => <Img src={staticFile(`assets/${src}`)} style={style} />;

const Backdrop = () => (
  <AbsoluteFill style={{ backgroundColor: "#151618" }}>
    <Picture
      src="charcoal-texture.jpg"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 48% 46%,transparent 20%,rgba(0,0,0,.48) 100%)",
      }}
    />
  </AbsoluteFill>
);

const ChatGPTArt = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(125deg,#174e7e 0%,#5aa4ef 47%,#b6deff 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "#b4cfff",
          filter: "blur(75px)",
          left: -140,
          top: -200,
          opacity: 0.65,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 42,
          color: "#fff",
          fontFamily: MONO,
          fontSize: 13,
          letterSpacing: 2,
        }}
      >
        ASK. THINK. CREATE.
      </div>
      <div
        style={{
          position: "absolute",
          left: 39,
          top: 94,
          color: "#fff",
          fontFamily: BOLD,
          fontSize: 44,
          letterSpacing: -2,
          lineHeight: 1.08,
        }}
      >
        A new
        <br />
        conversation.
      </div>
      <div
        style={{
          position: "absolute",
          width: 258,
          height: 476,
          left: 327,
          top: -35,
          border: "8px solid #151923",
          borderRadius: 49,
          background: "linear-gradient(150deg,#72c1ff,#5293ee 46%,#9eaff8)",
          boxShadow: "-16px 22px 38px #12345880",
          rotate: "22deg",
          translate: `0px ${interpolate(frame, [0, 16 * fps], [8, -12])}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 86,
            top: 13,
            width: 70,
            height: 18,
            borderRadius: 20,
            background: "#151923",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 26,
            color: "#fff",
            fontFamily: BOLD,
            fontSize: 22,
          }}
        >
          9:41
        </div>
        <Picture
          src="chatgpt-icon.webp"
          style={{
            position: "absolute",
            left: 64,
            top: 157,
            width: 115,
            height: 115,
            borderRadius: 26,
            boxShadow: "0 10px 20px #1c397b33",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 286,
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: 23,
            fontFamily: "Arial",
          }}
        >
          ChatGPT
        </div>
      </div>
    </AbsoluteFill>
  );
};
const OpenClawArt = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#0a0b12", overflow: "hidden" }}>
      <Picture
        src="openclaw-card.png"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, 16 * fps], [1.01, 1.06]),
        }}
      />
    </AbsoluteFill>
  );
};
const WorkBuddyArt = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg,#eaf9f2,#fffef5 62%,#d3f2df)",
        padding: 35,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Picture src="workbuddy-logo.svg" style={{ width: 34, height: 34 }} />
        <span style={{ fontFamily: BOLD, fontSize: 22, color: "#1f3430" }}>
          WorkBuddy
        </span>
      </div>
      <div
        style={{
          fontFamily: CN,
          fontSize: 35,
          color: "#153b2d",
          marginTop: 33,
          fontWeight: 700,
        }}
      >
        把工作，交给好搭子
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#73867c",
          fontFamily: MONO,
          marginTop: 10,
          letterSpacing: 2,
        }}
      >
        RESEARCH · CREATE · DELIVER
      </div>
      <div
        style={{
          position: "absolute",
          left: 35,
          bottom: 29,
          width: 404,
          height: 92,
          border: "1px solid #dbe8db",
          borderRadius: 15,
          background: "#ffffffd9",
          boxShadow: "0 6px 18px #395b3010",
          padding: 16,
          translate: `0px ${interpolate(frame, [0, 16 * fps], [3, -4])}px`,
        }}
      >
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 8,
              background: "#23b585",
            }}
          />
          <span style={{ fontFamily: MONO, fontSize: 12, color: "#486957" }}>
            Working on your next idea
          </span>
        </div>
        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
          {["Research", "Documents", "Slides"].map((t) => (
            <span
              key={t}
              style={{
                background: "#eef6ee",
                borderRadius: 5,
                padding: "6px 12px",
                fontFamily: "Arial",
                fontSize: 12,
                color: "#53705b",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: -35,
          bottom: -28,
          rotate: "-12deg",
        }}
      >
        <Picture src="workbuddy-logo.svg" style={{ width: 186, height: 186 }} />
      </div>
    </AbsoluteFill>
  );
};
const CodexArt = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 78% 45%,#444a8b,#171b2c 67%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 32,
          width: 390,
          height: 274,
          border: "1px solid #676d8d",
          borderRadius: 12,
          background: "#161821",
          boxShadow: "0 20px 36px #0006",
          rotate: "-4deg",
          translate: `0px ${interpolate(frame, [0, 16 * fps], [5, -3])}px`,
        }}
      >
        <div
          style={{
            height: 31,
            borderBottom: "1px solid #333744",
            display: "flex",
            alignItems: "center",
            gap: 5,
            paddingLeft: 12,
          }}
        >
          {["#e7807e", "#dfc174", "#7ebd8e"].map((c) => (
            <span
              key={c}
              style={{ width: 7, height: 7, borderRadius: 6, background: c }}
            />
          ))}
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "#a7a9bd",
              marginLeft: 8,
            }}
          >
            codex / workspace
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 32,
            bottom: 0,
            width: 84,
            borderRight: "1px solid #333744",
            padding: 13,
          }}
        >
          {[52, 37, 45, 50, 28, 40].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 5,
                background: i === 1 ? "#8f9aff" : "#3d4053",
                borderRadius: 3,
                marginBottom: 18,
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 106,
            top: 65,
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 2,
            color: "#959db5",
          }}
        >
          <span style={{ color: "#c6ccff" }}>› Build what comes next.</span>
          <br />
          <span style={{ color: "#737c91" }}>Planning the task</span>
          <br />
          <span style={{ color: "#a7c9a9" }}>✓ Read project files</span>
          <br />
          <span style={{ color: "#a7c9a9" }}>✓ Create a working plan</span>
          <br />
          <span style={{ color: "#b1baff" }}>› Ready to ship_</span>
        </div>
      </div>
      <Picture
        src="codex-logo.svg"
        style={{
          position: "absolute",
          right: 28,
          top: 88,
          width: 149,
          height: 149,
          borderRadius: 31,
          boxShadow: "0 20px 38px #07091eaa",
          rotate: "12deg",
        }}
      />
    </AbsoluteFill>
  );
};

const AgentArt = ({ src }: { src: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Picture
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, 16 * fps], [1, 1.035]),
        }}
      />
    </AbsoluteFill>
  );
};

const railY = (x: number) => {
  const u = (x - 77) / 6523;
  const rise =
    u < 0
      ? 0.2 * u
      : u > 1
        ? 1 + 0.2 * (u - 1)
        : 0.2 * u + 0.8 * u * u * (3 - 2 * u);
  return 2700 - 1850 * rise;
};
const railGradient = (x: number) => {
  const u = Math.max(0, Math.min(1, (x - 77) / 6523));
  return -(1850 / 6523) * (0.2 + 4.8 * u * (1 - u));
};
const smooth01 = (value: number) => {
  const u = Math.max(0, Math.min(1, value));
  return u * u * (3 - 2 * u);
};
const climbProgress = (seconds: number) => smooth01((seconds - 0.4) / 11.8);

type CardProps = {
  x: number;
  brand: string;
  product: string;
  stage: string;
  logo: string;
  children: React.ReactNode;
  iconBackground?: string;
  enterDelay?: number;
};
const ProductCard = ({
  x,
  brand,
  product,
  stage,
  logo,
  children,
  iconBackground = "#f8f8f1",
  enterDelay = 0,
}: CardProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name={product}
      style={{
        position: "absolute",
        left: x,
        top: railY(x + 660) - 815,
        width: 590,
        height: 815,
        opacity: interpolate(
          frame,
          [(0.2 + enterDelay) * fps, (0.85 + enterDelay) * fps],
          [0, 1],
          clamp,
        ),
        translate: interpolate(
          frame,
          [(0.2 + enterDelay) * fps, (1 + enterDelay) * fps],
          ["0px 28px", "0px 0px"],
          { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 233,
          fontFamily: BOLD,
          fontSize: 91,
          color: "transparent",
          WebkitTextStroke: "1.2px #d0f46e75",
          whiteSpace: "nowrap",
          letterSpacing: -4,
        }}
      >
        {brand}
      </div>
      <div
        style={{
          position: "absolute",
          left: -88,
          top: 330,
          width: 60,
          height: 60,
          borderRadius: 14,
          background: iconBackground,
          padding: 7,
          boxShadow: "0 4px 14px #0005",
        }}
      >
        <Picture
          src={logo}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 324,
          width: 590,
          height: 338,
          border: "2px solid " + GREEN,
          padding: 5,
          borderRadius: 19,
          background: "#242821",
          boxShadow: "0 15px 35px #0005",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            borderRadius: 13,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 684,
          color: "#fafaf6",
          fontFamily: BOLD,
          fontSize: 54,
          letterSpacing: -1.5,
          whiteSpace: "nowrap",
        }}
      >
        {product}
      </div>
      <div
        style={{
          position: "absolute",
          left: 3,
          top: 764,
          color: "#b7bcae",
          fontFamily: CN,
          fontSize: 22,
          letterSpacing: 4,
        }}
      >
        {stage}
      </div>
    </Interactive.Div>
  );
};

const StageMarker = ({
  x,
  year,
  cardX,
}: {
  x: number;
  year: string;
  cardX: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stemHeight = railY(x) - railY(cardX + 660) + 491;
  return (
    <div style={{ position: "absolute", left: x, top: railY(x) }}>
      <div
        style={{
          position: "absolute",
          left: -1,
          top: -stemHeight,
          width: 2,
          height: stemHeight,
          background: "#e6ead8",
          transformOrigin: "50% 100%",
          scale:
            "1 " +
            interpolate(frame, [0, 0.72 * fps], [0, 1], {
              ...clamp,
              easing: Easing.bezier(0.2, 0.7, 0.3, 1),
            }),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 16,
          height: 16,
          borderRadius: 20,
          border: "2px solid " + GREEN,
          background: "#22271d",
          boxShadow: "0 0 14px #d0f46e55",
          opacity: interpolate(frame, [0, 0.2 * fps], [0, 1], clamp),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -130,
          top: 52,
          width: 340,
          textAlign: "center",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 94,
          lineHeight: 1,
          color: GREEN,
          whiteSpace: "nowrap",
          opacity: interpolate(frame, [0.08 * fps, 0.6 * fps], [0, 1], clamp),
          translate: interpolate(
            frame,
            [0.08 * fps, 0.6 * fps],
            ["0px 10px", "0px 0px"],
            clamp,
          ),
        }}
      >
        {year}
        <span style={{ fontFamily: CN, fontSize: 52, marginLeft: 8 }}>年</span>
      </div>
    </div>
  );
};

const Rail = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const head = 250 + 6350 * climbProgress(t);
  const start = -350;
  const end = 6600;
  const curvedPath = (offset: number) =>
    [
      "M",
      start + 600,
      railY(start) + offset,
      "L",
      677,
      2700 + offset,
      "C",
      77 + 6523 / 3 + 600,
      2576.666666667 + offset,
      77 + (2 * 6523) / 3 + 600,
      973.333333333 + offset,
      end + 600,
      railY(end) + offset,
    ].join(" ");
  return (
    <svg
      width="7400"
      height="3500"
      style={{ position: "absolute", left: -600, top: 0, overflow: "visible" }}
    >
      <defs>
        <clipPath id="slope-rail-reveal">
          <rect x="0" y="0" width={head + 600} height="3500" />
        </clipPath>
      </defs>
      <g clipPath="url(#slope-rail-reveal)">
        <path
          d={curvedPath(0)}
          fill="none"
          stroke="#bac3ae"
          strokeWidth="1.6"
        />
        <path
          d={curvedPath(18)}
          fill="none"
          stroke="#9ca58e"
          strokeWidth=".9"
          opacity=".65"
        />
        {Array.from({ length: 349 }, (_, i) => {
          const x = start + i * 20;
          const length = i % 5 === 0 ? 27 : i % 2 === 0 ? 16 : 9;
          const gradient = railGradient(x);
          const normalY = 1 / Math.hypot(1, gradient);
          const normalX = -gradient * normalY;
          return (
            <line
              key={i}
              x1={x + 600}
              y1={railY(x)}
              x2={x + 600 - normalX * length}
              y2={railY(x) - normalY * length}
              stroke="#c5cdb9"
              strokeWidth={i % 5 === 0 ? 1.4 : 0.8}
              opacity={i % 5 === 0 ? 0.85 : 0.5}
            />
          );
        })}
        {Array.from({ length: 696 }, (_, i) => {
          const x = start + i * 10;
          const length = i % 5 === 0 ? 12 : 5;
          const gradient = railGradient(x);
          const normalY = 1 / Math.hypot(1, gradient);
          const normalX = -gradient * normalY;
          return (
            <line
              key={i}
              x1={x + 600}
              y1={railY(x) + 18}
              x2={x + 600 + normalX * length}
              y2={railY(x) + 18 + normalY * length}
              stroke="#aeb7a0"
              strokeWidth=".7"
              opacity=".55"
            />
          );
        })}
      </g>
      <circle
        cx={head + 600}
        cy={railY(head)}
        r="4.5"
        fill={GREEN}
        opacity={1 - smooth01((t - 12.1) / 3.1)}
      />
    </svg>
  );
};

const Camera = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const travel = climbProgress(t);
  const wide = smooth01((t - 12.1) / 3.1);
  const movingX = 395 + 5245 * travel;
  const movingY = railY(movingX) - 340 - 180 * travel;
  const cx = movingX + (3150 - movingX) * wide;
  const cy = movingY + (1510 - movingY) * wide;
  const framing =
    0.96 - 0.14 * Math.min(1, Math.abs(railGradient(movingX)) / 0.397);
  const zoom = (0.92 - 0.14 * travel) * framing * (1 - wide) + 0.255 * wide;
  const screenY = 450 + 105 * wide;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 7400,
        height: 3500,
        transformOrigin: "0 0",
        transform:
          "translate(" +
          (960 - cx * zoom) +
          "px," +
          (screenY - cy * zoom) +
          "px) scale(" +
          zoom +
          ")",
      }}
    >
      {children}
    </div>
  );
};

const Captions = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const caption =
    t < 3.7
      ? "从对话开始"
      : t < 6.3
        ? "让个人助理，开始调用工具"
        : t < 9.3
          ? "WorkBuddy / Codex：办公与代码协作"
          : t < 13.4
            ? "Muse / Grok Bot：个人 Agent"
            : "四个阶段，一条 Agent 时间线";
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 30,
          textAlign: "center",
          fontFamily: CN,
          fontSize: 30,
          color: "#f6f6ef",
          fontWeight: 700,
          textShadow: "0 2px 4px #000",
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        {caption}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 90,
          textAlign: "center",
          fontFamily: CN,
          fontSize: 60,
          color: "#f3f5ec",
          fontWeight: 700,
          letterSpacing: 3,
          opacity: interpolate(frame, [14.3 * fps, 15.1 * fps], [0, 1], clamp),
          translate: interpolate(
            frame,
            [14.3 * fps, 15.1 * fps],
            ["0px 15px", "0px 0px"],
            clamp,
          ),
        }}
      >
        从对话，到执行
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 174,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 18,
          color: GREEN,
          letterSpacing: 5,
          opacity: interpolate(
            frame,
            [14.55 * fps, 15.3 * fps],
            [0, 0.8],
            clamp,
          ),
        }}
      >
        THE PERSONAL AGENT TIMELINE
      </div>
    </>
  );
};

export const TimelineFilm = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ overflow: "hidden", color: "#f7f6ee" }}>
      <Backdrop />
      <Camera>
        <Rail />
        <Sequence name="2023 · ChatGPT" layout="none">
          <StageMarker x={77} year="2023" cardX={100} />
          <ProductCard
            x={100}
            brand="OpenAI"
            product="01  ChatGPT"
            stage="对话入口"
            logo="chatgpt-icon.webp"
          >
            <ChatGPTArt />
          </ProductCard>
        </Sequence>
        <Sequence name="2025 · OpenClaw" from={3.7 * fps} layout="none">
          <StageMarker x={1427} year="2025" cardX={1450} />
          <ProductCard
            x={1450}
            brand="OpenClaw"
            product="02  OpenClaw"
            stage="自主助理"
            logo="openclaw-logo.svg"
            iconBackground="#11131b"
          >
            <OpenClawArt />
          </ProductCard>
        </Sequence>
        <Sequence
          name="2026 · WorkBuddy / Codex"
          from={6.3 * fps}
          layout="none"
        >
          <StageMarker x={3465} year="2026" cardX={3480} />
          <ProductCard
            x={2800}
            brand="腾讯"
            product="03  WorkBuddy"
            stage="办公协作"
            logo="workbuddy-logo.svg"
          >
            <WorkBuddyArt />
          </ProductCard>
          <ProductCard
            x={3480}
            brand="OpenAI"
            product="Codex"
            stage="代码执行"
            logo="codex-logo.svg"
            enterDelay={0.16}
          >
            <CodexArt />
          </ProductCard>
        </Sequence>
        <Sequence name="2026 · Grok Bot / Muse" from={9.3 * fps} layout="none">
          <StageMarker x={5665} year="2026" cardX={5680} />
          <ProductCard
            x={5000}
            brand="xAI"
            product="04  Grok Bot"
            stage="个人 Agent"
            logo="grokbot-icon.jpg"
            iconBackground="#121315"
          >
            <AgentArt src="grokbot-card.png" />
          </ProductCard>
          <ProductCard
            x={5680}
            brand="Meta"
            product="Muse"
            stage="个人 Agent"
            logo="muse-icon.jpg"
            enterDelay={0.16}
          >
            <AgentArt src="muse-card.webp" />
          </ProductCard>
        </Sequence>
      </Camera>
      <Captions />
      <Audio src={staticFile("assets/timeline-sound.wav")} />
    </AbsoluteFill>
  );
};
