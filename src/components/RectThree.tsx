import { memo } from 'react';
import styled from 'styled-components';

const RectThreeSC = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
`;

const RectThree = () => {
  return <RectThreeSC />;
};

export default memo(RectThree);
