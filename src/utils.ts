import { baseAppearance } from './data/common';
import {
  ComponentName,
  PartialComponentAppearances,
  PartialComponentGroupList,
} from './types/data/common';

export const generateInitialComponentAppearances = (
  componentNameList: ComponentName[],
  componentGroupList: PartialComponentGroupList
): PartialComponentAppearances => {
  const initialAppearances: PartialComponentAppearances = {
    ...componentNameList.reduce((appearances, componentName) => {
      const childComponentNameList = componentGroupList[componentName];
      if (childComponentNameList && childComponentNameList.length > 0) {
        return {
          ...appearances,
          [componentName]: {
            ...childComponentNameList.reduce(
              (childAppearances, childComponentName) => {
                return {
                  ...childAppearances,
                  [childComponentName]: baseAppearance,
                };
              },
              {} as PartialComponentAppearances
            ),
          },
        };
      } else {
        return {
          ...appearances,
        };
      }
    }, {} as PartialComponentAppearances),
  };
  return initialAppearances;
};

export const getParentComponentNameOfComponentElement = (
  componentGroupList: PartialComponentGroupList,
  componentName: ComponentName
) => {
  const properties = Object.keys(componentGroupList) as ComponentName[];
  const parentComponentName = properties.find(
    (property) => componentGroupList[property]?.includes(componentName)
  );
  return parentComponentName;
};
