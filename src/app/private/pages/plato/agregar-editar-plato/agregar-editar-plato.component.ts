import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ObtenerMenuSucursalResponse } from '../../../../core/models/Sucursal/obtenerMenuSucursal/obtenerMenuSucursalResponse';
import { RolService } from '../../../../core/services/rol.service';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { AgregarEditarSucursalComponent } from '../../sucursal/agregar-editar-sucursal/agregar-editar-sucursal.component';
import { CommonModule } from '@angular/common';
import { ObtenerMenuCategoriaResponse } from '../../../../core/models/Categoria/ObtenerMenuCategoria/ObtenerMenuCategoriaResponse';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { AgregarPlatoRequest } from '../../../../core/models/Plato/AgregarPlato/AgregarPlatoRequest';
import { EditarPlatoRequest } from '../../../../core/models/Plato/EditarPlato/EditarPlatoRequest';
import { VerPlatoResponse } from '../../../../core/models/Plato/VerPlato/VerPlatoResponse';
import { PlatoService } from '../../../../core/services/plato.service';

@Component({
  selector: 'app-agregar-editar-plato',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-plato.component.html',
  styleUrl: './agregar-editar-plato.component.scss'
})
export class AgregarEditarPlatoComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  Plato: VerPlatoResponse = {} as VerPlatoResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  Roles: ObtenerMenuSucursalResponse[] = []
  Sucursales: ObtenerMenuSucursalResponse[] = []

  categoriasMenu: ObtenerMenuCategoriaResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private modalAgregarPlato: MatDialogRef<AgregarEditarSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private persoService: PlatoService,
    private catServ: CategoriaService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      cate: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    this.ObtenerMenuCategoria();
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerPlato(this.data.id);
    }
  }

  ObtenerMenuCategoria() {
    this.catServ.ObtenerMenuCategoria().subscribe((response) => {
      this.categoriasMenu = response;
    })
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarPlato();
    } else {
      this.AgregarPlato();
    }
  }

  AgregarPlato() {
    var agregarPlato: AgregarPlatoRequest = {
      nombre: this.formulario.value.nombre,
      precio: this.formulario.value.precio,
      idCategoria: this.formulario.value.cate
    }
    this.persoService.AgregarPlato(agregarPlato).subscribe(
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

  EditarPlato() {
    var editarPlato: EditarPlatoRequest = {
      id: this.data.id,
      nombre: this.formulario.value.nombre,
      monto: this.formulario.value.precio,
      idCategoria: this.formulario.value.cate
    }
    this.persoService.EditarPlato(editarPlato).subscribe(
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

  ObtenerPlato(id: number) {
    this.persoService.VerPlato(id).subscribe((response) => {
      console.log(response);
      
      this.Plato = response;
      this.formulario.setValue({
        nombre: this.Plato.nombre,
        precio: this.Plato.monto,
        cate: this.Plato.categoria
      });
    });
  }

  CerrarModal() {
    this.modalAgregarPlato.close();
    this.onClose.emit();
  }
}
