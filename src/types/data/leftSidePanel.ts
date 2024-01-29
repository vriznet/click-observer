import { Appearance } from './common';

export type ComponentOfLeftSidePanelName = '' | 'Red' | 'Green';

export type ComponentOfLeftSidePanelAppearances = {
  [componentName in ComponentOfLeftSidePanelName]: Appearance;
};

export type PartialComponentOfLeftSidePanelAppearances = Partial<
  Record<keyof Appearance, any>
>;

export type ComponentOfLeftSidePanelVisibilities = {
  [componentName in ComponentOfLeftSidePanelName]: boolean;
};
