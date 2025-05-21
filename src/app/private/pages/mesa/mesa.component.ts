import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ObtenerMenuSucursalResponse } from '../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { ObtenerPisoResponse } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoResponse';
import { PisoService } from '../../../core/services/piso.service';
import { SucursalService } from '../../../core/services/sucursal.service';
import { ObtenerPisoRequest } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoRequest';
import { CommonModule } from '@angular/common';
import { MesaService } from '../../../core/services/mesa.service';
import { ObtenerMesaRequest } from '../../../core/models/Mesa/ObtenerMesa/ObtenerMesaRequest';
import { ObtenerMesaResponse } from '../../../core/models/Mesa/ObtenerMesa/ObtenerMesaResponse';
import { AgregarEditarMesaComponent } from './agregar-editar-mesa/agregar-editar-mesa.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './mesa.component.html',
  styleUrl: './mesa.component.scss'
})
export class MesaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  Piso: ObtenerPisoResponse[] = []

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'Numero',
      'Capacidad',
      'Piso',
      'Sucursal',
      'Estado',
      'Accion'
    ];

  mesas: ObtenerMesaResponse[] = []
  pisos: ObtenerPisoResponse[] = []
  Sucursales: ObtenerMenuSucursalResponse[] = []

  dataSource = new MatTableDataSource<ObtenerMesaResponse>(this.mesas);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private pisoServ: PisoService,
    private sucService: SucursalService,
    private mesaServie: MesaService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      sucursal: [0, Validators.required],
      piso: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.ObtenerSucursal()
    this.ObtenerMesa()
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

  ObtenerMesa() {
    var request: ObtenerMesaRequest = {
      termino: this.formulario.get('nombre')?.value,
      idSucursal: this.formulario.get('sucursal')?.value,
      idPiso: this.formulario.get('piso')?.value,
    }
    this.mesaServie.ObtenerMesa(request).subscribe((response) => {
      this.mesas = response
      this.dataSource.data = this.mesas;
    })
  }

  AgregarMesa() {
    var modalAbierto = this.dialog.open(AgregarEditarMesaComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerMesa();
    });
  }

  EditarMesa(idMesa: number) {
    var modalAbierto = this.dialog.open(AgregarEditarMesaComponent, {
      width: '400px',
      data: { id: idMesa },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerMesa();
    });
  }

  EliminarMesa(idMesa: number) {
    var mesa = this.mesas.find(x => x.id == idMesa);
    var texto = ''
    mesa?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';

    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de ${texto} el piso?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.mesaServie.EliminarMesa(idMesa).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.ObtenerMesa();
              Swal.fire({
                title: response.mensaje,
                icon: "success",
                confirmButtonColor: "var(--color-principal)",
              });
            } else {
              Swal.fire({
                title: response.mensaje,
                icon: "error",
                confirmButtonColor: "var(--color-principal)",
              });
            }
          },
          (error) => {
            Swal.fire({
              title: "Ocurrio un error, comunicarse con servicio tecnico",
              icon: "error",
              confirmButtonColor: "var(--color-principal)",
            });
          }
        )
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
