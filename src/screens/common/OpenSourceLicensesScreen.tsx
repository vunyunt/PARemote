import React, { Component } from "react";
import LocalizedStrings from "localized-strings";
import { View, Text } from "react-native";
import { NavigationScreenProps, ScrollView } from "react-navigation";
import LocalizedStringsManager from "src/strings/LocalizedStringsManager";
import ScreenKeys from "../ScreenKeys";
import Licenses from "src/data/OpenSourceLicensesData";
import ButtonRightArrow from "src/components/buttons/ButtonRightArrow";

interface IOpenSourceLicensesScreenProps extends NavigationScreenProps {}
interface IOpenSourceLicensesScreenStates {}
export default class OpenSourceLicensesScreen extends Component<
  IOpenSourceLicensesScreenProps,
  IOpenSourceLicensesScreenStates
> {
  mUIString = new LocalizedStrings({
    en: {},
    zh: {}
  });

  constructor(props: IOpenSourceLicensesScreenProps) {
    super(props);

    LocalizedStringsManager.registerLocalizedString(this.mUIString);
  }

  render() {
    return (
      <ScrollView>
        {Licenses.map(val => {
          return (
            <ButtonRightArrow
              key={val.displayName}
              label={val.displayName}
              sublabel={val.licenseName}
              labelStyle={{
                color: "black"
              }}
              onPress={() => {
                this.props.navigation.navigate(
                  ScreenKeys.LICENSE_DISPLAY_SCREEN,
                  {
                    licenseData: val
                  }
                );
              }}
            />
          );
        })}
      </ScrollView>
    );
  }
}
