import { memo } from 'react';
import CommonScreenComponent from './CommonScreenComponent';

const Red = () => {
  return (
    <CommonScreenComponent
      componentName="Red"
      x={20}
      y={20}
      width={20}
      height={20}
      zIndex={2}
      backgroundColor="red"
    >
      <div>R</div>
    </CommonScreenComponent>
  );
};

export default memo(Red);
