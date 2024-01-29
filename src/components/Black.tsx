import { memo } from 'react';
import CommonComponentOfRightSidePanel from './CommonComponentOfRightSidePanel';

const Black = () => {
  return (
    <CommonComponentOfRightSidePanel
      componentName="Black"
      x={20}
      y={20}
      width={80}
      height={80}
      zIndex={6}
      backgroundColor="black"
    >
      <div>L</div>
    </CommonComponentOfRightSidePanel>
  );
};

export default memo(Black);
