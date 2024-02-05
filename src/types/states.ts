import { ComponentName } from './data/componentName';

export type MouseActionState = {
  isClicking: boolean;
  isClickStarted: boolean;
  isClickEnded: boolean;
  isShortClicked: boolean;
  isDblClicked: boolean;
  isLongClickStarted: boolean;
  isLongClickEnded: boolean;
};

export type ComponentMouseActionState = {
  isClicking: boolean;
  isClickStarted: boolean;
  isClickEnded: boolean;
  isShortClicked: boolean;
  isDblClicked: boolean;
  isLongClickStarted: boolean;
  isLongClickEnded: boolean;
};

export type CommonComponentMouseActionState = {
  [componentName in ComponentName]: ComponentMouseActionState;
};
