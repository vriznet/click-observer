export type ComponentOfScreenName = 'LeftSidePanel' | 'RightSidePanel';

export type ComponentOfLeftSidePanelName = 'Red' | 'Green';

export type ComponentOfRightSidePanelName = 'Blue' | 'Black';

export type ComponentName =
  | 'Screen'
  | ComponentOfScreenName
  | ComponentOfLeftSidePanelName
  | ComponentOfRightSidePanelName;
