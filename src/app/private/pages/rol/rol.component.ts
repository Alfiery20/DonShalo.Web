import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerRolResponse } from '../../../core/models/Rol/ObtenerRol/ObtenerRolResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RolService } from '../../../core/services/rol.service';
import { AgregarEditarRolComponent } from './agregar-editar-rol/agregar-editar-rol.component';
import Swal from 'sweetalert2';
import { AgregarMenuRolComponent } from './agregar-menu-rol/agregar-menu-rol.component';
import { MinicardRolComponent } from '../../components/minicard/rol/rol.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MinicardRolComponent
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;
  busquedaControl: FormControl = new FormControl('');

  displayedColumns: string[] = [
    'Nro',
    'Id',
    'Nombre',
    'Estado',
    'Accion'
  ];

  roles: ObtenerRolResponse[] = [];
  dataSource = new MatTableDataSource<ObtenerRolResponse>(this.roles);
  RolFiltrados: ObtenerRolResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private rolServi: RolService,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerRoles();

    this.busquedaControl.valueChanges.subscribe(valor => {
      const filtro = (valor || '').toLowerCase();
      this.RolFiltrados = this.roles.filter(rol =>
        rol.nombre.toLowerCase().includes(filtro) ||
        rol.estado.toLowerCase().includes(filtro)
      );
      this.dataSource.data = this.RolFiltrados;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerRoles(): void {
    const termino = this.formulario.get('nombre')?.value;
    this.rolServi.ObtenerRol(termino).subscribe((rol) => {
      this.roles = rol;
      this.dataSource.data = this.roles;
      this.RolFiltrados = this.roles;
    });
  }

  AgregarRol(): void {
    const modalAbierto = this.dialog.open(AgregarEditarRolComponent, {
      maxWidth: '750px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.obtenerRoles();
    });
  }

  EditarRol(idRol: number): void {
    const modalAbierto = this.dialog.open(AgregarEditarRolComponent, {
      maxWidth: '750px',
      data: { id: idRol },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.obtenerRoles();
    });
  }

  EliminarRol(idRol: number): void {
    const rol = this.roles.find(x => x.id === idRol);
    const texto = rol?.estado.startsWith('A') ? 'eliminar' : 'activar';

    Swal.fire({
      title: '¡Atención!',
      text: `¿Está seguro de ${texto} el rol?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'var(--color-principal)',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolServi.EliminarRol(idRol).subscribe(
          (response) => {
            if (response && response.codigo === 'OK') {
              this.obtenerRoles();
              Swal.fire({
                title: response.mensaje,
                icon: 'success',
                confirmButtonColor: 'var(--color-principal)',
              });
            } else {
              Swal.fire({
                title: response?.mensaje || 'Error inesperado',
                icon: 'error',
                confirmButtonColor: 'var(--color-principal)',
              });
            }
          },
          () => {
            Swal.fire({
              title: 'Ocurrió un error, comuníquese con soporte técnico',
              icon: 'error',
              confirmButtonColor: 'var(--color-principal)',
            });
          }
        );
      }
    });
  }

  AgregarPermisoRol(idRol: number): void {
    const modalAbierto = this.dialog.open(AgregarMenuRolComponent, {
      maxWidth: '750px',
      data: { id: idRol },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.obtenerRoles();
    });
  }
}
