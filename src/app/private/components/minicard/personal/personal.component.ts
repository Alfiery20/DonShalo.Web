import { Component, Input } from '@angular/core';
import { ObtenerPersonalResponse } from '../../../../core/models/Personal/obtenerPersonal/obtenerPersonalResponse';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-personal-minicard-component',
  imports: [
    MatListModule
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class MinicardPersonalComponent {

  @Input() PersonalesFiltrados: ObtenerPersonalResponse[] = [];

}
