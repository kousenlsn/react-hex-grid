import React, { useMemo, CSSProperties, FC, MouseEvent } from "react";

import { Hex } from "./models";
import { useLayoutContext } from "./layout-context";
import { hexToScreenPosition } from "./utils";

export type HexEvent = (
  id: string,
  coordinates: Hex,
  event: MouseEvent<SVGGElement, globalThis.MouseEvent>
) => void;

export interface HexagonProps {
  id: number | string;
  coordinates: Hex;

  patternFill?: string;
  cellStyle?: CSSProperties;
  className?: string;

  onMouseEnter?: HexEvent;
  onMouseOver?: HexEvent;
  onMouseLeave?: HexEvent;
  onClick?: HexEvent;
  onDragStart?: HexEvent;
  onDragEnd?: HexEvent;
  onDragOver?: HexEvent;
  onDrop?: HexEvent;
}

export const Hexagon: FC<HexagonProps> = ({
  id,
  coordinates,
  patternFill,
  cellStyle,
  className,
  children,
  ...pointerEvents
}) => {
  const {
    layoutData: { orientation, origin, hexSize, spacing, points },
  } = useLayoutContext();

  const position = useMemo(() => {
    return hexToScreenPosition(
      coordinates,
      orientation,
      origin,
      hexSize,
      spacing,
      coordinates.z !== undefined
    );
  }, [orientation, origin, hexSize, spacing, coordinates]);

  const fillId = patternFill ? `url(#${patternFill})` : null;

  const events = Object.keys(pointerEvents).reduce(
    (prev, key) => ({
      ...prev,
      [key]: (e) =>
        pointerEvents[key] && pointerEvents[key](id, coordinates, e),
    }),
    {}
  );

  return (
    <g
      className={className}
      transform={`translate(${position.x}, ${position.y})`}
      {...events}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyle} />
        {children}
      </g>
    </g>
  );
};
