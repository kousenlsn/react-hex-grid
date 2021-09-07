import { forwardRef, ReactElement } from "react";
import { Layout, LayoutProps } from "./layout";

export interface HexGridProps extends LayoutProps {
  width: string | number;
  height: string | number;
  viewBox?: string;
  children: ReactElement;
}

export const HexGrid = forwardRef<SVGSVGElement, HexGridProps>(
  (
    {
      width = 800,
      height = 600,
      viewBox = "-50 -50 100 100",
      children,
      ...layoutProps
    },
    ref
  ) => (
    <svg
      className="grid"
      width={width}
      height={height}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      <Layout {...layoutProps}>{children}</Layout>
    </svg>
  )
);
