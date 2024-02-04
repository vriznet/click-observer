// #region : imports
import { memo, useEffect, useRef } from 'react';
import { IRightSidePanelProps } from '../types/props';
import Blue from './Blue';
import Black from './Black';
import CommonScreenComponent from './CommonScreenComponent';
import useHovered from '../hooks/useHovered';
import { ComponentOfRightSidePanelName } from '../types/data/componentName';
// #endregion : imports

const RightSidePanel = (props: IRightSidePanelProps) => {
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

  useEffect(() => {
    console.log(hoveredComponentOfRightSidePanelName);
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
      backgroundColor="#fff"
      ref={rightSidePanelRef}
    >
      <Blue />
      <Black />
    </CommonScreenComponent>
  );
};

export default memo(RightSidePanel);
