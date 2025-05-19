import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { VerMesaResponse } from '../../../../core/models/Mesa/VerMesa/VerMesaResponse';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObtenerMesaResponse } from '../../../../core/models/Mesa/ObtenerMesa/ObtenerMesaResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PisoService } from '../../../../core/services/piso.service';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { AgregarEditarPisoComponent } from '../../piso/agregar-editar-piso/agregar-editar-piso.component';
import { CommonModule } from '@angular/common';
import { AgregarMesaRequest } from '../../../../core/models/Mesa/AgregarMesa/AgregarMesaRequest';
import { EditarMesaRequest } from '../../../../core/models/Mesa/EditarMesa/EditarMesaRequest';
import { MesaService } from '../../../../core/services/mesa.service';
import { ObtenerSucursalResponse } from '../../../../core/models/Sucursal/obtenerSucursal/ObtenerSucursalResponse';
import { ObtenerPisoResponse } from '../../../../core/models/Piso/ObtenerPiso/obtenerPisoResponse';
import { ObtenerPisoRequest } from '../../../../core/models/Piso/ObtenerPiso/obtenerPisoRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-editar-mesa',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-mesa.component.html',
  styleUrl: './agregar-editar-mesa.component.scss'
})
export class AgregarEditarMesaComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  formulario: FormGroup;

  piso: VerMesaResponse = {} as VerMesaResponse;

  sucurales: ObtenerSucursalResponse[] = [];
  pisos: ObtenerPisoResponse[] = [];

  esEditar: boolean = false;
  titulo = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private modalAgregarMesa: MatDialogRef<AgregarEditarMesaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private pisoServi: PisoService,
    private sucServi: SucursalService,
    private mesaServi: MesaService
  ) {
    this.formulario = this.fb.group({
      numero: ['', Validators.required],
      capacidad: [0, Validators.required],
      sucursal: [0, Validators.required],
      piso: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    this.ObtenerSucursal();
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerMesa(this.data.id);
    }
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarMesa();
    } else {
      this.AgregarMesa();
    }
  }

  ObtenerSucursal() {
    this.sucServi.ObtenerSucursal('').subscribe((response) => {
      this.sucurales = response
    })
  }

  ObtenerPiso() {
    var id = this.formulario.value.sucursal;
    var request: ObtenerPisoRequest = {
      termino: '',
      idSucursal: id
    }
    this.pisoServi.ObtenerPiso(request).subscribe((response) => {
      this.pisos = response
    })
  }

  ObtenerMesa(id: number) {
    this.ObtenerSucursal();
    this.ObtenerPiso();

    this.mesaServi.VerMesa(id).subscribe((response) => {
      this.piso = response
      this.formulario.setValue({
        numero: this.piso.numero,
        capacidad: this.piso.capacidad,
        sucursal: this.piso.idSucursal,
        piso: this.piso.idPiso,
      });
    })
  }

  AgregarMesa() {
    var agregarMesa: AgregarMesaRequest = {
      numero: this.formulario.value.numero,
      capacidad: this.formulario.value.capacidad,
      idPiso: this.formulario.value.piso,
    }
    this.mesaServi.AgregarMesa(agregarMesa).subscribe(
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

  EditarMesa() {
    var editarMesa: EditarMesaRequest = {
      idMesa: this.data.id,
      numero: this.formulario.value.numero,
      capacidad: this.formulario.value.capacidad,
      idPiso: this.formulario.value.piso,
    }
    this.mesaServi.EditarMesa(editarMesa).subscribe(
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
    this.modalAgregarMesa.close();
    this.onClose.emit();
  }

}
