import React, { Component } from "react";
import LocalizedStrings from "localized-strings";
import { View, Text, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import LocalizedStringsManager from "src/strings/LocalizedStringsManager";
import { ScrollView } from "react-native-gesture-handler";
import { ILicenseData } from "src/data/OpenSourceLicensesData";

export interface ILicenseDisplayScreenParams {
  licenseData: ILicenseData;
}

interface ILicenseDisplayScreenProps
  extends NavigationScreenProps<ILicenseDisplayScreenParams> {}
interface ILicenseDisplayScreenStates {}
export default class LicenseDisplayScreen extends Component<
  ILicenseDisplayScreenProps,
  ILicenseDisplayScreenStates
> {
  mUIString = new LocalizedStrings({
    en: {},
    zh: {}
  });

  constructor(props: ILicenseDisplayScreenProps) {
    super(props);

    LocalizedStringsManager.registerLocalizedString(this.mUIString);
  }

  render() {
    return (
      <ScrollView style={styles.rootView}>
        <Text style={styles.title}>
          {this.props.navigation.getParam("licenseData").displayName}
        </Text>
        <Text style={styles.licenseName}>
          {this.props.navigation.getParam("licenseData").licenseName}
        </Text>
        {this.props.navigation
          .getParam("licenseData")
          .licenseContent.map(val => {
            return <Text style={styles.licenseContent}>{val}</Text>;
          })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    padding: 12
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 16
  },
  licenseName: {
    fontSize: 18,
    marginBottom: 8
  },
  licenseContent: {
    fontSize: 12.5,
    marginBottom: 4,
    textAlign: "justify"
  }
});
