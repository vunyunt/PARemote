import React, { Component } from "react";
import { View, Text, ViewProps } from "react-native";
import ViewStyles from "src/styles/ViewStyles";
import { Card, Button } from "react-native-elements";
import { NavigationScreenProps } from "react-navigation";
import ScreenKeys from "src/screens/ScreenKeys";

interface IAddHostBtn {
  label: string;
  onPress: () => void;
}
interface PlaceholderVolumeInterfaceProps {
  addHostButtons: IAddHostBtn[];
}

export default class PlaceholderVolumeInterface extends Component<
  PlaceholderVolumeInterfaceProps
> {
  constructor(props: PlaceholderVolumeInterfaceProps) {
    super(props);
  }

  render() {
    return (
      <Card containerStyle={ViewStyles.card} title="Add a host">
        {
          this.props.addHostButtons.map((val, index) => {
            return (
              <Button
                key={index}
                title={val.label}
                onPress={() => {
                  val.onPress();
                }}
              />
            );
          })
        }
        
      </Card>
    );
  }
}
