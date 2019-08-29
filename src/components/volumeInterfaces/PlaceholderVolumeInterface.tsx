import React, { Component } from "react";
import { Button } from "react-native-elements";
import Card from "../layouts/Card";

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
      <Card title="Add a host">
        {this.props.addHostButtons.map((val, index) => {
          return (
            <Button
              key={index}
              title={val.label}
              onPress={() => {
                val.onPress();
              }}
            />
          );
        })}
      </Card>
    );
  }
}
