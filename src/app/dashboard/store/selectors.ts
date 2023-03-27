import { createSelector } from '@ngrx/store';
import { AppState } from '../models/appState.model';

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
