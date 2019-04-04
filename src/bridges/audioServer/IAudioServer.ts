export interface ISinkInputInfo {
  SinkId: string;
  DisplayName: string;
  VolMin: number;
  VolMax: number;
  VolStep: number;
  Volume: number;
}

export default interface IAudioServer {
  getAllSinkInputs(): Promise<ISinkInputInfo[]>;
  setSinkInputVolume(sinkId: string, volume: number): Promise<any>;
}
