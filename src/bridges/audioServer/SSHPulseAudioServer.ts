import lodash from "lodash";
import AudioServer, { ISinkInputInfo } from "./IAudioServer";
const SSH = require("react-native-ssh").default;
// import SSH from "react-native-ssh";

export interface ISSHPAServerConfig {
  user: string;
  host: string;
  password: string;
}
export default class SSHPulseAudioServer extends AudioServer<ISSHPAServerConfig> {
  public static CONFIG_TYPE_NAME = "PA@SSH"
  PULSE_VOL_MAX = 65536;

  async getAllSinkInputs() {
    let result = await this._sshPaGetSinkInputs();
    let outputArr: ISinkInputInfo[] = [];

    Object.keys(result).map(key => {
      let val: any = result[key];
      let volumes: number[] = Object.keys(val.volume).map(volkey => {
        let volval: number = parseInt(
          val["volume"][volkey].split("/")[0].trim()
        );
        return volval;
      });
      let volume: number = lodash.mean(volumes);

      let outputObj: ISinkInputInfo = {
        SinkId: key.trim(),
        Volume: volume,
        DisplayName: val.name,
        VolMin: 0,
        VolMax: this.PULSE_VOL_MAX,
        VolStep: 1
      };

      outputArr.push(outputObj);
    });

    return outputArr;
  }

  async setSinkInputVolume(sinkId: string, volume: number) {
    this._sshPaSetSinkVolume(sinkId, volume);
  }

  _sshPaSetSinkVolume = lodash.throttle(
    async (sinkId: string, volume: number) => {
      let cmd = ["pacmd set-sink-input-volume"];
      cmd.push(sinkId);
      cmd.push(volume.toString());

      let cmdStr = cmd.join(" ");
      SSH.execute(this.mAudioServerInfo.config, cmdStr);
    },
    200
  );

  async _sshPaGetSinkInputs() {
    const volPrefix = "volume";
    const dispNamePrefix = "application.process.binary";
    const cmd = "pacmd list-sink-inputs";

    let result: string[] = await SSH.execute(this.mAudioServerInfo.config, cmd);
    
    let obj: any = {};

    let currentKey: string = "unindexed";
    for (let i = 0, n = result.length; i < n; ++i) {
      let line = result[i];
      if (!line.startsWith("\t") && line.trim().startsWith("index:")) {
        // Sink input index
        currentKey = line.split(":")[1];
        obj[currentKey] = {};
      } else if (line.trim().startsWith(volPrefix)) {
        // Volume information
        // Note: the immediate line after the volume line contains balance information
        //       currently balance is not supported hence it is not processed
        let volumeInfo = line
          .replace("volume:", "")
          .trim()
          .split(",");
        obj[currentKey]["volume"] = {};
        volumeInfo.forEach(viLine => {
          let viKvPair = viLine.split(":");
          obj[currentKey]["volume"][viKvPair[0]] = viKvPair[1];
        });
      } else if (line.trim().startsWith(dispNamePrefix)) {
        // \t\tapplication.name, used for display
        obj[currentKey]["name"] = line.split("=")[1].trim();
      }
    }

    return obj;
  }
}
