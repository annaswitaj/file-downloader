import { createAction, props } from '@ngrx/store';
import { Device } from '../models/device.model';
import { File } from '../models/file.model';

export const getFiles = createAction('[Dashboard] Get Files');
export const getFilesSuccess = createAction(
  '[Dashboard] Get Files success',
  props<{ files: File[] }>()
);
export const getFilesFailure = createAction(
  '[Dashboard] Get Files failure',
  props<{ error: string }>()
);

export const getDevices = createAction('[Dashboard] Get Devices');
export const getDevicesSuccess = createAction(
  '[Dashboard] Get Devices success',
  props<{ devices: Device[] }>()
);
export const getDevicesFailure = createAction(
  '[Dashboard] Get Devices failure',
  props<{ error: string }>()
);

export const addFileToDevice = createAction(
  '[Dashboard] Add File to Device',
  props<Device>()
);
export const addFileToDeviceSuccess = createAction(
  '[Dashboard] Add File to Device success',
  props<Device>()
);
export const addFileToDeviceFailure = createAction(
  '[Dashboard] Add File to Device failure',
  props<{ error: string }>()
);

export const updateFileProgressInDevice = createAction(
  '[Dashboard] Update Progress File in Device',
  props<{
    fileId: number;
    deviceId: number;
    progress: number;
  }>()
);
