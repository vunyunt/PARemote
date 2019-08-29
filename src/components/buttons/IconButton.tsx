import React, { Component, ReactNode } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IconButtonProps {
  icon: ReactNode,
  onPress?: () => void
}
export default class IconButton extends Component<
  IconButtonProps
> {
  constructor(props: IconButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity>
        {this.props.icon}
      </TouchableOpacity>
    );
  }
}