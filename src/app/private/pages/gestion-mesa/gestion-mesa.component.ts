import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObtenerMesaResponse } from '../../../core/models/Mesa/ObtenerMesa/ObtenerMesaResponse';
import { ObtenerPisoResponse } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoResponse';
import { ObtenerMenuSucursalResponse } from '../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MesaService } from '../../../core/services/mesa.service';
import { PisoService } from '../../../core/services/piso.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { ObtenerPisoRequest } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoRequest';
import { ObtenerEstadoMesaResponse } from '../../../core/models/Mesa/ObtenerEstadoMesa/ObtenerEstadoMesaResponse';

@Component({
  selector: 'app-gestion-mesa',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './gestion-mesa.component.html',
  styleUrl: './gestion-mesa.component.scss'
})
export class GestionMesaComponent implements OnInit {

  formulario: FormGroup;

  pisos: ObtenerPisoResponse[] = []
  Sucursales: ObtenerMenuSucursalResponse[] = []

  estadoMesas: ObtenerEstadoMesaResponse[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private pisoServ: PisoService,
    private sucService: SucursalService,
    private mesaServie: MesaService
  ) {
    this.formulario = this.fb.group({
      sucursal: [0, Validators.required],
      piso: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.ObtenerSucursal();
  }

  ObtenerSucursal() {
    this.sucService.ObtenerMenuSucursal('').subscribe((response) => {
      this.Sucursales = response
    })
  }

  ObtenerPiso(event: any) {
    const id = event.target.value;
    const obtenerPiso: ObtenerPisoRequest = {
      termino: '',
      idSucursal: Number(id),
    };
    this.pisoServ.ObtenerPiso(obtenerPiso).subscribe((pisos) => {
      this.pisos = pisos;
    });
  }

  ObtenerEstadoMesa(event: any) {
    const idPiso = event.target.value;

    this.mesaServie.ObtenerEstadoMesa(idPiso).subscribe((estados) => {
      this.estadoMesas = estados;
    });
  }

  VerPedido(idMesa: number) {

  }

  retornarColor(estado: number) {
    switch (estado) {
      case 0:
        return '#27a348'; //verde
      case 1:
        return 'var(--color-principal)';
      case 2:
        return 'var(--color-secundario)';
      default:
        return '#27a348';
    }
  }

}
