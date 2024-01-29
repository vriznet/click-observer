import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  updateComponentOfLeftSidePanelAppearances,
  updateComponentOfLeftSidePanelVisibilities,
} from '../redux/module/leftSidePanelSlice';
import { ComponentOfLeftSidePanelName } from '../types/data/leftSidePanel';

interface ICommonComponentOfLeftSidePanelContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $zIndex: number;
  $backgroundColor: string;
}

interface ICommonComponentOfLeftSidePanelProps {
  componentName: ComponentOfLeftSidePanelName;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  backgroundColor: string;
  children: React.ReactNode;
}

const CommonComponentOfLeftSidePanelContainerSC = styled.div<ICommonComponentOfLeftSidePanelContainerSCProps>`
  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border: 1px solid #000;
  z-index: ${(props) => props.$zIndex};
  background-color: ${(props) => props.$backgroundColor};
`;

const CommonComponentOfLeftSidePanel = (
  props: ICommonComponentOfLeftSidePanelProps
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const container = containerRef.current;
    const parentElement = container?.parentElement;
    if (container && parentElement) {
      const containerBoundingRect = container.getBoundingClientRect();
      const containerComputedStyles = getComputedStyle(container);
      const zIndex = parseInt(containerComputedStyles.zIndex || '0');

      const parentElementBoundingRect = parentElement.getBoundingClientRect();

      if (containerBoundingRect && containerComputedStyles) {
        dispatch(
          updateComponentOfLeftSidePanelAppearances({
            componentName: props.componentName,
            appearances: {
              x: containerBoundingRect.x - parentElementBoundingRect.x,
              y: containerBoundingRect.y - parentElementBoundingRect.y,
              width: containerBoundingRect.width,
              height: containerBoundingRect.height,
              zIndex,
            },
          })
        );
        if (containerComputedStyles.display !== 'none') {
          dispatch(
            updateComponentOfLeftSidePanelVisibilities({
              componentName: props.componentName,
              visibility: true,
            })
          );
        }
      }
    }
  }, []);

  return (
    <CommonComponentOfLeftSidePanelContainerSC
      ref={containerRef}
      $x={props.x}
      $y={props.y}
      $width={props.width}
      $height={props.height}
      $zIndex={props.zIndex}
      $backgroundColor={props.backgroundColor}
    >
      {props.children}
    </CommonComponentOfLeftSidePanelContainerSC>
  );
};

export default memo(CommonComponentOfLeftSidePanel);
