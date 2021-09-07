import { FC, useMemo } from "react";
import { useLayoutContext } from "./layout-context";
import { Hex } from "./models";
import {
  hexToScreenPosition,
  interpolateHexes,
  distanceBetweenHexes,
  roundToHex,
  axialCoordinatesToCube,
} from "./utils/hex-math";

interface PathProps {
  start?: Hex;
  end?: Hex;
}

export const Path: FC<PathProps> = ({ start, end }) => {
  const {
    layoutData: { orientation, origin, hexSize, spacing },
  } = useLayoutContext();

  const points = useMemo(() => {
    if (!start || !end) return "";

    const [nextStart, nextEnd] =
      start.z !== undefined
        ? [start, end]
        : [
            axialCoordinatesToCube(start.x, start.y),
            axialCoordinatesToCube(end.x, end.y),
          ];

    const distance = distanceBetweenHexes(nextStart, nextEnd);
    let step = 1 / Math.max(distance, 1);

    const intersections = Array.from({ length: distance + 1 }, (_, i) => {
      return roundToHex(interpolateHexes(nextStart, nextEnd, step * i));
    });

    let nextPoints = "M";
    nextPoints += intersections
      .map((hex) => {
        let p = hexToScreenPosition(
          hex,
          orientation,
          origin,
          hexSize,
          spacing,
          hex.z !== undefined
        );

        return ` ${p.x},${p.y} `;
      })
      .join("L");

    return nextPoints;
  }, [orientation, origin, hexSize, spacing, start, end]);

  return points && <path d={points}></path>;
};
