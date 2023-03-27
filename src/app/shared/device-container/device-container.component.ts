import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Device } from 'src/app/dashboard/models/device.model';

@Component({
  selector: 'app-device-container',
  templateUrl: './device-container.component.html',
  styleUrls: ['./device-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceContainerComponent {
  @Input() device!: Device;
  @Input() filesDict: {
    [id: number]: { name: string; size: number; isBeingDownloaded: boolean };
  } = {};

  getFileNameById(fileId: number): string | undefined {
    const fileName = this.filesDict[fileId]?.name;
    return fileName;
  }
}
