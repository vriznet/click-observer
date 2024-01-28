import styled from 'styled-components';
import { memo, useEffect, useRef } from 'react';
import RectFive from './RectFive';
import { useDispatch } from 'react-redux';
import {
  updateComponentOfScreenAppearances,
  updateComponentOfScreenVisibilities,
} from '../redux/module/screenSlice';

const RectFourSC = styled.div`
  position: absolute;
  top: 20px;
  left: 80px;
  width: 120px;
  height: 120px;
  border: 1px solid #000;
  z-index: 4;
`;

const RectFour = () => {
  const rectFourContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const rectFourContainer = rectFourContainerRef.current;
    if (rectFourContainer) {
      const rectFourBoundingRect = rectFourContainer.getBoundingClientRect();
      const rectFourComputedStyles = getComputedStyle(rectFourContainer);
      const rectFourZIndex = parseInt(rectFourComputedStyles.zIndex || '0');
      if (rectFourBoundingRect && rectFourComputedStyles) {
        dispatch(
          updateComponentOfScreenAppearances({
            componentName: 'RectFour',
            appearances: {
              x: rectFourBoundingRect.x,
              y: rectFourBoundingRect.y,
              width: rectFourBoundingRect.width,
              height: rectFourBoundingRect.height,
              zIndex: rectFourZIndex,
            },
          })
        );
        if (rectFourComputedStyles.display !== 'none') {
          dispatch(
            updateComponentOfScreenVisibilities({
              componentName: 'RectFour',
              visibility: true,
            })
          );
        }
      }
    }
  }, []);

  return (
    <RectFourSC ref={rectFourContainerRef}>
      <RectFive />
    </RectFourSC>
  );
};

export default memo(RectFour);
