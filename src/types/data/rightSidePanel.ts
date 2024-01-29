import { Appearance } from './common';

export type ComponentOfRightSidePanelName = '' | 'Blue' | 'Black';

export type ComponentOfRightSidePanelAppearances = {
  [componentName in ComponentOfRightSidePanelName]: Appearance;
};

export type PartialComponentOfRightSidePanelAppearances = Partial<
  Record<keyof Appearance, any>
>;

export type ComponentOfRightSidePanelVisibilities = {
  [componentName in ComponentOfRightSidePanelName]: boolean;
};
