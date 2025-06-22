import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-informacion',
  imports: [
    MatDialogModule
  ],
  templateUrl: './user-informacion.component.html',
  styleUrl: './user-informacion.component.scss'
})
export class UserInformacionComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UserInformacionComponent>);
  readonly localStorageService = inject(LocalStorageService);
  readonly localStorageKeys = environment.localStorageKeys;

  public userData: any = {};

  ngOnInit(): void {
    this.userData = this.localStorageService.getItem(this.localStorageKeys.USER);
  }
}
