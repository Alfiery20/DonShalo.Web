import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../../core/services/autorizacion.service';
import { ObtenerMenuRequest } from '../../../core/models/Autorizacion/obtenerMenu/ObtenerMenuRequest';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ObtenerInformacionUsuario } from '../../../core/models/Autorizacion/obtenerInformacionUsuario/ObtenerInformacionLocal';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  menusObtenidos: ObtenerMenuRequest[] = [];
  mostrarMenu: boolean = false;
  mostrarUsuario: boolean = false;
  infoUsuario: ObtenerInformacionUsuario = {} as ObtenerInformacionUsuario;


  constructor(
    private autorService: AutorizacionService,
    private localService: LocalStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.autorService.ObtenerMenus().subscribe((response) => {
      this.menusObtenidos = response;
    });
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  direccionar(id: string) {
    var menuItems = document.getElementsByClassName('btn_hijo');
    Array.from(menuItems).forEach((item) => {
      item.classList.remove('seleccionado');
    });
    var ItemSeleccionado = document.getElementById(id);
    ItemSeleccionado?.classList.add('seleccionado');
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