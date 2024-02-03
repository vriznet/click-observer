// #region : imports
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CommonComponentOfScreen from './CommonComponentOfScreen';
import { ComponentOfLeftSidePanelName } from '../types/data/leftSidePanel';
import { useSelector } from 'react-redux';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';
import { selectComponentOfLeftSidePanelVisibilities } from '../redux/module/leftSidePanelSlice';
import { Coord } from '../types/data/common';
import { ILeftSidePanelProps } from '../types/props';
import Red from './Red';
import Green from './Green';
import { selectComponentAppearances } from '../redux/module/componentAppearancesSlice';
// #endregion : imports

const LeftSidePanel = (props: ILeftSidePanelProps) => {
  // #region : states
  const [
    hoveredComponentOfLeftSidePanelName,
    setHoveredComponentOfLeftSidePanelName,
  ] = useState<'leftSidePanelBoundary' | ComponentOfLeftSidePanelName>(
    'leftSidePanelBoundary'
  );
  // #endregion : states

  // #region : redux
  const cursorCoordX = useSelector(selectCursorX);
  const cursorCoordY = useSelector(selectCursorY);

  const componentOfLeftSidePanelAppearances = useSelector(
    selectComponentAppearances
  ).LeftSidePanel;
  const componentOfLeftSidePanelVisibilities = useSelector(
    selectComponentOfLeftSidePanelVisibilities
  );
  // #endregion : redux

  // #region : refs
  const leftSidePanelRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : getComponentOfLeftSidePanelNameFromPoint
  const getComponentOfLeftSidePanelNameFromPoint = useCallback(
    (
      point: Coord,
      containerCoord: Coord
    ): 'leftSidePanelBoundary' | ComponentOfLeftSidePanelName => {
      if (componentOfLeftSidePanelAppearances === undefined)
        return 'leftSidePanelBoundary';
      const leftSidePanelComponentNameAndVisibilityAndZIndexes: {
        name: ComponentOfLeftSidePanelName;
        isVisible: boolean;
        zIndex: number;
      }[] = [];

      (
        Object.keys(
          componentOfLeftSidePanelAppearances
        ) as ComponentOfLeftSidePanelName[]
      ).forEach((key) => {
        const appearanceData = componentOfLeftSidePanelAppearances[key];
        const visibilityData = componentOfLeftSidePanelVisibilities[key];

        if (!appearanceData || !visibilityData) return;
        if (
          appearanceData.x + containerCoord.x + appearanceData.width >=
            point.x &&
          appearanceData.y + containerCoord.y + appearanceData.height >=
            point.y &&
          appearanceData.x + containerCoord.x < point.x &&
          appearanceData.y + containerCoord.y < point.y &&
          visibilityData
        ) {
          leftSidePanelComponentNameAndVisibilityAndZIndexes.push({
            name: key,
            isVisible: visibilityData,
            zIndex: appearanceData.zIndex,
          });
        }
      });

      if (leftSidePanelComponentNameAndVisibilityAndZIndexes.length === 0) {
        return 'leftSidePanelBoundary';
      }

      const sortedLeftSidePanelComponentNameAndVisibilityAndZIndexes =
        leftSidePanelComponentNameAndVisibilityAndZIndexes.sort(
          (a, b) => b.zIndex - a.zIndex
        );

      return sortedLeftSidePanelComponentNameAndVisibilityAndZIndexes.length > 0
        ? sortedLeftSidePanelComponentNameAndVisibilityAndZIndexes[0].name
        : 'leftSidePanelBoundary';
    },
    [componentOfLeftSidePanelAppearances, componentOfLeftSidePanelVisibilities]
  );
  // #endregion : getComponentOfLeftSidePanelNameFromPoint

  // #region : effects
  useEffect(() => {
    if (props.isHovered && leftSidePanelRef.current) {
      const container = leftSidePanelRef.current;
      const containerBoundingRect = container.getBoundingClientRect();
      const hoveredComponentOfLeftSidePanel =
        getComponentOfLeftSidePanelNameFromPoint(
          {
            x: cursorCoordX,
            y: cursorCoordY,
          },
          {
            x: containerBoundingRect.x,
            y: containerBoundingRect.y,
          }
        );
      setHoveredComponentOfLeftSidePanelName(hoveredComponentOfLeftSidePanel);
    } else {
      setHoveredComponentOfLeftSidePanelName('leftSidePanelBoundary');
    }
  }, [props.isHovered, cursorCoordX, cursorCoordY]);

  useEffect(() => {
    console.log(hoveredComponentOfLeftSidePanelName);
  }, [hoveredComponentOfLeftSidePanelName]);
  // #endregion : effects

  return (
    <CommonComponentOfScreen
      componentName="LeftSidePanel"
      x={20}
      y={20}
      width={120}
      height={120}
      zIndex={1}
      ref={leftSidePanelRef}
    >
      <Red />
      <Green />
    </CommonComponentOfScreen>
  );
};

export default memo(LeftSidePanel);
