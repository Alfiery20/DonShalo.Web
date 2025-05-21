import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SucursalService } from '../../../core/services/sucursal.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarSucursalComponent } from './agregar-editar-sucursal/agregar-editar-sucursal.component';
import Swal from 'sweetalert2';
import { ObtenerSucursalResponse } from '../../../core/models/Sucursal/obtenerSucursal/ObtenerSucursalResponse';

@Component({
  selector: 'app-sucursal',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export class SucursalComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'CodSuc',
      'Nombre',
      'Direcc',
      'Telef',
      'HoraEntr',
      'HoraSal',
      'Estado',
      'Respo',
      'Accion'
    ];
  Sucursales: ObtenerSucursalResponse[] = []
  dataSource = new MatTableDataSource<ObtenerSucursalResponse>(this.Sucursales);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private sucursaService: SucursalService,
  ) {
    this.formulario = this.fb.group({
      sucursal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.buscarSucursal('');
  }

  buscarSucursalPorNombre() {
    const nombre = this.formulario.get('sucursal')?.value ?? '';
    this.buscarSucursal(nombre);
  }

  buscarSucursal(termino: string) {
    this.sucursaService.ObtenerSucursal(termino).subscribe((sucursales) => {
      this.Sucursales = sucursales;
      this.dataSource.data = this.Sucursales;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  AgregarSucursal() {
    var modalAbierto = this.dialog.open(AgregarEditarSucursalComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.buscarSucursal('');
    });
  }

  EditarSucursal(idCategoria: number) {
    var modalAbierto = this.dialog.open(AgregarEditarSucursalComponent, {
      width: '400px',
      data: { id: idCategoria },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.buscarSucursal('');
    });
  }

  EliminarSucursal(idSucursal: number) {
    var sucursal = this.Sucursales.find(x => x.id == idSucursal);
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
        this.sucursaService.EliminarSucursal(idSucursal).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.buscarSucursal('');
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

  convertToDate(timeString: string): Date {
    return new Date(`1970-01-01T${timeString}`);
  }

}
