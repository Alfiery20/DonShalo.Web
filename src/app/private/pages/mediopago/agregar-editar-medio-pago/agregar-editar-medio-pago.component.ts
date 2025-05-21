import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerMedioPagoResponse } from '../../../../core/models/MedioPago/VerMedioPago/VerMedioPagoResponse';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { MedioPagoService } from '../../../../core/services/medio-pago.service';
import { AgregarMedioPagoRequest } from '../../../../core/models/MedioPago/AgregarMedioPago/AgregarMedioPagoRequest';
import Swal from 'sweetalert2';
import { EditarMedioPagoRequest } from '../../../../core/models/MedioPago/EditarMedioPago/EditarMedioPagoRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-editar-medio-pago',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-medio-pago.component.html',
  styleUrl: './agregar-editar-medio-pago.component.scss'
})
export class AgregarEditarMedioPagoComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  formulario: FormGroup;

  sucursal: VerMedioPagoResponse = {} as VerMedioPagoResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private modalAgregarSucursal: MatDialogRef<AgregarEditarMedioPagoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private medioPagoServ: MedioPagoService
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
      this.ObtenerMedioPago(this.data.id);
    }
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarMedioPago();
    } else {
      this.AgregarMedioPago();
    }
  }

  ObtenerMedioPago(id: number) {
    this.medioPagoServ.VerMedioPago(id).subscribe((response) => {
      this.sucursal = response;
      this.formulario.setValue({
        nombre: this.sucursal.nombre
      });
    });
  }

  AgregarMedioPago() {
    var agregarMedioPago: AgregarMedioPagoRequest = {
      termino: this.formulario.value.nombre,
    }
    this.medioPagoServ.AgregarMedioPago(agregarMedioPago).subscribe(
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

  EditarMedioPago() {
    var editarMedopagp: EditarMedioPagoRequest = {
      id: this.data.id,
      termino: this.formulario.value.nombre
    }
    this.medioPagoServ.EditarMedioPago(editarMedopagp).subscribe(
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
