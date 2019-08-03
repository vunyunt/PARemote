import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform
} from "react-native";
import VSeparator from "../layouts/JXVSeparator";
import { Button } from "react-native-elements";
import LocalizedStrings from "localized-strings";

export interface LabeledUnderlinedTextInputProps extends TextInputProps {
  label?: string;
  secureTextEntry?: boolean;
}
export default class LabeledUnderlinedTextInput extends Component<
  LabeledUnderlinedTextInputProps
> {
  constructor(props: LabeledUnderlinedTextInputProps) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this.props.label && (
          <Text style={[styles.label]}>{this.props.label}</Text>
        )}
        <TextInput
          returnKeyType="done"
          secureTextEntry={this.props.secureTextEntry}
          {...this.props}
          style={[styles.textInput]}
        />
        <VSeparator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  },

  label: {
    paddingLeft: 4,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 12,
    fontWeight: "bold"
  },

  textInput: {
    padding: 4,
    paddingBottom: 0,
    marginTop: 0,
    fontSize: 16
  }
});
