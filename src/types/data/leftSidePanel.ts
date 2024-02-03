export type ComponentOfLeftSidePanelName = 'Red' | 'Green';

export type ComponentOfLeftSidePanelVisibilities = {
  [componentName in ComponentOfLeftSidePanelName]: boolean;
};
