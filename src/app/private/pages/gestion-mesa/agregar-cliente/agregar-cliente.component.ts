import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../../core/services/cliente.service';
import { VerClienteResponse } from '../../../../core/models/Cliente/VerCliente/VerClienteResponse';
import { AgregarClienteRequest } from '../../../../core/models/Cliente/AgregarCliente/AgregarClienteRequest';
import Swal from 'sweetalert2';
import { EditarClienteRequest } from '../../../../core/models/Cliente/EditarCliente/EditarClienteRequest';

@Component({
  selector: 'app-agregar-cliente',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './agregar-cliente.component.html',
  styleUrl: './agregar-cliente.component.scss'
})
export class AgregarClienteComponent {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  esEditar: boolean = false;
  titulo = 'Agregar';

  clienteObtenido: VerClienteResponse = {} as VerClienteResponse;

  constructor(
    private fb: FormBuilder,
    private modalAgregarCategoria: MatDialogRef<AgregarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private clieServ: ClienteService,
  ) {
    this.formulario = this.fb.group({
      tipDoc: ['', Validators.required],
      nroDoc: ['', Validators.required],
      nombre: ['', Validators.required],
      apePat: ['', Validators.required],
      apeMat: ['', Validators.required],
      direc: ['', Validators.required],
      direcEntr: ['', Validators.required],
      isJuridica: [0, Validators.required],
      ruc: ['', Validators.required],
      razSoc: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerCliente(this.data.id);
    }
  }

  ObtenerCliente(id: number) {
    this.clieServ.VerCliente(id).subscribe(
      (response) => {
        this.clienteObtenido = response;
        this.formulario.patchValue({
          tipDoc: this.clienteObtenido.tipoDocumento,
          nroDoc: this.clienteObtenido.numeroDocumento,
          nombre: this.clienteObtenido.nombre,
          apePat: this.clienteObtenido.apellidoPaterno,
          apeMat: this.clienteObtenido.apellidoMaterno,
          direc: this.clienteObtenido.direccion,
          direcEntr: this.clienteObtenido.direccionEntrega,
          isJuridica: this.clienteObtenido.ruc != '' ? 1 : 0,
          ruc: this.clienteObtenido.ruc,
          razSoc: this.clienteObtenido.razonSocial
        });
      }
    )
  }

  AgregarCliente() {
    var request: AgregarClienteRequest = {
      tipoDocumento: this.formulario.value.tipDoc,
      numeroDocumento: this.formulario.value.nroDoc,
      nombre: this.formulario.value.nombre,
      apellidoPaterno: this.formulario.value.apePat,
      apellidoMaterno: this.formulario.value.apeMat,
      direccion: this.formulario.value.direc,
      direccionEntrega: this.formulario.value.direcEntr,
      ruc: this.formulario.value.isJuridica == 1 ? this.formulario.value.ruc : '',
      razonSocial: this.formulario.value.isJuridica == 1 ? this.formulario.value.razSoc : '',
    };
    this.clieServ.AgregarCliente(request).subscribe(
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

  EditarCliente() {
    var request: EditarClienteRequest = {
      id: this.data.id,
      tipoDocumento: this.formulario.value.tipDoc,
      numeroDocumento: this.formulario.value.nroDoc,
      nombre: this.formulario.value.nombre,
      apellidoPaterno: this.formulario.value.apePat,
      apellidoMaterno: this.formulario.value.apeMat,
      direccion: this.formulario.value.direc,
      direccionEntrega: this.formulario.value.direcEntr,
      ruc: this.formulario.value.isJuridica == 1 ? this.formulario.value.ruc : '',
      razonSocial: this.formulario.value.isJuridica == 1 ? this.formulario.value.razSoc : '',
    };
    this.clieServ.EditarCliente(request).subscribe(
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

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarCliente();
    } else {
      this.AgregarCliente();
    }
  }

  CerrarModal() {
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }
}
