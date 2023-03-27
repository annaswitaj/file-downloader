import { Device } from './device.model';
import { File } from './file.model';

export interface DashboardState {
  isLoading: boolean;
  files: File[];
  devices: Device[];
  error: string | null;
}
