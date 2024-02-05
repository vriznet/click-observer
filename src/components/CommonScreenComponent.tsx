// #region : imports
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateSpecificComponentAppearance } from '../redux/module/componentAppearancesSlice';
import { updateSpecificComponentVisibility } from '../redux/module/componentVisibilitiesSlice';
import { ComponentName } from '../types/data/componentName';
// #endregion : imports

// #region : types
interface ICommonScreenComponentContainerSCProps {
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $zIndex: number;
  $isVisible: boolean;
  $backgroundColor: string;
}

interface ICommonComponentProps {
  componentName: ComponentName;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isVisible: boolean | undefined;
  backgroundColor: string;
  children: React.ReactNode;
}
// #endregion : types

// #region : styled components
const CommonScreenComponentContainerSC = styled.div<ICommonScreenComponentContainerSCProps>`
  position: absolute;
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  border: 1px solid #000;
  z-index: ${(props) => props.$zIndex};
  background-color: ${(props) => props.$backgroundColor};
`;
// #endregion : styled components

const CommonScreenComponent = forwardRef<HTMLDivElement, ICommonComponentProps>(
  (props: ICommonComponentProps, ref) => {
    // #region : redux
    const dispatch = useDispatch();
    // #endregion : redux

    // #region : refs
    const containerRef = useRef<HTMLDivElement>(null);
    // #endregion : refs

    // #region : effects
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
    // #endregion : effects

    useImperativeHandle(ref, () => containerRef.current!, []);

    return (
      <CommonScreenComponentContainerSC
        ref={containerRef}
        $x={props.x}
        $y={props.y}
        $width={props.width}
        $height={props.height}
        $zIndex={props.zIndex}
        $isVisible={props.isVisible || false}
        $backgroundColor={props.backgroundColor}
      >
        {props.children}
      </CommonScreenComponentContainerSC>
    );
  }
);

export default memo(CommonScreenComponent);
