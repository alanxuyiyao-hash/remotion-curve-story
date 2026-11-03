import { Composition } from "remotion";
import { TimelineFilm } from "./TimelineFilm";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgentTimeline"
        component={TimelineFilm}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
