// #region : imports
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCursorX,
  selectCursorY,
  selectMouseActionState,
  setClickedCoord,
  updateMouseActionState,
} from '../redux/module/mouseSlice';
import {
  DBL_CLICK_INTERVAL_MILLISECONDS,
  LONG_CLICK_MILLISECONDS,
} from '../constants';
import styled from 'styled-components';
// #endregion : imports

// #region : styled copmonents
const MouseButtonContainerSC = styled.div`
  display: flex;
  width: 320px;
`;

const MouseButtonSC = styled.div`
  width: 100%;
  height: 48px;
  margin: 0;
  box-shadow: 0 0 0 1px #000 inset;
  background-color: #fff;
  touch-action: none;
`;
// #endregion : styled copmonents

const MouseButtons = () => {
  // #region : states
  const [longTouchTimeoutId, setLongTouchTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [doubleTouchTimeoutId, setDoubleTouchTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [isInDoubleClickInterval, setIsInDoubleClickInterval] =
    useState<boolean>(false);
  // #endregion : states

  // #region : redux
  const dispatch = useDispatch();

  const cursorX = useSelector(selectCursorX);
  const cursorY = useSelector(selectCursorY);

  const mouseActionState = useSelector(selectMouseActionState);
  // #endregion : redux

  // #region : refs
  const mouseButtonRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : handlers
  const handleMouseClickStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();

      dispatch(
        updateMouseActionState({
          isClickStarted: true,
          isClickEnded: false,
          isClicking: true,
          isLongClickStarted: false,
        })
      );

      dispatch(setClickedCoord({ x: cursorX, y: cursorY }));

      clearTimeout(longTouchTimeoutId);

      const id = setTimeout(() => {
        dispatch(
          updateMouseActionState({
            isLongClickStarted: true,
          })
        );
      }, LONG_CLICK_MILLISECONDS);
      setLongTouchTimeoutId(id);
    },
    [longTouchTimeoutId, cursorX, cursorY]
  );

  const handleMouseClickEnd = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();

      dispatch(
        updateMouseActionState({
          isClickStarted: false,
          isClickEnded: true,
          isClicking: false,
        })
      );

      clearTimeout(longTouchTimeoutId);
      clearTimeout(doubleTouchTimeoutId);

      const id = setTimeout(() => {
        setIsInDoubleClickInterval(false);
      }, DBL_CLICK_INTERVAL_MILLISECONDS);

      setDoubleTouchTimeoutId(id);

      if (isInDoubleClickInterval) {
        dispatch(
          updateMouseActionState({
            isDblClicked: true,
          })
        );
        if (mouseActionState.isLongClickStarted) {
          dispatch(
            updateMouseActionState({
              isLongClickEnded: true,
              isLongClickStarted: false,
            })
          );
        }
        setIsInDoubleClickInterval(false);
      } else {
        setIsInDoubleClickInterval(true);
        dispatch(
          updateMouseActionState({
            isDblClicked: false,
          })
        );
        if (mouseActionState.isLongClickStarted) {
          dispatch(
            updateMouseActionState({
              isClickEnded: true,
              isClickStarted: false,
            })
          );
        } else {
          dispatch(
            updateMouseActionState({
              isShortClicked: true,
            })
          );
        }
      }
    },
    [
      mouseActionState.isLongClickStarted,
      longTouchTimeoutId,
      doubleTouchTimeoutId,
      isInDoubleClickInterval,
    ]
  );
  // #endregion : handlers

  // #region : effects
  // #region :: component did mount
  useEffect(() => {
    clearTimeout(longTouchTimeoutId);
    clearTimeout(doubleTouchTimeoutId);
  }, []);
  // #endregion :: component did mount

  // #region :: assign event listeners
  useEffect(() => {
    const mouseButton = mouseButtonRef.current;
    if (mouseButton) {
      mouseButton.addEventListener('touchstart', handleMouseClickStart);
      mouseButton.addEventListener('touchend', handleMouseClickEnd);
    }

    return () => {
      if (mouseButton) {
        mouseButton.removeEventListener('touchstart', handleMouseClickStart);
        mouseButton.removeEventListener('touchend', handleMouseClickEnd);
      }
    };
  }, [handleMouseClickStart, handleMouseClickEnd]);
  // #endregion :: assign event listeners

  // #endregion : effects

  return (
    <MouseButtonContainerSC>
      <MouseButtonSC ref={mouseButtonRef} />
    </MouseButtonContainerSC>
  );
};

export default memo(MouseButtons);
