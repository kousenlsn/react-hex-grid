import { createContext, useContext, useState, FC } from "react";

import { Orientation, Point } from "./models";

export interface LayoutData {
  orientation: Orientation;
  hexSize: number;
  spacing: number;
  origin: Point;
  points: string;
}

interface LayoutContextData {
  layoutData: LayoutData;
  setLayoutData: (next: LayoutData) => void;
}

const LayoutContext = createContext<LayoutContextData>({} as LayoutContextData);

export const LayoutProvider: FC = ({ children }) => {
  const [layoutData, setLayoutData] = useState<LayoutData>();

  return (
    <LayoutContext.Provider
      value={{
        setLayoutData,
        layoutData,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextData => {
  const context = useContext(LayoutContext);

  return context;
};
