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

export const componentBoundaryNameList = componentNameList.map(
  (componentName) => `${componentName}Boundary`
);

const convertToNestedObject = (
  componentGroupList: PartialComponentGroupList
): any => {
  const result: any = {};

  for (const [superComponent, subComponents] of Object.entries(
    componentGroupList
  )) {
    if (superComponent !== 'Screen') {
      continue; // Skip non-root components
    }
    result[superComponent] = {};
    if (subComponents) {
      for (const subComponent of subComponents) {
        result[superComponent][subComponent] = {};
        if (componentGroupList[subComponent]) {
          const subSubComponents = componentGroupList[subComponent]!;
          for (const subSubComponent of subSubComponents) {
            result[superComponent][subComponent][subSubComponent] = {};
          }
        }
      }
    }
  }

  return result;
};

export const componentTree = convertToNestedObject(componentGroupList);
