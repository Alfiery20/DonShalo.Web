import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolService } from '../../../../core/services/rol.service';
import { AgregarEditarRolComponent } from '../agregar-editar-rol/agregar-editar-rol.component';
import { CommonModule } from '@angular/common';
import { ObtenerMenuXRolResponse } from '../../../../core/models/Rol/obtenerMenuXRol/obtenerMenuXRolResponse';
import { ActualizarPermisoRequest } from '../../../../core/models/Rol/actualizarPermiso/actualizarPermisoRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-menu-rol',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-menu-rol.component.html',
  styleUrl: './agregar-menu-rol.component.scss'
})
export class AgregarMenuRolComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  esEditar: boolean = false;
  titulo = 'Agregar';

  menusConPermiso: ObtenerMenuXRolResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private modalAgregarPersonal: MatDialogRef<AgregarMenuRolComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private rolServi: RolService,
  ) {
  }

  ngOnInit(): void {
    this.ObtenerPermisos()
  }

  ObtenerPermisos() {
    this.rolServi.ObtenerMenuXRol(this.data.id).subscribe((response) => {
      this.menusConPermiso = response
    })
  }


  ActualizarPermiso(idMenu: number, valor: boolean) {
    var actualizar: ActualizarPermisoRequest = {
      idMenu: idMenu,
      idRol: this.data.id,
      idPermiso: valor
    }
    var response = this.rolServi.ActualizarPermiso(actualizar).subscribe(
      (response) => {
        if (response != null && response.codigo == 'OK') {
          this.ObtenerPermisos()
          Swal.fire({
            title: response.mensaje,
            icon: "success",
            confirmButtonColor: "var(--color-principal)",
          });
        } else {
          this.ObtenerPermisos()
          Swal.fire({
            title: response.mensaje,
            icon: "error",
            confirmButtonColor: "var(--color-principal)",
          });
        }
      },
      (error) => {
        this.ObtenerPermisos()
        Swal.fire({
          title: "Ocurrio un error, comunicarse con servicio tecnico",
          icon: "error",
          confirmButtonColor: "var(--color-principal)",
        });
      })
  }

  CerrarModal() {
    this.modalAgregarPersonal.close();
    this.onClose.emit();
  }
}
