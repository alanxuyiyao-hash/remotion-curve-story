import { Composition } from "remotion";
import { OpenClawStarGrowth } from "./StarGrowth";

export const RemotionRoot = () => (
  <Composition id="OpenClawStarGrowth" component={OpenClawStarGrowth}
    durationInFrames={450} fps={30} width={1920} height={1080} />
);
