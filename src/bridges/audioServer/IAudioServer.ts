export interface ISinkInputInfo {
  SinkId: string;
  DisplayName: string;
  VolMin: number;
  VolMax: number;
  VolStep: number;
  Volume: number;
}

export interface IAudioServerInfo<ConfigType> {
  type: string;
  displayName: string;
  config: ConfigType;
}

export default abstract class AudioServer<ConfigType> {
  protected mAudioServerInfo: IAudioServerInfo<ConfigType>;

  constructor(info: IAudioServerInfo<ConfigType>) {
    this.mAudioServerInfo = info;
  }

  public abstract getAllSinkInputs(): Promise<ISinkInputInfo[]>;
  public abstract setSinkInputVolume(sinkId: string, volume: number): Promise<any>;
  public getInfo() {
    return this.mAudioServerInfo;
  }
}
