// #region : imports
import { styled } from 'styled-components';
import Cursor from './Cursor';
import { memo, useRef } from 'react';
import LeftSidePanel from './LeftSidePanel';
import RightSidePanel from './RightSidePanel';
import useHovered from '../hooks/useHovered';
import { ComponentOfScreenName } from '../types/data/componentName';
import ListContainer from './ListContainer';
// #endregion : imports

// #region : styled components
const Container = styled.div`
  width: 320px;
  height: 240px;
  border: 1px solid #000;
  position: relative;
`;
// #endregion : styled components

const Screen = () => {
  // #region : refs
  const containerRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : hooks
  useHovered<ComponentOfScreenName>('Screen', true, containerRef);
  // #endregion : hooks

  return (
    <Container ref={containerRef}>
      <Cursor />
      <LeftSidePanel />
      <RightSidePanel />
      <ListContainer />
    </Container>
  );
};

export default memo(Screen);
