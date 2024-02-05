import { memo, useEffect } from 'react';
import CommonScreenComponent from './CommonScreenComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectComponentVisibilities,
  updateSpecificComponentVisibility,
} from '../redux/module/componentVisibilitiesSlice';
import { selectMouseActionState } from '../redux/module/mouseSlice';
import { IGreenProps } from '../types/props';

const Green = (props: IGreenProps) => {
  const dispatch = useDispatch();

  const greenVisibility = useSelector(selectComponentVisibilities)[
    'LeftSidePanel'
  ]?.Green;

  const mouseActionState = useSelector(selectMouseActionState);

  useEffect(() => {
    if (props.isHovered) {
      if (mouseActionState.isClickStarted) {
        dispatch(
          updateSpecificComponentVisibility({
            componentName: 'LeftSidePanel',
            visibility: false,
          })
        );
      }
    }
  }, [props.isHovered, mouseActionState]);

  return (
    <CommonScreenComponent
      componentName="Green"
      x={30}
      y={30}
      width={40}
      height={40}
      zIndex={3}
      isVisible={greenVisibility}
      backgroundColor="green"
    >
      <div>G</div>
    </CommonScreenComponent>
  );
};

export default memo(Green);
