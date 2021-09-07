# react-hex-grid

*Generate Hex grids with SVG*

Yet another implementation of https://www.redblobgames.com/grids/hexagons/.

Also inspired from https://www.npmjs.com/package/react-hexgrid.

### Features :mag_right:

- Core components for rendering any Hexgrid format;
- Util methods to quick generate default grids;
- Util methods for doing math operations with hexagons.

### Install :construction_worker:
1. Install the package:
  -   ``npm install react-hex-grid``
  -   or ``yarn add react-hex-grid``;

### Using :electric_plug:

- [Simple instance example.](https://github.com/kousenlsn/react-hex-grid/blob/master/examples/simple-instance.tsx)

##### HexGrid props
| Prop | Description |
| --- | --- |
|  className?: string              | class-name delegated to the SVG
|  orientation?: OrientationsEnum  | Orientation of the hexagons: pointy or flat
|  origin?: Point                  | Initial point of the SVG coordinate to start drawing the Hexagons
|  hexSize?: number                | Size of the Hexagons
|  spacing?: number                | spacing between each Hexagon
|  width: number \| string         | width of the SVG
|  height: number \| string,       | height of the SVG
|  viewBox: string                 | SVG base viewbox



##### Hexagon props
| Prop | Description |
| --- | --- |
| id: number \| string;            | unique id of each Hex
| coordinates: Hex;                | can be defined as xy or xyz
| patternFill?: string;            | if using any pattern, it is instanced as ``url(#${patternFill})``
| cellStyle?: CSSProperties;       | styles
| className?: string;              | class-name delegated
| onMouseEnter...?: HexEvent;      | Events over hexagons. (all basic events covered)



##### Path props
| Prop | Description |
| --- | --- |
| start: Hex                       | Hexagon used to calculate the initial point of the path
| end: Hex;                        | Hexagon used to calculate the final point of the path



##### HexPattern props
| Prop | Description |
| --- | --- |
| id: string                       | unique id for each ``<pattern>``
| url: string                      | url / base64 data



##### Generation methods
| Method | Description |
| --- | --- |
| orientedRectangle(width: number, height: number, cubic = false)                               | cubic defines if using Z coordinate. If so, [Y does nothing.](https://www.redblobgames.com/grids/hexagons/#coordinates-cube)
| rectangle(mapWidth: number, mapHeight: number, cubic = false, zeroAsCentralPoint = false)     | //
| parallelogram(q1: number, q2: number, r1: number, r2: number, cubic)                          | //
| hexagon(mapRadius: number, cubic = false)                                                     | //



##### Math methods
| Method |
| --- |
| hexToScreenPosition(hex: Hex, orientation: Orientation, origin: Point, size: number, spacing: number, cubic = false): Point;
| interpolateHexes(a: Hex, b: Hex, t: number): Hex;
| distanceBetweenHexes(begin: Hex, end: Hex): number;
| roundToHex({ x, y, z }: Hex): Hex;
| pixelToHex(point: Point, orientation: OrientationsEnum, origin: Point, hexSize: Point): Hex;
| cubeCoordinatesToAxial(x: number, z: number): Hex;
| axialCoordinatesToCube(x: number, y: number): Hex;
| neighboor(hex: Hex, direction: Directions): Hex


----


Feel free to contribute, report bugs, or [contact me](https://github.com/kousenlsn).
