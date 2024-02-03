// #region : imports
import { styled } from 'styled-components';
import Cursor from './Cursor';
import { useSelector } from 'react-redux';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';
import { memo, useCallback, useEffect, useState } from 'react';
import { ComponentOfScreenName } from '../types/data/screen';
import { Coord } from '../types/data/common';
import LeftSidePanel from './LeftSidePanel';
import RightSidePanel from './RightSidePanel';
import { selectComponentAppearances } from '../redux/module/componentAppearancesSlice';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
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
    useState<'screenBoundary' | ComponentOfScreenName>('screenBoundary');
  // #endregion : states

  // #region : redux
  const cursorCoordX = useSelector(selectCursorX);
  const cursorCoordY = useSelector(selectCursorY);

  const componentOfScreenAppearances = useSelector(
    selectComponentAppearances
  ).Screen;
  const componentOfScreenVisibilities = useSelector(
    selectComponentVisibilities
  ).Screen;
  // #endregion : redux

  // #region : getComponentOfScreenNameFromPoint
  const getComponentOfScreenNameFromPoint = useCallback(
    (point: Coord): 'screenBoundary' | ComponentOfScreenName => {
      if (
        componentOfScreenAppearances === undefined ||
        componentOfScreenVisibilities === undefined
      )
        return 'screenBoundary';
      const screenComponentNameAndVisibilityAndZIndexes: {
        name: ComponentOfScreenName;
        isVisible: boolean;
        zIndex: number;
      }[] = [];

      (
        Object.keys(componentOfScreenAppearances) as ComponentOfScreenName[]
      ).forEach((key) => {
        const appearanceData = componentOfScreenAppearances[key];
        const visibilityData = componentOfScreenVisibilities[key];

        if (!appearanceData || !visibilityData) return;
        if (
          appearanceData.x + appearanceData.width >= point.x &&
          appearanceData.y + appearanceData.height >= point.y &&
          appearanceData.x < point.x &&
          appearanceData.y < point.y &&
          visibilityData
        ) {
          screenComponentNameAndVisibilityAndZIndexes.push({
            name: key as ComponentOfScreenName,
            isVisible: visibilityData,
            zIndex: appearanceData.zIndex,
          });
        }
      });

      const sortedNameAndZIndex =
        screenComponentNameAndVisibilityAndZIndexes.sort(
          (a, b) => b.zIndex - a.zIndex
        );

      return sortedNameAndZIndex.length > 0
        ? sortedNameAndZIndex[0].name
        : 'screenBoundary';
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
