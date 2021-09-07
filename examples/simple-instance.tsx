import React from "react";
import styled from "styled-components";
import { gridGenerator, Hexagon, HexGrid, OrientationsEnum, HexText } from "react-hex-grid";

const Wrapper = styled.section`
  background: black;

  width: 100%;
  height: 100%;

  touch-action: none;

  svg g {
    fill: lightblue;
  }

  svg g polygon {
    stroke: blue;
    stroke-width: 0.2;
    transition: fill-opacity 0.2s;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Tree = () => {
  const hexagons = gridGenerator.rectangle(21, 21, true, true);

  return (
    <Container>
      <Wrapper>

        <HexGrid
          width="100%"
          height="100%"
          hexSize={7}
          origin={{ x: 0, y: 0 }}
          orientation={OrientationsEnum.flat}
        >
          {hexagons.map((hex, i) => (
            <Hexagon key={i} id={i} coordinates={hex}>
              <HexText>
                {hex.x} {hex.y} {hex.z}
              </HexText>
            </Hexagon>
          ))}
        </HexGrid>

      </Wrapper>
    </Container>
  );
};
