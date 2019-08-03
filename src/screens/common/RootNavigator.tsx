import { createStackNavigator, NavigationContainer } from "react-navigation";
import LocalizedStrings from "localized-strings";
import ScreenKeys from "../ScreenKeys";
import HomeScreen from "./HomeScreen";
import SSHPAServerConfigScreen from "./HostConfigScreens.tsx/SSHPAServerConfigScreen";

interface RootNavigatorCtorParams {
  lang?: string;
}
class RootNavigator {
  mDefaultTitle = new LocalizedStrings({
    en: {
      [ScreenKeys.HOME_SCREEN]: "PARemote"
    }
  });

  mNavigator: NavigationContainer;

  constructor(params: RootNavigatorCtorParams) {
    if (!params.lang) {
      params.lang = "en";
    }

    this.mNavigator = createStackNavigator({
      [ScreenKeys.HOME_SCREEN]: {
        screen: HomeScreen,
        navigationOptions: {
          title: this.mDefaultTitle[ScreenKeys.HOME_SCREEN]
        }
      },
      [ScreenKeys.PA_SSH_SERVER_CONFIG_SCREEN]: {
        screen: SSHPAServerConfigScreen
      }
    });
  }

  getNavigator() {
    return this.mNavigator;
  }
}

export default RootNavigator;
