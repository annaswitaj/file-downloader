import { createReducer, on } from '@ngrx/store';
import { DashboardState } from '../models/dashboardState.model';

import * as DashboardActions from './actions';

export const initialState: DashboardState = {
  isLoading: false,
  files: [],
  devices: [],
  //progressBars: {},
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(DashboardActions.getFiles, (state) => ({ ...state, isLoading: true })),
  on(DashboardActions.getFilesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    files: action.files,
  })),
  on(DashboardActions.getFilesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(DashboardActions.getDevices, (state) => ({ ...state, isLoading: true })),
  on(DashboardActions.getDevicesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    devices: action.devices,
  })),
  on(DashboardActions.getDevicesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(DashboardActions.addFileToDevice, (state, action) => ({
    ...state,
    isLoading: false,
    devices: state.devices.map((d) => (d.id === action.id ? action : d)),
  })),

  on(DashboardActions.updateFileProgressInDevice, (state, action) => ({
    ...state,
    isLoading: false,
    devices: state.devices.map((device) => {
      if (device.id === action.deviceId) {
        const updatedFiles = device.files.map((file) => {
          if (file.id === action.fileId) {
            return {
              ...file,
              progress: action.progress,
            };
          }
          return file;
        });
        return {
          ...device,
          files: updatedFiles,
        };
      }
      return device;
    }),
  }))
);
