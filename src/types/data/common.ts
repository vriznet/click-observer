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

export type ComponentOfScreenName = 'LeftSidePanel' | 'RightSidePanel';

export type ComponentOfLeftSidePanelName = 'Red' | 'Green';

export type ComponentOfRightSidePanelName = 'Blue' | 'Black';

export type ComponentName =
  | 'Screen'
  | ComponentOfScreenName
  | ComponentOfLeftSidePanelName
  | ComponentOfRightSidePanelName;

export type ComponentGroupList = {
  [superComponentName in ComponentName]: ComponentName[];
};

export type PartialComponentGroupList = Partial<ComponentGroupList>;
