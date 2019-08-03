import React, { Component } from "react";
import { View, Text } from "react-native";
import AudioServer, {
  ISinkInputInfo
} from "src/bridges/audioServer/IAudioServer";
import { Slider, Card } from "react-native-elements";
import ViewStyles from "src/styles/ViewStyles";

interface BasicVolumeInterfaceProps {
  audioServer: AudioServer<any>;
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
    }
  }

  async componentDidMount() {
    let sinkInputs: ISinkInputInfo[] = await this.props.audioServer.getAllSinkInputs();
    console.log({sinkInputs});
    

    this.setState({sinkInputs})
  }

  render() {
    return (
      <Card
        containerStyle={ViewStyles.card}
        title={this.props.audioServer.getInfo().displayName}
      >
        {this.state.sinkInputs.map(val => {
          return <View>
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
          </View>;
        })}
      </Card>
    );
  }
}
