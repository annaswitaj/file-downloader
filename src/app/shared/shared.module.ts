import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileBtnComponent } from './file-btn/file-btn.component';
import { DeviceContainerComponent } from './device-container/device-container.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    FileBtnComponent,
    DeviceContainerComponent,
    ProgressBarComponent,
  ],
  imports: [CommonModule],
  exports: [FileBtnComponent, DeviceContainerComponent],
})
export class SharedModule {}
