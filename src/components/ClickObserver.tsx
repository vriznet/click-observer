// #region : imports
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMouseActionState,
  updateAllComponentClickStatus,
  updateComponentClickStatus,
  updateMouseActionState,
} from '../redux/module/mouseSlice';
import { selectHoveredComponent } from '../redux/module/hoveredComponentSlice';
import {
  ComponentHasChild,
  ComponentHasHovered,
  ComponentName,
} from '../types/data/componentName';
import { componentBoundaryNameList, componentTree } from '../data/common';
import { MouseActionState } from '../types/states';
// #endregion : imports

// #region : getLowestComponentParentName
const getParentNameOfLowestComponent = (
  componentTree: any,
  hoveredComponents: ComponentHasChild[]
): ComponentHasChild | undefined => {
  let currentObj = componentTree;
  let currentObjName = 'Screen' as ComponentHasChild;
  for (const component of hoveredComponents) {
    if (
      !currentObj ||
      typeof currentObj !== 'object' ||
      !currentObj.hasOwnProperty(component)
    ) {
      return undefined;
    }
    currentObj = currentObj[component];
    currentObjName = component;
  }
  return currentObjName;
};
// #endregion : getLowestComponentParentName

const ClickObserver = () => {
  // #region : redux
  const dispatch = useDispatch();

  const mouseActionState = useSelector(selectMouseActionState);
  const hoveredComponentList = useSelector(selectHoveredComponent);
  // #endregion : redux

  // #region : effects
  useEffect(() => {
    const trueValueMouseActionStateListExceptIsClicking = (
      Object.keys(mouseActionState) as (keyof MouseActionState)[]
    )
      .filter((key) => key !== 'isClicking')
      .filter((key) => mouseActionState[key] === true);

    if (trueValueMouseActionStateListExceptIsClicking.length > 0) {
      const hoveredComponentNameListWithoutNotHoveredValue = (
        Object.keys(hoveredComponentList) as ComponentHasHovered[]
      ).filter(
        (componentName) => hoveredComponentList[componentName] !== 'notHovered'
      ) as ComponentHasChild[];
      const parentOfLowestHoveredComponent = getParentNameOfLowestComponent(
        componentTree,
        hoveredComponentNameListWithoutNotHoveredValue
      );
      if (parentOfLowestHoveredComponent) {
        const lowestHoveredComponentName =
          hoveredComponentList[parentOfLowestHoveredComponent];
        if (
          !componentBoundaryNameList.includes(lowestHoveredComponentName) &&
          lowestHoveredComponentName !== 'notHovered'
        ) {
          dispatch(
            updateComponentClickStatus({
              componentName: lowestHoveredComponentName as ComponentName,
              clickStatus: {
                ...trueValueMouseActionStateListExceptIsClicking.reduce(
                  (clickStatus, actionState) => {
                    return {
                      ...clickStatus,
                      [actionState]: true,
                    };
                  },
                  {} as Partial<MouseActionState>
                ),
              },
            })
          );
        }
        setTimeout(() => {
          dispatch(
            updateComponentClickStatus({
              componentName: lowestHoveredComponentName as ComponentName,
              clickStatus: {
                ...trueValueMouseActionStateListExceptIsClicking.reduce(
                  (clickStatus, actionState) => {
                    return {
                      ...clickStatus,
                      [actionState]: false,
                    };
                  },
                  {} as Partial<MouseActionState>
                ),
              },
            })
          );
        }, 1);
      }
      trueValueMouseActionStateListExceptIsClicking.forEach((actionState) => {
        dispatch(
          updateMouseActionState({
            [actionState]: false,
          })
        );
      });
    }
  }, [
    mouseActionState.isClickStarted,
    mouseActionState.isClickEnded,
    mouseActionState.isShortClicked,
    mouseActionState.isDblClicked,
    mouseActionState.isLongClickStarted,
    mouseActionState.isLongClickEnded,
  ]);

  useEffect(() => {
    if (mouseActionState.isClicking) {
      const hoveredComponentNameListWithoutNotHoveredValue = (
        Object.keys(hoveredComponentList) as ComponentHasHovered[]
      ).filter(
        (componentName) => hoveredComponentList[componentName] !== 'notHovered'
      ) as ComponentHasChild[];
      const lowestComponentParent = getParentNameOfLowestComponent(
        componentTree,
        hoveredComponentNameListWithoutNotHoveredValue
      );
      if (lowestComponentParent) {
        const lowestHoveredComponentName =
          hoveredComponentList[lowestComponentParent];
        if (
          !componentBoundaryNameList.includes(lowestHoveredComponentName) &&
          lowestHoveredComponentName !== 'notHovered'
        ) {
          dispatch(
            updateComponentClickStatus({
              componentName: lowestHoveredComponentName as ComponentName,
              clickStatus: {
                isClicking: true,
              },
            })
          );
        }
      }
    } else {
      dispatch(
        updateAllComponentClickStatus({
          isClicking: false,
        })
      );
    }
  }, [mouseActionState.isClicking]);
  // #endregion : effects

  return null;
};

export default memo(ClickObserver);
