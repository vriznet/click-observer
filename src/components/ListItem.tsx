// #region : imports
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LIST_ITEM_CONTAINER_HEIGHT } from '../constants';
import { IListItemProps } from '../types/props';
// #endregion : imports

// #region : types
interface IListItemSCProps {
  $backgroundColor: string;
  $isSelected: boolean;
}
// #endregion : types

// #region : styled components
const ListItemSC = styled.li<IListItemSCProps>`
  display: flex;
  height: ${LIST_ITEM_CONTAINER_HEIGHT}px;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : '#fff'};
  opacity: ${(props) => (props.$isSelected ? 0.5 : 1)};
`;
// #endregion : styled components

const ListItem = (props: IListItemProps) => {
  // #region : states
  const [isSelected, setIsSelected] = useState<boolean>(false);
  // #endregion : states

  // #region : effects
  useEffect(() => {
    if (props.clickStatus.isClickStarted) {
      setIsSelected((prev) => !prev);
    }
  }, [props.clickStatus]);
  // #endregion : effects

  return (
    <ListItemSC
      $backgroundColor={props.backgroundColor}
      $isSelected={isSelected}
      id={`list-item-${props.itemId}`}
    >
      {props.itemName}
    </ListItemSC>
  );
};

export default memo(ListItem);
