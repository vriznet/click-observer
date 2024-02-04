import { memo } from 'react';
import CommonScreenComponent from './CommonScreenComponent';

const Blue = () => {
  return (
    <CommonScreenComponent
      componentName="Blue"
      x={20}
      y={0}
      width={40}
      height={40}
      zIndex={5}
      backgroundColor="blue"
    >
      <div>B</div>
    </CommonScreenComponent>
  );
};

export default memo(Blue);
