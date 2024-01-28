import { Appearance } from './common';

export type ComponentOfScreenName = '' | 'LeftSidePanel' | 'RightSidePanel';

export type ComponentOfScreenAppearances = {
  [componentName in ComponentOfScreenName]: Appearance;
};

export type PartialComponentOfScreenAppearances = Partial<
  Record<keyof Appearance, any>
>;

export type ComponentOfScreenVisibilities = {
  [componentName in ComponentOfScreenName]: boolean;
};
