// #region : imports
import { memo, useEffect } from 'react';
import CommonScreenComponent from './CommonScreenComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectComponentVisibilities,
  updateSpecificComponentVisibility,
} from '../redux/module/componentVisibilitiesSlice';
import { selectComponentClickStatus } from '../redux/module/mouseSlice';
// #endregion : imports

const Green = () => {
  // #region : redux
  const dispatch = useDispatch();

  const greenVisibility = useSelector(selectComponentVisibilities)[
    'LeftSidePanel'
  ]?.Green;

  const greenComponentClickStatus = useSelector(
    selectComponentClickStatus
  ).Green;
  // #endregion : redux

  // #region : effects
  useEffect(() => {
    if (greenComponentClickStatus.isClickStarted) {
      dispatch(
        updateSpecificComponentVisibility({
          componentName: 'LeftSidePanel',
          visibility: false,
        })
      );
    }
  }, [greenComponentClickStatus]);
  // #endregion : effects

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
