import { memo } from 'react';
import CommonComponentOfScreen from './CommonComponentOfScreen';

const RightSidePanel = () => {
  return (
    <CommonComponentOfScreen
      componentName="RightSidePanel"
      x={80}
      y={20}
      width={120}
      height={120}
      zIndex={2}
    >
      <div>Right Side Panel</div>
    </CommonComponentOfScreen>
  );
};

export default memo(RightSidePanel);
