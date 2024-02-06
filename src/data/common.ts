import { PartialComponentGroupList } from '../types/data/common';
import { ComponentName } from '../types/data/componentName';

export const baseAppearance = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  zIndex: 0,
};

export const componentNameList: ComponentName[] = [
  'Screen',
  'LeftSidePanel',
  'RightSidePanel',
  'ListContainer',
  'Red',
  'Green',
  'Blue',
  'Black',
];

export const componentGroupList: PartialComponentGroupList = {
  Screen: ['LeftSidePanel', 'RightSidePanel', 'ListContainer'],
  LeftSidePanel: ['Red', 'Green'],
  RightSidePanel: ['Blue', 'Black'],
};
