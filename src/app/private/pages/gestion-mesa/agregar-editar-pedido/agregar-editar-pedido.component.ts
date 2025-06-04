import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerCategoriaResponse } from '../../../../core/models/Categoria/VerCategoria/VerCategoriaResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { AgregarEditarCategoriaComponent } from '../../categoria/agregar-editar-categoria/agregar-editar-categoria.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-editar-pedido',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './agregar-editar-pedido.component.html',
  styleUrl: './agregar-editar-pedido.component.scss'
})
export class AgregarEditarPedidoComponent {
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
      // this.ObtenerCategoria(this.data.id);
    }
  }

  CerrarModal() {
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }

  AccionGuardar() {}
}
