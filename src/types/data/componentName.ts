export type ComponentOfScreenName =
  | 'LeftSidePanel'
  | 'RightSidePanel'
  | 'ListContainer';

export type ComponentOfLeftSidePanelName = 'Red' | 'Green';

export type ComponentOfRightSidePanelName = 'Blue' | 'Black';

export type ComponentName =
  | 'Screen'
  | ComponentOfScreenName
  | ComponentOfLeftSidePanelName
  | ComponentOfRightSidePanelName;

export type ComponentBoundary = `${ComponentName}Boundary`;

export type HoveredComponentName =
  | ComponentName
  | 'notHovered'
  | ComponentBoundary;

export type ComponentHasHovered = 'Screen' | 'LeftSidePanel' | 'RightSidePanel';
export type ComponentHasChild = 'Screen' | 'LeftSidePanel' | 'RightSidePanel';
