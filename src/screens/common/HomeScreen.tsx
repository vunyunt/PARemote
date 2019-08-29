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
import AsyncStorage from "@react-native-community/async-storage";
import LocalizedStrings from "localized-strings";
import Card from "src/components/layouts/Card";
import LocalizedStringsManager from "src/strings/LocalizedStringsManager";
import { Button } from "react-native-elements";

interface HomeScreenProps extends NavigationScreenProps {}
interface HomeScreenStates {
  audioServerInfos: IAudioServerInfo<any>[];
  audioServers: AudioServer<any>[];
}
export default class HomeScreen extends Component<
  HomeScreenProps,
  HomeScreenStates
> {
  static navigationOptions: NavigationStackScreenOptions = {
    header: null
  };
  static SERVER_INFOS_STORAGE_KEY = "HomeScreen.state.audioServerInfos";

  state: HomeScreenStates;

  private mUIStrings = new LocalizedStrings({
    en: {
      LABEL_ABOUT: "About",
      BTN_OPEN_SRC_LICENSES: "Open Source Licenses"
    }
  });

  constructor(props: HomeScreenProps) {
    super(props);

    LocalizedStringsManager.registerLocalizedString(this.mUIStrings);

    this.state = {
      audioServerInfos: [],
      audioServers: []
    };
  }

  async componentDidMount() {
    let storedServerInfoStr = await AsyncStorage.getItem(
      HomeScreen.SERVER_INFOS_STORAGE_KEY
    );
    let storedServerInfo: IAudioServerInfo<any>[] = JSON.parse(
      storedServerInfoStr || "[]"
    );
    let servers: AudioServer<any>[] = [];
    for (let i = 0, n = storedServerInfo.length; i < n; ++i) {
      let server = await this.getServerFromInfo(storedServerInfo[i]);
      if (server) servers.push(server);
    }

    this.setState({
      audioServerInfos: storedServerInfo,
      audioServers: servers
    });
  }

  private async asyncSaveServers() {
    AsyncStorage.setItem(
      HomeScreen.SERVER_INFOS_STORAGE_KEY,
      JSON.stringify(this.state.audioServerInfos)
    );
  }

  private async getServerFromInfo(serverInfo: IAudioServerInfo<any>) {
    switch (serverInfo.type) {
      case SSHPulseAudioServer.CONFIG_TYPE_NAME:
        return new SSHPulseAudioServer(serverInfo);
    }
  }

  private async onServerAdded(serverInfo: IAudioServerInfo<any>) {
    let server = await this.getServerFromInfo(serverInfo);
    if (server) {
      this.state.audioServerInfos.push(serverInfo);
      this.state.audioServers.push(server);
      this.asyncSaveServers();
    }
  }

  render() {
    let PASSHServerConfigScreenParams: ISSHPAServerConfigScreenNavParams = {
      onSave: this.onServerAdded.bind(this)
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
          return (
            <BasicVolumeInterface
              audioServer={val}
              key={index}
              index={index}
              onRemove={idx => {
                this.state.audioServerInfos.splice(idx, 1);
                this.state.audioServers.splice(idx, 1);
                this.setState({
                  audioServers: this.state.audioServers
                });
                this.asyncSaveServers();
              }}
            />
          );
        })}

        <Card title={this.mUIStrings.LABEL_ABOUT}>
          <Button
            title={this.mUIStrings.BTN_OPEN_SRC_LICENSES}
            onPress={() => {
              this.props.navigation.navigate({
                routeName: ScreenKeys.OPEN_SOURCE_LICENSES_SCREEN
              });
            }}
          />
        </Card>
      </View>
    );
  }
}
