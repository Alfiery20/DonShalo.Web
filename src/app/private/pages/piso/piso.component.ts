import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { ObtenerPisoRequest } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoRequest';
import { ObtenerPisoResponse } from '../../../core/models/Piso/ObtenerPiso/obtenerPisoResponse';
import { ObtenerMenuSucursalResponse } from '../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';

import { PisoService } from '../../../core/services/piso.service';
import { SucursalService } from '../../../core/services/sucursal.service';

import { AgregarEditarPisoComponent } from './agregar-editar-piso/agregar-editar-piso.component';
import { MinicardPisoComponent } from '../../components/minicard/piso/piso.component';

@Component({
  selector: 'app-piso',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MinicardPisoComponent
  ],
  templateUrl: './piso.component.html',
  styleUrl: './piso.component.scss'
})
export class PisoComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  pisos: ObtenerPisoResponse[] = [];
  PisoFiltrados: ObtenerPisoResponse[] = [];
  Sucursales: ObtenerMenuSucursalResponse[] = [];

  formulario: FormGroup;
  busquedaControl: FormControl = new FormControl('');

  displayedColumns: string[] = [
    'Nro',
    'Id',
    'Nombre',
    'CapaciCliente',
    'CapaciPerson',
    'Sucursal',
    'Estado',
    'Accion'
  ];

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
      sucursal: ['0', Validators.required]  // usamos nombre, no id
    });
  }

  ngOnInit(): void {
    this.ObtenerSucursal();
    this.ObtenerPiso();

    this.busquedaControl.valueChanges.subscribe(() => {
      this.filtrarResultados();
    });

    this.formulario.get('sucursal')?.valueChanges.subscribe(() => {
      this.filtrarResultados();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ObtenerPiso(): void {
    const obtenerPiso: ObtenerPisoRequest = {
      termino: this.formulario.get('nombre')?.value,
      idSucursal: 0 // ya no usamos idSucursal, pero lo enviamos por compatibilidad
    };

    this.pisoServ.ObtenerPiso(obtenerPiso).subscribe(pisos => {
      this.pisos = pisos;
      this.PisoFiltrados = [...pisos];
      this.dataSource.data = [...pisos];
    });
  }

  ObtenerSucursal(): void {
    this.sucService.ObtenerMenuSucursal('').subscribe(response => {
      this.Sucursales = response;
    });
  }

  AgregarPiso(): void {
    const modalAbierto = this.dialog.open(AgregarEditarPisoComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerPiso();
    });
  }

  EditarPiso(id: number): void {
    const modalAbierto = this.dialog.open(AgregarEditarPisoComponent, {
      width: '400px',
      data: { id },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerPiso();
    });
  }

  EliminarPiso(id: number): void {
    const piso = this.pisos.find(x => x.id === id);
    const texto = piso?.estado.startsWith('A') ? 'eliminar' : 'activar';

    Swal.fire({
      title: '¡Atención!',
      text: `¿Está seguro de ${texto} el piso?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'var(--color-principal)',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        this.pisoServ.EliminarPiso(id).subscribe(response => {
          if (response?.codigo === 'OK') {
            this.ObtenerPiso();
            Swal.fire({
              title: response.mensaje,
              icon: 'success',
              confirmButtonColor: 'var(--color-principal)',
            });
          } else {
            Swal.fire({
              title: response.mensaje,
              icon: 'error',
              confirmButtonColor: 'var(--color-principal)',
            });
          }
        }, () => {
          Swal.fire({
            title: 'Ocurrió un error, comuníquese con soporte técnico',
            icon: 'error',
            confirmButtonColor: 'var(--color-principal)',
          });
        });
      }
    });
  }

  private filtrarResultados(): void {
    const filtroTexto = this.busquedaControl.value?.toLowerCase().trim() || '';
    const sucursalSeleccionada = this.formulario.get('sucursal')?.value;

    this.PisoFiltrados = this.pisos.filter(p => {
      const coincideTexto =
        p.nombre.toLowerCase().includes(filtroTexto) ||
        p.estado.toLowerCase().includes(filtroTexto) ||
        p.sucursal.toLowerCase().includes(filtroTexto);

      const coincideSucursal =
        sucursalSeleccionada === '0' || p.sucursal === sucursalSeleccionada;

      return coincideTexto && coincideSucursal;
    });

    this.dataSource.data = this.PisoFiltrados;
  }
}
