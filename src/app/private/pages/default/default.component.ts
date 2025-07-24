import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { environment } from 'environments/environment';
import { IniciarSesionResponse } from '../../../core/models/Autenticacion/iniciarSesion/IniciarSesionResponse';

@Component({
  selector: 'app-default',
  imports: [],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent implements OnInit {

  private _localKeys = environment.localStorageKeys;
  private _localService:LocalStorageService = inject(LocalStorageService)

  public userFullName = "Usuario"

  ngOnInit(): void {
    const userData:any = this._localService.getItem(this._localKeys.USER)
    console.log("USER DATA",userData)
    this.userFullName = userData.nombre
  }

}
