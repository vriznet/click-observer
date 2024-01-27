import styled from 'styled-components';
import { memo } from 'react';
import RectFive from './RectFive';

const RectFourSC = styled.div`
  position: absolute;
  top: 20px;
  left: 160px;
  width: 120px;
  height: 120px;
  border: 1px solid #000;
`;

const RectFour = () => {
  return (
    <RectFourSC>
      <RectFive />
    </RectFourSC>
  );
};

export default memo(RectFour);
