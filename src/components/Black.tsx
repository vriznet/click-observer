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

const Black = () => {
  // #region : redux
  const dispatch = useDispatch();

  const blackVisibility = useSelector(selectComponentVisibilities)[
    'RightSidePanel'
  ]?.Black;

  const blackComponentClickStatus = useSelector(
    selectComponentClickStatus
  ).Black;
  // #endregion : redux

  // #region : effects
  useEffect(() => {
    if (blackComponentClickStatus.isClickEnded) {
      dispatch(
        updateSpecificComponentVisibility({
          componentName: 'RightSidePanel',
          visibility: false,
        })
      );
    }
  }, [blackComponentClickStatus]);
  // #endregion : effects

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
