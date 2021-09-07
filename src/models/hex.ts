
export interface Hex {
  x: number;
  y: number;
  z?: number;
}

export class Hex implements Hex {
  constructor(x: number, y: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  x: number;
  y: number;
  z?: number;
}
