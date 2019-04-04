import React, { Component } from "react";
import { View, Text, ViewProps } from "react-native";
import ViewStyles from "src/styles/ViewStyles";
import { Card, Button } from "react-native-elements";

interface PlaceholderVolumeInterfaceProps extends ViewProps {}

export default class PlaceholderVolumeInterface extends Component<
  PlaceholderVolumeInterfaceProps
> {
  constructor(props: PlaceholderVolumeInterfaceProps) {
    super(props);
  }

  render() {
    return (
      <Card containerStyle={ViewStyles.card} title="Add a host">
        <Button title="PulseAudio" onPress={() => {}} />
      </Card>
    );
  }
}
