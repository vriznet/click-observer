import { memo } from 'react';
import { styled } from 'styled-components';

interface ICursorProps {
  x: number;
  y: number;
}

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
  background-color: #f00;
  opacity: 1;
  z-index: 999;
`;

const Cursor = (props: ICursorProps) => {
  return <CursorSC x={props.x} y={props.y} />;
};

export default memo(Cursor);
