// #region : imports
import { styled } from 'styled-components';
import Cursor from './Cursor';
import { useSelector } from 'react-redux';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';
import { memo, useCallback, useEffect, useState } from 'react';
import {
  ComponentOfScreenAppearances,
  ComponentOfScreenName,
} from '../types/data/screen';
import {
  selectComponentOfScreenAppearances,
  selectComponentOfScreenVisibilities,
} from '../redux/module/screenSlice';
import { Coord } from '../types/data/common';
import LeftSidePanel from './LeftSidePanel';
import RightSidePanel from './RightSidePanel';
// #endregion : imports

// #region : styled components
const Container = styled.div`
  width: 320px;
  height: 240px;
  border: 1px solid #000;
  position: relative;
`;
// #endregion : styled components

const Screen = () => {
  // #region : states
  const [hoveredComponentOfScreenName, setHoveredComponentOfScreenName] =
    useState<ComponentOfScreenName>('');
  // #endregion : states

  // #region : redux
  const cursorCoordX = useSelector(selectCursorX);
  const cursorCoordY = useSelector(selectCursorY);

  const componentOfScreenAppearances = useSelector(
    selectComponentOfScreenAppearances
  );
  const componentOfScreenVisibilities = useSelector(
    selectComponentOfScreenVisibilities
  );
  // #endregion : redux

  // #region : getComponentOfScreenNameFromPoint
  const getComponentOfScreenNameFromPoint = useCallback(
    (point: Coord): ComponentOfScreenName => {
      const screenComponentNameAndVisibilityAndZIndexes: {
        name: ComponentOfScreenName;
        isVisible: boolean;
        zIndex: number;
      }[] = [];

      let key: keyof ComponentOfScreenAppearances;
      for (key in componentOfScreenAppearances) {
        const appearanceData = componentOfScreenAppearances[key];
        const visibilityData = componentOfScreenVisibilities[key];

        if (
          appearanceData.x + appearanceData.width >= point.x &&
          appearanceData.y + appearanceData.height >= point.y &&
          appearanceData.x < point.x &&
          appearanceData.y < point.y &&
          visibilityData
        ) {
          screenComponentNameAndVisibilityAndZIndexes.push({
            name: key,
            isVisible: visibilityData,
            zIndex: appearanceData.zIndex,
          });
        }
      }

      const sortedNameAndZIndex =
        screenComponentNameAndVisibilityAndZIndexes.sort(
          (a, b) => b.zIndex - a.zIndex
        );

      return sortedNameAndZIndex.length > 0 ? sortedNameAndZIndex[0].name : '';
    },
    [componentOfScreenAppearances, componentOfScreenVisibilities]
  );
  // #endregion : getComponentOfScreenNameFromPoint

  // #region : effects
  useEffect(() => {
    const hoveredComponentOfScreen = getComponentOfScreenNameFromPoint({
      x: cursorCoordX,
      y: cursorCoordY,
    });
    setHoveredComponentOfScreenName(hoveredComponentOfScreen);
  }, [cursorCoordX, cursorCoordY]);

  useEffect(() => {
    console.log(hoveredComponentOfScreenName);
  }, [hoveredComponentOfScreenName]);
  // #endregion : effects

  return (
    <Container>
      <Cursor x={cursorCoordX} y={cursorCoordY} />
      <LeftSidePanel
        isHovered={hoveredComponentOfScreenName === 'LeftSidePanel'}
      />
      <RightSidePanel
        isHovered={hoveredComponentOfScreenName === 'RightSidePanel'}
      />
    </Container>
  );
};

export default memo(Screen);
