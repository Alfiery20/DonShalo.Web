import { Component, Input } from '@angular/core';
import { ObtenerSucursalResponse } from '../../../../core/models/Sucursal/obtenerSucursal/ObtenerSucursalResponse';

@Component({
  selector: 'app-sucursal-minicard-component',
  imports: [],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export class SucursalMinicardComponent {

  @Input() FilteredSucursales: ObtenerSucursalResponse[] = [];

}
