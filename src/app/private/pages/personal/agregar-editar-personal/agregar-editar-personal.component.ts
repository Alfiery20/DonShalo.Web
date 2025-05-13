import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { VerPersonalResponse } from '../../../../core/models/verPersonal/verPersonalResponse';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { AgregarEditarSucursalComponent } from '../../sucursal/agregar-editar-sucursal/agregar-editar-sucursal.component';
import { PersonalService } from '../../../../core/services/personal.service';
import { CommonModule } from '@angular/common';
import { ObtenerRolResponse } from '../../../../core/models/ObtenerRol/ObtenerRolResponse';
import { RolService } from '../../../../core/services/rol.service';
import { ObtenerMenuSucursalResponse } from '../../../../core/models/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { AgregarPersonalRequest } from '../../../../core/models/agregarPersonal/agregarPersonalRequest';
import Swal from 'sweetalert2';
import { EditarPersonalRequest } from '../../../../core/models/editarPersonal/editarPersonalRequest';

@Component({
  selector: 'app-agregar-editar-personal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-personal.component.html',
  styleUrl: './agregar-editar-personal.component.scss'
})
export class AgregarEditarPersonalComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  personal: VerPersonalResponse = {} as VerPersonalResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  rolSeleccionado: ObtenerRolResponse = {} as ObtenerRolResponse;
  Roles: ObtenerRolResponse[] = []
  sucursal: ObtenerMenuSucursalResponse[] = []

  sucursalSeleccionado: ObtenerMenuSucursalResponse = {} as ObtenerMenuSucursalResponse;

  constructor(
    private fb: FormBuilder,
    private modalAgregarPersonal: MatDialogRef<AgregarEditarSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private persoService: PersonalService,
    private rolServi: RolService,
    private sucServi: SucursalService,
  ) {
    this.formulario = this.fb.group({
      tipDoc: ['', Validators.required],
      nroDoc: ['', Validators.required],
      nombre: ['', Validators.required],
      apePat: ['', Validators.required],
      apeMat: ['', Validators.required],
      telef: ['', Validators.required],
      emeal: ['', Validators.required],
      clave: ['', Validators.required],
      rol: ['', Validators.required],
      sucursal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    this.ObtenerRoles();
    this.ObtenerSucursal();
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerPersonal(this.data.id);
    }
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarPersonal();
    } else {
      this.AgregarPersonal();
    }
  }

  AgregarPersonal() {
    var agregarPersonal: AgregarPersonalRequest = {
      tipoDocumento: this.formulario.value.tipDoc,
      numeroDocumento: this.formulario.value.nroDoc,
      nombre: this.formulario.value.nombre,
      apellidoPaterno: this.formulario.value.apePat,
      apellidoMaterno: this.formulario.value.apeMat,
      telefono: this.formulario.value.telef,
      correo: this.formulario.value.emeal,
      clave: this.formulario.value.clave,
      idRol: this.rolSeleccionado.id,
      idSucursal: this.sucursalSeleccionado.id
    }
    this.persoService.AgregarPersonal(agregarPersonal).subscribe(
      (response) => {
        if (response != null && response.codigo == 'OK') {
          this.CerrarModal();
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
    );
  }

  EditarPersonal() {
    var editarPersonal: EditarPersonalRequest = {
      id: this.data.id,
      nombre: this.formulario.value.nombre,
      apellidoPaterno: this.formulario.value.apePat,
      apellidoMaterno: this.formulario.value.apeMat,
      telefono: this.formulario.value.telef,
      correo: this.formulario.value.emeal,
      idRol: this.rolSeleccionado.id,
      idSucursal: this.sucursalSeleccionado.id
    }
    this.persoService.EditarPersonal(editarPersonal).subscribe(
      (response) => {
        if (response != null && response.codigo == 'OK') {
          this.CerrarModal();
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
    );
  }

  ObtenerRoles() {
    this.rolSeleccionado = {} as ObtenerRolResponse;
    var terminoRol = this.formulario.get('rol')?.value ?? '';
    this.rolServi.ObtenerRol(terminoRol).subscribe((roles) => {
      this.Roles = roles;
    });
  }

  ObtenerPersonal(id: number) {
    this.persoService.VerPersonal(id).subscribe((response) => {
      this.personal = response;
      this.formulario.setValue({
        tipDoc: this.personal.tipoDocumento,
        nroDoc: this.personal.numeroDocumento,
        nombre: this.personal.nombre,
        apePat: this.personal.apellidoPaterno,
        apeMat: this.personal.apellidoMaterno,
        telef: this.personal.telefono,
        emeal: this.personal.correo,
        clave: '',
        rol: '',
        sucursal: ''
      });
      this.Roles.forEach((rol) => {
        if (rol.id == this.personal.rol) {
          this.rolSeleccionado = rol;
          this.formulario.get('rol')?.setValue(rol.nombre);
        }
      })
      this.sucursal.forEach((sucursal) => {
        if (sucursal.id == this.personal.sucursal) {
          this.sucursalSeleccionado = sucursal;
          this.formulario.get('sucursal')?.setValue(sucursal.nombre);
        }
      })
    });
  }

  ObtenerSucursal() {
    var terminoSucursal = this.formulario.get('sucursal')?.value ?? '';
    this.sucServi.ObtenerMenuSucursal(terminoSucursal).subscribe((response) => {
      this.sucursal = response
    })
  }

  setearRolSeleccionado(rol: ObtenerRolResponse) {
    this.rolSeleccionado = rol;
    this.formulario.get('rol')?.setValue(rol.nombre);
  }

  setearSucursalSeleccionado(rol: ObtenerMenuSucursalResponse) {
    this.sucursalSeleccionado = rol;
    this.formulario.get('sucursal')?.setValue(rol.nombre);
  }

  CerrarModal() {
    this.modalAgregarPersonal.close();
    this.onClose.emit();
  }
}
