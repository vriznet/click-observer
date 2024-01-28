import { memo } from 'react';
import CommonComponentOfScreen from './CommonComponentOfScreen';

const LeftSidePanel = () => {
  return (
    <CommonComponentOfScreen
      componentName="LeftSidePanel"
      x={20}
      y={20}
      width={120}
      height={120}
      zIndex={1}
    >
      <div>Left Side Panel</div>
    </CommonComponentOfScreen>
  );
};

export default memo(LeftSidePanel);
