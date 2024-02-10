// #region : imports
import { memo, useRef } from 'react';
import Red from './Red';
import Green from './Green';
import CommonScreenComponent from './CommonScreenComponent';
import { ComponentOfLeftSidePanelName } from '../types/data/componentName';
import useHovered from '../hooks/useHovered';
import { useSelector } from 'react-redux';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
import { selectHoveredComponent } from '../redux/module/hoveredComponentSlice';
// #endregion : imports

const LeftSidePanel = () => {
  // #region : redux
  const leftPanelVisibility = useSelector(selectComponentVisibilities)['Screen']
    ?.LeftSidePanel;
  const isHovered =
    useSelector(selectHoveredComponent).Screen === 'LeftSidePanel';
  // #endregion : redux

  // #region : refs
  const leftSidePanelRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : hooks
  useHovered<ComponentOfLeftSidePanelName>(
    'LeftSidePanel',
    isHovered,
    leftSidePanelRef
  );
  // #endregion : hooks

  return (
    <CommonScreenComponent
      componentName="LeftSidePanel"
      x={20}
      y={20}
      width={120}
      height={120}
      zIndex={1}
      isVisible={leftPanelVisibility}
      backgroundColor="#fff"
      ref={leftSidePanelRef}
    >
      <Red />
      <Green />
    </CommonScreenComponent>
  );
};

export default memo(LeftSidePanel);
