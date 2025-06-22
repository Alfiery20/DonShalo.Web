import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-informacion',
  imports: [
    MatDialogModule
  ],
  templateUrl: './user-informacion.component.html',
  styleUrl: './user-informacion.component.scss'
})
export class UserInformacionComponent {
  readonly dialogRef = inject(MatDialogRef<UserInformacionComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
