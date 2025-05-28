import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ObtenerCategoriaResponse } from '../../../core/models/Categoria/ObtenerCategoria/ObtenerCategoriaResponse';
import { CategoriaService } from '../../../core/services/categoria.service';
import { AgregarEditarCategoriaComponent } from './agregar-editar-categoria/agregar-editar-categoria.component';

@Component({
  selector: 'app-categoria',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'Nombre',
      'Estado',
      'Accion'
    ];

  categorias: ObtenerCategoriaResponse[] = []

  dataSource = new MatTableDataSource<ObtenerCategoriaResponse>(this.categorias);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private cateServ: CategoriaService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ObtenerCategoria()
  }


  ObtenerCategoria() {
    var termino = this.formulario.get('nombre')?.value || '';
    this.cateServ.ObtenerCategoria(termino).subscribe((response) => {
      this.categorias = response
      this.dataSource.data = this.categorias;
    })
  }

  AgregarCategoria() {
    var modalAbierto = this.dialog.open(AgregarEditarCategoriaComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerCategoria();
    });
  }

  EditarCategoria(idCategoria: number) {
    var modalAbierto = this.dialog.open(AgregarEditarCategoriaComponent, {
      width: '400px',
      data: { id: idCategoria },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerCategoria();
    });
  }

  EliminarCategoria(idCategoria: number) {
    var mesa = this.categorias.find(x => x.id == idCategoria);
    var texto = ''
    mesa?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';

    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de ${texto} el piso?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cateServ.EliminarCategoria(idCategoria).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.ObtenerCategoria();
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
        )
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
