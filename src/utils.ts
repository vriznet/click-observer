import { baseAppearance } from './data/common';
import { ComponentName } from './types/data/componentName';
import {
  PartialComponentAppearances,
  PartialComponentGroupList,
  PartialComponentVisibilities,
} from './types/data/common';
import {
  CommonComponentMouseActionState,
  ListItemClickStatus,
} from './types/states';

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

export const generateInitialComponentVisibilities = (
  componentNameList: ComponentName[],
  componentGroupList: PartialComponentGroupList
): PartialComponentVisibilities => {
  const initialVisibilities: PartialComponentVisibilities = {
    ...componentNameList.reduce((visibilities, componentName) => {
      const childComponentNameList = componentGroupList[componentName];
      if (childComponentNameList && childComponentNameList.length > 0) {
        return {
          ...visibilities,
          [componentName]: {
            ...childComponentNameList.reduce(
              (childVisibilities, childComponentName) => {
                return {
                  ...childVisibilities,
                  [childComponentName]: false,
                };
              },
              {} as PartialComponentVisibilities
            ),
          },
        };
      } else {
        return {
          ...visibilities,
        };
      }
    }, {} as PartialComponentVisibilities),
  };
  return initialVisibilities;
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

export const generateInitialComponentClickStatus = (
  componentNameList: ComponentName[]
) => {
  const initialClickStatus = componentNameList.reduce(
    (clickStatus, componentName) => {
      return {
        ...clickStatus,
        [componentName]: {
          isClicking: false,
          isClickStarted: false,
          isClickEnded: false,
          isShortClicked: false,
          isDblClicked: false,
          isLongClickStarted: false,
          isLongClickEnded: false,
        },
      };
    },
    {} as CommonComponentMouseActionState
  );
  return initialClickStatus;
};

export const generateInitialListItemClickStatus = (
  listItemIdList: string[]
): ListItemClickStatus => {
  const initialListItemClickStatus = listItemIdList.reduce(
    (clickStatus, id) => {
      return {
        ...clickStatus,
        [id]: {
          isClicking: false,
          isClickStarted: false,
          isClickEnded: false,
          isShortClicked: false,
          isDblClicked: false,
          isLongClickStarted: false,
          isLongClickEnded: false,
        },
      };
    },
    {} as ListItemClickStatus
  );
  return initialListItemClickStatus;
};
