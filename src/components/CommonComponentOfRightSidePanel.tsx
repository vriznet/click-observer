import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ComponentOfRightSidePanelName } from '../types/data/rightSidePanel';
import { updateSpecificComponentAppearance } from '../redux/module/componentAppearancesSlice';
import { updateSpecificComponentVisibility } from '../redux/module/componentVisibilitiesSlice';

interface ICommonComponentOfRightSidePanelContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $zIndex: number;
  $backgroundColor: string;
}

interface ICommonComponentOfRightSidePanelProps {
  componentName: ComponentOfRightSidePanelName;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  backgroundColor: string;
  children: React.ReactNode;
}

const CommonComponentOfRightSidePanelContainerSC = styled.div<ICommonComponentOfRightSidePanelContainerSCProps>`
  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border: 1px solid #000;
  z-index: ${(props) => props.$zIndex};
  background-color: ${(props) => props.$backgroundColor};
`;

const CommonComponentOfRightSidePanel = (
  props: ICommonComponentOfRightSidePanelProps
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
          updateSpecificComponentAppearance({
            componentName: props.componentName,
            appearance: {
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
            updateSpecificComponentVisibility({
              componentName: props.componentName,
              visibility: true,
            })
          );
        }
      }
    }
  }, []);

  return (
    <CommonComponentOfRightSidePanelContainerSC
      ref={containerRef}
      $x={props.x}
      $y={props.y}
      $width={props.width}
      $height={props.height}
      $zIndex={props.zIndex}
      $backgroundColor={props.backgroundColor}
    >
      {props.children}
    </CommonComponentOfRightSidePanelContainerSC>
  );
};

export default memo(CommonComponentOfRightSidePanel);
