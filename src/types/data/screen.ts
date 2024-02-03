export type ComponentOfScreenName = 'LeftSidePanel' | 'RightSidePanel';

export type ComponentOfScreenVisibilities = {
  [componentName in ComponentOfScreenName]: boolean;
};
