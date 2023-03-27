import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/appState.model';
import { DashboardState } from '../models/dashboardState.model';
import { Device } from '../models/device.model';

interface Props {
  fileId: number;
  deviceId: number;
}
export const selectFeature = (state: AppState) => state.dashboard;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const filesSelector = createSelector(
  selectFeature,
  (state) => state.files
);

export const devicesSelector = createSelector(
  selectFeature,
  (state) => state.devices
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

// export const updateDeviceSelector = (updatedDevice: Device) =>
//   createSelector(selectFeature, (state) => {
//     const updatedDevices = state.devices.map((device) => {
//       if (device.id === updatedDevice.id) {
//         return {
//           ...device,
//           ...updatedDevice,
//         };
//       }
//       return device;
//     });
//     return updatedDevices;
//   });

//   export const updateFileProgressInDeviceSelector = (updatedDevice: Device) =>
//     createSelector(selectFeature, (state) => {
//       const updatedDevices = state.devices.map((device) => {
//         if (device.id === updatedDevice.id) {
//           return {
//             ...device,
//             ...updatedDevice,
//           };
//         }
//         return device;
//       });
//       return updatedDevices;
//     });

// export const selectProgressBar = (props: Props) =>
//   createSelector(selectFeature, (state: DashboardState) => {
//     return state.progressBars[props.fileId] &&
//       state.progressBars[props.fileId][props.deviceId]
//       ? state.progressBars[props.fileId][props.deviceId]
//       : 0;
//   });
