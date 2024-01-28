import { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import RectTwo from './RectTwo';
import { useDispatch } from 'react-redux';
import {
  updateComponentOfScreenAppearances,
  updateComponentOfScreenVisibilities,
} from '../redux/module/screenSlice';

const RectOneContainerSC = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 120px;
  height: 120px;
  border: 1px solid #000;
  z-index: 1;
`;

const RectOne = () => {
  const rectOneContainerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const rectOneContainer = rectOneContainerRef.current;
    if (rectOneContainer) {
      const rectOneBoundingRect = rectOneContainer.getBoundingClientRect();
      const rectOneComputedStyles = getComputedStyle(rectOneContainer);
      const rectOneZIndex = parseInt(rectOneComputedStyles.zIndex || '0');
      if (rectOneBoundingRect && rectOneComputedStyles) {
        dispatch(
          updateComponentOfScreenAppearances({
            componentName: 'RectOne',
            appearances: {
              x: rectOneBoundingRect.x,
              y: rectOneBoundingRect.y,
              width: rectOneBoundingRect.width,
              height: rectOneBoundingRect.height,
              zIndex: rectOneZIndex,
            },
          })
        );
        if (rectOneComputedStyles.display !== 'none') {
          dispatch(
            updateComponentOfScreenVisibilities({
              componentName: 'RectOne',
              visibility: true,
            })
          );
        }
      }
    }
  }, []);

  return (
    <RectOneContainerSC ref={rectOneContainerRef}>
      <RectTwo />
    </RectOneContainerSC>
  );
};

export default memo(RectOne);
