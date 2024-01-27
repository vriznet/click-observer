import { memo } from 'react';
import styled from 'styled-components';
import RectThree from './RectThree';

const RectTwoSC = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  border: 1px solid #000;
`;

const RectTwo = () => {
  return (
    <RectTwoSC>
      <RectThree />
    </RectTwoSC>
  );
};

export default memo(RectTwo);
