import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerPisoRequest } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoRequest';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SucursalService } from '../../../core/services/sucursal.service';
import { PisoService } from '../../../core/services/piso.service';
import { ObtenerPisoResponse } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoResponse';
import { CommonModule } from '@angular/common';
import { AgregarEditarPisoComponent } from './agregar-editar-piso/agregar-editar-piso.component';
import { ObtenerMenuSucursalResponse } from '../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-piso',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './piso.component.html',
  styleUrl: './piso.component.scss'
})
export class PisoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  Piso: ObtenerPisoResponse[] = []

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'Nombre',
      'CapaciCliente',
      'CapaciPerson',
      'Sucursal',
      'Estado',
      'Accion'
    ];

  pisos: ObtenerPisoResponse[] = []
  Sucursales: ObtenerMenuSucursalResponse[] = []

  dataSource = new MatTableDataSource<ObtenerPisoResponse>(this.pisos);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private pisoServ: PisoService,
    private sucService: SucursalService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      sucursal: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.ObtenerSucursal()
    this.ObtenerPiso();
  }

  ObtenerPiso() {
    var obtenerPiso: ObtenerPisoRequest = {
      termino: this.formulario.get('nombre')?.value,
      idSucursal: this.formulario.get('sucursal')?.value,
    }
    this.pisoServ.ObtenerPiso(obtenerPiso).subscribe((pisos) => {
      this.pisos = pisos;
      this.dataSource.data = this.pisos;
    });
  }

  ObtenerSucursal() {
    this.sucService.ObtenerMenuSucursal('').subscribe((response) => {
      this.Sucursales = response
    })
  }

  AgregarPiso() {
    var modalAbierto = this.dialog.open(AgregarEditarPisoComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerPiso();
    });
  }

  EditarPiso(idCategoria: number) {
    var modalAbierto = this.dialog.open(AgregarEditarPisoComponent, {
      width: '400px',
      data: { id: idCategoria },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerPiso();
    });
  }

  EliminarPiso(idPiso: number) {
    var piso = this.pisos.find(x => x.id == idPiso);
    var texto = ''
    piso?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';

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
        this.pisoServ.EliminarPiso(idPiso).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.ObtenerPiso();
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
