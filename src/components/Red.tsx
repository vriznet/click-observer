import { memo } from 'react';
import CommonComponentOfLeftSidePanel from './CommonComponentOfLeftSidePanel';

const Red = () => {
  return (
    <CommonComponentOfLeftSidePanel
      componentName="Red"
      x={20}
      y={20}
      width={20}
      height={20}
      zIndex={2}
      backgroundColor="red"
    >
      <div>R</div>
    </CommonComponentOfLeftSidePanel>
  );
};

export default memo(Red);
