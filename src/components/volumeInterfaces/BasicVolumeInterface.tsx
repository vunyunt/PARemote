import React, { Component } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from "react-native";
import AudioServer, {
  ISinkInputInfo
} from "src/bridges/audioServer/IAudioServer";
import { Slider } from "react-native-elements";
import ViewStyles from "src/styles/ViewStyles";
import Card from "../layouts/Card";
import Ionicons from "react-native-vector-icons/Ionicons";

interface BasicVolumeInterfaceProps {
  audioServer: AudioServer<any>;
  onRemove?: (index: number) => void;
  index: number;
}
interface BasicVolumeInterfaceStates {
  sinkInputs: ISinkInputInfo[];
}
export default class BasicVolumeInterface extends Component<
  BasicVolumeInterfaceProps,
  BasicVolumeInterfaceStates
> {
  constructor(props: BasicVolumeInterfaceProps) {
    super(props);

    this.state = {
      sinkInputs: []
    };
  }

  async componentDidMount() {
    this.refresh();
  }

  async refresh() {
    let sinkInputs: ISinkInputInfo[] = await this.props.audioServer.getAllSinkInputs();
    this.setState({ sinkInputs });
  }

  render() {
    return (
      <Card
        title={this.props.audioServer.getInfo().displayName}
        headerRight={
          <View style={[ViewStyles.hflex]}>
            <TouchableOpacity
              style={styles.headerIcon}
              activeOpacity={0.5}
              onPress={() => {
                this.refresh();
              }}
            >
              <Ionicons name="md-refresh-circle" color="gray" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIcon}
              activeOpacity={0.5}
              onPress={() => {
                if (this.props.onRemove)
                  this.props.onRemove(this.props.index);
              }}
            >
              <Ionicons name="md-remove-circle" color="gray" size={24} />
            </TouchableOpacity>
          </View>
        }
      >
        {this.state.sinkInputs.map((val, index) => {
          return (
            <View key={index}>
              <Text>
                {val.DisplayName} ({val.SinkId})
              </Text>
              <Slider
                minimumValue={val.VolMin}
                maximumValue={val.VolMax}
                step={val.VolStep}
                value={val.Volume}
                onValueChange={value => {
                  this.props.audioServer.setSinkInputVolume(
                    val.SinkId,
                    value
                  );
                }}
              />
            </View>
          );
        })}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    marginLeft: 8
  }
})