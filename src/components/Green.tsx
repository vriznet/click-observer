import { memo } from 'react';
import CommonScreenComponent from './CommonScreenComponent';

const Green = () => {
  return (
    <CommonScreenComponent
      componentName="Green"
      x={30}
      y={30}
      width={40}
      height={40}
      zIndex={3}
      backgroundColor="green"
    >
      <div>G</div>
    </CommonScreenComponent>
  );
};

export default memo(Green);
