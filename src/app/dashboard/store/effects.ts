import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DataService } from '../services/data.service';

import * as DashboardActions from './actions';

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  getFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getFiles),
      mergeMap(() => {
        return this.dataService.getFiles().pipe(
          map((files) => DashboardActions.getFilesSuccess({ files })),
          catchError((error) =>
            of(DashboardActions.getFilesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  getDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.getDevices),
      mergeMap(() => {
        return this.dataService.getDevices().pipe(
          map((devices) => DashboardActions.getDevicesSuccess({ devices })),
          catchError((error) =>
            of(DashboardActions.getDevicesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  updateDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.addFileToDevice),
      mergeMap((device) => {
        return this.dataService.updateDevice(device).pipe(
          map((device) => DashboardActions.addFileToDeviceSuccess(device)),
          catchError((error) =>
            of(
              DashboardActions.addFileToDeviceFailure({ error: error.message })
            )
          )
        );
      })
    )
  );
}
