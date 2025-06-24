import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObtenerPersonalResponse } from '../../../core/models/Personal/obtenerPersonal/obtenerPersonalResponse';
import { ObtenerPersonalRequest } from '../../../core/models/Personal/obtenerPersonal/obtenerPersonalRequest';
import { PersonalService } from '../../../core/services/personal.service';
import { RolService } from '../../../core/services/rol.service';
import { ObtenerRolResponse } from '../../../core/models/Rol/ObtenerRol/ObtenerRolResponse';
import { AgregarEditarPersonalComponent } from './agregar-editar-personal/agregar-editar-personal.component';
import Swal from 'sweetalert2';

// pruebita-
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

//-

import { AsignarEncargadoSucursalComponent } from './asignar-encargado-sucursal/asignar-encargado-sucursal.component';
import { ObtenerMenuRolResponse } from '../../../core/models/Rol/obtenerMenuRol/obtenerMenuRolResponse';
import { MinicardPersonalComponent } from '../../components/minicard/personal/personal.component';

@Component({
  selector: 'app-personal',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,   // PRUEBITA
    MatInputModule,  // PRUEBITA
    MinicardPersonalComponent
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

  Roles: ObtenerMenuRolResponse[] = []

  //pruebita-
  busquedaControl = new FormControl('');
  PersonalesFiltrados: ObtenerPersonalResponse[] = [];
  //-

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
      rol: [0, Validators.required],
    });
  }

  /*
  ngOnInit(): void {
    this.obtenerPersonal();
    this.ObtenerRoles();
  }

  */

  //pruebita

  ngOnInit(): void {
  this.obtenerPersonal();
  this.ObtenerRoles();

  this.busquedaControl.valueChanges.pipe(debounceTime(200)).subscribe(valor => {
    const filtro = valor?.toLowerCase().trim() || '';

    // Filtro para la tabla
    this.dataSource.filter = filtro;

    // Filtro para tarjetas móviles
    this.PersonalesFiltrados = this.Personales.filter(p =>
      Object.values(p).some(val =>
        String(val).toLowerCase().includes(filtro)
      )
    );
  });
}
//-

/*
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
*/

  //pruebita-
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;

  this.dataSource.filterPredicate = (data, filtro) => {
    return Object.values(data).some(val =>
      String(val).toLowerCase().includes(filtro)
    );
  };
}
//-

  ObtenerRoles() {
    this.rolServi.ObtenerMenuRol('').subscribe((roles) => {
      this.Roles = roles;
    });
  }
  
  /*
  obtenerPersonal() {
    var obtenerPersonal: ObtenerPersonalRequest = {
      codigoPersonal: this.formulario.get('codPersonal')?.value,
      numeroDocumento: this.formulario.get('nroDoru')?.value,
      nombre: this.formulario.get('nombre')?.value,
      idRol: this.formulario.get('rol')?.value,
    }
    this.persServi.ObtenerPersonal(obtenerPersonal).subscribe((personal) => {
      console.log("personal", personal)
      this.Personales = personal;
      this.dataSource.data = this.Personales;
    });
  }
  */

  //pruebita
  obtenerPersonal() {
  const obtenerPersonal: ObtenerPersonalRequest = {
    codigoPersonal: this.formulario.get('codPersonal')?.value,
    numeroDocumento: this.formulario.get('nroDoru')?.value,
    nombre: this.formulario.get('nombre')?.value,
    idRol: this.formulario.get('rol')?.value,
  };

  this.persServi.ObtenerPersonal(obtenerPersonal).subscribe((personal) => {
    console.log("personal", personal);
    this.Personales = personal;
    this.dataSource.data = this.Personales;
    this.PersonalesFiltrados = [...this.Personales]; // Para tarjetas móviles
  });
}
//-

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
    var personal = this.Personales.find(x => x.id == idPersonal);
    var texto = ''
    personal?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';

    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de ${texto} el personal?`,
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
