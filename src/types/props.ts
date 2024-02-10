import { ComponentMouseActionState } from './states';

export interface IListItemProps {
  itemId: string;
  itemName: string;
  isHovered: boolean;
  clickStatus: ComponentMouseActionState;
  backgroundColor: string;
}
