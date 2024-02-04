import { memo } from 'react';
import CommonScreenComponent from './CommonScreenComponent';

const Black = () => {
  return (
    <CommonScreenComponent
      componentName="Black"
      x={20}
      y={20}
      width={80}
      height={80}
      zIndex={6}
      backgroundColor="black"
    >
      <div>L</div>
    </CommonScreenComponent>
  );
};

export default memo(Black);
