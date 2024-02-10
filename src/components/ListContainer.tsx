// #region : imports
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CommonScreenComponent from './CommonScreenComponent';
import { useSelector } from 'react-redux';
import { selectComponentVisibilities } from '../redux/module/componentVisibilitiesSlice';
import { layers } from '../data/layers';
import { selectCursorX, selectCursorY } from '../redux/module/mouseSlice';
import { Coord } from '../types/data/common';
import { LIST_ITEM_CONTAINER_HEIGHT } from '../constants';
import ListItem from './ListItem';
import { selectHoveredComponent } from '../redux/module/hoveredComponentSlice';
// #endregion : imports

// #region : types
type ListItemYCoords = {
  [listId: string]: number;
};
// #endregion : types

// #region : styled components
const ListContainerSC = styled.ul`
  width: 100%;
`;
// #endregion : styled components

const ListContainer = () => {
  // #region : states
  const [listItemYCoords, setListItemYCoords] = useState<ListItemYCoords>({});
  const [hoveredListItemId, setHoveredListItemId] = useState<string>('');
  // #endregion : states

  // #region : redux
  const cursorX = useSelector(selectCursorX);
  const cursorY = useSelector(selectCursorY);

  const isHovered =
    useSelector(selectHoveredComponent).Screen === 'ListContainer';
  const listContainerVisibility = useSelector(selectComponentVisibilities)[
    'Screen'
  ]?.ListContainer;
  // #endregion : redux

  // #region : refs
  const listContainerRef = useRef<HTMLDivElement>(null);
  // #endregion : refs

  // #region : getListItemIdFromPoint
  const getListItemIdFromPoint = useCallback(
    (point: Coord) => {
      const listContainer = listContainerRef.current;
      if (listContainer) {
        const {
          x: containerX,
          y: containerY,
          width: containerWidth,
        } = listContainer.getBoundingClientRect();
        let key: keyof ListItemYCoords;
        for (key in listItemYCoords) {
          const listYCoordValue = listItemYCoords[key];
          if (
            point.x > containerX &&
            point.x <= containerX + containerWidth &&
            point.y > containerY + listYCoordValue &&
            point.y <= containerY + listYCoordValue + LIST_ITEM_CONTAINER_HEIGHT
          ) {
            return key;
          }
        }
      }
      return '';
    },
    [listItemYCoords]
  );
  // #endregion : getListItemIdFromPoint

  // #region : effects
  useEffect(() => {
    if (listContainerVisibility) {
      const listContainer = listContainerRef.current;
      if (listContainer) {
        const { y: containerY } = listContainer.getBoundingClientRect();
        const itemYCoords: ListItemYCoords = {};
        layers.forEach((layer) => {
          const listItem = document.getElementById(`list-item-${layer.id}`);
          if (listItem) {
            const { y: itemY } = listItem.getBoundingClientRect();
            itemYCoords[layer.id] = itemY - containerY;
          }
        });
        setListItemYCoords(itemYCoords);
      }
    }
  }, [listContainerVisibility]);

  useEffect(() => {
    if (isHovered) {
      const hoveredListItemId = getListItemIdFromPoint({
        x: cursorX,
        y: cursorY,
      });
      setHoveredListItemId(hoveredListItemId);
    } else {
      setHoveredListItemId('');
    }
  }, [isHovered, cursorX, cursorY, listItemYCoords]);

  useEffect(() => {
    console.log(`hovered list item id: ${hoveredListItemId}`);
  }, [hoveredListItemId]);
  // #endregion : effects

  return (
    <CommonScreenComponent
      componentName="ListContainer"
      x={40}
      y={60}
      width={140}
      height={70}
      zIndex={7}
      isVisible={listContainerVisibility}
      backgroundColor="#fff"
      ref={listContainerRef}
    >
      <ListContainerSC>
        {layers.map((layer) => (
          <ListItem
            key={layer.id}
            itemId={layer.id}
            itemName={layer.name}
            backgroundColor={layer.color}
            isHovered={hoveredListItemId === layer.id}
          />
        ))}
      </ListContainerSC>
    </CommonScreenComponent>
  );
};

export default memo(ListContainer);
