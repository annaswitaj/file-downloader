export interface Device {
  id: number;
  name: string;
  download: number;
  files: DeviceFile[];
}

export interface DeviceFile {
  id: number;
  progress: number;
}
