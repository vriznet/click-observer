// #region : imports
import { memo, useEffect, useRef } from 'react';
import { ILeftSidePanelProps } from '../types/props';
import Red from './Red';
import Green from './Green';
import CommonScreenComponent from './CommonScreenComponent';
import { ComponentOfLeftSidePanelName } from '../types/data/componentName';
import useHovered from '../hooks/useHovered';
// #endregion : imports

const LeftSidePanel = (props: ILeftSidePanelProps) => {
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

  useEffect(() => {
    console.log(hoveredComponentOfLeftSidePanelName);
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
      backgroundColor="#fff"
      ref={leftSidePanelRef}
    >
      <Red />
      <Green />
    </CommonScreenComponent>
  );
};

export default memo(LeftSidePanel);
