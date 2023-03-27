import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.model';
import { File } from '../models/file.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(`${this.apiUrl}/files`);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/devices`);
  }

  updateDevice(device: Device): Observable<Device> {
    return this.http
      .patch<Device>(`${this.apiUrl}/devices/${device.id}`, device)
      .pipe(
        map((updatedDevice: Device) => {
          return {
            ...device,
            ...updatedDevice,
          };
        })
      );
  }
}
