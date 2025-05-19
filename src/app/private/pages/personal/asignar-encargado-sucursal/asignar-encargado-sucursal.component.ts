import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalService } from '../../../../core/services/personal.service';
import { RolService } from '../../../../core/services/rol.service';
import { AgregarEditarSucursalComponent } from '../../sucursal/agregar-editar-sucursal/agregar-editar-sucursal.component';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { ObtenerMenuPersonalResponse } from '../../../../core/models/Personal/obtenerMenuPersonal/obtenerMenuPersonalResponse';
import { ObtenerMenuSucursalResponse } from '../../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';

@Component({
  selector: 'app-asignar-encargado-sucursal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './asignar-encargado-sucursal.component.html',
  styleUrl: './asignar-encargado-sucursal.component.scss'
})
export class AsignarEncargadoSucursalComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  sucursal: ObtenerMenuSucursalResponse[] = []

  sucursalSeleccionado: ObtenerMenuSucursalResponse = {} as ObtenerMenuSucursalResponse;

  constructor(
    private fb: FormBuilder,
    private modalAgregarPersonal: MatDialogRef<AsignarEncargadoSucursalComponent>,
    private sucServi: SucursalService,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
  ) {
    this.formulario = this.fb.group({
      sucursal: ['', Validators.required]
    });
  }

  ObtenerSucursal() {
    var terminoSucursal = this.formulario.get('sucursal')?.value ?? '';
    this.sucServi.ObtenerMenuSucursal(terminoSucursal).subscribe((response) => {
      this.sucursal = response
    })
  }

  setearSucursalSeleccionado(rol: ObtenerMenuSucursalResponse) {
    this.sucursalSeleccionado = rol;
    this.formulario.get('sucursal')?.setValue(rol.nombre);
  }

  guardarEncargado() {

  }

  CerrarModal() {
    this.modalAgregarPersonal.close();
    this.onClose.emit();
  }
}
