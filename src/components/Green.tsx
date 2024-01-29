import { memo } from 'react';
import CommonComponentOfLeftSidePanel from './CommonComponentOfLeftSidePanel';

const Green = () => {
  return (
    <CommonComponentOfLeftSidePanel
      componentName="Green"
      x={30}
      y={30}
      width={40}
      height={40}
      zIndex={3}
      backgroundColor="green"
    >
      <div>G</div>
    </CommonComponentOfLeftSidePanel>
  );
};

export default memo(Green);
