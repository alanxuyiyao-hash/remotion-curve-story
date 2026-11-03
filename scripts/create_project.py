#!/usr/bin/env python3
"""Copy a bundled final-version template without modifying the skill."""
import argparse
import json
from pathlib import Path
import shutil

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("mode", choices=("timeline", "growth"))
parser.add_argument("destination", type=Path)
args = parser.parse_args()
source = Path(__file__).resolve().parents[1] / "assets" / args.mode
dest = args.destination.resolve()
if dest.exists():
    parser.error(f"Destination already exists: {dest}")
shutil.copytree(source, dest)
project = dest / "studio" if args.mode == "timeline" else dest
composition = "AgentTimeline" if args.mode == "timeline" else "OpenClawStarGrowth"
package_file = project / "package.json"
package = json.loads(package_file.read_text())
package["scripts"]["render"] = f"remotion render src/index.ts {composition} out/{args.mode}.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p"
package_file.write_text(json.dumps(package, ensure_ascii=False, indent=2) + "\n")
print(json.dumps({"root": str(dest), "node_project": str(project), "composition": composition}, ensure_ascii=False, indent=2))
