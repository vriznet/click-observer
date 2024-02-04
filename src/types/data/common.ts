import { ComponentName } from './componentName';

export type Coord = {
  x: number;
  y: number;
};

export type Appearance = {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

type ComponentAppearance = {
  [componentName in ComponentName]: Appearance;
};
type ComponentAppearances = {
  [componentName in ComponentName]: Partial<ComponentAppearance>;
};
export type PartialComponentAppearances = Partial<ComponentAppearances>;

type ComponentVisibility = {
  [componentName in ComponentName]: boolean;
};
type ComponentVisibilities = {
  [componentName in ComponentName]: Partial<ComponentVisibility>;
};
export type PartialComponentVisibilities = Partial<ComponentVisibilities>;

type ComponentGroupList = {
  [superComponentName in ComponentName]: ComponentName[];
};

export type PartialComponentGroupList = Partial<ComponentGroupList>;
