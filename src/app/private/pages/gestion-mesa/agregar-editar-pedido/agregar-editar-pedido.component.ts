import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerCategoriaResponse } from '../../../../core/models/Categoria/VerCategoria/VerCategoriaResponse';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { AgregarEditarCategoriaComponent } from '../../categoria/agregar-editar-categoria/agregar-editar-categoria.component';
import { CommonModule } from '@angular/common';
import { ObtenerMenuCategoriaResponse } from '../../../../core/models/Categoria/ObtenerMenuCategoria/ObtenerMenuCategoriaResponse';
import { ObtenerMenuPlatoResponse } from '../../../../core/models/Plato/ObtenerMenuPlato/ObtenerMenuPlatoResponse';
import { PlatoService } from '../../../../core/services/plato.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ObtenerClienteDocResponse } from '../../../../core/models/Cliente/ObtenerClienteDoc/ObtenerClienteDocResponse';
import Swal from 'sweetalert2';

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

  categoriasMenu: ObtenerMenuCategoriaResponse[] = [];
  platosMenu: ObtenerMenuPlatoResponse[] = [];

  clienteAsignado: ObtenerClienteDocResponse = {} as ObtenerClienteDocResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private modalAgregarCategoria: MatDialogRef<AgregarEditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private catServ: CategoriaService,
    private platoServ: PlatoService,
    private clieServ: ClienteService
  ) {
    this.formulario = this.fb.group({
      nroSerie: [{ value: '', disabled: true }, Validators.required],
      nroCorre: [{ value: '', disabled: true }, Validators.required],
      nroDoumento: ['', Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      categoria: [0, Validators.required],
      plato: [0, Validators.required],
      cantidad: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.id != 0;
    this.titulo = 'Agregar';
    this.ObtenerMenuCategoria();
    if (this.esEditar) {
      this.titulo = 'Modificar';
      // this.ObtenerCategoria(this.data.id);
    }
  }

  BuscarCliente() {
    if (this.formulario.value.nroDoumento.length >= 8) {
      this.clieServ.ObtenerClientePorDoc(this.formulario.value.nroDoumento).subscribe(
        (response) => {
          this.clienteAsignado = response;
          this.formulario.get('nombre')?.setValue(this.clienteAsignado.nombre);
          if (this.clienteAsignado.id == 0) {
            Swal.fire({
              title: "Advertencia!",
              text: "Por favor, registrar usuario!",
              icon: "info"
            });
          }
        }
      )
    } else {
      this.clienteAsignado = {} as ObtenerClienteDocResponse;
    }
  }

  CerrarModal() {
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }

  ObtenerMenuCategoria() {
    this.catServ.ObtenerMenuCategoria().subscribe((response) => {
      this.categoriasMenu = response;
    })
  }

  ObtenerMenuPlato(event: any) {
    const id = event.target.value;
    this.platoServ.ObtenerMenuPlato(id).subscribe((response) => {
      this.platosMenu = response;
    })
  }

  AccionGuardar() { }
}
