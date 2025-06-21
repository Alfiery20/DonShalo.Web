import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AutorizacionService } from '../../../core/services/autorizacion.service';
import { ObtenerMenuRequest } from '../../../core/models/Autorizacion/obtenerMenu/ObtenerMenuRequest';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ObtenerInformacionUsuario } from '../../../core/models/Autorizacion/obtenerInformacionUsuario/ObtenerInformacionLocal';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  menusObtenidos: ObtenerMenuRequest[] = [];
  mostrarMenu: boolean = false;
  mostrarUsuario: boolean = false;
  infoUsuario: ObtenerInformacionUsuario = {} as ObtenerInformacionUsuario;


  constructor(
    private autorService: AutorizacionService,
    private localService: LocalStorageService,
    private route: Router
  ) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.autorService.ObtenerMenus()
      .subscribe((response) => {
        for (let item of response) {
          switch (item.id) {
            case 1:
              item.icon = "settings";
              break;
            case 8:
              item.icon = "table_bar";
              break;
            case 10:
              item.icon = "local_dining";
              break;
          }
        }
        console.log("menus???", response)
        this.menusObtenidos = response;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }

  ToggleUsuario() {
    this.mostrarUsuario = !this.mostrarUsuario;
    if (this.mostrarUsuario) {
      this.InformacionUsuarioLocal();
    }
  }

  InformacionUsuarioLocal() {
    this.infoUsuario = JSON.parse(this.localService.getItem('usuario') as string);
  }

  CerrarSesion() {
    this.localService.removeItem('token');
    this.localService.removeItem('usuario');
    this.localService.removeItem('menu');
    this.route.navigate(['/']);
  }

}