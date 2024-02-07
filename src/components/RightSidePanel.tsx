// #region : imports
import { memo, useEffect, useRef } from 'react';
import { IRightSidePanelProps } from '../types/props';
import Blue from './Blue';
import Black from './Black';
import CommonScreenComponent from './CommonScreenComponent';
import useHovered from '../hooks/useHovered';
import { ComponentOfRightSidePanelName } from '../types/data/componentName';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
import { useSelector } from 'react-redux';
// #endregion : imports

const RightSidePanel = (props: IRightSidePanelProps) => {
  // #region : redux
  const rightPanelVisibility = useSelector(selectComponentVisibilities)[
    'Screen'
  ]?.RightSidePanel;
  // #endregion : redux

  // #region : refs
  const rightSidePanelRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : hooks
  const [hoveredComponentOfRightSidePanelName] =
    useHovered<ComponentOfRightSidePanelName>(
      'RightSidePanel',
      props.isHovered,
      rightSidePanelRef
    );
  // #endregion : hooks

  // #region : effects
  useEffect(() => {
    console.log(
      `right side panel hovered: ${hoveredComponentOfRightSidePanelName}`
    );
  }, [hoveredComponentOfRightSidePanelName]);
  // #endregion : effects

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
      <Black isHovered={hoveredComponentOfRightSidePanelName === 'Black'} />
    </CommonScreenComponent>
  );
};

export default memo(RightSidePanel);
