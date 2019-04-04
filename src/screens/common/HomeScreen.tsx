import React, { Component } from "react";
import { ViewProps, View, Text, Slider } from "react-native";
import ViewStyles from "src/styles/ViewStyles";
import SSHPulseAudioServer from "src/bridges/audioServer/SSHPulseAudioServer";
import { ISinkInputInfo } from "src/bridges/audioServer/IAudioServer";
import { NavigationStackScreenOptions } from "react-navigation";
import PlaceholderVolumeInterface from "src/components/volumeInterfaces/PlaceholderVolumeInterface";

interface HomeScreenProps extends ViewProps {}
interface HomeScreenStates {
  sinkInputs: ISinkInputInfo[];
}
export default class HomeScreen extends Component<HomeScreenProps> {
  static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  mAudioServer: SSHPulseAudioServer;
  state: HomeScreenStates;

  constructor(props: HomeScreenProps) {
    super(props);

    this.mAudioServer = new SSHPulseAudioServer({
      host: "10.0.2.2",
      password: "whosuserform4488",
      user: "vun"
    });

    this.state = {
      sinkInputs: []
    };

    this._asyncInit();
  }

  async _asyncInit() {
    this.setState({ sinkInputs: await this.mAudioServer.getAllSinkInputs() });
  }

  render() {
    return (
      <View style={[ViewStyles.normalPadding]}>
        <PlaceholderVolumeInterface />

        {this.state.sinkInputs.map((val, index) => {
          return (
            <View key={index}>
              <Text>
                {val.DisplayName}({val.SinkId})
              </Text>
              <Slider
                minimumValue={val.VolMin}
                maximumValue={val.VolMax}
                step={val.VolStep}
                value={val.Volume}
                onValueChange={value => {
                  this.mAudioServer.setSinkInputVolume(val.SinkId, value);
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}
