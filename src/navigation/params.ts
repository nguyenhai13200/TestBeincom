import {EBottomTab, ERootStack} from 'src/enums/navigation';

export type BottomTabParams = {
  [EBottomTab.Todos]: undefined;
  [EBottomTab.Today]: undefined;
  [EBottomTab.Menu]: undefined;
};
export type RootStackParams = {
  [ERootStack.Main]: undefined;
};