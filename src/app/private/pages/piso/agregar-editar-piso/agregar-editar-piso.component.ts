import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { VerPisoResponse } from '../../../../core/models/Piso/verPiso/verPisoResponse';
import { PisoService } from '../../../../core/services/piso.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ObtenerMenuSucursalResponse } from '../../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { AgregarPisoRequest } from '../../../../core/models/Piso/agregarPiso/agregarPisoRequest';
import { EditarPisoRequest } from '../../../../core/models/Piso/editarPiso/editarPisoRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-piso',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-piso.component.html',
  styleUrl: './agregar-editar-piso.component.scss'
})
export class AgregarEditarPisoComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  piso: VerPisoResponse = {} as VerPisoResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  Sucursales: ObtenerMenuSucursalResponse[] = []

  constructor(
    private fb: FormBuilder,
    private modalAgregarSucursal: MatDialogRef<AgregarEditarPisoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private pisoServi: PisoService,
    private sucServi: SucursalService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      capaClie: [0, Validators.required],
      capaPers: [0, Validators.required],
      sucursal: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    this.ObtenerSucursal();
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerPiso(this.data.id);
    }
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarPiso();
    } else {
      this.AgregarPiso();
    }
  }

  AgregarPiso() {
    var agregarPiso: AgregarPisoRequest = {
      nombre: this.formulario.value.nombre,
      capacidadCliente: this.formulario.value.capaClie,
      capacidadPersonal: this.formulario.value.capaPers,
      idSucursal: this.formulario.value.sucursal
    }
    this.pisoServi.AgregarPiso(agregarPiso).subscribe(
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

  EditarPiso() {
    var editarPiso: EditarPisoRequest = {
      id: this.data.id,
      nombre: this.formulario.value.nombre,
      capacidadClientes: this.formulario.value.capaClie,
      capacidadEmpleados: this.formulario.value.capaPers,
      idSucursal: this.formulario.value.sucursal
    }
    this.pisoServi.EditarPiso(editarPiso).subscribe(
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

  ObtenerSucursal() {
    var terminoSucursal = this.formulario.get('sucursal')?.value ?? '';
    this.sucServi.ObtenerMenuSucursal(terminoSucursal).subscribe((response) => {
      this.Sucursales = response
    })
  }

  ObtenerPiso(id: number) {
    this.pisoServi.VerPiso(id).subscribe((response) => {
      this.piso = response
      this.formulario.setValue({
        nombre: this.piso.nombre,
        capaClie: this.piso.capacidadCliente,
        capaPers: this.piso.capacidadPersonal,
        sucursal: this.piso.idSucursal
      });
    })
  }

  CerrarModal() {
    this.modalAgregarSucursal.close();
    this.onClose.emit();
  }
}
