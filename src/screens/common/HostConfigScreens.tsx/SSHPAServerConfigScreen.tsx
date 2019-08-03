import React, { Component } from "react";
import LocalizedStrings from "localized-strings";
import { View, Text } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import LocalizedStringsManager from "src/strings/LocalizedStringsManager";
import { IAudioServerInfo } from "src/bridges/audioServer/IAudioServer";
import SSHPulseAudioServer, { ISSHPAServerConfig } from "src/bridges/audioServer/SSHPulseAudioServer";
import LabeledUnderlinedTextInput from "src/components/inputs/LabeledUnderlinedTextInput";
import ViewStyles from "src/styles/ViewStyles";
import { Button } from "react-native-elements";


export interface ISSHPAServerConfigScreenNavParams {
  audioServerInfo?: IAudioServerInfo<ISSHPAServerConfig>;
  onSave?: (serverInfo: IAudioServerInfo<ISSHPAServerConfig>) => void;
}
interface ISSHPAServerConfigScreenProps
  extends NavigationScreenProps<ISSHPAServerConfigScreenNavParams> {}
interface ISSHPAServerConfigScreenStates {
  host: string;
  password: string;
  user: string;
  displayName: string;
}
export default class SSHPAServerConfigScreen extends Component<
  ISSHPAServerConfigScreenProps,
  ISSHPAServerConfigScreenStates
> {
  mUIString = new LocalizedStrings({
    en: {
      LABEL_HOST: "SSH Host",
      LABEL_PASSWORD: "SSH Password",
      LABEL_USER: "SSH User",
      LABEL_DISPLAY_NAME: "Name",
      BTN_SAVE:"Save",
    }
  });

  static DEFAULT_INFO: IAudioServerInfo<ISSHPAServerConfig> = {
    type: SSHPulseAudioServer.CONFIG_TYPE_NAME,
    config: {
      host: "",
      password: "",
      user: ""
    },
    displayName: ""
  };

  constructor(props: ISSHPAServerConfigScreenProps) {
    super(props);

    this.state = this.serverInfoToState(
      this.props.navigation.getParam("audioServerInfo") ||
        SSHPAServerConfigScreen.DEFAULT_INFO
    );

    LocalizedStringsManager.registerLocalizedString(this.mUIString);
  }

  private serverInfoToState(
    serverInfo: IAudioServerInfo<ISSHPAServerConfig>
  ): ISSHPAServerConfigScreenStates {
    return {
      displayName: serverInfo.displayName,
      host: serverInfo.config.host,
      password: serverInfo.config.password,
      user: serverInfo.config.user
    };
  }

  private stateToServerInfo(
    state: ISSHPAServerConfigScreenStates
  ): IAudioServerInfo<ISSHPAServerConfig> {
    return {
      type: SSHPulseAudioServer.CONFIG_TYPE_NAME,
      displayName: state.displayName,
      config: {
        host: state.host,
        password: state.password,
        user: state.user
      }
    };
  }

  private async onSave() {
    let onSave = this.props.navigation.getParam("onSave");
    if(onSave) {
      await onSave(this.stateToServerInfo(this.state));
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={[ViewStyles.screenRoot]}>
        <LabeledUnderlinedTextInput
          label={this.mUIString.LABEL_DISPLAY_NAME}
          value={this.state.displayName}
          onChangeText={val => {
            this.setState({
              displayName: val
            });
          }}
        />

        <LabeledUnderlinedTextInput
          label={this.mUIString.LABEL_HOST}
          value={this.state.host}
          onChangeText={val => {
            this.setState({
              host: val
            });
          }}
        />

        <LabeledUnderlinedTextInput
          label={this.mUIString.LABEL_USER}
          value={this.state.user}
          onChangeText={val => {
            this.setState({
              user: val
            });
          }}
        />

        <LabeledUnderlinedTextInput
          label={this.mUIString.LABEL_PASSWORD}
          value={this.state.password}
          secureTextEntry
          onChangeText={val => {
            this.setState({
              password: val
            });
          }}
        />

        <Button title={this.mUIString.BTN_SAVE} onPress={this.onSave.bind(this)} />
      </View>
    );
  }
}
