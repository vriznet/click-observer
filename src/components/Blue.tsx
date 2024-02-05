import { memo } from 'react';
import CommonScreenComponent from './CommonScreenComponent';
import { useSelector } from 'react-redux';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';

const Blue = () => {
  const blueVisibility = useSelector(selectComponentVisibilities)[
    'RightSidePanel'
  ]?.Blue;

  return (
    <CommonScreenComponent
      componentName="Blue"
      x={20}
      y={0}
      width={40}
      height={40}
      zIndex={5}
      isVisible={blueVisibility}
      backgroundColor="blue"
    >
      <div>B</div>
    </CommonScreenComponent>
  );
};

export default memo(Blue);
