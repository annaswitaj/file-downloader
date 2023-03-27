import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-btn',
  templateUrl: './file-btn.component.html',
  styleUrls: ['./file-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileBtnComponent {
  @Input() name: string | undefined;
  @Input() progress!: number;
  @Input() disabled = false;
  @Input() checked = false;

  checkFile(): void {
    this.checked = true;
  }
}
