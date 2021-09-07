import { Hex, Orientation, Point } from "../models";
import { ORIENTATIONS_CONSTS, OrientationsEnum } from "./orientation";


const linearInterpolation = (a: number, b: number, t: number): number => a + ((b - a) * t);

const subtract = (a: Hex, b: Hex): Hex => new Hex(a.x - b.x, a.y - b.y, a.z - b.z);

const add = (a: Hex, b: Hex): Hex => new Hex(a.x + b.x, a.y + b.y, a.z + b.z);

export const hexToScreenPosition = (hex: Hex, orientation: Orientation, origin: Point, size: number, spacing: number, cubic = false): Point => {
  const { f0, f1, f2, f3 } = orientation;
  const x = (f0 * hex.x + f1 * (cubic ? hex.z : hex.y)) * size * spacing;
  const y = (f2 * hex.x + f3 * (cubic ? hex.z : hex.y)) * size * spacing;

  return { x: x + origin.x, y: y + origin.y };
};

export const interpolateHexes = (a: Hex, b: Hex, t: number) => {
  return new Hex(linearInterpolation(a.x, b.x, t), linearInterpolation(a.y, b.y, t), linearInterpolation(a.z, b.z, t))
}

export const distanceBetweenHexes = (begin: Hex, end: Hex): number => {
  const diff = subtract(begin, end);
  const length = +((Math.abs(diff.x) + Math.abs(diff.y) + Math.abs(diff.z)) / 2);

  return length;
}

export const roundToHex = ({ x, y, z }: Hex): Hex => {
  let rx = Math.round(x)
  let ry = Math.round(y)
  let rz = Math.round(z)

  const diff_x = Math.abs(rx - x)
  const diff_y = Math.abs(ry - y)
  const diff_z = Math.abs(rz - z)

  if (diff_x > diff_y && diff_x > diff_z)
      rx = -ry-rz
  else if (diff_y > diff_z)
      ry = -rx-rz
  else
      rz = -rx-ry

  return new Hex(rx, ry, rz);
}

// https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
export const pixelToHex = (point: Point, orientation: OrientationsEnum, origin: Point, hexSize: Point)  => {
  const pt: Point = { x: (point.x - origin.x) / hexSize.x, y: (point.y - origin.y) / hexSize.y };
  
  const q = ORIENTATIONS_CONSTS[orientation].b0 * pt.x + ORIENTATIONS_CONSTS[orientation].b1 * pt.y;
  const r = ORIENTATIONS_CONSTS[orientation].b2 * pt.x + ORIENTATIONS_CONSTS[orientation].b3 * pt.y;
  const hex = new Hex(q, r, -q - r);
  return roundToHex(hex);
}

export const cubeCoordinatesToAxial = (x: number, z: number) => new Hex(x, z);

export const axialCoordinatesToCube = (x: number, y: number) => new Hex(x, -x - y, y);

type Directions = 0 | 1 | 2 | 3 | 4 | 5;

const directions = {
  0: new Hex(1, 0, -1),
  1: new Hex(1, -1, 0),
  2: new Hex(0, -1, 1),
  3: new Hex(-1, 0, 1),
  4: new Hex(-1, 1, 0),
  5: new Hex(0, 1, -1),
};

export const neighboor = (hex: Hex, direction: Directions) => add(hex, directions[direction]);
