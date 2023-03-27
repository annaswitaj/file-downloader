import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { finalize, interval, map, Observable, takeWhile, tap } from 'rxjs';
import { Device, DeviceFile } from 'src/app/dashboard/models/device.model';
import { File } from 'src/app/dashboard/models/file.model';
import { AppState } from './models/appState.model';
import { devicesSelector, filesSelector } from './store/selectors';
import * as DashboardActions from './store/actions';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  files$!: Observable<File[]>;
  devices$!: Observable<Device[]>;
  devices!: Device[];
  filesDict: {
    [id: number]: { name: string; size: number; isBeingDownloaded: boolean };
  } = {};
  isTheDeviceDownloadingDict: { [id: number]: boolean } = {};

  constructor(
    private store: Store<AppState>,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.files$ = this.store.pipe(
      select(filesSelector),
      tap((files) => {
        files.forEach((file) => {
          this.filesDict[file.id] = {
            name: file.name,
            size: file.size,
            isBeingDownloaded: false,
          };
        });
      })
    );
    this.devices$ = this.store.pipe(
      select(devicesSelector),
      tap((devices) => {
        this.devices = devices;
        devices.forEach((device) => {
          this.isTheDeviceDownloadingDict[device.id] = false;
        });
      })
    );

    this.store.dispatch(DashboardActions.getFiles());
    this.store.dispatch(DashboardActions.getDevices());

    this.checkFilesToDownload();
  }

  checkFilesToDownload(): void {
    setInterval(() => {
      this.devices.forEach((device) =>
        device.files.forEach((file) => {
          if (
            file.progress === 0 &&
            this.filesDict[file.id].isBeingDownloaded === false &&
            this.isTheDeviceDownloadingDict[device.id] === false
          ) {
            this.filesDict[file.id].isBeingDownloaded = true;
            this.isTheDeviceDownloadingDict[device.id] = true;
            const fileSize = this.filesDict[file.id].size;
            this.updateFileProgressInDevice(file.id, fileSize, device);
          }
        })
      );
    }, 1000);
  }

  addFileToDevice(clickedFile: File): void {
    this.devices$.subscribe((devices) => {
      devices.forEach((device) => {
        const isDeviceContainsClickedFile = device.files.some(
          (file) => file.id === clickedFile.id
        );
        if (!isDeviceContainsClickedFile) {
          this.dispatchAddFileToDevice(clickedFile, device);
        }
      });
    });
  }

  private updateFileProgressInDevice(
    fileId: number,
    fileSize: number,
    device: Device
  ): void {
    const progressStep = this.calculateProgressStep(fileSize, device);
    const downloadObservable = interval(500).pipe(
      map((t) => t * progressStep),
      takeWhile((progress) => progress < 1),
      finalize(() => {
        this.filesDict[fileId].isBeingDownloaded = false;
        this.isTheDeviceDownloadingDict[device.id] = false;
        this.dispatchUpdateFileProgressInDevice(fileId, device.id, 1);
        this.dataService
          .updateDevice({
            ...device,
            files: device.files.map((file) => {
              return file.id === fileId ? { ...file, progress: 1 } : file;
            }),
          })
          .subscribe();
      })
    );

    downloadObservable.subscribe((progress) => {
      this.dispatchUpdateFileProgressInDevice(fileId, device.id, progress);
    });
  }

  private dispatchUpdateFileProgressInDevice(
    fileId: number,
    deviceId: number,
    progress: number
  ): void {
    this.store.dispatch(
      DashboardActions.updateFileProgressInDevice({
        fileId,
        deviceId,
        progress,
      })
    );
  }

  private dispatchAddFileToDevice(clickedFile: File, device: Device): void {
    const newDeviceFile: DeviceFile = {
      id: clickedFile.id,
      progress: 0,
    };
    this.store.dispatch(
      DashboardActions.addFileToDevice({
        ...device,
        files: [...device.files, newDeviceFile],
      })
    );
  }

  private calculateProgressStep(fileSize: number, device: Device): number {
    const downloadSpeed = device.download;
    const downloadTime = fileSize / downloadSpeed;
    return 1 / (downloadTime * 10);
  }
}
