// #region : imports
import { memo, useEffect, useRef } from 'react';
import { ILeftSidePanelProps } from '../types/props';
import Red from './Red';
import Green from './Green';
import CommonScreenComponent from './CommonScreenComponent';
import { ComponentOfLeftSidePanelName } from '../types/data/componentName';
import useHovered from '../hooks/useHovered';
import { useSelector } from 'react-redux';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
// #endregion : imports

const LeftSidePanel = (props: ILeftSidePanelProps) => {
  // #region : redux
  const leftPanelVisibility = useSelector(selectComponentVisibilities)['Screen']
    ?.LeftSidePanel;
  // #endregion : redux

  // #region : refs
  const leftSidePanelRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : hooks
  const [hoveredComponentOfLeftSidePanelName] =
    useHovered<ComponentOfLeftSidePanelName>(
      'LeftSidePanel',
      props.isHovered,
      leftSidePanelRef
    );
  // #endregion : hooks

  // #region : effects
  useEffect(() => {
    console.log(
      `left side panel hovered: ${hoveredComponentOfLeftSidePanelName}`
    );
  }, [hoveredComponentOfLeftSidePanelName]);
  // #endregion : effects

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
      <Green isHovered={hoveredComponentOfLeftSidePanelName === 'Green'} />
    </CommonScreenComponent>
  );
};

export default memo(LeftSidePanel);
