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
import { environment } from 'environments/environment';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserInformacionComponent } from '../../components/modals/user-informacion/user-informacion.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {

  private autorService = inject(AutorizacionService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);
  private localService = inject(LocalStorageService);
  private route = inject(Router);
  private _dialog = inject(MatDialog);
  public mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 750px)');
  private _mobileQueryListener = ():void => {};

  private _localStorageKeys = environment.localStorageKeys;

  public menusObtenidos: ObtenerMenuRequest[] = [];
  public mostrarMenu: boolean = false;
  public mostrarUsuario: boolean = false;

  public infoUsuario: ObtenerInformacionUsuario = {} as ObtenerInformacionUsuario;
  private _userModal!: MatDialogRef<UserInformacionComponent> | null;
  
  ngOnInit(): void {
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);

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
        this.menusObtenidos = response;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }

  showUserInfo()
  {
    if(!this._userModal){
      this._userModal = this._dialog.open(UserInformacionComponent,{
        position: {
          top: '70px',
          right: '20px'
        },
        closeOnNavigation: true,
        hasBackdrop: false
      });
    }
    else
    {
      this._userModal.close();
      this._userModal = null;
    }
  }

  InformacionUsuarioLocal() {
    this.infoUsuario = JSON.parse(this.localService.getItem(this._localStorageKeys.USER) as string);
  }

  CerrarSesion() {
    this.localService.clear();
    this.route.navigate(['/']);
  }

}