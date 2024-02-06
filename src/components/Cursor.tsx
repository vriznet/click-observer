import { memo } from 'react';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';

interface ICursorSCProps {
  x: number;
  y: number;
}

const CursorSC = styled.div.attrs<ICursorSCProps>((props) => ({
  style: {
    top: props.y,
    left: props.x,
  },
}))<ICursorSCProps>`
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: purple;
  opacity: 1;
  z-index: 999;
`;

const Cursor = () => {
  const cursorX = useSelector(selectCursorX);
  const cursorY = useSelector(selectCursorY);

  return <CursorSC x={cursorX} y={cursorY} />;
};

export default memo(Cursor);
