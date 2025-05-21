import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerSucursalResponse } from '../../../core/models/Sucursal/obtenerSucursal/ObtenerSucursalResponse';
import { ObtenerMedioPagoResponse } from '../../../core/models/MedioPago/ObtenerMedioPago/ObtenerMedioPagoResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SucursalService } from '../../../core/services/sucursal.service';
import { MedioPagoService } from '../../../core/services/medio-pago.service';
import { AgregarEditarMedioPagoComponent } from './agregar-editar-medio-pago/agregar-editar-medio-pago.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mediopago',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './mediopago.component.html',
  styleUrl: './mediopago.component.scss'
})
export class MediopagoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'Nombre',
      'Estado',
      'Accion'
    ];
  mediosPagos: ObtenerMedioPagoResponse[] = []
  dataSource = new MatTableDataSource<ObtenerMedioPagoResponse>(this.mediosPagos);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private medioPagoServ: MedioPagoService,
  ) {
    this.formulario = this.fb.group({
      termino: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.buscarMedioPago();
  }

  buscarMedioPago() {
    var termino = this.formulario.value.termino
    this.medioPagoServ.ObtenerMedioPago(termino).subscribe((mediosPago) => {
      this.mediosPagos = mediosPago;
      this.dataSource.data = this.mediosPagos;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  AgregarSucursal() {
    var modalAbierto = this.dialog.open(AgregarEditarMedioPagoComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.buscarMedioPago();
    });
  }

  EditarSucursal(idCategoria: number) {
    var modalAbierto = this.dialog.open(AgregarEditarMedioPagoComponent, {
      width: '400px',
      data: { id: idCategoria },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.buscarMedioPago();
    });
  }

  EliminarSucursal(idMedioPago: number) {
    var sucursal = this.mediosPagos.find(x => x.id == idMedioPago);
    var texto = ''
    sucursal?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';

    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de ${texto} la sucursal?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.medioPagoServ.EliminarMedioPago(idMedioPago).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.buscarMedioPago();
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

}
