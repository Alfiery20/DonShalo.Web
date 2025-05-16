import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerSucursalRequest } from '../../../core/models/obtenerSucursal/ObtenerSucursalResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObtenerPersonalResponse } from '../../../core/models/obtenerPersonal/obtenerPersonalResponse';
import { ObtenerPersonalRequest } from '../../../core/models/obtenerPersonal/obtenerPersonalRequest';
import { PersonalService } from '../../../core/services/personal.service';
import { RolService } from '../../../core/services/rol.service';
import { ObtenerRolResponse } from '../../../core/models/ObtenerRol/ObtenerRolResponse';
import { AgregarEditarPersonalComponent } from './agregar-editar-personal/agregar-editar-personal.component';
import Swal from 'sweetalert2';
import { AsignarEncargadoSucursalComponent } from './asignar-encargado-sucursal/asignar-encargado-sucursal.component';
import { ObtenerMenuRolResponse } from '../../../core/models/obtenerMenuRol/obtenerMenuRolResponse';

@Component({
  selector: 'app-personal',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'TipoDoc',
      'NumDoc',
      'Nombre',
      'Telef',
      'Correo',
      'Estado',
      'Rol',
      'Sucursal',
      'Accion',
    ];
  Personales: ObtenerPersonalResponse[] = []
  dataSource = new MatTableDataSource<ObtenerPersonalResponse>(this.Personales);

  rolSeleccionado: ObtenerMenuRolResponse = {} as ObtenerMenuRolResponse;
  Roles: ObtenerMenuRolResponse[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private persServi: PersonalService,
    private rolServi: RolService,
  ) {
    this.formulario = this.fb.group({
      codPersonal: ['', Validators.required],
      nroDoru: ['', Validators.required],
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerPersonal();
    this.ObtenerRoles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ObtenerRoles() {
    this.rolSeleccionado = {} as ObtenerRolResponse;
    var terminoRol = this.formulario.get('rol')?.value ?? '';
    this.rolServi.ObtenerMenuRol(terminoRol).subscribe((roles) => {
      this.Roles = roles;
    });
  }

  obtenerPersonal() {
    var obtenerPersonal: ObtenerPersonalRequest = {
      codigoPersonal: this.formulario.get('codPersonal')?.value,
      numeroDocumento: this.formulario.get('nroDoru')?.value,
      nombre: this.formulario.get('nombre')?.value,
      idRol: this.rolSeleccionado.id ?? 0,
    }
    this.persServi.ObtenerPersonal(obtenerPersonal).subscribe((personal) => {
      this.Personales = personal;
      this.dataSource.data = this.Personales;
    });
  }

  setearRolSeleccionado(rol: ObtenerMenuRolResponse) {
    this.rolSeleccionado = rol;
    this.formulario.get('rol')?.setValue(rol.nombre);
  }

  AgregarPersonal() {
    var modalAbierto = this.dialog.open(AgregarEditarPersonalComponent, {
      maxWidth: '750px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      // this.formulario.reset();
      this.ObtenerRoles();
      this.obtenerPersonal();
    });
  }

  EditarPersonal(idPersonal: number) {
    var modalAbierto = this.dialog.open(AgregarEditarPersonalComponent, {
      maxWidth: '750px',
      data: { id: idPersonal },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      // this.formulario.reset();
      this.ObtenerRoles();
      this.obtenerPersonal();
    });
  }

  AsignarReponsableSede(idPersonal: number) {
    Swal.fire({
      title: "¡Atención!",
      text: "¿Esta seguro de designar como responsable de sede?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.persServi.AsignarResponsable(idPersonal).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.obtenerPersonal();
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

  EliminarPersonal(idPersonal: number) {
    Swal.fire({
      title: "¡Atención!",
      text: "¿Esta seguro de de eliminar el personal?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.persServi.EliminarPersonal(idPersonal).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.obtenerPersonal();
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
