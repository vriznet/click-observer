import { memo, useEffect } from 'react';
import CommonScreenComponent from './CommonScreenComponent';
import { IBlackProps } from '../types/props';
import { useDispatch, useSelector } from 'react-redux';
import { selectMouseActionState } from '../redux/module/mouseSlice';
import {
  selectComponentVisibilities,
  updateSpecificComponentVisibility,
} from '../redux/module/componentVisibilitiesSlice';

const Black = (props: IBlackProps) => {
  const dispatch = useDispatch();

  const blackVisibility = useSelector(selectComponentVisibilities)[
    'RightSidePanel'
  ]?.Black;

  const mouseActionState = useSelector(selectMouseActionState);

  useEffect(() => {
    if (props.isHovered) {
      if (mouseActionState.isClickStarted) {
        dispatch(
          updateSpecificComponentVisibility({
            componentName: 'RightSidePanel',
            visibility: false,
          })
        );
      }
    }
  }, [props.isHovered, mouseActionState]);

  return (
    <CommonScreenComponent
      componentName="Black"
      x={0}
      y={20}
      width={80}
      height={80}
      zIndex={6}
      isVisible={blackVisibility}
      backgroundColor="black"
    >
      <div>L</div>
    </CommonScreenComponent>
  );
};

export default memo(Black);
