// #region : imports
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CommonComponentOfScreen from './CommonComponentOfScreen';
import { ComponentOfRightSidePanelName } from '../types/data/rightSidePanel';
import { useSelector } from 'react-redux';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';
import { Coord } from '../types/data/common';
import { IRightSidePanelProps } from '../types/props';
import Blue from './Blue';
import Black from './Black';
import { selectComponentAppearances } from '../redux/module/componentAppearancesSlice';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
// #endregion : imports

const RightSidePanel = (props: IRightSidePanelProps) => {
  // #region : states
  const [
    hoveredComponentOfRightSidePanelName,
    setHoveredComponentOfRightSidePanelName,
  ] = useState<'rightSidePanelBoundary' | ComponentOfRightSidePanelName>(
    'rightSidePanelBoundary'
  );
  // #endregion : states

  // #region : redux
  const cursorCoordX = useSelector(selectCursorX);
  const cursorCoordY = useSelector(selectCursorY);

  const componentOfRightSidePanelAppearances = useSelector(
    selectComponentAppearances
  ).RightSidePanel;
  const componentOfRightSidePanelVisibilities = useSelector(
    selectComponentVisibilities
  ).RightSidePanel;
  // #endregion : redux

  // #region : refs
  const rightSidePanelRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : getComponentOfRightSidePanelNameFromPoint
  const getComponentOfRightSidePanelNameFromPoint = useCallback(
    (
      point: Coord,
      containerCoord: Coord
    ): 'rightSidePanelBoundary' | ComponentOfRightSidePanelName => {
      if (
        componentOfRightSidePanelAppearances === undefined ||
        componentOfRightSidePanelVisibilities === undefined
      )
        return 'rightSidePanelBoundary';
      const rightSidePanelComponentNameAndVisibilityAndZIndexes: {
        name: ComponentOfRightSidePanelName;
        isVisible: boolean;
        zIndex: number;
      }[] = [];

      (
        Object.keys(
          componentOfRightSidePanelAppearances
        ) as ComponentOfRightSidePanelName[]
      ).forEach((key) => {
        const appearanceData = componentOfRightSidePanelAppearances[key];
        const visibilityData = componentOfRightSidePanelVisibilities[key];

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
          rightSidePanelComponentNameAndVisibilityAndZIndexes.push({
            name: key,
            isVisible: visibilityData,
            zIndex: appearanceData.zIndex,
          });
        }
      });

      if (rightSidePanelComponentNameAndVisibilityAndZIndexes.length === 0) {
        return 'rightSidePanelBoundary';
      }

      const sortedRightSidePanelComponentNameAndVisibilityAndZIndexes =
        rightSidePanelComponentNameAndVisibilityAndZIndexes.sort(
          (a, b) => b.zIndex - a.zIndex
        );

      return sortedRightSidePanelComponentNameAndVisibilityAndZIndexes.length >
        0
        ? sortedRightSidePanelComponentNameAndVisibilityAndZIndexes[0].name
        : 'rightSidePanelBoundary';
    },
    [
      componentOfRightSidePanelAppearances,
      componentOfRightSidePanelVisibilities,
    ]
  );
  // #endregion : getComponentOfRightSidePanelNameFromPoint

  // #region : effects
  useEffect(() => {
    if (props.isHovered && rightSidePanelRef.current) {
      const container = rightSidePanelRef.current;
      const containerBoundingRect = container.getBoundingClientRect();
      const hoveredComponentOfRightSidePanel =
        getComponentOfRightSidePanelNameFromPoint(
          {
            x: cursorCoordX,
            y: cursorCoordY,
          },
          {
            x: containerBoundingRect.x,
            y: containerBoundingRect.y,
          }
        );
      setHoveredComponentOfRightSidePanelName(hoveredComponentOfRightSidePanel);
    } else {
      setHoveredComponentOfRightSidePanelName('rightSidePanelBoundary');
    }
  }, [props.isHovered, cursorCoordX, cursorCoordY]);

  useEffect(() => {
    console.log(hoveredComponentOfRightSidePanelName);
  }, [hoveredComponentOfRightSidePanelName]);
  // #endregion : effects

  return (
    <CommonComponentOfScreen
      componentName="RightSidePanel"
      x={70}
      y={20}
      width={120}
      height={120}
      zIndex={4}
      ref={rightSidePanelRef}
    >
      <Blue />
      <Black />
    </CommonComponentOfScreen>
  );
};

export default memo(RightSidePanel);
