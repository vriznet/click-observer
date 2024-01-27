import styled from 'styled-components';
import { memo } from 'react';
import RectSix from './RectSix';

const RectFiveSC = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  border: 1px solid #000;
`;

const RectFive = () => {
  return (
    <RectFiveSC>
      <RectSix />
    </RectFiveSC>
  );
};

export default memo(RectFive);
