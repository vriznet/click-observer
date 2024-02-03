import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateComponentOfScreenVisibilities } from '../redux/module/screenSlice';
import { ComponentOfScreenName } from '../types/data/screen';
import { updateSpecificComponentAppearance } from '../redux/module/componentAppearancesSlice';

interface ICommonComponentOfScreenContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $zIndex: number;
}

interface ICommonComponentOfScreenProps {
  componentName: ComponentOfScreenName;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  children: React.ReactNode;
}

const CommonComponentOfScreenContainerSC = styled.div<ICommonComponentOfScreenContainerSCProps>`
  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border: 1px solid #000;
  z-index: ${(props) => props.$zIndex};
  background-color: #fff;
`;

const CommonComponentOfScreen = forwardRef<
  HTMLDivElement,
  ICommonComponentOfScreenProps
>((props: ICommonComponentOfScreenProps, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => containerRef.current!, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const containerBoundingRect = container.getBoundingClientRect();
      const containerComputedStyles = getComputedStyle(container);
      const zIndex = parseInt(containerComputedStyles.zIndex || '0');
      if (containerBoundingRect && containerComputedStyles) {
        dispatch(
          updateSpecificComponentAppearance({
            componentName: props.componentName,
            appearance: {
              x: containerBoundingRect.x,
              y: containerBoundingRect.y,
              width: containerBoundingRect.width,
              height: containerBoundingRect.height,
              zIndex,
            },
          })
        );
        if (containerComputedStyles.display !== 'none') {
          dispatch(
            updateComponentOfScreenVisibilities({
              componentName: props.componentName,
              visibility: true,
            })
          );
        }
      }
    }
  }, []);

  return (
    <CommonComponentOfScreenContainerSC
      ref={containerRef}
      $x={props.x}
      $y={props.y}
      $width={props.width}
      $height={props.height}
      $zIndex={props.zIndex}
    >
      {props.children}
    </CommonComponentOfScreenContainerSC>
  );
});

export default memo(CommonComponentOfScreen);
