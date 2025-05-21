import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerRolResponse } from '../../../core/models/Rol/ObtenerRol/ObtenerRolResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonalService } from '../../../core/services/personal.service';
import { RolService } from '../../../core/services/rol.service';
import { AgregarEditarRolComponent } from './agregar-editar-rol/agregar-editar-rol.component';
import Swal from 'sweetalert2';
import { AgregarMenuRolComponent } from './agregar-menu-rol/agregar-menu-rol.component';
import { ActualizarPermisoRequest } from '../../../core/models/Rol/actualizarPermiso/actualizarPermisoRequest';

@Component({
  selector: 'app-rol',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent {

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
  roles: ObtenerRolResponse[] = []
  dataSource = new MatTableDataSource<ObtenerRolResponse>(this.roles);

  rolSeleccionado: ObtenerRolResponse = {} as ObtenerRolResponse;
  Roles: ObtenerRolResponse[] = []

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
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  obtenerRoles() {
    var termino = this.formulario.get('nombre')?.value
    this.rolServi.ObtenerRol(termino).subscribe((rol) => {
      this.roles = rol;
      this.dataSource.data = this.roles;
    });
  }

  AgregarRol() {
    var modalAbierto = this.dialog.open(AgregarEditarRolComponent, {
      maxWidth: '750px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      // this.formulario.reset();
      this.obtenerRoles();
    });
  }

  EditarRol(idPersonal: number) {
    var modalAbierto = this.dialog.open(AgregarEditarRolComponent, {
      maxWidth: '750px',
      data: { id: idPersonal },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      // this.formulario.reset();
      this.obtenerRoles();
    });
  }

  EliminarRol(idrol: number) {
    var rol = this.roles.find(x => x.id == idrol);
    var texto = ''
    rol?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';
    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de ${texto} el rol?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolServi.EliminarRol(idrol).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.obtenerRoles();
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

  AgregarPermisoRol(idPersonal: number) {
    var modalAbierto = this.dialog.open(AgregarMenuRolComponent, {
      maxWidth: '750px',
      data: { id: idPersonal },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      // this.formulario.reset();
      this.obtenerRoles();
    });
  }
}
