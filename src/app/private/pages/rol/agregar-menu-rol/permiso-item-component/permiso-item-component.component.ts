import { Component, Input } from '@angular/core';
import { ObtenerMenuXRolResponse } from '../../../../../core/models/Rol/obtenerMenuXRol/obtenerMenuXRolResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permiso-item-component',
  imports: [
    CommonModule
  ],
  standalone: true,
  templateUrl: './permiso-item-component.component.html',
  styleUrl: './permiso-item-component.component.scss'
})
export class PermisoItemComponentComponent {
  @Input() item:ObtenerMenuXRolResponse = {} as ObtenerMenuXRolResponse;
  @Input() nivel:number = 0;
  @Input() actualizarPermiso!: (id: number, estado: boolean) => void;

  onCheckboxChange()
  {
    this.item.permiso = !this.item.permiso;
    this.actualizarPermiso(this.item.id, this.item.permiso);
  }
}
