import { memo } from 'react';
import styled from 'styled-components';
import RectTwo from './RectTwo';

const RectOneSC = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 120px;
  height: 120px;
  border: 1px solid #000;
`;

const RectOne = () => {
  return (
    <RectOneSC>
      <RectTwo />
    </RectOneSC>
  );
};

export default memo(RectOne);
