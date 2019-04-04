/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import RootNavigator from "./src/screens/common/RootNavigator";

const AppContainer = createAppContainer(
  new RootNavigator({ lang: "en" }).getNavigator()
);

interface Props {}
export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
  }
}
