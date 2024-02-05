import { RefObject, useCallback, useEffect, useState } from 'react';
import { ComponentName } from '../types/data/componentName';
import { useSelector } from 'react-redux';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';
import { selectComponentAppearances } from '../redux/module/componentAppearancesSlice';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';

const useHovered = <CCN extends ComponentName>(
  componentName: ComponentName,
  isHovered: boolean,
  containerRef: RefObject<HTMLElement>
) => {
  const boundaryName = `${componentName}Boundary` as const;
  // #region : states
  const [hoveredComponentName, setHoveredComponentName] = useState<
    CCN | typeof boundaryName
  >(boundaryName);
  // #endregion : states

  // #region : redux
  const cursorX = useSelector(selectCursorX);
  const cursorY = useSelector(selectCursorY);

  const componentAppearances = useSelector(selectComponentAppearances)[
    componentName
  ];
  const componentVisibilities = useSelector(selectComponentVisibilities)[
    componentName
  ];
  // #endregion : redux

  // #region : getComponentNameFromPoint
  const getComponentNameFromPoint = useCallback(
    (
      point: { x: number; y: number },
      containerCoord: { x: number; y: number }
    ): CCN | typeof boundaryName => {
      if (
        componentAppearances === undefined ||
        componentVisibilities === undefined
      )
        return boundaryName;
      const componentNameAndVisibilityAndZIndexes: {
        name: CCN;
        isVisible: boolean;
        zIndex: number;
      }[] = [];

      (Object.keys(componentAppearances) as CCN[]).forEach((key) => {
        const appearanceData = componentAppearances[key];
        const visibilityData = componentVisibilities[key];

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
          componentNameAndVisibilityAndZIndexes.push({
            name: key,
            isVisible: visibilityData,
            zIndex: appearanceData.zIndex,
          });
        }
      });

      if (componentNameAndVisibilityAndZIndexes.length === 0)
        return boundaryName;

      const sortedComponentNameAndVisibilityAndZIndexes =
        componentNameAndVisibilityAndZIndexes.sort(
          (a, b) => b.zIndex - a.zIndex
        );

      return sortedComponentNameAndVisibilityAndZIndexes.length > 0
        ? sortedComponentNameAndVisibilityAndZIndexes[0].name
        : boundaryName;
    },
    [componentAppearances, componentVisibilities]
  );
  // #endregion : getComponentNameFromPoint

  // #region : effects
  useEffect(() => {
    if (isHovered && containerRef.current) {
      const container = containerRef.current;
      const containerBoundingRect = container.getBoundingClientRect();
      const hoveredComponent = getComponentNameFromPoint(
        { x: cursorX, y: cursorY },
        { x: containerBoundingRect.x, y: containerBoundingRect.y }
      );
      setHoveredComponentName(hoveredComponent);
    } else {
      setHoveredComponentName(boundaryName);
    }
  }, [
    isHovered,
    cursorX,
    cursorY,
    componentAppearances,
    componentVisibilities,
  ]);
  // #endregion : effects

  return [hoveredComponentName];
};

export default useHovered;
