import { Component, Input } from '@angular/core';
import { ObtenerPisoResponse } from '../../../../core/models/Piso/ObtenerPiso/obtenerPisoResponse';
import { MatListModule } from '@angular/material/list'

@Component({
  selector: 'app-piso-minicard-component',
  imports: [
    MatListModule
  ],
  templateUrl: './piso.component.html',
  styleUrl: './piso.component.scss'
})
export class MinicardPisoComponent {

  @Input() PisoFiltrados: ObtenerPisoResponse[] = [];

}
