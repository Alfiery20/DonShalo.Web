import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { AgregarSucursalRequest } from '../../../../core/models/Sucursal/agregarSucursal/agregarSucursalRequest';
import Swal from 'sweetalert2';
import { VerSucursalResponse } from '../../../../core/models/Sucursal/verSucursal/verSucursalResponse';
import { EditarSucursalRequest } from '../../../../core/models/Sucursal/editarSucural/editarSucuralRequest';

@Component({
  selector: 'app-agregar-editar-sucursal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-sucursal.component.html',
  styleUrl: './agregar-editar-sucursal.component.scss'
})
export class AgregarEditarSucursalComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  sucursal: VerSucursalResponse = {} as VerSucursalResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private modalAgregarSucursal: MatDialogRef<AgregarEditarSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private sucursalServi: SucursalService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      // responsable: ['', Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerSucursal(this.data.id);
    }
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarSucursal();
    } else {
      this.AgregarSucursal();
    }
  }

  ObtenerSucursal(id: number) {
    this.sucursalServi.VerSucursal(id).subscribe((response) => {
      this.sucursal = response;
      this.formulario.setValue({
        nombre: this.sucursal.nombre,
        direccion: this.sucursal.direccion,
        telefono: this.sucursal.telefono,
        horaEntrada: this.sucursal.horaEntrada,
        horaSalida: this.sucursal.horaSalida,
      });
    });
  }

  AgregarSucursal() {
    var agregarSucursal: AgregarSucursalRequest = {
      nombre: this.formulario.value.nombre,
      direccion: this.formulario.value.direccion,
      telefono: this.formulario.value.telefono,
      // idEncargado: parseInt(this.formulario.value.responsable),
      fechaEntrada: this.formulario.value.horaEntrada,
      fechaSalida: this.formulario.value.horaSalida
    }
    this.sucursalServi.AgregarSucursal(agregarSucursal).subscribe(
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

  EditarSucursal() {
    var editarSucursal: EditarSucursalRequest = {
      id: this.data.id,
      nombre: this.formulario.value.nombre,
      direccion: this.formulario.value.direccion,
      telefono: this.formulario.value.telefono,
      horaIngreso: this.formulario.value.horaEntrada,
      horaSalida: this.formulario.value.horaSalida
    }
    this.sucursalServi.EditarSucursal(editarSucursal).subscribe(
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
    this.modalAgregarSucursal.close();
    this.onClose.emit();
  }
}
