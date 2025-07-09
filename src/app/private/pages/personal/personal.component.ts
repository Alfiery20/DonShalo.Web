import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormsModule } from '@angular/forms';
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
import { debounceTime } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsignarEncargadoSucursalComponent } from './asignar-encargado-sucursal/asignar-encargado-sucursal.component';
import { ObtenerMenuRolResponse } from '../../../core/models/Rol/obtenerMenuRol/obtenerMenuRolResponse';
import { MinicardPersonalComponent } from '../../components/minicard/personal/personal.component';
import { SucursalService } from '../../../core/services/sucursal.service';
import { ObtenerMenuSucursalResponse } from '../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MinicardPersonalComponent
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] = [
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

  Personales: ObtenerPersonalResponse[] = [];
  PersonalesFiltrados: ObtenerPersonalResponse[] = [];
  dataSource = new MatTableDataSource<ObtenerPersonalResponse>(this.Personales);

  Roles: ObtenerMenuRolResponse[] = [];
  Sucursales: ObtenerMenuSucursalResponse[] = [];

  busquedaControl = new FormControl('');

  criterioSeleccionado: string = '';
  opcionesFiltro: string[] = [];
  valorSeleccionado: string = '';

  tipoDocumentoOpciones: string[] = ['DNI', 'Carnet de Extranjeria', 'Pasaporte'];
  estadoOpciones: string[] = ['Activo', 'Inactivo'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private persServi: PersonalService,
    private rolServi: RolService,
    private sucursalServi: SucursalService
  ) {
    this.formulario = this.fb.group({
      codPersonal: ['', Validators.required],
      nroDoru: ['', Validators.required],
      nombre: ['', Validators.required],
      rol: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerPersonal();
    this.ObtenerRoles();
    this.ObtenerSucursales();

    this.busquedaControl.valueChanges.pipe(debounceTime(200)).subscribe(valor => {
      const filtro = valor?.toLowerCase().trim() || '';
      this.dataSource.filter = filtro;

      this.PersonalesFiltrados = this.Personales.filter(p =>
        Object.values(p).some(val =>
          String(val).toLowerCase().includes(filtro)
        )
      );
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data, filtro) => {
      return Object.values(data).some(val =>
        String(val).toLowerCase().includes(filtro)
      );
    };
  }

  ObtenerRoles() {
    this.rolServi.ObtenerMenuRol('').subscribe((roles) => {
      this.Roles = roles;
    });
  }

  ObtenerSucursales() {
    this.sucursalServi.ObtenerMenuSucursal('').subscribe((sucs) => {
      this.Sucursales = sucs;
    });
  }

  obtenerPersonal() {
    const obtenerPersonal: ObtenerPersonalRequest = {
      codigoPersonal: this.formulario.get('codPersonal')?.value,
      numeroDocumento: this.formulario.get('nroDoru')?.value,
      nombre: this.formulario.get('nombre')?.value,
      idRol: this.formulario.get('rol')?.value,
    };

    this.persServi.ObtenerPersonal(obtenerPersonal).subscribe((personal) => {
      this.Personales = personal;
      this.dataSource.data = [...this.Personales];
      this.PersonalesFiltrados = [...this.Personales];
    });
  }

  actualizarOpcionesFiltro() {
    switch (this.criterioSeleccionado) {
      case 'tipoDocumento':
        this.opcionesFiltro = this.tipoDocumentoOpciones;
        break;
      case 'estado':
        this.opcionesFiltro = this.estadoOpciones;
        break;
      case 'rol':
        this.opcionesFiltro = this.Roles.map(r => r.nombre);
        break;
      case 'sucursal':
        this.opcionesFiltro = this.Sucursales.map(s => s.nombre);
        break;
      default:
        this.opcionesFiltro = [];
    }

    this.valorSeleccionado = '';
  }

  filtrarPorCriterio() {
    const criterio = this.criterioSeleccionado;
    const valor = this.valorSeleccionado;

    if (!criterio || !valor) {
      this.PersonalesFiltrados = [...this.Personales];
      this.dataSource.data = this.PersonalesFiltrados;
      return;
    }

    this.PersonalesFiltrados = this.Personales.filter(p => {
      if (criterio === 'tipoDocumento') return p.tipoDocumento === valor;
      if (criterio === 'estado') return p.estado === valor;
      if (criterio === 'rol') return p.rol === valor;
      if (criterio === 'sucursal') return p.sucursal === valor;
      return false;
    });

    this.dataSource.data = this.PersonalesFiltrados;
  }

  AgregarPersonal() {
    const modalAbierto = this.dialog.open(AgregarEditarPersonalComponent, {
      maxWidth: '750px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerRoles();
      this.obtenerPersonal();
    });
  }

  EditarPersonal(idPersonal: number) {
    const modalAbierto = this.dialog.open(AgregarEditarPersonalComponent, {
      maxWidth: '750px',
      data: { id: idPersonal },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
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
          () => {
            Swal.fire({
              title: "Ocurrió un error, comuníquese con soporte técnico",
              icon: "error",
              confirmButtonColor: "var(--color-principal)",
            });
          }
        );
      }
    });
  }

  EliminarPersonal(idPersonal: number) {
    const personal = this.Personales.find(x => x.id == idPersonal);
    const texto = personal?.estado.substring(0, 1) == 'A' ? 'eliminar' : 'activar';

    Swal.fire({
      title: "¡Atención!",
      text: `¿Está seguro de ${texto} el personal?`,
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
          () => {
            Swal.fire({
              title: "Ocurrió un error, comuníquese con soporte técnico",
              icon: "error",
              confirmButtonColor: "var(--color-principal)",
            });
          }
        );
      }
    });
  }
}
