import { memo } from 'react';
import CommonScreenComponent from './CommonScreenComponent';
import { useSelector } from 'react-redux';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';

const Red = () => {
  const redVisibility = useSelector(selectComponentVisibilities)[
    'LeftSidePanel'
  ]?.Red;

  return (
    <CommonScreenComponent
      componentName="Red"
      x={20}
      y={20}
      width={20}
      height={20}
      zIndex={2}
      isVisible={redVisibility}
      backgroundColor="red"
    >
      <div>R</div>
    </CommonScreenComponent>
  );
};

export default memo(Red);
