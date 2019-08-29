import React, { Component } from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

interface VSeparatorProps extends ViewProps {}
export default class VSeparator extends Component<VSeparatorProps> {
  constructor(props: VSeparatorProps) {
    super(props);
  }

  render() {
    return (
      <View {...this.props} style={[styles.sepViewStyle, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  sepViewStyle: {
    height: 1,
    backgroundColor: "#dcdcdc"
  }
});
