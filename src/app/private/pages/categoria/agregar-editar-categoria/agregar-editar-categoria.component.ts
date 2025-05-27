import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AgregarCategoriaRequest } from '../../../../core/models/Categoria/AgregarCategoria/AgregarCategoriaRequest';
import { EditarCategoriaRequest } from '../../../../core/models/Categoria/EditarCategoria/EditarCategoriaRequest';
import { VerCategoriaResponse } from '../../../../core/models/Categoria/VerCategoria/VerCategoriaResponse';
import { CategoriaService } from '../../../../core/services/categoria.service';

@Component({
  selector: 'app-agregar-editar-categoria',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './agregar-editar-categoria.component.html',
  styleUrl: './agregar-editar-categoria.component.scss'
})
export class AgregarEditarCategoriaComponent implements OnInit {

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  Categoria: VerCategoriaResponse = {} as VerCategoriaResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private modalAgregarCategoria: MatDialogRef<AgregarEditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private CategoriaServi: CategoriaService
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
      this.ObtenerCategoria(this.data.id);
    }
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarCategoria();
    } else {
      this.AgregarCategoria();
    }
  }

  ObtenerCategoria(id: number) {
    this.CategoriaServi.VerCategoria(id).subscribe((response) => {
      this.Categoria = response;
      this.formulario.setValue({
        nombre: this.Categoria.nombre
      });
    });
  }

  AgregarCategoria() {
    var agregarCategoria: AgregarCategoriaRequest = {
      nombre: this.formulario.value.nombre
    }
    this.CategoriaServi.AgregarCategoria(agregarCategoria).subscribe(
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

  EditarCategoria() {
    var editarCategoria: EditarCategoriaRequest = {
      id: this.data.id,
      nombre: this.formulario.value.nombre
    }
    this.CategoriaServi.EditarCategoria(editarCategoria).subscribe(
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
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }
}
