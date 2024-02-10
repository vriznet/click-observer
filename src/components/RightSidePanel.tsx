// #region : imports
import { memo, useRef } from 'react';
import Blue from './Blue';
import Black from './Black';
import CommonScreenComponent from './CommonScreenComponent';
import useHovered from '../hooks/useHovered';
import { ComponentOfRightSidePanelName } from '../types/data/componentName';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
import { useSelector } from 'react-redux';
import { selectHoveredComponent } from '../redux/module/hoveredComponentSlice';
// #endregion : imports

const RightSidePanel = () => {
  // #region : redux
  const rightPanelVisibility = useSelector(selectComponentVisibilities)[
    'Screen'
  ]?.RightSidePanel;

  const isHovered =
    useSelector(selectHoveredComponent).Screen === 'RightSidePanel';
  // #endregion : redux

  // #region : refs
  const rightSidePanelRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : hooks
  useHovered<ComponentOfRightSidePanelName>(
    'RightSidePanel',
    isHovered,
    rightSidePanelRef
  );
  // #endregion : hooks

  return (
    <CommonScreenComponent
      componentName="RightSidePanel"
      x={70}
      y={20}
      width={120}
      height={120}
      zIndex={4}
      isVisible={rightPanelVisibility}
      backgroundColor="#fff"
      ref={rightSidePanelRef}
    >
      <Blue />
      <Black />
    </CommonScreenComponent>
  );
};

export default memo(RightSidePanel);
