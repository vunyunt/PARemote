import React, { Component } from "react";
import { ViewProps, View, Text, Slider } from "react-native";
import ViewStyles from "src/styles/ViewStyles";
import SSHPulseAudioServer, {
  ISSHPAServerConfig
} from "src/bridges/audioServer/SSHPulseAudioServer";
import AudioServer, {
  ISinkInputInfo,
  IAudioServerInfo
} from "src/bridges/audioServer/IAudioServer";
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from "react-navigation";
import PlaceholderVolumeInterface from "src/components/volumeInterfaces/PlaceholderVolumeInterface";
import ScreenKeys from "../ScreenKeys";
import { ISSHPAServerConfigScreenNavParams } from "./HostConfigScreens.tsx/SSHPAServerConfigScreen";
import BasicVolumeInterface from "src/components/volumeInterfaces/BasicVolumeInterface";

interface HomeScreenProps extends NavigationScreenProps {}
interface HomeScreenStates {
  audioServers: AudioServer<any>[];
}
export default class HomeScreen extends Component<HomeScreenProps> {
  static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };

  state: HomeScreenStates;

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      audioServers: []
    };
  }

  async _asyncInit() {}

  render() {
    let PASSHServerConfigScreenParams: ISSHPAServerConfigScreenNavParams = {
      onSave: info => {
        this.state.audioServers.push(new SSHPulseAudioServer(info));
        this.setState({audioServers: this.state.audioServers})
      }
    };

    return (
      <View style={[ViewStyles.normalPadding]}>
        <PlaceholderVolumeInterface
          addHostButtons={[
            {
              label: "PulseAudio via SSH",
              onPress: () => {
                this.props.navigation.navigate(
                  ScreenKeys.PA_SSH_SERVER_CONFIG_SCREEN,
                  PASSHServerConfigScreenParams
                );
              }
            }
          ]}
        />

        {this.state.audioServers.map((val, index) => {
          return <BasicVolumeInterface audioServer={val} key={index} />;
        })}
      </View>
    );
  }
}
