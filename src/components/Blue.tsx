import { memo } from 'react';
import CommonComponentOfRightSidePanel from './CommonComponentOfRightSidePanel';

const Blue = () => {
  return (
    <CommonComponentOfRightSidePanel
      componentName="Blue"
      x={20}
      y={0}
      width={40}
      height={40}
      zIndex={5}
      backgroundColor="blue"
    >
      <div>B</div>
    </CommonComponentOfRightSidePanel>
  );
};

export default memo(Blue);
