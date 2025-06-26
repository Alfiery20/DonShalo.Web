import { Component, Input } from '@angular/core';
import { ObtenerRolResponse } from '../../../../core/models/Rol/ObtenerRol/ObtenerRolResponse';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-rol-minicard-component',
  imports: [
    MatListModule
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class MinicardRolComponent {

  @Input() RolFiltrados: ObtenerRolResponse[] = [];

}
