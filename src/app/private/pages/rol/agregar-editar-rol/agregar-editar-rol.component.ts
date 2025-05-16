import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { VerRolResponse } from '../../../../core/models/verRol/verRolResponse';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalService } from '../../../../core/services/personal.service';
import { RolService } from '../../../../core/services/rol.service';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { AgregarEditarSucursalComponent } from '../../sucursal/agregar-editar-sucursal/agregar-editar-sucursal.component';
import { CommonModule } from '@angular/common';
import { EditarRolRequest } from '../../../../core/models/editarRol/editarRolRequest';
import Swal from 'sweetalert2';
import { AgregarRolRequest } from '../../../../core/models/agregarRol/agregarRolRequest';

@Component({
  selector: 'app-agregar-editar-rol',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-rol.component.html',
  styleUrl: './agregar-editar-rol.component.scss'
})
export class AgregarEditarRolComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  personal: VerRolResponse = {} as VerRolResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';
  constructor(
    private fb: FormBuilder,
    private modalAgregarPersonal: MatDialogRef<AgregarEditarRolComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private rolServi: RolService,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerRol(this.data.id);
    }
  }

  ObtenerRol(id: number) {
    this.rolServi.VerRol(id).subscribe((response) => {
      this.personal = response;
      this.formulario.setValue({
        nombre: this.personal.nombre
      });
    });
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarRol();
    } else {
      this.AgregarRol();
    }
  }

  AgregarRol() {
    var agregarPersonal: AgregarRolRequest = {
      nombre: this.formulario.value.nombre
    }
    this.rolServi.AgregarRol(agregarPersonal).subscribe(
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

  EditarRol() {
    var editarRol: EditarRolRequest = {
      idRol: this.data.id,
      nombre: this.formulario.value.nombre
    }
    this.rolServi.EditarRol(editarRol).subscribe(
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

  CerrarModal() {
    this.modalAgregarPersonal.close();
    this.onClose.emit();
  }

}
