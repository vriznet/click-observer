import { ComponentName, PartialComponentGroupList } from '../types/data/common';

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
  'Red',
  'Green',
  'Blue',
  'Black',
];

export const componentGroupList: PartialComponentGroupList = {
  Screen: ['LeftSidePanel', 'RightSidePanel'],
  LeftSidePanel: ['Red', 'Green'],
  RightSidePanel: ['Blue', 'Black'],
};
